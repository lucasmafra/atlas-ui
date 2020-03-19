import * as nut from './prevent-zoom-outside-figure'
import { transform, scale, translate, applyToPoint } from '../../matrix'

// ax0 - ax0k + e = 0
// x0(a - ak) + e = 0
//

describe('preventZoomOutsideFigure', () => {
  test('adjusts point coordinate so final translation won\t be larger than zero and new point is as close as the original one', () => {
    const matrix = { a: 2, b: 0, c: 0, d: 2, e: -1, f: -1 }
    const scaleFactor = 0.2
    const point = { x: 2, y: 2 }
    const options = { preventZoomOutsideFigure: true }
    const svgDimensions = { width: 100, height: 100 }
    const figureDimensions = { width: 400, height: 400 }
    const context = { svgDimensions, figureDimensions }

    expect(
      nut.preventZoomOutsideFigure({ matrix, scaleFactor, point, options, context }).point
    ).toStrictEqual({
      x: 0.625,
      y: 0.625
    })
  })

  test('adjusts point coordinate so final translation won\t be smaller than the difference between figure new dimensions and svg dimensions', () => {
    const matrix = { a: 2, b: 0, c: 0, d: 2, e: -174, f: -174 }
    const scaleFactor = 0.4
    const point = { x: 90, y: 90 }
    const options = { preventZoomOutsideFigure: true }
    const svgDimensions = { width: 100, height: 100 }
    const figureDimensions = { width: 200, height: 200 }
    const context = { svgDimensions, figureDimensions }

    expect(
      nut.preventZoomOutsideFigure({ matrix, scaleFactor, point, options, context }).point
    ).toStrictEqual({
      x: 95,
      y: 95
    })
  })

  test('when no adjustment to point is necessary, does nothing', () => {
    const matrix = { a: 2, b: 0, c: 0, d: 2, e: -162, f: -162 }
    const scaleFactor = 0.4
    const point = { x: 90, y: 90 }
    const options = { preventZoomOutsideFigure: true }
    const svgDimensions = { width: 100, height: 100 }
    const figureDimensions = { width: 200, height: 200 }
    const context = { svgDimensions, figureDimensions }

    expect(
      nut.preventZoomOutsideFigure({ matrix, scaleFactor, point, options, context }).point
    ).toStrictEqual({
      x: 90,
      y: 90
    })
  })

  test('when theres not point that satisfies condition, change scaleFactor to 1 (noop)', () => {
    const matrix = { a: 2, b: 0, c: 0, d: 2, e: -1, f: -1 }
    const scaleFactor = 0.2
    const point = { x: 2, y: 2 }
    const options = { preventZoomOutsideFigure: true }
    const svgDimensions = { width: 100, height: 100 }
    const figureDimensions = { width: 200, height: 200 }
    const context = { svgDimensions, figureDimensions }

    expect(
      nut.preventZoomOutsideFigure({ matrix, scaleFactor, point, options, context }).scaleFactor
    ).toBe(1)
  })

  test('when the option is not setted does not take any effect', () => {
    const matrix = { a: 2, b: 0, c: 0, d: 2, e: -1, f: -1 }
    const scaleFactor = 0.2
    const point = { x: 2, y: 2 }
    const svgDimensions = { width: 100, height: 100 }
    const figureDimensions = { width: 200, height: 200 }
    const context = { svgDimensions, figureDimensions }

    expect(
      nut.preventZoomOutsideFigure({ matrix, scaleFactor, point, options: {}, context }).scaleFactor
    ).toBe(scaleFactor)

    expect(
      nut.preventZoomOutsideFigure({ matrix, scaleFactor, point, options: {}, context }).point
    ).toStrictEqual(point)
  })
})
