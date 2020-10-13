import Vue from 'vue'
import Element from 'element-ui'
Vue.use(Element, { size: 'small', zIndex: 3000 })

// 指令
import * as directives from '@/utils/directives'
Object.keys(directives).forEach(directiveName => {
  Vue.directive(directiveName, directives[directiveName])
})

Vue.config.productionTip = false
