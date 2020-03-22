import * as nut from './matrix'

describe('scale', () => {
  test('returns a matrix according to given factors', () => {
    expect(nut.scale(2, 3)).toStrictEqual({ a: 2, b: 0, c: 0, d: 3, e: 0, f: 0 })
  })

  test('when only one factor is given, scale is equal x and y (a and d)', () => {
    expect(nut.scale(2)).toStrictEqual({ a: 2, b: 0, c: 0, d: 2, e: 0, f: 0 })
  })
})

describe('translate', () => {
  test('returns translation matrix according to given params', () => {
    expect(nut.translate(1, 2)).toStrictEqual({ a: 1, b: 0, c: 0, d: 1, e: 1, f: 2 })
  })

  test('when only one param is given translation in y-axis defaults to zero', () => {
    expect(nut.translate(1)).toStrictEqual({ a: 1, b: 0, c: 0, d: 1, e: 1, f: 0 })
  })
})

describe('transform', () => {
  test('multiply matrixes', () => {
    const result = nut.transform(
      { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      nut.translate(1, 1),
      nut.scale(2)
    )
    expect(result).toStrictEqual({ a: 2, b: 0, c: 0, d: 2, e: 1, f: 1 })
  })

  test('the order matters', () => {
    const result = nut.transform(
      { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      nut.scale(2),
      nut.translate(1, 1)
    )
    expect(result).toStrictEqual({ a: 2, b: 0, c: 0, d: 2, e: 2, f: 2 })
  })
})

describe('applyToPoint', () => {
  test('applies a transformation matrix to a given (x,y) coordinate', () => {
    const transformationMatrix = nut.transform(
      { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      nut.translate(1, 1),
      nut.scale(2)
    )
    expect(nut.applyToPoint(transformationMatrix, { x: 2, y: 3 })).toStrictEqual({ x: 5, y: 7 })
  })
})
