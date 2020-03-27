import * as nut from './misc'

test('snakeToCamel', () => {
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
