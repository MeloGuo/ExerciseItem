const filterFile = require('./lesson6.module')

const dirpath = process.argv[2]
const extname = process.argv[3]

filterFile(dirpath, extname, (err, results) => {
  if (err) throw err

  results.forEach(result => {
    console.log(result)
  })
})
