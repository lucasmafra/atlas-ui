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
