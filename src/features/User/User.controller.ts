import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import * as argon2 from 'argon2'
import { User } from './User.entity'

export interface IUserController {
  signUp: (req: Request, res: Response) => Promise<void>
}

export class UserController implements IUserController {
  private readonly userRepository: Repository<User>

  constructor() {
    this.userRepository = getRepository(User)
  }

  public signUp = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, id, password } = req.body
      const user = new User()

      const hashedPassword = await argon2.hash(password)

      user.firstName = firstName
      user.lastName = lastName
      user.email = email
      user.id = id
      user.password = hashedPassword

      await this.userRepository.save(user)
      res.status(201).send()
    } catch (err) {
      console.log(err)
    }
  }
}
