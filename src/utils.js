export const tap = (k = '', v) => {
  console.log(k, v)
  return v
}

export const isUndefined = v => typeof v === 'undefined'
