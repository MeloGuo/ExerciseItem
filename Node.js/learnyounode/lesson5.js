const fs = require('fs')
const path = require('path')

const dirpath = process.argv[2]
const extname = `.${process.argv[3]}`

fs.readdir(dirpath, (err, data) => {
  if (err) throw err
  data.forEach(filename => {
    if (path.extname(filename) === extname) {
      console.log(filename)
    }
  })
})
