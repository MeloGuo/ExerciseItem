// 传统策略模式
var performanceS = function () {}
performanceS.prototype.calculate = function (salary) {
  return salary * 4
}

var performanceA = function () {}
performanceA.prototype.calculate = function (salary) {
  return salary * 3
}

var performanceB = function () {}
performanceB.prototype.calculate = function (salary) {
  return salary * 2
}

var Bonus = function () {
  this.salary = null
  this.strategy = null
}
Bonus.prototype.setSalary = function (salary) {
  this.salary = salary
}
Bonus.prototype.setStrategy = function (strategy) {
  this.strategy = strategy
}
Bonus.prototype.getBonus = function () {
  return this.strategy.calculate(this.salary)
}

// JS中的策略模式
var strategies = {
  "S": function (salary) {
    return salary * 4
  },
  "A": function (salary) {
    return salary * 3
  },
  "B": function (salary) {
    return salary * 2
  }
}

var calculateBonus = function (level, salary) {
  return strategies[level](salary)
}

// 小球缓动
var tween = {
  linear: function (t, b, c, d) {
    return c * t / d + b
  },
  easeIn: function (t, b, c, d) {
    return c * (t /= d) * t + b
  }
}

var Animate = function (dom) {
  this.dom = dom
  this.startTime = 0
  this.startPos = 0
  this.endPos = 0
  this.propertyName = null
  this.easing = null
  this.duration = null
}
Animate.prototype.start = function (propertyName, endPos, duration, easing) {
  this.startTime = +new Date
  this.startPos = this.dom.getBoundingClientRect()[propertyName]
  this.propertyName = propertyName
  this.endPos = endPos
  this.duration = duration
  this.easing = tween[easing]
  var timeId = setInterval(() => {
    if (this.step() === false) {
      clearInterval(timeId)
    }
  }, 19)
}
Animate.prototype.step = function () {
  var t = +new Date
  if (t >= this.startTime + this.duration) {
    this.update(this.endPos)
    return false
  }
  var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration)
  this.update(pos)
}
Animate.prototype.update = function (pos) {
  this.dom.style[this.propertyName] = pos + 'px'
}

// test
var div = document.getElementById('div')
var animate = new Animate(div)

// 表单验证
var registerForm = document.getElementById('registerForm')

// registerForm.onsubmit = function () {
//   if (registerForm.userName.value === '') {
//     alert('用户名不能为空')
//     return false
//   }

//   if (registerForm.password.value.length < 6) {
//     alert('密码长度不能少于6位')
//   }

//   if () {
//     alert('手机号码格式不正确')
//     return false
//   }
// }

// 策略模式下的表单验证
var formStrategies = {
  isNonEmpty: function (value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  },
  isMobile: function (value, errorMsg) {
    if (!/(^1[3|5|8|7][0-9]{9}$)/.test(value)) {
      return errorMsg
    }
  }
}

var Validator = function () {
  this.cache = []
}
Validator.prototype.add = function (dom, rules) {
  var self = this

  for (var i = 0, rule; rule = rules[i++]; ) {
    (function (rule) {
      var strategyAry = rule.strategy.split(':')
      var errorMsg = rule.errorMsg

      self.cache.push(function () {
        var strategy = strategyAry.shift()
        strategyAry.unshift(dom.value)
        strategyAry.push(errorMsg)
        return formStrategies[strategy].apply(dom, strategyAry)
      })
    })(rule)
  }
}
Validator.prototype.start = function () {
  for (var i = 0, validatorFunc; validatorFunc = this.cache[i++]; ) {
    var errorMsg = validatorFunc()
    if (errorMsg) {
      return errorMsg
    }
  }
}

// 调用表单
var validataFunc = function () {
  var validator = new Validator()
  validator.add(registerForm.userName, [{
    strategy: 'isNonEmpty',
    errorMsg: '用户名不能为空'
  }, {
    strategy: 'minLength:6',
    errorMsg: '用户长度不能小于6位'
  }])
  validator.add(registerForm.password, [{
    strategy: 'minLength:10',
    errorMsg: '用户长度不能小于10位'
  }])
  validator.add(registerForm.phoneNumber, [{
    strategy: 'isMobile',
    errorMsg: '手机号码格式不正确'
  }])

  var errorMsg = validator.start()
  return errorMsg
}

var registerForm = document.getElementById('registerForm')
registerForm.onsubmit = function () {
  var errorMsg = validataFunc()
  if (errorMsg) {
    alert(errorMsg)
    return false
  }
}