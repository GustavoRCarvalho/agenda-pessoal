export const generateUniqueId = () => {
  return Number(`${Date.now()}${Math.floor(Math.random() * 10000)}`)
}

export function transformImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let base64String

    reader.onload = function (event) {
      base64String = event.target.result.split(',')[1]
      const src = base64String
      resolve(src)
    }

    reader.onerror = function (error) {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}
// ref: https://www.devmedia.com.br/validar-cpf-com-javascript/23916
export function verifyCPF(cpf) {
  const strCPF = cpf.replace(/[^0-9]+/g, '')
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

export function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || ''
  sliceSize = sliceSize || 512

  var byteCharacters = atob(b64Data)
  var byteArrays = []

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize)

    var byteNumbers = new Array(slice.length)
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    var byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  var blob = new Blob(byteArrays, { type: contentType })
  return blob
}
