import http from './http'

export default {
  listFavs() {
    return http.get(`/favorito/pesquisar/`)
  },
  deleteFavs(id) {
    return http.delete(`/favorito/remover/${id}`)
  },
  postFavs(favs) {
    return http.post('/favorito/salvar/', favs)
  },
}
