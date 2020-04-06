import React from 'react'
import { render, act, wait } from '@testing-library/react'
import ArrowLabel from './ArrowLabel'

const theme = { arrow: { labelFontSize: 12, labelLineHeight: 1.5, labelLines: 2 } }

test('renders label', () => {
  const { getByText } = render(
    <svg>
      <ArrowLabel label={'/api/orders/1'} length={10} width={10} theme={theme} />
    </svg>
  )
  expect(getByText('/api/orders/1')).toBeInTheDocument()
})

test('optionally renders prefix', () => {
  const { getByText } = render(
    <svg>
      <ArrowLabel prefix={'GET'} label={'/api/orders/1'} length={10} width={10} theme={theme} />
    </svg>
  )
  expect(getByText(/GET/i)).toBeInTheDocument()
})
