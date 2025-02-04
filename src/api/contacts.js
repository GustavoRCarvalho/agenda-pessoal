import http from './http'

export default {
  listContacts(search) {
    return http.post('/contato/pesquisar', { termo: search })
  },
  postContact(contact) {
    const { tipoContatoOption: _tipoContatoOption, pessoaOption: _pessoaOption, ...body } = contact

    const normalizeUser = {
      ...body,
      id: Number(body.id),
    }
    return http.post('/contato/salvar/', normalizeUser)
  },
  deleteContact(id) {
    return http.delete(`/contato/remover/${id}`)
  },
  findContact(id) {
    return http.get(`/contato/listar/${id}`)
  },
}
