import 'dotenv/config'
import chalk from 'chalk'
import morgan from 'morgan'
import ngrok from 'ngrok'
import express from 'express'
import candidatesRouter from './routes/candidates.js'
import accountsRouter from './routes/accounts.js'
import sessionTokensRouter from './routes/session-tokens.js'
import oauthRouter from './routes/oauth.js'

const port = process.env.PORT || 8000
const authtoken = process.env.NGROK_AUTH_TOKEN

const app = express()
app
  .use(morgan('tiny'))
  .use(express.json())
  .use(candidatesRouter)
  .use(accountsRouter)
  .use(oauthRouter)
  .use(sessionTokensRouter)

if (process.env.NODE_ENV === 'production') {
  const reactBuild = './client/build'
  app.use(express.static(reactBuild))
  app.get('*', (_, res) => {
    res.sendFile('index.html', {root: reactBuild})
  })
}

app.listen(port)
console.log(`Private API URL: http://localhost:${port}`)
;(async () => {
  const url = await ngrok.connect({authtoken, addr: port})
  console.log(
    chalk.bgGreen('OAuth webhook URL:'),
    chalk.blue(`${url}/api/checkr/webhooks`),
  )
  console.log(
    chalk.bgGreen('OAuth redirect URL:'),
    chalk.blue(`${url}/api/checkr/oauth`),
  )
})()
