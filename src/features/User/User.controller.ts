import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import { User } from './User.entity'

export interface IUserController {
  registerUser: (req: Request, res: Response) => void
}

export class UserController implements IUserController {
  private userRepository: Repository<User>

  constructor() {
    this.userRepository = getRepository(User)
  }

  public async registerUser(req: Request, res: Response) {
    res.send({ ok: true })
  }
}
