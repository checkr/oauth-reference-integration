import express from 'express'
import database from '../db.js'
import {v4 as uuidv4} from 'uuid'

const candidatesRouter = express.Router()

candidatesRouter.get('/api/candidates', async (_, res) => {
  const db = await database()
  const candidates = db.data.candidates

  res.status(200).json(candidates)
})

candidatesRouter.get('/api/candidates/:id', async (req, res) => {
  const db = await database()
  const candidate = db.data.candidates.find(c => c.id === req.params.id)

  if (!candidate) {
    res.status(404).send({errors: [`${req.params.id} not found`]})
    return
  }

  res.status(200).json(candidate)
})

candidatesRouter.post('/api/candidates', async (req, res) => {
  const now = new Date()
  const candidate = {
    id: uuidv4(),
    email: req.body.email,
    name: req.body.name,
    notes: req.body.notes,
    phone: req.body.phone,
    step: req.body.step,
    createdAt: now,
    updatedAt: now,
  }

  const db = await database()
  db.data.candidates.push(candidate)
  await db.write()
  res.status(200).json(candidate)
})

candidatesRouter.put('/api/candidates/:id', async (req, res) => {
  const db = await database()
  const index = db.data.candidates.findIndex(c => c.id === req.params.id)

  if (index === -1) {
    res.status(404).send({errors: [`${req.params.id} not found`]})
    return
  }

  const candidate = db.data.candidates[index]
  candidate.email = req.body.email
  candidate.name = req.body.name
  candidate.notes = req.body.notes
  candidate.phone = req.body.phone
  candidate.step = req.body.step

  await db.write()
  res.status(200).json(candidate)
})

export default candidatesRouter
