import {Low, JSONFile, Memory} from 'lowdb'
import testSeedData from './__tests__/testSupport/testSeedData.js'
import seedData from './seedData.js'
import S3Adapter from '@sadorlovsky/lowdb-s3'

const testDB = async () => {
  const db = new Low(new Memory())
  await db.read()
  db.data = testSeedData
  await db.write()
  return db
}

const devDB = async () => {
  const db = new Low(new JSONFile('localdb.json'))
  await db.read()
  // Migrate devDB data by updating seedData.js
  db.data = seedData
  await db.write()
  return db
}

const prodDB = async () => {
  const db = new Low(
    new S3Adapter(
      {bucket: process.env.S3_BUCKET, key: 'db.json'},
      {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_ACCESS_KEY_SECRET,
        region: 'us-east-1',
      },
    ),
  )
  await db.read()
  // Migrate data by updating seedData.js Each prod deploy will overwrite the
  // existing data in S3 with seedData.js
  db.data = seedData
  await db.write()
  return db
}

const database = async () => {
  if (process.env.NODE_ENV === 'production') return await prodDB()
  if (process.env.NODE_ENV === 'test') return await testDB()
  return await devDB()
}

export default database
