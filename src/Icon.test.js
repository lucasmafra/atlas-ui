import React from 'react'
import { render } from '@testing-library/react'
import Icon from './Icon'
import { act } from 'react-dom/test-utils'

test('fetch icon according to name ', async () => {
  await act(async () => {
    render(<Icon name={'my-icon'} />)
  })
  expect(fetch).toHaveBeenCalledWith('/icons/my-icon.svg')
})

test('size', async () => {
  await act(async () => {
    const { getByLabelText } = render(<Icon size={48} name={'my-icon'} />)
    expect(getByLabelText('Svg').getAttribute('width')).toBe('48')
    expect(getByLabelText('Svg').getAttribute('height')).toBe('48')
  })
})

test('color', async () => {
  await act(async () => {
    const { getByLabelText } = render(<Icon color='red' name={'my-icon'} />)
    expect(getByLabelText('Svg').getAttribute('fill')).toBe('red')
  })
})
