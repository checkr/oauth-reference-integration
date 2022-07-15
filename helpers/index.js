const {
  randomBytes,
  createCipheriv,
  createDecipheriv,
  createHmac,
  timingSafeEqual,
} = await import('node:crypto')

const key = randomBytes(32)
const iv = randomBytes(16)
const checkrClientSecret = process.env.CHECKR_OAUTH_CLIENT_SECRET

function encrypt(text) {
  let cipher = createCipheriv('aes-256-cbc', Buffer.from(key), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return {
    key: key.toString('hex'),
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex'),
  }
}

function decrypt(text) {
  let key = Buffer.from(text.key, 'hex')
  let iv = Buffer.from(text.iv, 'hex')
  let encryptedText = Buffer.from(text.encryptedData, 'hex')
  let decipher = createDecipheriv('aes-256-cbc', key, iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

const validCheckrSignature = (signature, payload) => {
  const expectedMac = createHmac('sha256', checkrClientSecret)
    .update(JSON.stringify(payload))
    .digest('hex')
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expectedMac))
}

const parseJSON = async response => {
  const text = await response.text()

  try {
    const json = JSON.parse(text)
    return json
  } catch (err) {
    throw err
  }
}

export {encrypt, decrypt, parseJSON, validCheckrSignature}
