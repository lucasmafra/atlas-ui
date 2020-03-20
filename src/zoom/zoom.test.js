import * as nut from './zoom'

describe('zoom', () => {
  test('zooms at point - new matrix is scaled and translated around given point', () => {
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
    test('preventZoomOutsideFigure', () => {
      const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
      const scaleFactor = 0.6
      const point = { x: 2, y: 2 }
      const options = { preventZoomOutsideFigure: true }
      const svgDimensions = { width: 100, height: 100 }
      const figureDimensions = { width: 200, height: 200 }
      const context = { svgDimensions, figureDimensions }

      expect(nut.zoom(matrix, scaleFactor, point, options, context)).toStrictEqual({
        a: 0.6,
        b: 0,
        c: 0,
        d: 0.6,
        e: 0,
        f: 0
      })
    })
  })
})
