require('intersection-observer')

/**
 * @description IE版本号
 */
if (process.browser) {
  var userAgent = window.navigator.userAgent
  var IEReg = new RegExp('MSIE (\\d+\\.\\d+);')
  if (IEReg.test(userAgent)) {
    var IEVersion = parseFloat(RegExp['$1'])
  }
}

/**
 * @description 监听元素封装
 */
const observer = function (element, callback) {
  // 元素初始化状态
  element.style.opacity = 0
  // 兼容IE9
  if (IEVersion < 10) {
    element.style.opacity = 1
    return
  }
  let listen = new IntersectionObserver((entries) => {
    entries.forEach((item) => {
      if (item.isIntersecting) {
        // 回调
        callback && callback(listen, item)
        // 移除监听
        listen.unobserve(item.target)
      }
    })
  })
  // 监听节点
  listen.observe(element)
}

/**
 * @description 元素动画
 * @param delay 动画延时
 * @param type 动画类型
 * @param callback 元素进入可视区回调
 */
export const lazyBox = {
  bind: function (element, binding, node) {
    observer(element, () => {
      let { delay, type, callback } = Object.assign(
        { delay: 0, type: 'up', callback: null },
        binding.value
      )
      if (binding.value) element.style.animationDelay = `${delay}s`
      element.className = `${element.className} ${type}`
      if (callback && typeof callback === 'function') {
        callback(element)
      }
      // 图片懒加载 请求地址绑定在img name属性里
      node.elm.children.forEach((el) => {
        if (el.tagName === 'IMG') el.src = el.name
      })
    })
  },
}

/**
 * @description 单个图片懒加载
 */
export const lazyImage = {
  bind: function (element, binding, node) {
    observer(element, () => {
      let { delay, type, src } = Object.assign(
        { delay: 0, type: 'up', src: null },
        binding.value
      )
      // 加载图片
      element.src = src

      if (binding.value) element.style.animationDelay = `${delay}s`
      element.className = `${element.className} ${type}`
    })
  },
}
