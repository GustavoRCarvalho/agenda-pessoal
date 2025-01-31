export const peopleFormFields = {
  id: 0,
  name: '',
  cpf: '',
  foto: {},
  bairro: '',
  cep: '',
  cidade: '',
  estado: '',
  logradouro: '',
  numero: '',
  pais: '',
}
export const userFormFields = {
  cpf: '',
  dataNascimento: '',
  email: '',
  id: 0,
  nome: '',
  password: '',
  telefone: '',
  username: '',
}
export const passFormFields = {
  newPasswordConfirmation: '',
  newPassword: '',
  password: '',
  username: '',
}
export const contactFormFields = {
  email: '',
  id: 0,
  pessoa: {
    key: 0,
    label: '',
  },
  privado: true,
  tag: '',
  telefone: '',
  tipoContato: { key: '', label: '' },
  usuario: {
    cpf: '',
    dataNascimento: '',
    email: '',
    id: 0,
    nome: '',
    password: '',
    telefone: '',
    username: '',
  },
}
export const patterns = {
  B: { pattern: /[1-9]/ },
  C: { pattern: /[2-8]/ },
  D: { pattern: /0/ },
  E: { pattern: /[12]/ },
  F: { pattern: /[09]/ },
  G: { pattern: /[0-3]/ },
  H: { pattern: /[01]/ },
  I: { pattern: /[0-2]/ },
  J: { pattern: /9/ },
  K: { pattern: /[0-8]/ },
  '#': { pattern: /\d/ },
  X: { pattern: /[0-9a-zA-Z]/ },
  S: { pattern: /[a-zA-Z]/ },
  A: { pattern: /[a-zA-Z]/, transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: /[a-zA-Z]/, transform: (v) => v.toLocaleLowerCase() },
  '!': { escape: true },
}

export const optionsTiposUser = [
  { key: 'ROLE_ADMIN', label: 'Administrador' },
  { key: 'ROLE_USER', label: 'Usuário' },
]

export const optionsTipoContato = [
  { key: 'CELULAR', label: 'Celular' },
  { key: 'EMAIL', label: 'Email' },
  { key: 'TELEFONE', label: 'Telefone' },
]
