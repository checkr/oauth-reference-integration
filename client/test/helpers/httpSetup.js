import {rest} from 'msw'
import {setupServer} from 'msw/node'

class httpSetup {
  constructor() {
    this.server = setupServer()
  }

  httpMockGet(path, response) {
    this.server.use(
      rest.get(this.returnEndpoint(path), async (req, res, ctx) => {
        return res(ctx.json(response))
      }),
    )
  }

  httpMockPost(path, response) {
    this.server.use(
      rest.post(this.returnEndpoint(path), async (req, res, ctx) => {
        return res(ctx.json(response))
      }),
    )
  }

  httpMockPut(path, response) {
    this.server.use(
      rest.put(this.returnEndpoint(path), async (req, res, ctx) => {
        return res(ctx.json(response))
      }),
    )
  }

  returnEndpoint = path => {
    switch (path) {
      case 'candidates':
        return '/api/candidates'
      default:
        break
    }
  }

  listen() {
    this.server.listen()
  }
  close() {
    this.server.close()
  }
}

export {httpSetup}
