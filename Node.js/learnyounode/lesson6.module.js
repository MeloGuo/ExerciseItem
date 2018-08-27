const fs = require('fs')
const path = require('path')

module.exports = function (dir, extname, callback) {
  fs.readdir(dir, (err, list) => {
    if (err) return callback(err)

    const result = list.filter(filename => {
      return path.extname(filename) === `.${extname}`
    })
    callback(null, result)
  })
}
