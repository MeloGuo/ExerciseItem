// 模拟数组方法
// 数组和伪数组的区别就是伪数组的原型上没有Array.prototype方法

/**
 * 数组join方法
 * @param {string} char 
 */
Array.prototype.join = function (char) {
  char = char.toString()
  let result = this[0].toString() || ''
  let length = this.length
  for (let i = 1; i < length; i++) {
    result += char + this[i]    
  }
  return result
}

// 只要能迭代，就可以用slice方法。所以很多前端使用Array.prototype.slice.call(arrayLike)来生成数组。
/**
 * 数组slice方法
 * @param {Number} beginIndex 
 * @param {Number} endIndex 
 */
Array.prototype.slice = function (beginIndex, endIndex) {
  let result = []
  begin = beginIndex || 0
  end = endIndex || this.length
  for (let i = begin; i < end; i++) {
    result.push(this[i])
  }
  return result
}
