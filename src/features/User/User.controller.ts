import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'
import { User } from './User.entity'

export interface IUserController {
  signUp: (req: Request, res: Response) => Promise<void>
  signIn: (req: Request, res: Response) => Promise<void>
}

export class UserController implements IUserController {
  private readonly userRepository: Repository<User>

  constructor() {
    this.userRepository = getRepository(User)
  }

  public signUp = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, id, password } = req.body

      const isExistUserWithSameIdOrEmail = await this.userRepository.findOne({
        where: [{ id }, { email }],
      })
      if (isExistUserWithSameIdOrEmail) {
        res.status(400).send({ message: 'User with same id or email already exist' })
        return
      }

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

  public signIn = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      const userRecord = await this.userRepository.findOne({ email })
      if (!userRecord) {
        res.send({ message: 'Incorrect login or password' })
        return
      }

      const isCorrectPassword = await argon2.verify(userRecord.password, password)
      if (!isCorrectPassword) {
        res.send({ message: 'Incorrect login or password' })
        return
      }

      const jwtPayload = { email }
      const accessToken = jwt.sign(jwtPayload, String(process.env.ACCESS_TOKEN_SECRET), {
        algorithm: 'HS256',
        expiresIn: '1h',
      })
      const refreshToken = jwt.sign(
        jwtPayload,
        String(process.env.REFRESH_TOKEN_SECRET),
        {
          algorithm: 'HS256',
          expiresIn: '3h',
        },
      )

      userRecord.refreshToken = refreshToken
      await this.userRepository.save(userRecord)

      res.cookie('accessToken', accessToken, { secure: true, httpOnly: true })
      res.cookie('refreshToken', refreshToken, { secure: true, httpOnly: true })
      res.send()
    } catch (err) {
      console.log(err)
    }
  }
}
