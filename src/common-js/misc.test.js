import * as nut from './misc'

describe('objectKeysToCamel', () => {
  test('camelize object keys', () => {
    const myObj = {
      attr_a: {
        attr_b: [{ attr_c: 'do_not_convert' }]
      }
    }
    expect(nut.objectKeysToCamel(myObj)).toStrictEqual({
      attrA: {
        attrB: [{ attrC: 'do_not_convert' }]
      }
    })
  })

  test('null safety', () => {
    expect(nut.objectKeysToCamel(null)).toBe(null)
    expect(nut.objectKeysToCamel({ attr_a: null })).toStrictEqual({ attrA: null })
  })
})

describe('objectToQueryParams', () => {
  test('single param', () => {
    const obj = { a: 'bleus1' }
    const queryParams = nut.objectToQueryParams(obj)

    expect(queryParams).toBe('?a=bleus1')
  })

  test('two params', () => {
    const obj = { a: 'bleus1', b: 'bleus2' }
    const queryParams = nut.objectToQueryParams(obj)

    expect(queryParams).toBe('?a=bleus1&b=bleus2')
  })

  test('no params', () => {
    const obj = { }
    const queryParams = nut.objectToQueryParams(obj)

    expect(queryParams).toBe('')
  })

  test('falsy', () => {
    expect(nut.objectToQueryParams(null)).toBe('')
    expect(nut.objectToQueryParams(undefined)).toBe('')
  })

  test('tricky value', () => {
    const obj = { a: 0 }
    const queryParams = nut.objectToQueryParams(obj)

    expect(queryParams).toBe('?a=0')
  })
})
