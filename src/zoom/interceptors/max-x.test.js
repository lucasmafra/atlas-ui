import * as nut from './max-x'

describe('maxX', () => {
  test('if zooming would translate right most x to x < svg width, applies correction on matrix', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: -50, f: -50 }
    const point = { x: 90, y: 90 }
    const scaleFactor = 0.8
    const options = { maxX: 100 }
    const svgDimensions = { width: 100, height: 100 }
    const figureDimensions = { width: 150, height: 150 }
    const context = { svgDimensions, figureDimensions }

    expect(nut.maxX({ matrix, point, scaleFactor, options, context }).matrix).toStrictEqual({
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: -38,
      f: -50
    })
  })

  test('otherwise does nothing', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const point = { x: 90, y: 90 }
    const scaleFactor = 0.8
    const options = { maxX: 100 }
    const svgDimensions = { width: 100, height: 100 }
    const figureDimensions = { width: 150, height: 150 }
    const context = { svgDimensions, figureDimensions }

    expect(nut.maxX({ matrix, point, scaleFactor, options, context }).matrix).toStrictEqual({
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: 0,
      f: 0
    })
  })
})
