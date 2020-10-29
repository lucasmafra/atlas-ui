import React from 'react'
import { render, act } from '@testing-library/react'
import SequenceDiagram from './SequenceDiagram'

const mockData = {
  startTime: 0,
  durationMs: 1000,
  lifelines: [
    { name: 'serviceA', kind: 'service' },
    { name: 'serviceB', kind: 'service' }
  ],
  executionBoxes: [{ id: '1', startTime: 100, durationMs: 500, lifeline: 'serviceA' }],
  arrows: [{ id: '1', from: 'serviceA', to: 'serviceB', startTime: 150, label: 'GET /profiles/1' }]
}

test('render lifelines', async () => {
  await act(async () => {
    const { getByText } = render(<SequenceDiagram data={mockData} />)
    expect(getByText('serviceA')).toBeInTheDocument()
    expect(getByText('serviceB')).toBeInTheDocument()
  })
})

test('render executionBoxes', async () => {
  await act(async () => {
    const { getByTestId } = render(<SequenceDiagram data={mockData} />)
    expect(getByTestId('execution-box')).toBeInTheDocument()
  })
})

test('render arrows', async () => {
  await act(async () => {
    const { getByText } = render(<SequenceDiagram data={mockData} />)
    expect(getByText('GET /profiles/1')).toBeInTheDocument()
  })
})
