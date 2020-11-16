import { ConnectionOptions } from 'typeorm'
import { App, IAppConfig } from './App'
import { Database } from './Database'

const databaseConfig: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'reminder',
  entities: [__dirname + '/**/*.entity.ts'],
  synchronize: true,
}

const appConfig: IAppConfig = {
  port: Number(process.env.SERVER_PORT) || 3000,
}

;(async () => {
  try {
    await Database.createConnection(databaseConfig)
    console.log('Successful connection to the database')

    const app = new App(appConfig)
    app.init()
  } catch (err) {
    console.error(err)
  }
})()
