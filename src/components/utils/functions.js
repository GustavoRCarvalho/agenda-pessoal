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
