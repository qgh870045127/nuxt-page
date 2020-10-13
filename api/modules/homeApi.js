import request from '@/api/request'

export function homeList(data) {
  return request.post('/home/List', data)
}
