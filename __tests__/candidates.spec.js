import express from 'express'
import request from 'supertest'
import candidatesRouter from '../routes/candidates.js'
import {faker} from '@faker-js/faker'

describe('/api/candidates', () => {
  const candidatesApi = request(
    express().use(express.json()).use(candidatesRouter),
  )

  it('should GET candidates', async () => {
    const response = await candidatesApi.get(`/api/candidates`)

    expect(response.status).toEqual(200)
    expect(response.body.length).toEqual(2)
  })

  it('should POST a candidate', async () => {
    const expectedName = faker.lorem.slug()
    const expectedEmail = faker.internet.email()
    const expectedNotes = faker.lorem.slug()
    const expectedPhone = faker.phone.number()
    const expectedStep = faker.lorem.slug()
    const response = await candidatesApi.post('/api/candidates').send({
      email: expectedEmail,
      name: expectedName,
      notes: expectedNotes,
      phone: expectedPhone,
      step: expectedStep,
    })

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: expectedEmail,
        name: expectedName,
        notes: expectedNotes,
        phone: expectedPhone,
        step: expectedStep,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    )

    const getAccountResponse = await candidatesApi.get(
      `/api/candidates/${response.body.id}`,
    )

    expect(getAccountResponse.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: expectedEmail,
        name: expectedName,
        notes: expectedNotes,
        phone: expectedPhone,
        step: expectedStep,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    )
  })

  it('should PUT a candidate', async () => {
    const expectedName = faker.lorem.slug()
    const expectedEmail = faker.internet.email()
    const expectedNotes = faker.lorem.slug()
    const expectedPhone = faker.phone.number()
    const expectedStep = faker.lorem.slug()
    const response = await candidatesApi
      .put(`/api/candidates/efb0d238-a455-41c6-b923-e0cc4f5761e7`)
      .send({
        email: expectedEmail,
        name: expectedName,
        notes: expectedNotes,
        phone: expectedPhone,
        step: expectedStep,
      })

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: expectedEmail,
        name: expectedName,
        notes: expectedNotes,
        phone: expectedPhone,
        step: expectedStep,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    )
  })
})
