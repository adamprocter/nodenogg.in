export const unique = (arr) =>
  arr.filter((item, index) => arr.indexOf(item) === index)

export const isClient = typeof window === 'object'
