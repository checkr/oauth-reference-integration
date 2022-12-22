import {Low, JSONFile, Memory} from 'lowdb'
import testSeedData from './__tests__/testSupport/testSeedData.js'
import seedData from './seedData.js'

const testDB = async () => {
  const db = new Low(new Memory())
  await db.read()
  db.data = testSeedData
  await db.write()
  return db
}

const fileDB = async () => {
  const db = new Low(new JSONFile('localdb.json'))
  await db.read()
  if (!db.data) {
    db.data = seedData
    await db.write()
  }
  return db
}

const database = async () => {
  if (process.env.NODE_ENV === 'test') return await testDB()
  return await fileDB()
}

export default database
