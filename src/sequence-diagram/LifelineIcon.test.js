import React from 'react'
import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import LifelineIcon from './LifelineIcon'
import Icon from './Icon'

jest.mock('./Icon', () => jest.fn(() => null))

const theme = {
  lifeline: {
    labelWidth: 120,
    labelFontSize: 16,
    labelLineHeight: 1.5,
    labelLines: 2,
    iconSize: 48,
    labelIconMargin: 8,
    iconStreakMargin: 4
  }
}

describe('Tests icon names renders correctly when', () => {
  test('kind is service', async () => {
    await act(async () => {
      render(<LifelineIcon kind={'service'} theme={theme}/>)

      expect(Icon.mock.calls[0][0].name).toBe('hexagon')
    })
  })

  test('kind is topic', async () => {
    await act(async () => {
      render(<LifelineIcon kind={'topic'} theme={theme}/>)

      expect(Icon.mock.calls[0][0].name).toBe('topic')
    })
  })

  test('kind is mobile', async () => {
    await act(async () => {
      render(<LifelineIcon kind={'mobile'} theme={theme}/>)

      expect(Icon.mock.calls[0][0].name).toBe('mobile')
    })
  })
})

describe('Tests icon colors renders correctly when', () => {
  test('kind is service', async () => {
    await act(async () => {
      render(<LifelineIcon kind={'service'} theme={theme}/>)

      expect(Icon.mock.calls[0][0].color).toBe('#4387fd')
    })
  })

  test('kind is topic', async () => {
    await act(async () => {
      render(<LifelineIcon kind={'topic'} theme={theme}/>)

      expect(Icon.mock.calls[0][0].color).toBe('#4387fd')
    })
  })

  test('kind is mobile', async () => {
    await act(async () => {
      render(<LifelineIcon kind={'mobile'} theme={theme}/>)

      expect(Icon.mock.calls[0][0].color).toBe('#aa00ff')
    })
  })
})
