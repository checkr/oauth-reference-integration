import sodium from 'libsodium-wrappers'
import jwt from 'jsonwebtoken'

const key = process.env.ENCRYPTION_SECRET_KEY

const encrypt = async plaintext => {
  await sodium.ready
  const nonce = Buffer.from(sodium.randombytes_buf(24))
  const ciphertext = Buffer.from(
    sodium.crypto_secretbox_easy(plaintext, nonce, Buffer.from(key, 'hex')),
  )
  return {ciphertext: ciphertext.toString('hex'), nonce: nonce.toString('hex')}
}

const decrypt = async ({ciphertext, nonce}) => {
  await sodium.ready
  let decrypted = Buffer.from(
    sodium.crypto_secretbox_open_easy(
      Buffer.from(ciphertext, 'hex'),
      Buffer.from(nonce, 'hex'),
      Buffer.from(key, 'hex'),
    ),
  )
  return sodium.to_string(decrypted)
}

const encryptionKeygen = async () => {
  await sodium.ready
  const key = Buffer.from(sodium.crypto_secretbox_keygen())
  return key.toString('hex')
}

const hmacKeygen = async () => {
  await sodium.ready
  const hmacKey = Buffer.from(sodium.crypto_auth_keygen())
  return hmacKey.toString('hex')
}

export {encrypt, decrypt, encryptionKeygen, hmacKeygen}
