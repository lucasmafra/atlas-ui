import React from 'react'
import { getStreakCoordinates, getLifelineTheme } from './sequence-diagram/drawing'

const LifelineStreak = ({ length, theme }) => {
  const { streakWidth } = getLifelineTheme(theme)
  const { x, y } = getStreakCoordinates(theme)

  return (
    <g>
      <path
        id='lifeLine'
        strokeDasharray='5,5'
        stroke='black'
        strokeWidth={streakWidth}
        d={`M ${x} ${y} L ${x} ${y + length}`}
      />
    </g>
  )
}

export default LifelineStreak
