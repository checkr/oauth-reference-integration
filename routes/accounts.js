import express from 'express'
import database from '../db.js'
import {v4 as uuidv4} from 'uuid'

const db = await database()
const accountsRouter = express.Router()

accountsRouter.get('/api/accounts', async (_, res) => {
  const accounts = db.data.accounts
  res.status(200).json(accounts)
})

accountsRouter.get('/api/accounts/:id', async (req, res) => {
  const account = db.data.accounts.find(c => c.id == req.params.id)
  if (!account) {
    res.status(404).send({errors: [`${req.params.id} not found`]})
    return
  }
  res.status(200).json(account)
})

accountsRouter.post('/api/accounts', async (req, res) => {
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
  const index = db.data.accounts.findIndex(c => c.id == req.params.id)
  if (index == -1) {
    res.status(404).send({errors: [`${req.params.id} not found`]})
    return
  }
  const account = db.data.accounts[index]
  account.name = req.body.name
  await db.write()
  res.status(200).json(account)
})

const deleteElementAtIndex = (array, index) => {
  const numberOfItemsToDelete = 1
  array.splice(index, numberOfItemsToDelete)
}

accountsRouter.delete('/api/accounts/:id', async (req, res) => {
  const index = db.data.accounts.findIndex(c => c.id == req.params.id)
  if (index == -1) {
    res.status(404).send({errors: [`${req.params.id} not found`]})
    return
  }
  deleteElementAtIndex(db.data.accounts, index)
  await db.write()
  res.status(204).json()
})

export default accountsRouter
