const args = process.argv.slice(2)

const result = args.reduce((previous, current) => {
  return Number(previous) + Number(current)
})

console.log(result)
