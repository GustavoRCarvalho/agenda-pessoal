import http from './http'

export default {
  findPhoto(id) {
    return http.get(`/Foto/download/${id}`)
  },
  postPhoto(id, photo) {
    return http.post(`/foto/upload/${id}`, photo)
  },
}
