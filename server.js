import 'dotenv/config'
import express from 'express'
import candidatesRouter from './routes/candidates.js'
import accountsRouter from './routes/accounts.js'
import sessionTokensRouter from './routes/session-tokens.js'

const port = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use(candidatesRouter)
app.use(accountsRouter)
app.use(sessionTokensRouter)

if (process.env.NODE_ENV === 'production') {
  const reactBuild = './client/build'
  app.use(express.static(reactBuild))
  app.get('*', (_, res) => {
    res.sendFile('index.html', {root: reactBuild})
  })
}

app.listen(port, () => {
  console.log(
    `embeds-reference-implementation backend listening on port ${port}`,
  )
})
