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
