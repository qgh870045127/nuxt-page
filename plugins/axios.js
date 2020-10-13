// 同时注入 asyncData 和 Vue中，以$为前缀调用
import api from '@/api'
export default ({ app }, inject) => {
  inject('api', api)
}
