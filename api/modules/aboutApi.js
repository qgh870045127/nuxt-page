import request from '@/api/request'

export function aboutList(data) {
  return request.post('/about/List', data)
}
