import 'dotenv/config'
import chalk from 'chalk'
import morgan from 'morgan'
import ngrok from 'ngrok'
import express from 'express'
import fetch from 'node-fetch'
import {syncDB} from './helpers/index.js'
import candidatesRouter from './routes/candidates.js'
import accountsRouter from './routes/accounts.js'
import embedsSessionTokensRouter from './routes/embeds-session-tokens.js'
import oauthRouter from './routes/oauth.js'

const port = process.env.PORT || 8000

const app = express()
  .use(morgan('tiny'))
  .use(express.json())
  .use((req, res, next) => {
      res.append('Access-Control-Allow-Origin', ['*']);
      res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.append('Access-Control-Allow-Headers', 'Content-Type');
      next();
  })
  .use(candidatesRouter)
  .use(accountsRouter)
  .use(oauthRouter)
  .use(embedsSessionTokensRouter)
if (process.env.NODE_ENV === 'production') {
  const reactBuild = './client/build'
  app.use(express.static(reactBuild))
  app.get('*', (_, res) => {
    res.sendFile('index.html', {root: reactBuild})
  })
} else {
  app.get('*', function(req,res) {
    var newurl = 'http://localhost:4200';
    fetch(newurl+req.path).then(actual => {
      actual.headers.forEach((v, n) => res.setHeader(n, v));
      actual.body.pipe(res);
    });
  })
  ;(async () => {
    const url = await ngrok.connect({
      port: port,
      subdomain: "cleancore"
    })
    console.log(
      chalk.black.bgGreen(' OAuth webhook URL '),
      chalk.blue(`${url}/api/checkr/webhooks`),
    )
    console.log(
      chalk.black.bgGreen(' OAuth redirect URL '),
      chalk.blue(`${url}/api/checkr/oauth`),
    )
  })()
  
}

await syncDB()
app.listen(port)
console.log(
  chalk.black.bgWhite(' Private API URL '),
  `http://localhost:${port}`,
)
