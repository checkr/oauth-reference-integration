import request from 'supertest'
import express from 'express'
import {Buffer} from 'buffer'
import sessionTokensRouter from '../routes/session-tokens'
import {rest} from 'msw'
import {httpSetup} from '../client/test/helpers/httpSetup'

describe('Session token route', function () {
  const app = express()
  app.use(sessionTokensRouter)
  const api = request(app)

  const serverMock = new httpSetup()
  const credentials = Buffer.from('some-user:supersecret').toString('base64')

  serverMock.server.use(
    rest.post(
      `https://api.checkr-staging.com/v1/web_sdk/session_tokens`,
      async (req, res, ctx) => {
        return res(
          ctx.json({
            token: 'some-token',
          }),
        )
      },
    ),
  )

  beforeAll(() => serverMock.server.listen({onUnhandledRequest: 'bypass'})) // Ignore unmocked requests made by supertest
  afterAll(() => serverMock.server.close())

  it('responds with a 200 when given appropriate credentials', async () => {
    const {statusCode, text} = await api
      .post('/api/session-tokens')
      .set({Authorization: `Basic ${credentials}`})

    expect(statusCode).toBe(200)
    expect(text).toEqual('{"token":"some-token"}')
  })

  it('responds with a 401 when given inappropriate credentials', async () => {
    const {statusCode, text} = await api
      .post('/api/session-tokens')
      .set({Authorization: `Basic wrong-credendials`})

    expect(statusCode).toBe(401)
  })
})
