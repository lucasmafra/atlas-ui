import * as nut from './min-x'

describe('minX', () => {
  test('does not apply a translation to x-axis that would result in x < minX', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 3, f: 0 }
    const delta = { x: -2, y: 2 }
    expect(nut.minX({ matrix, delta, options: { minX: 2 } }).delta).toStrictEqual({
      x: 0,
      y: 2
    })
  })

  test('otherwise applies translation', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 3, f: 0 }
    const delta = { x: -2, y: 2 }

    expect(nut.minX({ matrix, delta, options: { minX: 1 } }).delta).toStrictEqual({
      x: -2,
      y: 2
    })
  })

  test("when the option is not setted don't take any effect", () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 3, f: 0 }
    const delta = { x: -2, y: 2 }
    expect(nut.minX({ matrix, delta, options: {} }).delta).toStrictEqual({
      x: -2,
      y: 2
    })
  })
})
