import * as nut from './max-y'

describe('maxY', () => {
  test('does not apply a translation to y-axis that would result in y > maxY', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 3 }
    const delta = { x: 2, y: 2 }
    expect(nut.maxY({ matrix, delta, options: { maxY: 4 } }).delta).toStrictEqual({
      x: 2,
      y: 0
    })
  })

  test('otherwise applies translation', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 3 }
    const delta = { x: 2, y: 2 }

    expect(nut.maxY({ matrix, delta, options: { maxY: 5 } }).delta).toStrictEqual({
      x: 2,
      y: 2
    })
  })

  test("when the option is not setted don't take any effect", () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 3 }
    const delta = { x: 2, y: 2 }

    expect(nut.maxY({ matrix, delta, options: { maxY: 5 } }).delta).toStrictEqual({
      x: 2,
      y: 2
    })
  })
})
