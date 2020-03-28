export const isUndefined = (v) => typeof v === 'undefined'

export const isArray = (a) => Array.isArray(a)

export const isObject = (o) => o === Object(o) && !isArray(o) && typeof o !== 'function'

const snakeStringToCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
}

export const objectKeysToCamel = (o) => {
  if (isObject(o)) {
    const n = {}

    Object.keys(o).forEach((k) => {
      n[snakeStringToCamel(k)] = objectKeysToCamel(o[k])
    })

    return n
  } else if (isArray(o)) {
    return o.map(objectKeysToCamel)
  }

  return o
}
