import * as express from 'express'
import * as bodyParser from 'body-parser'
import { userRoutes } from './features/user/routes'
import * as mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reminder',
  port: 3306,
})

connection.connect((error) => {
  if (error) {
    console.log('error', error)
    return
  }
  console.log('Successfully connected to the database.')
})

const app = express()
const port = process.env.SERVER_PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

userRoutes(app)

app.listen(port, async () => {
  try {
    return console.log(`server is listening on ${port}`)
  } catch (err) {
    console.error(err)
  }
})
