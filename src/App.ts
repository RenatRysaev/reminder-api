import 'reflect-metadata'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import { UserRoutes, IUserRoutes } from './features/User/User.routes'

export interface IAppConfig {
  port: number
}

export interface IApp {
  init(): express.Application
}

export class App implements IApp {
  private readonly port: number
  private readonly app: express.Application
  private userRoutes: IUserRoutes

  constructor({ port }: IAppConfig) {
    this.port = port
    this.app = express()
    this.userRoutes = new UserRoutes()
  }

  private addEnhancers = () => {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(cookieParser())
  }

  private registerRoutes = () => {
    this.userRoutes.createRoutes(this.app)
  }

  private handleListenApp = () => {
    console.log(`Server is listening on: ${this.port}`)
  }

  public init = () => {
    this.addEnhancers()
    this.registerRoutes()
    this.app.listen(this.port, this.handleListenApp.bind(this))
    return this.app
  }
}
