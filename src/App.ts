import 'reflect-metadata'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import { UserRoutes, IUserRoutes } from './features/User/User.routes'

export interface IApp {
  init: () => void
  instance: express.Application
}

export class App implements IApp {
  private readonly expressApp: express.Application
  private userRoutes: IUserRoutes

  constructor() {
    this.expressApp = express()
    this.userRoutes = new UserRoutes()
  }

  private addEnhancers = () => {
    this.expressApp.use(bodyParser.json())
    this.expressApp.use(bodyParser.urlencoded({ extended: false }))
    this.expressApp.use(cookieParser())
  }

  private registerRoutes = () => {
    this.userRoutes.createRoutes(this.expressApp)
  }

  public init = () => {
    this.addEnhancers()
    this.registerRoutes()
  }

  public get instance() {
    return this.expressApp
  }
}
