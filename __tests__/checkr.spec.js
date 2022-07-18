import express from 'express'
import request from 'supertest'
import checkrRouter from '../routes/checkr.js'
import {faker} from '@faker-js/faker'
import {
  createAccountWithCheckrAccountId,
  createAccountWithCheckrAccessToken,
  findAccountWithCheckrId,
  findAccountWithId,
} from './testSupport/helpers/accountHelper.js'
import {getValidSignature} from './testSupport/helpers/webhooksHelper.js'
import {encrypt, decrypt, clearDB} from './testSupport/helpers/dbHelper.js'
import testSeedData from './testSupport/testSeedData.js'
import mockBackend from '../client/src/__tests__/testSupport/helpers/mockBackend.js'

describe('/api/checkr', () => {
  const existingAccountId = testSeedData.accounts[0].id
  const checkrApi = request(express().use(express.json()).use(checkrRouter))
  const checkrApiMock = new mockBackend()

  beforeEach(async () => await clearDB())
  beforeAll(() => checkrApiMock.server.listen({onUnhandledRequest: 'bypass'}))
  afterAll(() => checkrApiMock.server.close())

  it('should link a new Checkr account', async () => {
    const expectedCheckrAccountId = faker.lorem.slug()
    const expectedAccessToken = faker.lorem.slug()

    checkrApiMock.stubHttpPost(`${process.env.CHECKR_OAUTH_URL}/tokens`, {
      access_token: expectedAccessToken,
      checkr_account_id: expectedCheckrAccountId,
    })

    const response = await checkrApi
      .post('/api/checkr/oauth')
      .send({code: 'foobar', accountId: existingAccountId})

    expect(response.status).toEqual(200)

    const updatedAccount = await findAccountWithId(existingAccountId)
    expect(updatedAccount.checkrAccount.id).toEqual(expectedCheckrAccountId)
    expect(decrypt(updatedAccount.checkrAccount.accessToken)).toEqual(
      expectedAccessToken,
    )
  })

  it('should credentialize a Checkr account', async () => {
    const existingCheckrId = faker.lorem.slug()
    await createAccountWithCheckrAccountId(existingCheckrId)
    const requestBody = {
      type: 'account.credentialed',
      account_id: existingCheckrId,
    }

    const response = await checkrApi
      .post('/api/checkr/webhooks')
      .set({'x-checkr-signature': getValidSignature(requestBody)})
      .send(requestBody)

    expect(response.status).toEqual(200)
    const account = await findAccountWithCheckrId(existingCheckrId)
    expect(account.checkrAccount.credentialed).toEqual(true)
  })

  // TODO: for DX-377
  // This test is failing because it does not stub the token value with a key, iv, and encryptedData
  //
  //it('should deauthorize a Checkr account', async () => {
  //  const existingAccessToken = encrypt(faker.lorem.slug())
  //  const account = await createAccountWithCheckrAccessToken(
  //    existingAccessToken,
  //  )

  //  checkrApiMock.stubHttpPost(`${process.env.CHECKR_OAUTH_URL}/deauthorize`, {
  //    token: existingAccessToken,
  //  })

  //  const disconnectBody = {
  //    token: existingAccessToken,
  //  }

  //  const disconnect = await checkrApi
  //    .post('/api/checkr/disconnect')
  //    .send(disconnectBody)

  //  expect(disconnect.status).toEqual(204)
  //  const updatedAccount = await findAccountWithId(account.id)
  //  expect(updatedAccount.checkrAccount).toBe(undefined)
  //})
})
