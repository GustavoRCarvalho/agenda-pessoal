import http from './http'

export default {
  login(credentials) {
    return http.post('/auth/login', credentials)
  },
  getUser() {
    return http.get('/auth/user')
  },
}
