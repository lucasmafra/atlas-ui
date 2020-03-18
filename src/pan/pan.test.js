import * as nut from './pan'

describe('pan', () => {
  test('returns a new matrix translated according to given delta x and delta y', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const delta = { x: 1, y: 2 }
    expect(nut.pan(matrix, delta)).toStrictEqual({
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: 1,
      f: 2
    })
  })

  describe('options', () => {
    test('preventPanOutsideFigure', () => {
      const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
      const delta = { x: -101, y: -5 }
      const options = { preventPanOutsideFigure: true }
      const svgDimensions = { width: 100, height: 100 }
      const figureDimensions = { width: 160, height: 160 }
      const context = { svgDimensions, figureDimensions }
      expect(nut.pan(matrix, delta, options, context)).toStrictEqual({
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: -5
      })
    })

    test('moveOnlyOneAxis', () => {
      const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
      const delta = { x: 2, y: 3 }
      const options = { moveOnlyOneAxis: true }
      expect(nut.pan(matrix, delta, options)).toStrictEqual({
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 3
      })
    })

    test('preventPanOnFigureSmallerThanSvg', () => {
      const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
      const delta = { x: 2, y: 3 }
      const svgDimensions = { width: 1000, height: 1000 }
      const figureDimensions = { width: 800, height: 1200 }
      const context = { svgDimensions, figureDimensions }
      const options = { preventPanOnFigureSmallerThanSvg: true }
      expect(nut.pan(matrix, delta, options, context)).toStrictEqual({
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 3
      })
    })
  })
})
