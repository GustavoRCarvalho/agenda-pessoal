import http from './http'

export default {
  findPhoto(id) {
    return http.get(`/foto/download/${id}`, {
      responseType: 'blob',
    })
  },
  postPhoto(id, photo) {
    const formData = new FormData()
    formData.append('foto', photo)

    return http.post(`/foto/upload/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
