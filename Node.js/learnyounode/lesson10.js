const net = require('net')

const port = process.argv[2]

const parseTime = (time) => {
  return time > 10 ? time : `0${time}`
}

const getTime = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = parseTime(date.getMonth() + 1)
  const day = parseTime(date.getDate())
  const hour = parseTime(date.getHours())
  const min = parseTime(date.getMinutes())

  return `${year}-${month}-${day} ${hour}:${min}`
}

const server = net.createServer(socket => {
  const result = getTime()
  socket.end(`${result}\n`)
})

server.listen(port)
