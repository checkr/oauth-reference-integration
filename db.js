import {Low, JSONFile} from 'lowdb'
import S3Adapter from '@sadorlovsky/lowdb-s3'
import seedData from './seedData.js'

const devDB = async () => {
  const db = new Low(new JSONFile('localdb.json'))
  await db.read()
  db.data ||= seedData
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
  return db
}

const database = async () => {
  return process.env.NODE_ENV == 'production' ? await prodDB() : await devDB()
}

export default database
