// 虚拟代理
// 虚拟代理实现图片预加载
var myImage = (() => {
  var imgNode = document.createElement('img')
  var imgDiv = document.getElementById('img')
  imgDiv.appendChild(imgNode)

  return {
    setSrc: function (src) {
      imgNode.src = src
    }
  }
})()

var proxyImage = (() => {
  var img = new Image
  img.onload = () => {
    myImage.setSrc(img.src)
  }
  return {
    setSrc: function (src) {
      myImage.setSrc('/Users/guoziliang/Desktop/ExerciseItem/DesignPattern/loading.gif')
      img.src = src
    }
  }
})()

// proxyImage.setSrc('http://c.hiphotos.baidu.com/image/pic/item/d50735fae6cd7b89acbea9df032442a7d8330e9f.jpg')

// 虚拟代理合并HTTP请求
var synchronousFile = function (id) {
  console.log('开始同步文件，id为：' + id)
}

var proxySynchronousFile = (() => {
  var cache = []
  var timer

  return function (id) {
    cache.push(id)
    if (timer) {
      return
    }

    timer = setTimeout(() => { // 这块有点像debounce方法
      synchronousFile(cache.join(','))
      clearTimeout(timer)
      timer = null
      cache.length = 0
    }, 2000)
  }
})()

var checkbox = document.getElementsByTagName('input')

for (var i = 0, c; c = checkbox[i++]; ) {
  c.onclick = function () {
    if (this.checked == true) {
      proxySynchronousFile(this.id)
    }
  }
}

// 缓存代理
// 计算乘积
var mult = function () {
  console.log('开始计算乘积')
  var a = 1
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i]
  }
  return a
}

var proxyMult = (() => {
  var cache = {}
  return function () {
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    return cache[args] = mult.apply(this, arguments)
  }
})()

// 计算加和
var plus = function () {
  console.log('开始计算加和')
  var a = 0
  for (var i = 0, l = arguments.length; i < l; i++ ) {
    a = a + arguments[i]
  }
  return a
}

// 用高阶函数动态创建代理
var createProxyFactory = function (fn) {
  var cache = {}
  return function () {
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    return cache[args] = fn.apply(this, arguments)
  }
}