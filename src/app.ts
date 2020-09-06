import 'reflect-metadata'
import express from 'express'
import { createConnection } from 'typeorm'
import config from './ormconfig'

const app = express()
const port = 3000

app.listen(port, async () => {
  try {
    await createConnection(config)
    return console.log(`server is listening on ${port}`)
  } catch (err) {
    console.error(err)
  }
})
