import { Request, Response } from 'express'

const registerUser = (req: Request, res: Response) => {
  console.log('registerUser')
  res.send({ registerUser: 'ok' })
}

export const userController = {
  registerUser,
}
