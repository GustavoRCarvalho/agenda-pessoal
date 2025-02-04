import http from './http'

export default {
  listPeople(search) {
    return http.post('/pessoa/pesquisar/', { nome: search })
  },
  postPeople(people) {
    const normalizeForm = {
      ...people,
      endereco: {
        ...people.endereco,
        numero: Number(people.endereco.numero),
      },
      foto: people?.foto?.id
        ? {
            ...people?.foto,
            id: String(people?.foto.id),
          }
        : null,
    }
    return http.post('/pessoa/salvar/', normalizeForm)
  },
  deletePeople(id) {
    return http.delete(`/pessoa/remover/${id}`)
  },
  findPeople(id) {
    return http.get(`/pessoa/buscar/${id}`)
  },
}
