import * as nut from './prevent-pan-on-figure-smaller-than-svg'

describe('allowPanOnFigureSmallerThanSvg', () => {
  test('when figure width is smaller than svg, translation to x is not applied', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const delta = { x: 1, y: 1 }
    const svgDimensions = { width: 1000, height: 1000 }
    const figureDimensions = { width: 800, height: 11000 }
    expect(
      nut.preventPanOnFigureSmallerThanSvg({
        matrix,
        delta,
        options: { preventPanOnFigureSmallerThanSvg: true },
        context: { svgDimensions, figureDimensions }
      }).delta
    ).toStrictEqual({
      x: 0,
      y: 1
    })
  })

  test('when figure height is smaller than svg, translation to y is not applied', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const delta = { x: 1, y: 1 }
    const svgDimensions = { width: 1000, height: 1000 }
    const figureDimensions = { width: 1100, height: 800 }
    expect(
      nut.preventPanOnFigureSmallerThanSvg({
        matrix,
        delta,
        options: { preventPanOnFigureSmallerThanSvg: true },
        context: { svgDimensions, figureDimensions }
      }).delta
    ).toStrictEqual({
      x: 1,
      y: 0
    })
  })

  test("when the option is not setted don't take any effect", () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const delta = { x: 1, y: 1 }
    const svgDimensions = { width: 1000, height: 1000 }
    const figureDimensions = { width: 800, height: 800 }

    expect(
      nut.preventPanOnFigureSmallerThanSvg({
        matrix,
        delta,
        options: {},
        context: { svgDimensions, figureDimensions }
      }).delta
    ).toStrictEqual({
      x: 1,
      y: 1
    })
  })
})
