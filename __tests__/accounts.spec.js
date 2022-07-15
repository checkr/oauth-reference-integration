import express from 'express'
import request from 'supertest'
import accountsRouter from '../routes/accounts.js'
import {faker} from '@faker-js/faker'
import {createAccountWithName} from './testSupport/helpers/accountHelper.js'
import {clearDB} from './testSupport/helpers/dbHelper.js'

describe('/api/accounts', () => {
  const accountsApi = request(express().use(express.json()).use(accountsRouter))

  beforeEach(async () => await clearDB())

  it('should GET accounts', async () => {
    const existingID = 'ce04e0a2-ecec-11ec-b7ed-f33adcba9538'
    const existingAccountName = 'Default Account'
    const readAccountResponse = await accountsApi.get(
      `/api/accounts/${existingID}`,
    )

    expect(readAccountResponse.status).toEqual(200)
    expect(readAccountResponse.body).toEqual(
      expect.objectContaining({
        name: existingAccountName,
        id: existingID,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    )

    const readAllAccountsResponse = await accountsApi.get('/api/accounts')
    expect(readAllAccountsResponse.status).toEqual(200)
    const actualAccount = readAllAccountsResponse.body.find(
      a => a.name === existingAccountName,
    )
    expect(actualAccount).toEqual(
      expect.objectContaining({
        name: existingAccountName,
        id: existingID,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    )
  })

  it('should POST and DELETE an account', async () => {
    const expectedName = faker.lorem.slug()
    const createAccountResponse = await accountsApi
      .post('/api/accounts/')
      .send({name: expectedName})
    expect(createAccountResponse.body).toEqual(
      expect.objectContaining({
        name: expectedName,
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    )

    let deleteAccountResponse = await accountsApi.delete(
      `/api/accounts/${createAccountResponse.body.id}`,
    )

    expect(deleteAccountResponse.status).toEqual(204)

    deleteAccountResponse = await accountsApi.delete(
      `/api/accounts/${createAccountResponse.body.id}`,
    )

    expect(deleteAccountResponse.status).toEqual(404)
  })

  it('should PUT an account', async () => {
    const account = await createAccountWithName(faker.lorem.slug())

    const newName = faker.lorem.slug()
    const updateAccountResponse = await accountsApi
      .put(`/api/accounts/${account.id}`)
      .send({name: newName})
    expect(updateAccountResponse.body).toEqual(
      expect.objectContaining({
        name: newName,
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    )
  })
})
