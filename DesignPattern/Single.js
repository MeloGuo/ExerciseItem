// 普通单例模式-面向对象实现
var Singleton1 = function (name) {
  this.name = name
  this.instance = null
}
Singleton1.prototype.getName = function () {
  alert(this.name)
}
Singleton1.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton1(name)
  }
  return this.instance
}

// 普通单例模式-闭包实现
var Singleton2 = function (name) {
  this.name = name
}
Singleton2.prototype.getName = function () {
  alert(this.name)
}
Singleton2.getInstance = (function () {
  var instance = null
  return function (name) {
    if (!instance) {
      instance = new Singleton2(name)
    }
    return instance
  }
})()

// 透明单例模式
var CreateDiv = (function () {

  var instance

  var CreateDiv = function (html) {
    if (instance) {
      return instance
    }
    this.html = html // 第一步创建对象
    this.init()      // 执行init方法
    return instance = this // 第二步是保证只有一个对象。应该把这两步分离开。
  }

  CreateDiv.prototype.init = function () {
    var div = document.createElement('div')
    div.innerHTML = this.html
    document.body.appendChild(div)
  }

  return CreateDiv
})()

// 用代理实现单例模式
var CreateDiv2 = function (html) {
  this.html = html
  this.init()
}
CreateDiv2.prototype.init = function () {
  var div = document.createElement('div')
  div.innerHTML = this.html
  document.body.appendChild(div)
}

var ProxySingletonCreateDiv = (function () { // 把负责管理单例的逻辑移动到了代理类中
  var instance
  return function (html) {
    if (!instance) {
      instance = new CreateDiv2(html)
    }
    return instance
  }
})()

// JS中的单例模式
// 动态创建命名空间
var MyApp = {}

MyApp.namespace = function (name) {
  var parts = name.split('.')
  var current = MyApp
  for (var i in parts) {
    if (!current[parts[i]]) {
      current[parts[i]] = {}
    }
    current = current[parts[i]]
  }
}

var user = (function () {
  var _name = 'guo'
  var _age = 21

  return {
    getUserInfo: function () {
      return _name + '-' + _age
    }
  }
})()

// 通用的单例逻辑
var getSingle = function (fn) {
  var result
  return function () {
    return result || (result = fn.apply(this, arguments))
  }
}

var createSingleIframe = getSingle(() => {
  var iframe = document.createElement('iframe')
  document.body.appendChild(iframe)
  return iframe
})

document.getElementById('loginBtn').onclick = () => {
  var loginLayer = createSingleIframe()
  loginLayer.style.width = '100%'
  loginLayer.style.height = '100%'
  loginLayer.src = 'http://nba.hupu.com'
}