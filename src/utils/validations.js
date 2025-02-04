import { verifyCPF } from './functions'

export function passValidation({ values, errors }) {
  const newErrors = {}
  let isValid = true

  // validação de senhas iguais depende do reconhecimento do metodo de hash utilizado
  // por enquanto desabilitada
  // if (values.password && values.newPassword && values.password === values.newPassword) {
  //   newErrors.newPassword = 'Nova senha não pode ser igual a senha atual'
  //   isValid = false
  // }
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

  if (values.cpf && !verifyCPF(values.cpf)) {
    newErrors.cpf = 'CPF inválido'
    isValid = false
  }
  Object.keys(newErrors).forEach((key) => {
    errors[key] = newErrors[key]
  })
  return isValid
}
