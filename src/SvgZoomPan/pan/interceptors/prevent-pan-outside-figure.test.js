import * as nut from './prevent-pan-outside-figure'

describe('preventPanOutsideFigure', () => {
  const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
  const options = { preventPanOutsideFigure: true }
  const svgDimensions = { width: 100, height: 100 }
  const figureDimensions = { width: 160, height: 160 }
  const context = { svgDimensions, figureDimensions }

  test('don\t allow panning outside figure on the left', () => {
    const delta = { x: 5, y: -5 }
    expect(nut.preventPanOutsideFigure({ matrix, delta, options, context }).delta).toStrictEqual({
      x: 0,
      y: -5
    })
  })

  test('don\t allow panning outside figure on the right', () => {
    const delta = { x: -61, y: -5 }
    expect(nut.preventPanOutsideFigure({ matrix, delta, options, context }).delta).toStrictEqual({
      x: 0,
      y: -5
    })
  })

  test('don\t allow panning outside figure on the top', () => {
    const delta = { x: -5, y: 5 }
    expect(nut.preventPanOutsideFigure({ matrix, delta, options, context }).delta).toStrictEqual({
      x: -5,
      y: 0
    })
  })

  test('don\t allow panning outside figure on the bottom', () => {
    const delta = { x: -5, y: -61 }
    expect(nut.preventPanOutsideFigure({ matrix, delta, options, context }).delta).toStrictEqual({
      x: -5,
      y: 0
    })
  })

  test("when the option is not setted don't take any effect", () => {
    const delta = { x: 1000, y: 1000 }
    expect(
      nut.preventPanOutsideFigure({ matrix, delta, options: {}, context }).delta
    ).toStrictEqual({
      x: 1000,
      y: 1000
    })
  })
})
