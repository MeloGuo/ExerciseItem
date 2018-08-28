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
  const router = route[pathname]
  let result = null

  if (router) {
    result = router(urlObject.query)
  }

  if (result) {
    res.writeHead(200, { 'content-type': 'application/json' })
    console.log(res.getHeaders())
    console.log(new Date())
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    console.log(`Not Found ${req.url}`)
    res.end(`Not Found ${req.url}`)
  }
})

server.listen(port)
