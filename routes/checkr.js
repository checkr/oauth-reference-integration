import express from 'express'
import database from '../db.js'
import fetch from 'node-fetch'
import {
  parseJSON,
  validCheckrSignature,
  findAccountWithMatchingToken,
} from '../helpers/index.js'
import {encrypt, decrypt} from '../encryption.js'

const checkrRouter = express.Router()
const checkrOAuthURL = process.env.CHECKR_OAUTH_URL
const checkrClientId = process.env.CHECKR_OAUTH_CLIENT_ID
const checkrClientSecret = process.env.CHECKR_OAUTH_CLIENT_SECRET

// Initial Setup
// ---------------

// Setup a private endpoint to handle Checkr Oauth, we will require
// - a ```code``` obtained from the Checkr sign-up flow
// - an account for our backend to create an Oauth access token for
checkrRouter.post('/api/checkr/oauth', async (req, res) => {
  if (!req.body.code || !req.body.accountId) {
    res.status(400).send({
      errors: ['request body must contain a code and an accountId'],
    })
    return
  }

  const options = {
    method: 'POST',
    body: JSON.stringify({
      code: req.body.code,
      client_id: checkrClientId,
      client_secret: checkrClientSecret,
    }),
    headers: {'Content-Type': 'application/json'},
  }

  // Send a request from your backend to Checkr for an OAuth access token
  // ---------------

  // Send a ```HTTP POST``` to ```{checkr-api-url}/oauth/tokens```
  // In the JSON payload send

  //     {
  //       code: <code-from-sign-up-flow-redirect>,
  //       client_id: <your-partner-application-client-id>,
  //       client_secret: <your-partner-application-client-secret>,
  //     }
  const response = await fetch(`${checkrOAuthURL}/tokens`, options)
  const jsonBody = await parseJSON(response)

  if (!response.ok) {
    res.status(422).send({
      errors: {
        checkrApiErrors: jsonBody,
      },
    })
    return
  }

  const db = await database()
  const account = db.data.accounts.find(a => a.id === req.body.accountId)

  if (!account) {
    res.status(404).send({
      errors: [`account with accountId: ${req.body} not found`],
    })
    return
  }

  // Checkr responds with an OAuth access token and your Checkr account id
  // ---------------

  // Upon a successful request Checkr will respond with the following payload
  //
  //     {
  //       access_token: <some-access-token>,
  //       checkr_account_id: <some-id>,
  //     }
  //
  // Save this information in your database, make sure to not store this token in plain text.
  account.checkrAccount = {
    accessToken: await encrypt(jsonBody.access_token),
    id: jsonBody.checkr_account_id,
  }
  await db.write()
  res.status(200).send(jsonBody)
})

checkrRouter.post('/api/checkr/disconnect', async (req, res) => {
  if (!req.body.encryptedToken) {
    res.status(400).send({
      errors: ['request body must contain an encryptedToken'],
    })
    return
  }

  const plaintextToken = await decrypt(req.body.encryptedToken)
  const credentials = `${Buffer.from(`${plaintextToken}:`, 'utf-8').toString(
    'base64',
  )}`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
  }

  const response = await fetch(`${checkrOAuthURL}/deauthorize`, options)
  if (!response.ok) {
    const jsonBody = parseJSON(response)
    res.status(422).send({
      errors: jsonBody.errors,
    })
  } else {
    const db = await database()
    const accountToDeauthorize = await findAccountWithMatchingToken(
      db.data.accounts,
      plaintextToken,
    )
    accountToDeauthorize.deauthorized = true
    await db.write()
    res.status(204).end()
  }
})

checkrRouter.post('/api/checkr/webhooks', async (req, res) => {
  if (!validCheckrSignature(req.headers['x-checkr-signature'], req.body)) {
    res.status(400).send({errors: ['invalid x-checkr-signature']})
    return
  }

  const db = await database()

  switch (req.body.type) {
    case 'account.credentialed':
      const checkrAccountId = req.body.account_id
      const accountToCredential = db.data.accounts.find(
        a => a.checkrAccount && a.checkrAccount.id === checkrAccountId,
      )

      if (!accountToCredential) {
        res.status(404).send({
          errors: [
            `cannot find account with checkr account ID ${checkrAccountId}`,
          ],
        })
        return
      }

      accountToCredential.checkrAccount.credentialed = true
      accountToCredential.showPrompts = true
      await db.write()
      res.status(200).end()
      break
    case 'token.deauthorized':
      const checkrAccessToken = req.body.data.object.access_code
      const accountToDeauthorize = await findAccountWithMatchingToken(
        db.data.accounts,
        checkrAccessToken,
      )

      if (!accountToDeauthorize) {
        res.status(404).send({
          errors: [`cannot find account associated with request`],
        })
        return
      }

      delete accountToDeauthorize.checkrAccount
      accountToDeauthorize.deauthorized = true
      await db.write()
      res.status(204).end()
      break
    default:
      console.warn(`[ WARNING ] Unhandled webhook for type: ${req.body.type}`)
  }
})

export default checkrRouter
