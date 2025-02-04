import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const http = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(window.location.href)
    if (window.location.href.includes('/login')) {
      return Promise.reject(error)
    }
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default http
