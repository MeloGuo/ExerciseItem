const queryString = require('querystring')
const fs = require('fs')
const formidable = require('formidable')

function start (res, req) {
  console.log("Request handler 'start' was called.")

  const body = '<html>' +
  '<head>' +
  '<meta http-equiv="Content-Type" content="text/html; ' +
  'charset=UTF-8" />' +
  '</head>' +
  '<body>' +
  '<form action="/upload" enctype="multipart/form-data" method="post">' +
  '<input type="file" name="upload">' +
  '<input type="submit" value="Upload file" />' +
  '</form>' +
  '</body>' +
  '</html>'

  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write(body)
  res.end()
}

function upload (res, req) {
  console.log("Request handler 'upload' was called.")

  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) console.error(err)
    fs.renameSync(files.upload.path, `${__dirname}/tmp/test.png`)
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('received image:<br/>')
    res.write('<img src="./show" />')
    res.end()
  })
}

function show (res, req) {
  console.log("Request handler 'show' was called.")
  fs.readFile(`${__dirname}/tmp/test.png`, 'binary', (err, file) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      res.write(`${err}\n`)
      res.end()
    } else {
      res.writeHead(200, { 'Content-Type': 'image/png' })
      res.write(file, 'binary')
      res.end()
    }
  })
}

module.exports = {
  start,
  upload,
  show
}
