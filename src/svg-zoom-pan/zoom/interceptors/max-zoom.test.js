import * as nut from './max-zoom'

describe('maxZoom', () => {
  test('does not transform matrix if it results in matrix.a = matrix.d > maxZoom', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const scaleFactor = 1.5
    const options = { maxZoom: 1.25 }
    expect(nut.maxZoom({ matrix, scaleFactor, options }).scaleFactor).toBe(1)
  })

  test('when the option is not setted does not take any effect', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const scaleFactor = 1.5
    expect(nut.maxZoom({ matrix, scaleFactor, options: {} }).scaleFactor).toBe(1.5)
  })
})
