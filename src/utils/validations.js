import { verifyCPF } from './functions'

export function passValidation({ values, errors }) {
  const newErrors = {}
  let isValid = true

  // Limpa os campos iterando pelo objeto
  // além de que, no final é feito Object.assign, que não é exclusivo, ou seja,
  // ele altera e adiciona chaves e valores, mas não excluí,
  // portanto o objeto deve estar vazio para que funcione como esperado
  Object.keys(errors).forEach((key) => {
    errors[key] = null
  })

  if (values.password && values.newPassword && values.password === values.newPassword) {
    newErrors.newPassword = 'Nova senha não pode ser igual a senha atual'
    isValid = false
  }
  if (values.newPassword && /[^A-Za-z0-9]/.test(values.newPassword)) {
    newErrors.newPassword = 'Senha deve conter apenas letras e/ou números'
    isValid = false
  } else if (
    values.newPasswordConfirmation &&
    values.newPassword &&
    values.newPasswordConfirmation !== values.newPassword
  ) {
    newErrors.newPasswordConfirmation = 'Nova senha e confirmação devem ser iguais'
    isValid = false
  }

  Object.assign(errors, newErrors)
  return isValid
}

export function userValidation({ values, errors }) {
  const newErrors = {}
  let isValid = true

  // Limpa os campos iterando pelo objeto
  // além de que, no final é feito Object.assign, que não é exclusivo, ou seja,
  // ele altera e adiciona chaves e valores, mas não excluí,
  // portanto o objeto deve estar vazio para que funcione como esperado
  Object.keys(errors).forEach((key) => {
    errors[key] = null
  })

  if (
    values.passwordConfirmation &&
    values.password &&
    values.passwordConfirmation !== values.password
  ) {
    newErrors.passwordConfirmation = 'Senha e confirmação devem ser iguais'
    isValid = false
  }
  if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
    newErrors.email = 'Email deve estar no formato email@email.com'
    isValid = false
  }
  if (values.cpf && !verifyCPF(values.cpf)) {
    newErrors.cpf = 'CPF inválido'
    isValid = false
  }

  Object.assign(errors, newErrors)
  return isValid
}

export function peopleValidation({ values, errors }) {
  const newErrors = {}
  let isValid = true

  // Limpa os campos iterando pelo objeto
  // além de que, no final é feito Object.assign, que não é exclusivo, ou seja,
  // ele altera e adiciona chaves e valores, mas não excluí,
  // portanto o objeto deve estar vazio para que funcione como esperado
  Object.keys(errors).forEach((key) => {
    errors[key] = null
  })

  if (values.cpf && !verifyCPF(values.cpf)) {
    newErrors.cpf = 'CPF inválido'
    isValid = false
  }

  Object.assign(errors, newErrors)
  return isValid
}
