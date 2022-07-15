import {rest} from 'msw'
import {setupServer} from 'msw/node'

class mockBackend {
  constructor() {
    this.server = setupServer()
  }

  stubHttpGet(path, response) {
    this.server.use(
      rest.get(path, async (_, res, ctx) => {
        return res(ctx.json(response))
      }),
    )
  }

  stubHttpPost(path, response) {
    this.server.use(
      rest.post(path, async (_, res, ctx) => {
        return res(ctx.json(response))
      }),
    )
  }

  listen() {
    this.server.listen()
  }
  close() {
    this.server.close()
  }
}

export default mockBackend
