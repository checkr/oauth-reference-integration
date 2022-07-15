import database from '../../../db.js'
import testSeedData from '../testSeedData.js'
const {randomBytes, createCipheriv, createDecipheriv} = await import(
  'node:crypto'
)

const clearDB = async () => {
  const db = await database()
  db.data = testSeedData
  await db.write()
}

const key = randomBytes(32)
const iv = randomBytes(16)

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

export {clearDB, encrypt, decrypt}
