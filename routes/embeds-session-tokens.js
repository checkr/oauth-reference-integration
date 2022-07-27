// This module is important for integrations using [Checkr
// Embeds](https://docs.checkr.com/embeds/) to make background check requests.
// These integrations will use the
// [@checkr/web-sdk](https://www.npmjs.com/package/@checkr/web-sdk) to setup UI
// components, and these components require Checkr session tokens to operate.
//
// This code walkthrough describes how to setup an endpoint to request these
// Checkr Embeds session tokens.

import express from 'express'
import fetch from 'node-fetch'
import database from '../db.js'
import jwt from 'jsonwebtoken'
import bearerToken from 'express-bearer-token'
import {parseJSON} from '../helpers/index.js'
import {decrypt} from '../encryption.js'

const sessionTokensRouter = express.Router().use(bearerToken())

// Session Token URL
// ---------------

// When your Checkr Embeds components initializes, they will call this private
// endpoint to create session token for themselves. <mark>Each request to this
// endpoint must be authenticated and authorized before a session token can be
// created.</mark>
sessionTokensRouter.post('/api/embeds-session-tokens', async (req, res) => {
  let validToken
  // In this case, since we use JWTs to secure requests to
  // ```api/embeds-session-token```, we first verify if the token signature is
  // valid and the JWT is not expired.
  try {
    validToken = jwt.verify(req.token, process.env.JWT_HMAC_SECRET)
  } catch {
    res.status(401).send({
      errors: ['authentication failed'],
    })
    return
  }
  // Then we check that the token has the permissions required by this
  // endpoint. Your implementation may require more or different checks.
  if (
    !validToken.authorizations.permissions.includes('checkr_background_checks')
  ) {
    res.status(403).send({
      errors: ['authorization failed'],
    })
  }

  const db = await database()
  // The valid JWT contains the identifier we need to find the user's Checkr
  // access token.
  const account = db.data.find(a => a.id === validToken.sub)
  const oauthToken = await decrypt(account.checkrAccount.accessToken)

  // #### Request a WebSDK session token
  // To request a session token from Checkr we assemble the required variables here:
  // - ```CHECKR_API_URL``` which is ```https://api.checkr-staging.com``` in the testing environment and ```https://api.checkr.com``` in production
  // - ```basicAuthUsername``` This request is an ```HTTP POST``` that uses
  //   basic authentication. The basic auth username is the user's access
  //   token and the password is blank.
  const basicAuthUsername = Buffer.from(`${oauthToken}`).toString('base64')
  const response = await fetch(
    `${process.env.CHECKR_API_URL}/v1/web_sdk/session_tokens`,
    {
      headers: {
        Authorization: `Basic ${basicAuthUsername}:`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        // If you are a partner requesting a session token on behalf of your
        // customer, you only need the scopes property in your request body to
        // Checkr. If you are a direct customer of checkr, you will need to
        // provide another key in this request body object: ```"direct": true```.
        scopes: ['order'],
      }),
    },
  )

  const jsonBody = await parseJSON(response)
  if (!response.ok) {
    res.status(response.status).send(jsonBody)
    return
  }

  // A successful ```HTTP POST``` request to
  // ```${process.env.CHECKR_API_URL}/v1/web_sdk/session_tokens``` will have
  // the following response body:
  //
  //     {
  //       token: <some-token-value>
  //     }
  //
  // Pass this response object along to the UI component, and you're done.

  res.send(jsonBody)

  // After creating this endpoint, be sure to set its path as the
  // ```sessionTokenPath``` property in your Checkr Embeds UI components. For
  // example, the ```NewInvitation``` Checkr component would look like:
  //
  //     NewInvitation({
  //       sessionTokenPath: '/api/embeds-session-tokens',
  //       ...
  //     })
  //
})

export default sessionTokensRouter
