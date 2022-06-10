import 'dotenv/config'
import express from 'express'
import candidatesRouter from './routes/candidates.js'
import cors from 'cors'

const port = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use(candidatesRouter)

if (process.env.NODE_ENV === 'production') {
  //app.use(cors)
  // TODO: cors

  const reactBuild = './client/dist'
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
