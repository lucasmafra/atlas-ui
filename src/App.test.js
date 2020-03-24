import React from 'react'
import { render, act, wait } from '@testing-library/react'
import App from './App'

const mockJson = {
  lifelines: [{ name: 'serviceA' }],
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
      expect(getByText('serviceA')).toBeInTheDocument()
      expect(queryByLabelText('Loading')).toBe(null)
    })
  })
})

test('while is fetching render loader', async () => {
  await act(async () => {
    const { getByLabelText, queryByText } = await render(<App />)
    expect(getByLabelText('Loading')).toBeInTheDocument()
    expect(queryByText('serviceA')).toBe(null)
  })
})
