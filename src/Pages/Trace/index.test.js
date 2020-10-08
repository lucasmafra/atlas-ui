import React from 'react'
import { render, act, wait } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Trace from './'

function TraceToBeTested() {
  return (
    <BrowserRouter>
      <Trace />
    </BrowserRouter>
  )
}

const serviceName = 'serviceA'

const mockJson = {
  sequence_diagram: {
    lifelines: [{ name: serviceName, kind: 'service' }],
    execution_boxes: [],
    arrows: [],
    start_time: 0,
    duration_ms: 1000
  }
}

fetch.mockResponse(JSON.stringify(mockJson))

test('fetches json and renders diagram', async () => {
  await act(async () => {
    const { getByText, queryByLabelText } = await render(<TraceToBeTested />)

    await wait(() => {
      expect(getByText(serviceName)).toBeInTheDocument()
      expect(queryByLabelText('Loading')).toBe(null)
    })
  })
})

test('while is fetching render loader', async () => {
  await act(async () => {
    const { getByLabelText, queryByText } = await render(<TraceToBeTested />)
    expect(getByLabelText('Loading')).toBeInTheDocument()
    expect(queryByText(serviceName)).toBe(null)
  })
})
