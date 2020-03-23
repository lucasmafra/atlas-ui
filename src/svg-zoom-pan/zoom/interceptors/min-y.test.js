import * as nut from './min-y'

describe('minY', () => {
  test('if zooming would translate top most y to y > minY, applies correction on matrix', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const point = { x: 5, y: 5 }
    const scaleFactor = 0.2
    const options = { minY: 0 }

    expect(nut.minY({ matrix, point, scaleFactor, options }).matrix).toStrictEqual({
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: 0,
      f: -4
    })
  })

  test('otherwise does nothing', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const point = { x: 5, y: 5 }
    const scaleFactor = 1.2
    const options = { minX: 0 }

    expect(nut.minY({ matrix, point, scaleFactor, options }).matrix).toStrictEqual({
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: 0,
      f: 0
    })
  })
})
