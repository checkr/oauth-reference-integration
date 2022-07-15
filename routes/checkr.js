import express from 'express'
import database from '../db.js'
import fetch from 'node-fetch'
import {
  encrypt,
  decrypt,
  parseJSON,
  validCheckrSignature,
} from '../helpers/index.js'

const checkrRouter = express.Router()
const checkrOAuthURL = process.env.CHECKR_OAUTH_URL
const checkrClientId = process.env.CHECKR_OAUTH_CLIENT_ID
const checkrClientSecret = process.env.CHECKR_OAUTH_CLIENT_SECRET

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

  account.checkrAccount = {
    accessToken: encrypt(jsonBody.access_token),
    id: jsonBody.checkr_account_id,
  }
  await db.write()
  res.status(200).send(jsonBody)
})

checkrRouter.post('/api/checkr/disconnect', async (req, res) => {
  if (!req.body.token) {
    res.status(400).send({
      errors: ['request body must contain a token'],
    })
    return
  }

  const token = decrypt(req.body.token)

  const credentials = `${Buffer.from(`${token}:`, 'utf-8').toString('base64')}`

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
  }

  const response = await fetch(`${checkrOAuthURL}/deauthorize`, options)
  const jsonBody = parseJSON(response)

  if (!response.ok) {
    res.status(422)
    res.send({
      error: [jsonBody.error],
    })
  } else {
    const db = await database()
    const accountToDeauthorize = db.data.accounts.find(
      a => a.checkrAccount && decrypt(a.checkrAccount.accessToken) === token,
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
      const accountToDeauthorize = db.data.accounts.find(
        a =>
          a.checkrAccount &&
          decrypt(a.checkrAccount.accessToken) === checkrAccessToken,
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
