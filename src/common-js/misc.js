export const isUndefined = (v) => typeof v === 'undefined'

const snakeStrToCamel = (str) =>
  str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))

export const snakeToCamel = (obj) => {
  if (typeof obj != 'object') return obj

  for (const oldName in obj) {
    // underscore to camel
    const newName = snakeStrToCamel(oldName)

    // Only process if names are different
    if (newName !== oldName) {
      // Check for the old property name to avoid a ReferenceError in strict mode.
      if (obj.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName]
        delete obj[oldName]
      }
    }

    // Recursion
    if (typeof obj[newName] == 'object') {
      obj[newName] = snakeToCamel(obj[newName])
    }
  }
  return obj
}
