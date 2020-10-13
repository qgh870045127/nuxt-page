import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 30000,
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    Promise.reject(error)
  }
)

export default service
