/**
 * Module dependencies.
 */

const fs = require('fs')
const stdin = process.stdin
const stdout = process.stdout

fs.readdir(process.cwd(), (err, files) => {
  if (err) console.error(err)

  console.log('')

  if (!files.length) {
    return console.log('  \033[31m 没有展示文件！\033[39m\n')
  }

  console.log('选择想要查看的文件或目录\n')
  
  const stats = []

  function file (i) {
    const filename = files[i]

    fs.stat(__dirname + '/' + filename, (err, stat) => {
      stats[i] = stat

      if (stat.isDirectory()) {
        console.log('  ' + i + '  \033[36m' + filename + '/\033[39m')
      } else {
        console.log('  ' + i + '  \033[90m' + filename + '/\033[39m')
      }

      if (++i === files.length) {
        read()
      } else {
        file(i)
      }
    })
  }

  function read () {
    console.log('')
    stdout.write('  \033[33mEnter your choice: \033[39m')
    stdin.resume().setEncoding('utf8').on('data', option)
  }

  function option (data) {
    const filename = files[Number(data)]

    if (!filename) {
      stdout.write('  \033[31mEnter your choice: \033[39m')
    } else {
      stdin.pause()

      if (stats[Number(data)].isDirectory()) {
        fs.readdir(__dirname + '/' + filename, (err, files) => {
          console.log('')
          console.log('  (' + files.length + ' files)')
          files.forEach(file => {
            console.log(('  -  ' + file))
          })
          console.log('')
        })        
      } else {
        fs.readFile(__dirname + '/' + filename, 'utf8', (err, data) => {
          if (err) console.error(err)

          console.log('')
          console.log('  \033[90m' + data + '\033[39m')
        })
      }      
    }
  }

  file(0)
})
