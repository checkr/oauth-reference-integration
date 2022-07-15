import 'dotenv/config'
import morgan from 'morgan'
import express from 'express'
import localtunnel from 'localtunnel'
import candidatesRouter from './routes/candidates.js'
import accountsRouter from './routes/accounts.js'
import sessionTokensRouter from './routes/session-tokens.js'
import checkrRouter from './routes/checkr.js'

const port = process.env.PORT || 8000

const app = express()
app
  .use(morgan('tiny'))
  .use(express.json())
  .use(candidatesRouter)
  .use(accountsRouter)
  .use(checkrRouter)
  .use(sessionTokensRouter)

if (process.env.NODE_ENV === 'production') {
  const reactBuild = './client/build'
  app.use(express.static(reactBuild))
  app.get('*', (_, res) => {
    res.sendFile('index.html', {root: reactBuild})
  })
}

app.listen(port)
;(async () => {
  const tunnel = await localtunnel({port: port})
  console.log(`Tunnel: ${tunnel.url}`)
})()
