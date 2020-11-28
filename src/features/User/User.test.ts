import { Server } from '../../Server'

const server = new Server()

beforeAll(() => {
  return server.create()
})

afterAll(() => {
  return server.destroy()
})

describe('Sample Test', () => {
  it('should test that true === true', async () => {
    expect(true).toBe(true)
  })
})
