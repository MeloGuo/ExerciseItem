const fs = require('fs')
const http = require('http')

const port = process.argv[2]
const filePath = process.argv[3]

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain' })

  fs.createReadStream(filePath)
    .pipe(res)
})

server.listen(port)
