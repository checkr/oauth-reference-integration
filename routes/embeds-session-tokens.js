// This module is important for integrations using [Checkr
// Embeds](https://docs.checkr.com/embeds/) to make background check requests.
// These integrations will use the
// [@checkr/web-sdk](https://www.npmjs.com/package/@checkr/web-sdk) to setup UI
// components, and these components require session tokens to operate.
//
// This code walkthrough describes how to setup an endpoint to request these
// Checkr Embeds session tokens. It will provide a working code example for the
// Embeds [Add Authentication
// docs](https://docs.checkr.com/embeds/#section/Getting-Started/Add-authentication).

import express from 'express'
import fetch from 'node-fetch'
import database from '../db.js'
import {authenticateAndAuthorizeUser} from '../authenticateUser.js'
import bearerToken from 'express-bearer-token'
import {parseJSON} from '../helpers/index.js'
import {decrypt} from '../encryption.js'

const sessionTokensRouter = express.Router().use(bearerToken())

// Embeds Session Token Authentication
// ---------------

// When your Checkr Embeds components initializes, they will call this private
// endpoint to create session token for themselves. <mark>Each request to this
// endpoint must be authenticated and authorized before a session token can be
// created.</mark>
sessionTokensRouter.post('/api/embeds-session-tokens', async (req, res) => {
  let userAccountID
  try {
    userAccountID = authenticateAndAuthorizeUser(req.token)
  } catch (error) {
    res.status(401).send({
      errors: [error],
    })
    return
  }

  const db = await database()
  // Next, we use the user information in the valid JWT to find their Checkr
  // access token.
  const account = db.data.accounts.find(a => a.id === userAccountID)
  const accessToken = await decrypt(account.checkrAccount.accessToken)

  // #### Request an embeds session token
  //
  // To request a session token from Checkr we assemble the required variables here:
  // - ```CHECKR_API_URL``` which is ```https://api.checkr-staging.com``` in the testing environment and ```https://api.checkr.com``` in production
  // - ```basicAuthUsername``` This request is an ```HTTP POST``` that uses
  //   basic authentication. The basic auth username is the user's access
  //   token and the password is blank.
  //
  //   For more information about this request, please refer to the [Embeds Add
  //   Authentication
  //   docs](https://docs.checkr.com/embeds/#new-invitation-auth-2-request).
  const basicAuthUsername = Buffer.from(`${accessToken}`).toString('base64')
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
        // provide another key in this request body object: ```"direct":
        // true```. For more information on direct customer requests, refer to
        // the Direct Customer Request code section in [Embeds Add Authentication
        // docs](https://docs.checkr.com/embeds/#section/Getting-Started/Add-authentication).
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
