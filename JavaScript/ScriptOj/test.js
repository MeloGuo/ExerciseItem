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
 * #101 解析字符串 (正则表达式)
 */
const extractStr = (str) => {
  const result = str.match(/:([^:\.])*?\./g) || [] // 如果没有匹配到会返回null，所以设置默认返回[]
  return result.map((subStr) => {
    return subStr.replace(/[:\.]/g, '')
  })
}
// test
console.log(extractStr('My name is:Jerry. My age is:12.'))

/**
 * #100 把数字转换成中文
 */
const toChineseNum = (num) => {
  if (num == 0) {
    return '零'
  }

  const number = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const unit = ['', '十', '百', '千', '万']
  const resultStr = []
  let len = 0
  let lastNumNotZero = false

  while (num) {
    let n = num % 10
    let u = len >= unit.length ? len % 5 + 1 : len % 5 // 这步确定基数很关键

    // 添加基
    if (n || (unit.lenth - 1 && len == unit.length - 1)) {
      resultStr.unshift(unit[u])
    }

    // 添加数
    if ((n || lastNumNotZero) && u != unit.length - 1) {
      resultStr.unshift(number[n])
    }

    lastNumNotZero = !!n
    len++
    num = Math.floor(num / 10)
  }

  return resultStr.join('')
}
// test
console.log(toChineseNum(12345678))
console.log(toChineseNum(12345))
console.log(toChineseNum(1234))
console.log(toChineseNum(123))
console.log(toChineseNum(12))
console.log(toChineseNum(1))
console.log(toChineseNum(0))

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
