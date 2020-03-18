import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders svg', () => {
  const { getByText } = render(<App />)
  const element = getByText(/app/i)
  expect(element).toBeInTheDocument()
})
