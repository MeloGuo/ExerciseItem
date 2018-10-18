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

Array.prototype.sort = function (fn = function (a, b) {
  return a - b
}) {
  let roundCount = this.length - 1
  for (let i = 0; i < roundCount; i++) {
    let minIndex = this[i]
    for (let k = i + 1; k < this.length; k++) {
      if (fn,call(null, this[k], this[i]) < 0) {
        [ this[k], this[i] ] = [ this[i], this[k] ]
      }
    }
  }
}

// forEach和for的区别主要是：
// 1. forEach没法break
// 2. forEach用到了函数，所以每次迭代都会有一个新的函数作用域；而for循环只有一个作用域
Array.prototype.forEach = function (fn, thisArg = undefined) {
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      fn.call(thisArg, this[i], i, this)
    }
  }
}

Array.prototype.map = function (fn, thisArg = undefined) {
  const result = []
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = fn.call(thisArg, this[i], i, this)
    }
  }
  return result
}

Array.prototype.filter = function (fn, thisArg = undefined) {
  const result = []
  let canPush = false
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      if (canPush = fn.call(thisArg, this[i], i, this)) {
        result.push(this[i])
      }
    }
  }
  return result 
}

Array.prototype.reduce = function (fn, initialValue = 0) {
  const result = initialValue
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result = fn.call(undefined, result, this[i], i, this)
    }
  }
  return result
}

// TODO: 实现splice
Array.prototype.splice = function () {

}

// 使用underscore.js
import _ from 'underscore'

var array = [
  {id: 1, value: '1', parent_id: null},
  {id: 2, value: '2', parent_id: null},
  {id: 3, value: '1-1', parent_id: 1},
  {id: 4, value: '1-2', parent_id: 1},
  {id: 5, value: '2-1', parent_id: 2},
  {id: 6, value: '2-2', parent_id: 2}
]

// const result = [
//   {
//       id:1,
//       value: '1',
//       children: [
//           {id:3, value: '1-1', children: null},
//           {id:4, value: '1-2', children: null},
//       ]
//   },
//   {
//       id:2,
//       value: '2',
//       children: [
//           {id:5, value: '2-1', children: null},
//           {id:5, value: '2-2', children: null},
//       ]
//   }
// ]

// 两次遍历法
var convert = function (array) {
  const parents = _.where(array, {parent_id: null})
  const children = _.reject(array, function (object) {
    return object.parent_id === null
  })
  _.each(parents, function (parent) {
    parent.children = []
    _.each(children, function (child) {
      if (parent.id === child.parent_id) {
        parent.children.push(child)
        child.children = null
        delete child.parent_id
        delete parent.parent_id
      }
    })
  })

  return parents
}

console.log(convert(array))

// TODO:单次遍历法
