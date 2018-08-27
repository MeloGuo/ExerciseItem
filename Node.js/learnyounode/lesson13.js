const http = require('http')
const url = require('url')

const port = process.argv[2]

const parseDate = queryObject => new Date(queryObject['iso'])

const parseTime = queryObject => {
  const date = parseDate(queryObject)

  return {
    'hour': date.getHours(),
    'minute': date.getMinutes(),
    'second': date.getSeconds()
  }
}

const parseUnixtime = queryObject => ({
  'unixtime': +parseDate(queryObject)
})

const route = {
  '/api/parsetime': queryObject => parseTime(queryObject),
  '/api/unixtime': queryObject => parseUnixtime(queryObject)
}

const server = http.createServer((req, res) => {
  const urlObject = url.parse(req.url, true)
  const pathname = urlObject.pathname
  const result = route[pathname](urlObject.query)

  if (result) {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    res.end()
  }
})

server.listen(port)
