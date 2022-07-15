import express from 'express'
import fetch from 'node-fetch'
import database from '../db.js'
import jwt from 'jsonwebtoken'
import bearerToken from 'express-bearer-token'
import {decrypt, parseJSON} from '../helpers/index.js'

const sessionTokensRouter = express.Router().use(bearerToken())
const apiHost = process.env.CHECKR_API_URL

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
    ? decrypt(account.checkrAccount.accessToken)
    : null
  const credentials = Buffer.from(`${oauthToken}:`).toString('base64')

  const response = await fetch(`${apiHost}/web_sdk/session_tokens`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
    method: 'POST',
    body: JSON.stringify({
      scopes: ['order'],
    }),
  })

  const jsonBody = await parseJSON(response)

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
