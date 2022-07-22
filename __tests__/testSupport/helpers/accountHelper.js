import database from '../../../db.js'
import {v4 as uuidv4} from 'uuid'
import {faker} from '@faker-js/faker'
import {encrypt} from '../../../encryption.js'

const createAccountWithCheckrAccountId = async id => {
  const db = await database()
  const now = new Date()
  db.data.accounts.push({
    id: uuidv4(),
    name: faker.lorem.slug(),
    createdAt: now,
    updatedAt: now,
    checkrAccount: {
      id: id,
      accessToken: await encrypt(faker.lorem.slug()),
    },
  })
  await db.write()
}

const createAccountWithName = async name => {
  const db = await database()
  const now = new Date()
  const newAccount = {
    id: uuidv4(),
    name: name,
    createdAt: now,
    updatedAt: now,
  }
  db.data.accounts.push(newAccount)
  await db.write()
  return newAccount
}

const findAccountWithId = async id => {
  const db = await database()
  return db.data.accounts.find(a => a.id === id)
}

const findAccountWithCheckrId = async id => {
  const db = await database()
  return db.data.accounts.find(
    a => a.checkrAccount && a.checkrAccount.id === id,
  )
}

const createAccountWithCheckrAccessToken = async encryptedToken => {
  const db = await database()
  const now = new Date()
  const newAccount = {
    id: uuidv4(),
    name: faker.lorem.slug(),
    createdAt: now,
    updatedAt: now,
    checkrAccount: {
      id: faker.lorem.slug(),
      accessToken: encryptedToken,
    },
  }
  db.data.accounts.push(newAccount)
  await db.write()
  return newAccount
}

export {
  createAccountWithCheckrAccountId,
  createAccountWithCheckrAccessToken,
  createAccountWithName,
  findAccountWithCheckrId,
  findAccountWithId,
}
