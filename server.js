import 'dotenv/config'
import morgan from 'morgan'
import express from 'express'
import ngrok from 'ngrok'
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

console.log(`Private API URL: http://localhost:${port}`)
;(async () => {
  const url = await ngrok.connect()
  console.log(
    '\x1b[34m%s\x1b[0m',
    `OAuth webhook URL: ${url}/api/checkr/webhooks`,
  )
  console.log(
    '\x1b[34m%s\x1b[0m',
    `OAuth redirect URL: ${url}/api/checkr/tbd`,
  )
})()
