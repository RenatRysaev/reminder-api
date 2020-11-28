import { Connection } from 'typeorm'
import * as express from 'express'
import * as http from 'http'
import { App } from './App'
import { Database } from './Database'

export interface IServer {
  create: () => Promise<http.Server>
  destroy: () => Promise<void>
  getAppInstance: () => express.Application
}

export class Server implements IServer {
  private dbConnection: Connection
  private serverInstance: http.Server
  private appInstance: express.Application

  private listenServer = async () => {
    return new Promise((resolve) => {
      this.serverInstance.listen(3000, () => {
        resolve(this.serverInstance)
        console.log('Server listen on port 3000')
      })
    })
  }

  public create = async () => {
    this.dbConnection = await Database.getConnection()

    const app = new App()
    app.init()

    this.appInstance = app.instance
    this.serverInstance = http.createServer(this.appInstance)
    await this.listenServer()

    return this.serverInstance
  }

  public destroy = async () => {
    await this.serverInstance.close()
    await this.dbConnection.close()
  }

  public getAppInstance() {
    return this.appInstance
  }
}
