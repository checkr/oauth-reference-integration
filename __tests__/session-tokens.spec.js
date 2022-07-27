import express from 'express'
import request from 'supertest'
import embedsSessionTokensRouter from '../routes/embeds-session-tokens'
import {jest} from '@jest/globals'
import jwt from 'jsonwebtoken'
import mockBackend from '../client/src/__tests__/testSupport/helpers/mockBackend.js'

describe('Session token route', function () {
  const api = request(express().use(embedsSessionTokensRouter))
  const backend = new mockBackend()
  const verify = jest.spyOn(jwt, 'verify')

  backend.stubHttpPost(
    `https://api.checkr-staging.com/v1/web_sdk/session_tokens`,
    {token: 'some-token'},
  )

  // Ignore unmocked requests made by supertest
  beforeAll(() => backend.server.listen({onUnhandledRequest: 'bypass'}))
  afterAll(() => backend.server.close())

  it('responds with a 200 when given appropriate credentials', async () => {
    verify.mockImplementation(() => true)
    const {statusCode, text} = await api.post('/api/embeds-session-tokens')

    expect(statusCode).toBe(200)
    expect(text).toEqual('{"token":"some-token"}')
  })

  it('responds with a 401 when given inappropriate credentials', async () => {
    verify.mockImplementation(() => false)
    const {statusCode} = await api.post('/api/embeds-session-tokens')

    expect(statusCode).toBe(401)
  })
})
