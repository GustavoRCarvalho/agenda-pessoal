import http from './http'

export default {
  findPhoto(id) {
    return http.get(`/foto/download/${id}`, {
      responseType: 'blob',
    })
  },
  postPhoto(id, photo) {
    return http.post(`/foto/upload/${id}`, { foto: photo })
  },
}
