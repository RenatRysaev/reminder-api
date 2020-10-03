import 'reflect-metadata'
import * as express from 'express'
import { createConnection } from 'typeorm'
import bodyParser from 'body-parser'
import config from './ormconfig'
import { userRoutes } from './features/user/routes'

const app = express()
const port = process.env.SERVER_PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

userRoutes(app)

app.listen(port, async () => {
  try {
    await createConnection(config)
    return console.log(`server is listening on ${port}`)
  } catch (err) {
    console.error(err)
  }
})
