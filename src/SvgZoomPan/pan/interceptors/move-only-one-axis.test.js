import * as nut from './move-only-one-axis'

describe('moveOnlyOneAxis', () => {
  test('only the axis corresponding to the largest delta is translated', () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const delta = { x: 1, y: 2 } // delta y > delta x
    expect(
      nut.moveOnlyOneAxis({ matrix, delta, options: { moveOnlyOneAxis: true } }).delta
    ).toStrictEqual({
      x: 0,
      y: 2
    })
  })

  test("when the option is not setted don't take any effect", () => {
    const matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    const delta = { x: 1, y: 2 } // delta y > delta x
    expect(nut.moveOnlyOneAxis({ matrix, delta, options: {} }).delta).toStrictEqual({
      x: 1,
      y: 2
    })
  })
})
