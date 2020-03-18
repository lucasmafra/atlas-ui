import * as nut from './pan'

describe('pan', () => {
  test('returns a new matrix translated according to given delta x and delta y', () => {
    const transformationMatrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const delta = { x: 1, y: 2 }
    expect(nut.pan(transformationMatrix, delta)).toStrictEqual({
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: 1,
      f: 2
    })
  })

  describe('options', () => {
    describe('moveOnlyOneAxis', () => {
      test('only the axis corresopnding to the largrest delta is translated', () => {
        const transformationMatrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
        const delta = { x: 1, y: 2 } // delta y > delta x
        expect(nut.pan(transformationMatrix, delta, { moveOnlyOneAxis: true })).toStrictEqual({
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: 0, // does not apply translation to x
          f: 2 // applies translation to y
        })
      })
    })

    describe('dontPanOnFigureSmallerThanSvg', () => {
      test('when figure width is smaller than svg, translation to x is not applied', () => {
        const transformationMatrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
        const delta = { x: 1, y: 1 }
        const svgDimensions = { width: 1000, height: 1000 }
        const figureDimensions = { width: 800, height: 11000 } // height is ok, but figure width is smaller than svg width
        expect(
          nut.pan(
            transformationMatrix,
            delta,
            { dontPanOnFigureSmallerThanSvg: true },
            { svgDimensions, figureDimensions }
          )
        ).toStrictEqual({
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: 0, // does not apply translation to x axis
          f: 1 // applies translation to y axis
        })
      })

      test('when figure height is smaller than svg, translation to y is not applied', () => {
        const transformationMatrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
        const delta = { x: 1, y: 1 }
        const svgDimensions = { width: 1000, height: 1000 }
        const figureDimensions = { width: 1100, height: 800 } // width is ok, but figure height is smaller than svg height
        expect(
          nut.pan(
            transformationMatrix,
            delta,
            { dontPanOnFigureSmallerThanSvg: true },
            { svgDimensions, figureDimensions }
          )
        ).toStrictEqual({
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: 1, // applies translation to x axis
          f: 0 // does not apply translation to y axis
        })
      })
    })

    describe('minX', () => {
      test('does not apply a translation to x-axis that would result in x < minX', () => {
        const transformationMatrix = { a: 1, b: 0, c: 0, d: 1, e: 3, f: 0 }
        const delta = { x: -2, y: -2 }

        expect(nut.pan(transformationMatrix, delta, { minX: 2 })).toStrictEqual({
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: 3,
          f: -2
        })
      })

      test('otherwise applies translation', () => {
        const transformationMatrix = { a: 1, b: 0, c: 0, d: 1, e: 3, f: 0 }
        const delta = { x: -2, y: -2 }

        expect(nut.pan(transformationMatrix, delta, { minX: 1 })).toStrictEqual({
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: 1,
          f: -2
        })
      })
    })

    describe('maxX', () => {
      test('does not apply a translation to x-axis that would result in x > maxX', () => {
        const transformationMatrix = { a: 1, b: 0, c: 0, d: 1, e: 3, f: 0 }
        const delta = { x: 2, y: 2 }

        expect(nut.pan(transformationMatrix, delta, { maxX: 4 })).toStrictEqual({
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: 3,
          f: 2
        })
      })

      test('otherwise applies translation', () => {
        const transformationMatrix = { a: 1, b: 0, c: 0, d: 1, e: 3, f: 0 }
        const delta = { x: 2, y: 2 }

        expect(nut.pan(transformationMatrix, delta, { maxX: 5 })).toStrictEqual({
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: 5,
          f: 2
        })
      })
    })

    describe('minY', () => {
      test('does not apply a translation to y-axis that would result in y < minY', () => {
        const transformationMatrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 3 }
        const delta = { x: -2, y: -2 }

        expect(nut.pan(transformationMatrix, delta, { minY: 2 })).toStrictEqual({
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: -2,
          f: 3
        })
      })

      test('otherwise applies translation', () => {
        const transformationMatrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 3 }
        const delta = { x: -2, y: -2 }

        expect(nut.pan(transformationMatrix, delta, { minY: 1 })).toStrictEqual({
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: -2,
          f: 1
        })
      })
    })

    describe('maxY', () => {
      test('does not apply a translation to y-axis that would result in y > maxY', () => {
        const transformationMatrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 3 }
        const delta = { x: 2, y: 2 }

        expect(nut.pan(transformationMatrix, delta, { maxY: 4 })).toStrictEqual({
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: 2,
          f: 3
        })
      })

      test('otherwise applies translation', () => {
        const transformationMatrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 3 }
        const delta = { x: 2, y: 2 }

        expect(nut.pan(transformationMatrix, delta, { maxY: 5 })).toStrictEqual({
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: 2,
          f: 5
        })
      })
    })
  })
})
