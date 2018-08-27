const http = require('http')
const map = require('through2-map')

const port = process.argv[2]

const toUpper = word => word.toString().toUpperCase()

const server = http.createServer((req, res) => {
  if (req.method !== 'POST') {
    const text = `Ignore ${req.method} request. I am POST only. `
    res.end(`${text}\n`)
    console.log(text)
  }

  req.pipe(map(toUpper)).pipe(res)
})

server.listen(port)
