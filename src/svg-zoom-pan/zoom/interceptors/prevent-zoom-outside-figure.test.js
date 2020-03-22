import * as nut from './prevent-zoom-outside-figure'

describe('preventZoomOutsideFigure', () => {
  test('applies correction to matrix so zoom does not takes figure out of the svg', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const scaleFactor = 0.6
    const point = { x: 2, y: 2 }
    const options = { preventZoomOutsideFigure: true }
    const svgDimensions = { width: 100, height: 100 }
    const figureDimensions = { width: 200, height: 200 }
    const context = { svgDimensions, figureDimensions }
    expect(
      nut.preventZoomOutsideFigure({ matrix, scaleFactor, point, options, context })
    ).toMatchObject({
      matrix: { a: 1, b: 0, c: 0, d: 1, e: -0.8, f: -0.8 },
      scaleFactor: 0.6
    })
  })

  test('when zooming would make figure smaller than svg sets scaleFactor to 1 (noop)', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const scaleFactor = 0.1
    const point = { x: 2, y: 2 }
    const options = { preventZoomOutsideFigure: true }
    const svgDimensions = { width: 100, height: 100 }
    const figureDimensions = { width: 200, height: 200 }
    const context = { svgDimensions, figureDimensions }
    expect(
      nut.preventZoomOutsideFigure({ matrix, scaleFactor, point, options, context }).scaleFactor
    ).toBe(1)
  })

  test('when option is absent does nothing', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const scaleFactor = 0.1
    const point = { x: 2, y: 2 }
    const svgDimensions = { width: 100, height: 100 }
    const figureDimensions = { width: 200, height: 200 }
    const context = { svgDimensions, figureDimensions }
    expect(
      nut.preventZoomOutsideFigure({ matrix, scaleFactor, point, options: {}, context })
    ).toMatchObject({ matrix, scaleFactor })
  })
})
