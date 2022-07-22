import express from 'express'
import request from 'supertest'
import oauthRouter from '../routes/oauth.js'
import {faker} from '@faker-js/faker'
import {
  createAccountWithCheckrAccountId,
  createAccountWithCheckrAccessToken,
  findAccountWithCheckrId,
  findAccountWithId,
} from './testSupport/helpers/accountHelper.js'
import {getValidSignature} from './testSupport/helpers/webhooksHelper.js'
import {clearDB} from './testSupport/helpers/dbHelper.js'
import {encrypt, decrypt} from '../encryption.js'
import testSeedData from './testSupport/testSeedData.js'
import mockBackend from '../client/src/__tests__/testSupport/helpers/mockBackend.js'

describe('/api/checkr', () => {
  const existingAccountId = testSeedData.accounts[0].id
  const oauthAPI = request(express().use(express.json()).use(oauthRouter))
  const oauthAPIMock = new mockBackend()

  beforeEach(async () => await clearDB())
  beforeAll(() => oauthAPIMock.server.listen({onUnhandledRequest: 'bypass'}))
  afterAll(() => oauthAPIMock.server.close())

  it('should link a new Checkr account', async () => {
    const expectedCheckrAccountId = faker.lorem.slug()
    const expectedAccessToken = faker.lorem.slug()
    const expectedCode = faker.lorem.slug()

    oauthAPIMock.stubHttpPost(`${process.env.CHECKR_API_URL}/oauth/tokens`, {
      access_token: expectedAccessToken,
      checkr_account_id: expectedCheckrAccountId,
    })

    const response = await oauthAPI.get(
      `/api/checkr/oauth?code=${expectedCode}&state=${existingAccountId}`,
    )

    expect(response.status).toEqual(302) // expect redirect

    const updatedAccount = await findAccountWithId(existingAccountId)
    expect(updatedAccount.checkrAccount.id).toEqual(expectedCheckrAccountId)
    expect(await decrypt(updatedAccount.checkrAccount.accessToken)).toEqual(
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

    const response = await oauthAPI
      .post('/api/checkr/webhooks')
      .set({'x-checkr-signature': getValidSignature(requestBody)})
      .send(requestBody)

    expect(response.status).toEqual(200)
    const account = await findAccountWithCheckrId(existingCheckrId)
    expect(account.checkrAccount.credentialed).toEqual(true)
  })

  it('should deauthorize a Checkr account', async () => {
    const plaintextToken = faker.lorem.slug()
    const encryptedToken = await encrypt(plaintextToken)
    const account = await createAccountWithCheckrAccessToken(encryptedToken)

    oauthAPIMock.stubHttpPost(`${process.env.CHECKR_API_URL}/oauth/deauthorize`)

    const disconnectBody = {
      encryptedToken: encryptedToken,
    }

    const disconnect = await oauthAPI
      .post('/api/checkr/disconnect')
      .send(disconnectBody)

    expect(disconnect.status).toEqual(204)
    const updatedAccount = await findAccountWithId(account.id)
    expect(updatedAccount.deauthorized).toBe(true)
  })
})
