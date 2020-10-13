// 同时注入context 和 Vue中，以$为前缀
import api from '@/api'
export default ({ app }, inject) => {
  inject('api', api)
}
