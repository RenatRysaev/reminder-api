import { Request, Response } from 'express'

const registerUser = (req: Request, res: Response) => {
  res.send({ registerUser: 'ok' })
}

export const userController = {
  registerUser,
}
