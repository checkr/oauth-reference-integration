import jwt from 'jsonwebtoken'

const authenticateAndAuthorizeUser = function (requestToken) {
  let validToken
  // In this case, since we use JWTs to secure requests to
  // ```api/embeds-session-token```, we first verify if the token signature is
  // valid and the JWT is not expired.
  try {
    validToken = jwt.verify(requestToken, process.env.JWT_HMAC_SECRET)
  } catch {
    throw new Error('authentication failed')
  }
  // Then we check that the token has the permissions required by this
  // endpoint. Your implementation may require more or different checks.
  if (
    !validToken.authorizations.permissions.includes('checkr_background_checks')
  ) {
    throw new Error('authorization failed')
  }
  return validToken.sub
}

export {authenticateAndAuthorizeUser}
