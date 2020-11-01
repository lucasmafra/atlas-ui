import React, { useMemo } from 'react'
import { getStreakCoordinates, getLifelineTheme, getLifelineOffset, getLifelineStreakLength } from './drawing'

const LifelineStreak = ({ name, sequenceDiagram, theme }) => {
  const { streakWidth } = getLifelineTheme(theme)
  const { x, y } = getStreakCoordinates(theme)
  const streakLength = useMemo(() => getLifelineStreakLength(sequenceDiagram, theme), [sequenceDiagram, theme])
  const lifelineOffset = useMemo(() => getLifelineOffset(name, sequenceDiagram, theme), [name, sequenceDiagram, theme])
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
