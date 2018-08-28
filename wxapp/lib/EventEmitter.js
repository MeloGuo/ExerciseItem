const _events = {} // 私有变量

class EventEmitter {
  get events () {
    return _events
  }

  get strategies () { // 策略模式
    return {
      1: (offTarget) => {
        this._offPageAll(offTarget)
      },
      2: (offTarget, name) => {
        this._targetForeach(name, (target, index, targets) => {
          if (target.target === offTarget) {
            targets.splice(index, 1, {})
          }
        })
      },
      3: (offTarget, name, offCallback) => {
        this._targetForeach(name, (target, index, targets) => {
          if (target.callback === offCallback) {
            targets.splice(index, 1, {})
          }
        })
      }
    }
  }

  /**
   * 获取事件的回调数组
   * @param {string} name - 事件名字
   * @returns {Array} 回调数组
   */
  _getTargets (name) {
    return this.events[name] || []
  }

  /**
   * 兼容IOS 10.2.1中的Ojbect.values()方法
   * @param {Object} object - 需要取值的对象
   * @returns {Array} 对象中value的数组
   */
  _getObjectValues (object) {
    const values = []

    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const value = object[key]
        values.push(value)
      }
    }

    return values
  }

  _targetForeach (name, callback) {
    const targets = this._getTargets(name)

    for (let index = 0; index < targets.length; index++) {
      const target = targets[index]

      callback(target, index, targets)
    }
  }

  /**
   * 订阅事件
   * @param {Object} target - page's instance
   * @param {string} name - event's name
   * @param {Function} callback - callback function
   */
  on (target, name, callback) {
    const targets = this._getTargets(name)

    targets.push({ target, callback })
    this.events[name] = targets
  }

  /**
   * 发布事件
   * @param {string} name - 事件名
   * @param  {...any} args - 需要传递的数据
   */
  emit (name, ...args) {
    this._targetForeach(name, (target) => {
      const callback = target.callback

      if (typeof callback === 'function') {
        target.callback(...args)
      }
    })
  }

  /**
   * 移除事件订阅函数
   * @param {Object} offTarget - 页面实例引用
   * @param {string} name - 事件名
   * @param {Function} offCallback - 事件回调函数
   */
  off (offTarget, name, offCallback) {
    const argsLength = arguments.length

    this.strategies[argsLength](offTarget, name, offCallback)
  }

  /**
   * 移除当前page所用订阅事件
   * @param {Object} target - 页面实例
   */
  _offPageAll (target) {
    const eventHandlers = this._getObjectValues(this.events)

    eventHandlers.forEach((handlerObject) => {
      for (let index = 0; index < handlerObject.length; index++) {
        const element = handlerObject[index]
        if (element.target === target) {
          handlerObject.splice(index, 1)
          index--
        }
      }
    })
  }
}

module.exports = new EventEmitter()
