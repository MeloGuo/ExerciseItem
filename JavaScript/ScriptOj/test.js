/**
 * #102 记忆化斐波那契函数(Memorization)
 */
const fibonacci = (() => {
  const memo = [0, 1]

  const fib = (n) => {
    let result = memo[n]

    if (typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2)
      memo[n] = result
    }

    return result
  }

  return fib
})()
// test
console.log(fibonacci(10))

/**
 * #99 safeGet
 */
const safeGet = (data, path) => {
  const baseGet = (data, path) => {
    path = path.split('.')
    const length = path.length
    let index = 0

    while (index < length && data != null) {
      data = data[path[index++]]
    }

    return (index && index === length) ? data : undefined
  }

  const result = data == null ? undefined : baseGet(data, path)
  return result
}
// test
const obj = {
  name: 'guo'
}
console.log(safeGet(obj, 'name'))
console.log(safeGet(obj, 'name.cool'))
console.log(safeGet(obj, 'name.cool.oh'))
