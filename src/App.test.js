import React from 'react'
import { render, act } from '@testing-library/react'
import App from './App'

test('renders sequence diagram', async () => {
  await act(async () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('sequence-diagram')).toBeInTheDocument()
  })
})
