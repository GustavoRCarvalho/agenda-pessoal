import http from './http'

export default {
  listUsers(search) {
    return http.post('/usuario/pesquisar', { termo: search })
  },
  postUser(user) {
    const { tipoOption: _tipoOption, ...body } = user

    const normalizeUser = {
      tipos: [user.tipoOption.key],
      usuario: {
        ...body,
        id: Number(user.id),
      },
    }

    return http.post('/usuario/salvar', normalizeUser)
  },
  changePassword(passwords) {
    return http.post('/usuario/alterarSenha', passwords)
  },
  putUser(user) {
    const { tipoOption: _tipoOption, ...body } = user

    const normalizeUser = {
      tipos: [user.tipoOption.key],
      usuario: {
        ...body,
        id: Number(user.id),
      },
    }

    return http.put('/usuario/atualizar', normalizeUser)
  },
  findUser(id) {
    return http.get(`/usuario/buscar/${id}`)
  },
}
