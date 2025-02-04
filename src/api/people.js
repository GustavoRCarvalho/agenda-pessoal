import http from './http'

export default {
  listPeople(search) {
    return http.post('/pessoa/pesquisar/', { nome: search })
  },
  postPeople(people) {
    const {
      foto: { data: _data, ...foto },
      ...body
    } = people

    const normalizeForm = {
      ...body,
      id: Number(body.id),
      endereco: {
        ...body.endereco,
        id: Number(body.endereco.id),
        numero: Number(body.endereco.numero),
      },
      foto: foto?.id
        ? {
            ...foto,
            id: String(foto.id),
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
