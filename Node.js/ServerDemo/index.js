const server = require('./server')
const router = require('./router')
const requestHandlers = require('./requestHandlers')

const handle = {
  '/': requestHandlers.start,
  '/start': requestHandlers.start,
  '/upload': requestHandlers.upload,
  '/show': requestHandlers.show
}

server.start(router.route, handle)
