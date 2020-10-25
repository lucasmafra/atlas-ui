import * as nut from './min-y'

describe('minY', () => {
  test('does not apply a translation to y-axis that would result in x < minY', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 3 }
    const delta = { x: 2, y: -2 }
    expect(nut.minY({ matrix, delta, options: { minY: 2 } }).delta).toStrictEqual({
      x: 2,
      y: 0
    })
  })

  test('otherwise applies translation', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 3 }
    const delta = { x: 2, y: -2 }

    expect(nut.minY({ matrix, delta, options: { minY: 1 } }).delta).toStrictEqual({
      x: 2,
      y: -2
    })
  })

  test("when the option is not setted don't take any effect", () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 3 }
    const delta = { x: 2, y: -2 }

    expect(nut.minY({ matrix, delta, options: { minY: 1 } }).delta).toStrictEqual({
      x: 2,
      y: -2
    })
  })
})
