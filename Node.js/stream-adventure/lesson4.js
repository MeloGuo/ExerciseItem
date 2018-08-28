const through = require('through2')
const stream = through(function write (buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase())
  next()
}, function end (done) {
  done()
})

process.stdin.pipe(stream).pipe(process.stdout)
