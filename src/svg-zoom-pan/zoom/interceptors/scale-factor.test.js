import * as nut from './scale-factor'

describe('scaleFactor', () => {
  test('when zoomMode is ZOOM_IN, increments scale factor according to zoomVelocity', () => {
    const zoomVelocity = 0.1
    const options = { zoomMode: 'ZOOM_IN', zoomVelocity: 0.1 }
    expect(nut.scaleFactor({ options }).scaleFactor).toBe(1.1)
  })

  test('when zoomMode is ZOOM_OUT, subtracts scale factor according to zoomVelocity', () => {
    const options = { zoomMode: 'ZOOM_OUT', zoomVelocity: 0.1 }
    expect(nut.scaleFactor({ options }).scaleFactor).toBe(0.9)
  })

  test('zoomVelocity defaults to 0.01', () => {
    const options = { zoomMode: 'ZOOM_IN' }
    expect(nut.scaleFactor({ options }).scaleFactor).toBe(1.01)
  })
})
