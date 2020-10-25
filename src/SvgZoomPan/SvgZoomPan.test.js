import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SvgZoomPan from './SvgZoomPan'
import * as zoom from './zoom/zoom'
import * as pan from './pan/pan'

const dummyMatrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
zoom.zoom = jest.fn(() => dummyMatrix)
pan.pan = jest.fn(() => dummyMatrix)

beforeEach(jest.clearAllMocks)

test('can zoom by mouse wheeling on svg', () => {
  const { getByTestId } = render(<SvgZoomPan />)

  fireEvent.wheel(getByTestId('svg-zoom-pan'))

  expect(zoom.zoom).toHaveBeenCalled()
})

test('can pan by dragging mouse', () => {
  const { getByTestId } = render(<SvgZoomPan />)

  const svg = getByTestId('svg-zoom-pan')

  fireEvent.mouseDown(svg)
  fireEvent.mouseMove(svg)
  fireEvent.mouseUp(svg)

  expect(pan.pan).toHaveBeenCalled()
})

test('can zoom in by clicking on button', () => {
  const { getByLabelText } = render(<SvgZoomPan />)

  const zoomInButton = getByLabelText('Zoom in')

  fireEvent.click(zoomInButton)

  expect(zoom.zoom).toHaveBeenCalled()
})

test('can zoom out by clicking on button', () => {
  const { getByLabelText } = render(<SvgZoomPan />)

  const zoomOutButton = getByLabelText('Zoom out')

  fireEvent.click(zoomOutButton)

  expect(zoom.zoom).toHaveBeenCalled()
})
