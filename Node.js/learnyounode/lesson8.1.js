const http = require('http')

const url = process.argv[2]

http.get(url, res => {
  let result = ''
  res.setEncoding('utf8')
  res.on('data', chunk => {
    result += chunk
  })
  res.on('end', () => {
    console.log(result.length)
    console.log(result)
  })
})
