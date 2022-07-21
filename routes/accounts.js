import express from 'express'
import database from '../db.js'
import {v4 as uuidv4} from 'uuid'
import jwt from 'jsonwebtoken'

const accountsRouter = express.Router()

accountsRouter.get('/api/accounts', async (_, res) => {
  const db = await database()
  const accounts = db.data.accounts

  accounts[0]['reference-integration-session-token'] = jwt.sign(
    'some-token',
    'supersecret',
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
  account.showPrompts = req.body.showPrompts

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