import * as nut from './misc'

describe('snakeToCamel', () => {
  test('camelize object keys', () => {
    const myObj = {
      attr_a: {
        attr_b: [{ attr_c: 'do_not_convert' }]
      }
    }
    expect(nut.snakeToCamel(myObj)).toStrictEqual({
      attrA: {
        attrB: [{ attrC: 'do_not_convert' }]
      }
    })
  })

  test('null safety', () => {
    expect(nut.snakeToCamel(null)).toBe(null)
    expect(nut.snakeToCamel({ attr_a: null })).toStrictEqual({ attrA: null })
  })
})
