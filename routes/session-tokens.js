import express from 'express'
import fetch from 'node-fetch'
import database from '../db.js'
import jwt from 'jsonwebtoken'
import bearerToken from 'express-bearer-token'
import {parseJSON} from '../helpers/index.js'
import {decrypt} from '../encryption.js'

const sessionTokensRouter = express.Router().use(bearerToken())
const apiHost = process.env.CHECKR_API_URL

// Initial Setup
// ---------------

// Setup a private endpoint to handle session token requests to **Checkr**, If you
// are using ```embeds``` we will specify this endpoint in the ````sessionTokenPath```` property.
// Make sure to complete your application's user **authentication** and **authorization** before
// responding to the request.
sessionTokensRouter.post('/api/session-tokens', async (req, res) => {
  if (!validBearerToken(req.token)) {
    res.status(401).send({
      errors: {
        authentication: ['Authentication failed'],
      },
    })

    return
  }

  const db = await database()
  const account = db.data.accounts[0]
  const oauthToken = account.checkrAccount
    ? await decrypt(account.checkrAccount.accessToken)
    : null
  const credentials = Buffer.from(`${oauthToken}`).toString('base64')

  // Send a request for a Session Token from your backend to Checkr
  // ---------------

  // Partner developers, building partner applications use the OAuth access token
  // acquired through Checkr OAuth to request session tokens.This is a pre-requisite for using ```embeds```.

  const response = await fetch(`${apiHost}/v1/web_sdk/session_tokens`, {
    headers: {
      'Content-Type': 'application/json',
      // Pass the OAuth token using ```Basic Authorization``` as the **username** with an empty **password**
      Authorization: `Basic ${credentials}:`,
    },
    method: 'POST',
    body: JSON.stringify({
      // For partner requests, send ```scopes: ['order']``` as the JSON payload
      scopes: ['order'],
    }),
  })

  const jsonBody = await parseJSON(response)

  // Checkr responds to your backend with a Session Token
  // ---------------

  // Upon a successful request Checkr will respond with the following payload
  //
  //     {
  //       token: <some-token-value>
  //     }
  //
  if (!response.ok) {
    res.status(response.status).send(jsonBody)
  } else {
    res.send(jsonBody)
  }
})

const validBearerToken = token => {
  try {
    return jwt.verify(token, 'supersecret')
  } catch {
    return false
  }
}

export default sessionTokensRouter
