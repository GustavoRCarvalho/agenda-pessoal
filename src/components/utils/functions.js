export const generateUniqueId = () => {
  return Number(`${Date.now()}${Math.floor(Math.random() * 10000)}`)
}
