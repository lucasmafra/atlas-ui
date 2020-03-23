import React from 'react'
import { getStreakCoordinates, getLifelineTheme } from './drawing'

const LifelineStreak = ({ length, theme }) => {
  const { streakWidth } = getLifelineTheme(theme)
  const { x, y } = getStreakCoordinates(theme)

  return (
    <g>
      <path
        id='lifeLine'
        strokeDasharray='4,4'
        stroke='black'
        strokeWidth={streakWidth}
        d={`M ${x} ${y} L ${x} ${y + length}`}
      />
    </g>
  )
}

export default LifelineStreak
