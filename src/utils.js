export const capitalize = (value) => {
  if (!value) return ''
  return value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase()
}

export const uniqueKey = (randomPartSize = 4) => {
  const random = Math.random()*Math.pow(10, randomPartSize)
  const date = +new Date()
  const key = date*Math.pow(10, randomPartSize)+(Math.trunc(random))
  return key.toString(36)
}
