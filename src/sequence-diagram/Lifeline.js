import React from 'react'
import LifelineLabel from './LifelineLabel'
import LifelineStreak from './LifelineStreak'
import { getLifelineOffset } from './drawing'
import LifelineIcon from './LifelineIcon'

const Lifeline = ({ name, icon, color, sequenceDiagram, theme }) => {
  const streakLength = 600 // TODO think of a better way to define this length
  const x = getLifelineOffset(name, sequenceDiagram, theme)
  return (
    <g transform={`translate(${x}, 0)`}>
      <LifelineLabel label={name} theme={theme} />
      <LifelineIcon icon={icon} color={color} theme={theme} />
      <LifelineStreak length={streakLength} theme={theme} />
    </g>
  )
}

export default Lifeline
