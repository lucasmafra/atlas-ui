import * as nut from './pan-velocity'

describe('panVelocity', () => {
  test('multiplies delta according to given factor', () => {
    const delta = { x: 2, y: 3 }
    expect(nut.panVelocity({ delta, options: { panVelocity: 2 } }).delta).toStrictEqual({
      x: 4,
      y: 6
    })
  })

  test('defaults to 1', () => {
    const delta = { x: 2, y: 3 }
    expect(nut.panVelocity({ delta, options: {} }).delta).toStrictEqual({
      x: 2,
      y: 3
    })
  })
})
