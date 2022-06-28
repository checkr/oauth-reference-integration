import express from 'express'
import expressBasicAuth from 'express-basic-auth'
import fetch from 'node-fetch'

const sessionTokensRouter = express.Router()
sessionTokensRouter.use(
  expressBasicAuth({
    users: {'some-user': 'supersecret'},
  }),
)

const apiHost = process.env.CHECKR_API_URL
const token = process.env.OAUTH_ACCESS_TOKEN
const credentials = Buffer.from(`${token}:`).toString('base64')

sessionTokensRouter.post('/api/session-tokens', async (req, res) => {
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

  if (response.ok) res.send(await response.json())
  else {
    res.status(response.status).send(await response.json())
  }
})

export default sessionTokensRouter
