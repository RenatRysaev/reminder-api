import { Application } from 'express'
import { UserController, IUserController } from './User.controller'

export interface IUserRoutes {
  createRoutes(app: Application): void
}

export class UserRoutes implements IUserRoutes {
  private userController: IUserController

  constructor() {
    this.userController = new UserController()
  }

  public createRoutes = (app: Application) => {
    app.post('/user/signUp', this.userController.signUp)
    app.post('/user/signIn', this.userController.signIn)
  }
}
