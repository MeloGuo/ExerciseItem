const fs = require('fs')

const filepath = process.argv[2]

fs.createReadStream(filepath).pipe(process.stdout)
