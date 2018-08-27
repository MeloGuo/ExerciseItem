const http = require('http')
const bl = require('bl')

const urls = process.argv.slice(2)

const results = []
let count = 0

urls.forEach((url, index) => {
  http.get(url, res => {
    res.pipe(bl((err, data) => {
      if (err) throw err
      results[index] = data.toString()
      count++

      if (count === 3) {
        results.forEach(result => {
          console.log(result)
        })
      }
    }))
  })
})