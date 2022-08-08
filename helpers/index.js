import {decrypt} from '../encryption.js'
import {Low, JSONFile} from 'lowdb'
import seedData from '../seedData.js'

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

const syncDB = async () => {
  const db = new Low(new JSONFile('localdb.json'))
  await db.read()
  db.data = seedData
  await db.write()
}

export {parseJSON, findAccountWithMatchingToken, syncDB}
