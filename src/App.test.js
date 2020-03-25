import React from 'react'
import { render, act, wait } from '@testing-library/react'
import App from './App'

const serviceName = 'serviceA'

const mockJson = {
  lifelines: [{ name: serviceName }],
  executionBoxes: [],
  arrows: [],
  startTime: 0,
  durationMs: 1000
}

fetch.mockResponse(JSON.stringify(mockJson))

test('fetches json and renders diagram', async () => {
  await act(async () => {
    const { getByText, queryByLabelText } = await render(<App />)

    await wait(() => {
      expect(getByText(serviceName)).toBeInTheDocument()
      expect(queryByLabelText('Loading')).toBe(null)
    })
  })
})

test('while is fetching render loader', async () => {
  await act(async () => {
    const { getByLabelText, queryByText } = await render(<App />)
    expect(getByLabelText('Loading')).toBeInTheDocument()
    expect(queryByText(serviceName)).toBe(null)
  })
})
