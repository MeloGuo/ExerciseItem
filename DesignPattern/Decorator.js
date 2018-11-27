var Plane = function () {
  this.life = 100
  this.power = 100
}

Plane.prototype.fire = function () {
  console.log('发射普通子弹')
}

var MissileDecorator = function (plane) {
  this.plane = plane
}

MissileDecorator.prototype.fire = function () {
  this.plane.fire()
  console.log('发射导弹')
}

var AtomDecorator = function (plane) {
  this.plane = plane
}
AtomDecorator.prototype.fire = function () {
  this.plane.fire()
  console.log('发射原子弹')
}

var plane = new Plane()
plane = new MissileDecorator(plane)
plane = new AtomDecorator(plane)

// const before = function (fn, beforefn) {
//   return function () {
//     beforefn.apply(this, arguments)
//     return fn.apply(this, arguments)
//   }
// }

// function missile (target) {
//   console.log('发射导弹')
// }

// var Plane = function () {
//   this.life = 100
//   this.power = 100
// }
// Plane.prototype.fire = function () {
//   console.log('发射普通子弹', this)
// }

// const plane = new Plane()
// plane.fire = before(plane.fire, missile)
// plane.fire()

const before = function (oldFn, newFn) {
  return function () {
    newFn.apply(this, arguments)
    return oldFn.apply(this, arguments)
  }
}

Function.prototype.before = function (newFn) {
  var oldFn = this
  return function () {
    newFn.apply(this, arguments)
    return oldFn.apply(this, arguments)
  }
}

// document.getElementById = document.getElementById.before(function (id) {
//   console.log(id)
// })
// const decoratorDiv = document.getElementById('decorator')

// 实例
// 数据上报
var log = function () {
  console.log('上报标签为：' + this.getAttribute('tag'))
  // 上报请求
}

var showLogin = function () {
  console.log('打开登录浮层')
  // log(this.getA)
}.before(log)

document.getElementById('button').onclick = showLogin

// 计算数字
const addLog = function (newFn) {
  return function (num) {
    var fisrtStart = Date.now()
    const result = newFn(num)
    var firstUsed = Date.now() - fisrtStart
    console.log(`calculate(${num}) 耗时${firstUsed}ms`)

    return result
  }
}

function calculate (times) {
  var sum = 0
  var i = 1
  while (i < times) {
    sum += i
    i++
  }
  return sum
}

var newCalculate = addLog(calculate)
var result1 = calculate(5)
var result2 = newCalculate(5)
console.log(result1, result2)
// 日志会输出下面内容
// calculate(5) 耗时xxxms

// 并且 result1 等于 result2
console.log(result1 === result2) // true
