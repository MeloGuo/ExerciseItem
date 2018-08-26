const fs = require('fs')

const path = process.argv[2]

const file = fs.readFileSync(path, 'utf8')
const result = file.split('\n').length - 1

console.log(result)
