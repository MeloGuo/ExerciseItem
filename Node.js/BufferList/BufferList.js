const fs = require('fs')
const bl = require('bl')

const filePath = process.argv[2]

fs.createReadStream(filePath)
  .pipe(bl((err, data) => {
    if (err) throw err
    console.log(data.toString())
  }))
