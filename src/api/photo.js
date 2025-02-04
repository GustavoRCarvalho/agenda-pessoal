import http from './http'

export default {
  findPhoto(id) {
    return http.get(`/foto/download/${id}`)
  },
  postPhoto(id, photo) {
    return http.post(`/foto/upload/${id}`, photo)
  },
}
