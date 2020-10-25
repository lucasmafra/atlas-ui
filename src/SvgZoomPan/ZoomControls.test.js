import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ZoomControls from './ZoomControls'

const mockCallback = jest.fn()

test('clicking on zoomIn button triggers onZoomIn callback', () => {
  const { getByLabelText } = render(<ZoomControls onZoomIn={mockCallback} />)

  fireEvent.click(getByLabelText('Zoom in'))

  expect(mockCallback).toHaveBeenCalled()
})

test('clicking on zoomOut button triggers onZoomOut callback', () => {
  const { getByLabelText } = render(<ZoomControls onZoomOut={mockCallback} />)

  fireEvent.click(getByLabelText('Zoom out'))

  expect(mockCallback).toHaveBeenCalled()
})

test('clicking on fitToScreen button triggers onFitToScreen callback', () => {
  const { getByLabelText } = render(<ZoomControls onFitToScreen={mockCallback} />)

  fireEvent.click(getByLabelText('Fit to screen'))

  expect(mockCallback).toHaveBeenCalled()
})
