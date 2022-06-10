import express from 'express'
import {PrismaClient} from '@prisma/client'

const db = new PrismaClient()
const candidatesRouter = express.Router()

candidatesRouter.get('/api/candidates', async (_, res) => {
  const candidates = await db.candidates.findMany()
  res.status(200).json(candidates)
})

candidatesRouter.get('/api/candidates/:id', async (req, res) => {
  const candidate = await db.candidates.findUnique({
    where: {
      id: req.params.id,
    },
  })
  res.status(200).json(candidate)
})
candidatesRouter.post('/api/candidates', async (req, res) => {
  const candidate = await db.candidates.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      notes: req.body.notes,
      phone: req.body.phone,
      step: req.body.step,
    },
  })
  res.status(200).json(candidate)
})
candidatesRouter.put('/api/candidates/:id', async (req, res) => {
  const candidate = await db.candidates.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      notes: req.body.notes,
      phone: req.body.phone,
      step: req.body.step,
    },
  })
  res.status(200).json(candidate)
})

export default candidatesRouter
