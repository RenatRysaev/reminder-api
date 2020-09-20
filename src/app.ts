import 'reflect-metadata'
import * as express from 'express'
import { createConnection } from 'typeorm'
import config from './ormconfig'

const app = express()
const port = process.env.SERVER_PORT || 3000

app.get('/test', (req, res) => {
  res.send({ ok: true, hello: 'cd is working' })
})

app.listen(port, async () => {
  console.log('process.env.POSTGRES_USER', process.env.POSTGRES_USER)
  console.log('process.env.POSTGRES_DB', process.env.POSTGRES_DB)
  try {
    await createConnection(config)
    return console.log(`server is listening on ${port}`)
  } catch (err) {
    console.error(err)
  }
})
