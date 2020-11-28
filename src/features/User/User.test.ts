import * as superTest from 'supertest'
import omit from 'lodash/omit'
import { Server } from '../../Server'

const server = new Server()

beforeAll(() => {
  return server.create()
})

afterAll(() => {
  return server.destroy()
})

describe('Sign up user', () => {
  const user = {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    id: 'id',
    password: '123456789',
  }

  it('Should create new user', async (done) => {
    superTest(server.getAppInstance()).post('/user/signUp').send(user).expect(201, done)
  })

  it('Should return status: 409 if such user with same id exist in database', async (done) => {
    superTest(server.getAppInstance())
      .post('/user/signUp')
      .send({
        ...user,
        email: 'email-123',
        id: 'id',
      })
      .expect(409, done)
  })

  it('Should return status: 409 if such user with same email exist in database', async (done) => {
    superTest(server.getAppInstance())
      .post('/user/signUp')
      .send({
        ...user,
        email: 'email',
        id: 'id-123',
      })
      .expect(409, done)
  })

  it('Should return status: 409 if such user with same id and email exist in database', async (done) => {
    superTest(server.getAppInstance())
      .post('/user/signUp')
      .send({
        ...user,
        email: 'email',
        id: 'id',
      })
      .expect(409, done)
  })

  it('Should return status: 400 if client did not send required data', async (done) => {
    superTest(server.getAppInstance())
      .post('/user/signUp')
      .send(omit(user, ['id', 'firstName']))
      .expect(400, done)
  })
})
