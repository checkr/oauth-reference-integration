const {createHmac} = await import('node:crypto')

const getValidSignature = requestBody => {
  const algorithm = 'sha256'
  return createHmac(algorithm, process.env.CHECKR_OAUTH_CLIENT_SECRET)
    .update(JSON.stringify(requestBody))
    .digest('hex')
}

export {getValidSignature}
