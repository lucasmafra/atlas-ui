import * as nut from './min-zoom'

describe('minZoom', () => {
  test('does not transform matrix if it results in matrix.a = matrix.d < minZoom', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const scaleFactor = 0.25
    const options = { minZoom: 0.5 }
    expect(nut.minZoom({ matrix, scaleFactor, options }).scaleFactor).toBe(1)
  })

  test('when the option is not setted does not take any effect', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const scaleFactor = 0.25
    expect(nut.minZoom({ matrix, scaleFactor, options: {} }).scaleFactor).toBe(0.25)
  })
})
