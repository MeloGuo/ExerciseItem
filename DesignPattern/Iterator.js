// 内部迭代器
var each = function (ary, callback) {
  for (var i = 0, l = ary.length; i < l; i++) {
    callback.call(ary[i], i, ary[i])
  }
}

// 外部迭代器
var Iterator = function (obj) {
  var current = 0

  var next = function () {
    current += 1
  }

  var isDone = function () {
    return current >= obj.length
  }

  var getCurrItem = function () {
    return obj[current]
  }

  return {
    next: next,
    isDone: isDone,
    getCurrItem: getCurrItem
  }
}

// compare函数
var compare = function (iterator1, iterator2) {
  while(!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
      throw new Error('iterator1和iterator2不相等')
    }
    iterator1.next()
    iterator2.next()
  }

  alert('iterator1和iterator2相等')
}

// 迭代器模式的应用举例
var getActiveUploadObj = function () {
  try {
    return new ActiveXObject("TXFTNActiveX.FTNUpload")
  } catch (e) {
    return false
  }
}

var getFlashUploadObj = function () {
  try {
    if (supportFlash()) {
      var str = '<object type="application/x-shockwave-flash"></obj>'
      return $(str).appendTo($('body'))
    }
  } catch (e) {
    return false
  }
}

var getFormUploadObj = function () {
  var str = '<input name="file" type="file" class="ui-file"/>'
  return  $(str).appendTo($('body'))
}

var iteratorUploadFile = function () {
  for (var i = 0, fn; fn = arguments[i++];) {
    var uploadObj = fn()
    if (uploadObj !== false) {
      return uploadObj
    }
  }
}

var uploadObj = iteratorUploadFile(getActiveUploadObj, getFlashUploadObj, getFormUploadObj)