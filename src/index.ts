import { Server } from './Server'
;(async () => {
  const server = new Server()
  await server.create()
})()
