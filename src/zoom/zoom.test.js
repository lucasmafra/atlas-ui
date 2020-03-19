import * as nut from './zoom'

describe('zoom', () => {
  test('returns a matrix scaled and translated accordingly to given parameters', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const scaleFactor = 2
    const point = { x: 5, y: 5 }
    expect(nut.zoom(matrix, scaleFactor, point)).toStrictEqual({
      a: 2,
      b: 0,
      c: 0,
      d: 2,
      e: -5,
      f: -5
    })
  })

  describe('options', () => {
    test('minZoom', () => {
      const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
      const scaleFactor = 0.5
      const point = { x: 5, y: 5 }
      const options = { minZoom: 0.75 }
      expect(nut.zoom(matrix, scaleFactor, point, options)).toStrictEqual({
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0
      })
    })

    test('maxZoom', () => {
      const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
      const scaleFactor = 1.5
      const point = { x: 5, y: 5 }
      const options = { maxZoom: 1.25 }
      expect(nut.zoom(matrix, scaleFactor, point, options)).toStrictEqual({
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0
      })
    })
  })
})
