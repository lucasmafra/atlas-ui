import React from 'react'
import { getStreakCoordinates, getLifelineTheme, getLifelineOffset } from './drawing'

const LifelineStreak = ({ name, sequenceDiagram, theme }) => {
  const { streakWidth } = getLifelineTheme(theme)
  const { x, y } = getStreakCoordinates(theme)
  const streakLength = 32000 // TODO think of a better way to define this length
  const lifelineOffset = getLifelineOffset(name, sequenceDiagram, theme)
  return (
    <g transform={`translate(${lifelineOffset}, 0)`}>
      <path
        id='lifeLine'
        strokeDasharray='4,4'
        stroke='black'
        strokeWidth={streakWidth}
        d={`M ${x} ${y} L ${x} ${y + streakLength}`}
      />
    </g>
  )
}

export default LifelineStreak
