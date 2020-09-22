import { Application } from 'express'
import { userController } from './controller'

export const userRoutes = (app: Application) => {
  app.post('/user/register', userController.registerUser)
}
