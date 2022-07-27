import express from 'express'
import database from '../db.js'
import {v4 as uuidv4} from 'uuid'
import jwt from 'jsonwebtoken'

const accountsRouter = express.Router()

accountsRouter.get('/api/accounts', async (_, res) => {
  const db = await database()
  const accounts = db.data.accounts

  // Warning: We simplify the creation of this token here because this
  // implementaiton does not have a login system. In your system, this token
  // should be created when the user logs in.
  accounts[0]['userJWT'] = jwt.sign(
    // JWT token contents
    // {
    //     "sub": "ce04e0a2-ecec-11ec-b7ed-f33adcba9538",
    //     "name": "Our Favorite Customer",
    //     "authorizations": {
    //         "roles": [
    //           "user"
    //         ],
    //         "permissions": [
    //            "checkr_background_checks"
    //         ]
    //     },
    //     "exp": 1958900863,
    //     "iat": 1516239022
    // }
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZTA0ZTBhMi1lY2VjLTExZWMtYjdlZC1mMzNhZGNiYTk1MzgiLCJuYW1lIjoiT3VyIEZhdm9yaXRlIEN1c3RvbWVyIiwiYXV0aG9yaXphdGlvbnMiOnsicm9sZXMiOlsidXNlciJdLCJwZXJtaXNzaW9ucyI6WyJjaGVja3JfYmFja2dyb3VuZF9jaGVja3MiXX0sImV4cCI6MTk1ODkwMDg2MywiaWF0IjoxNTE2MjM5MDIyfQ.DmKViZV3ux5C_yosGp9hhU9ueguq61iH43wt5GyHAAg',
    process.env.JWT_HMAC_SECRET,
  )

  res.status(200).json(accounts)
})

accountsRouter.get('/api/accounts/:id', async (req, res) => {
  const db = await database()
  const account = db.data.accounts.find(c => c.id === req.params.id)

  if (!account) {
    res.status(404).send({errors: [`${req.params.id} not found`]})
    return
  }

  res.status(200).json(account)
})

accountsRouter.post('/api/accounts', async (req, res) => {
  const db = await database()
  const now = new Date()
  const account = {
    id: uuidv4(),
    name: req.body.name,
    createdAt: now,
    updatedAt: now,
  }

  db.data.accounts.push(account)
  await db.write()
  res.status(200).json(account)
})

accountsRouter.put('/api/accounts/:id', async (req, res) => {
  const db = await database()
  const index = db.data.accounts.findIndex(c => c.id === req.params.id)

  if (index === -1) {
    res.status(404).send({errors: [`${req.params.id} not found`]})
    return
  }

  const account = db.data.accounts[index]
  account.name = req.body.name
  account.deauthorized = req.body.deauthorized

  await db.write()
  res.status(200).json(account)
})

accountsRouter.delete('/api/accounts/:id', async (req, res) => {
  const db = await database()
  const index = db.data.accounts.findIndex(c => c.id === req.params.id)

  if (index === -1) {
    res.status(404).send({errors: [`${req.params.id} not found`]})
    return
  }

  db.data.accounts.splice(index, 1)
  await db.write()
  res.status(204).json()
})

export default accountsRouter
