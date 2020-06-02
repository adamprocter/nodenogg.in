//////////////////////////////////////////////////////////////////////
// UTILITIES AND HELPERS
//////////////////////////////////////////////////////////////////////

/**
 * Expresses an array length in text
 */
export const pluralize = (arr, noun, plural) => {
  const num = arr.length
  const nounPlural = plural || `${noun}s`
  return `${num > 0 ? num : 'No'} ${num > 1 ? nounPlural : noun}`
}

/**
 * Filter to retrieve unique values from array
 */
export const shallowUnique = (value, index, item) =>
  item.indexOf(value) === index

/**
 * Removes item from an array
 */
export const shallowRemoveFromArray = (arr, item) => {
  const newArray = [...arr]
  const index = arr.indexOf(item)
  if (index > -1) {
    newArray.splice(index, 1)
  }
  return newArray
}

/**
 * Utility method to group array of objects by key value
 * from https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
 */
export const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key]
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    return objectsByKeyValue
  }, {})

/**
 * Helper to check if the code is running in a browser
 * This helps avoid errors in components that depend on
 * window when building static site in CI/node.js)
 */
export const isClient = typeof window === 'object'

/**
 * Checks if variable is a function
 */
export function isFunction(func) {
  return (
    typeof func === 'function' ||
    Object.prototype.toString.call(func) === '[object Function]'
  )
}
