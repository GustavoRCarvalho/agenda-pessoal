import { patterns } from './constants'

export const generateUniqueId = () => {
  return Number(`${Date.now()}${Math.floor(Math.random() * 10000)}`)
}

export function transformImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let base64String

    reader.onload = function (event) {
      base64String = event.target.result.split(',')[1]
      const src = 'data:image/png;base64,' + base64String
      resolve(src)
    }

    reader.onerror = function (error) {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}
export function verifyBi(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

export function gerateDateMask(date) {
  let useMask = ''

  const dateSplit = date.split('-')
  // Verifca o ano
  if (dateSplit[0]) {
    const yearFirstDigit = dateSplit[0][0]
    //19##
    if (yearFirstDigit === '1') useMask = '1J##-H'
    // 20##
    else if (yearFirstDigit === '2') useMask = '2D##-H'
  }

  // Verifca o mês
  if (dateSplit[1]) {
    const mouthFirstDigit = dateSplit[1][0]
    const mouthSecondDigit = dateSplit[1][1]

    if (mouthFirstDigit === '0') {
      // impede que fevereiro tenha um dia >= a 30
      useMask += mouthSecondDigit === '2' ? 'I-I' : 'B-G'
    } else if (mouthFirstDigit === '1') {
      useMask += 'I-G'
    }
  }

  // verifica o dia
  if (dateSplit[2]) {
    const dayFirstDigit = dateSplit[2][0]
    const month = dateSplit[1]

    if (['0', '1', '2'].includes(dayFirstDigit)) {
      //se é ano bissexto e fevereiro permite apenas dias <= 29
      useMask += month === '02' && !verifyBi(Number(dateSplit[0])) ? 'K' : '#'
    } else if (dayFirstDigit === '3') {
      //filtra os meses que podem ter 31 dias
      const monthsWith31Days = ['01', '03', '05', '07', '08', '10', '12']
      useMask += monthsWith31Days.includes(month) ? 'H' : 'D'
    }
  }

  return {
    mask: useMask,
    tokens: { ...patterns },
  }
}
// ref: https://www.devmedia.com.br/validar-cpf-com-javascript/23916
export function verifyCPF(strCPF) {
  var Soma
  var Resto
  Soma = 0
  if (strCPF == '00000000000') return false

  for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
  Resto = (Soma * 10) % 11

  if (Resto == 10 || Resto == 11) Resto = 0
  if (Resto != parseInt(strCPF.substring(9, 10))) return false

  Soma = 0
  for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
  Resto = (Soma * 10) % 11

  if (Resto == 10 || Resto == 11) Resto = 0
  if (Resto != parseInt(strCPF.substring(10, 11))) return false
  return true
}

// ref: https://viacep.com.br/exemplo/javascript/ adaptado
export async function verifyCEP(cepString) {
  const value = cepString.replace(/\D/g, '')
  var validacep = /^\d{8}$/
  if (value == '' || !validacep.test(value)) {
    return {}
  }

  const resp = await fetch(`https://viacep.com.br/ws/${value}/json/`)
    .then((response) => response.json())
    .then((json) => {
      return json
    })

  return resp
}
