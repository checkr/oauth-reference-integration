import {decrypt} from '../encryption.js'
const {createHmac, timingSafeEqual} = await import('node:crypto')

const checkrClientSecret = process.env.CHECKR_OAUTH_CLIENT_SECRET

const parseJSON = async response => {
  const text = await response.text()

  try {
    const json = JSON.parse(text)
    return json
  } catch (err) {
    throw err
  }
}

const findAccountWithMatchingToken = async (
  accounts,
  expectedPlaintextToken,
) => {
  for (const account of accounts) {
    if (account.checkrAccount) {
      const existingPlaintextToken = await decrypt(
        account.checkrAccount.accessToken,
      )
      if (existingPlaintextToken === expectedPlaintextToken) {
        return account
      }
    }
  }
  return null
}

export {parseJSON, validCheckrSignature, findAccountWithMatchingToken}
