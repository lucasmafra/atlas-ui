import React from 'react'
import LifelineLabel from './LifelineLabel'
import LifelineStreak from './LifelineStreak'
import { getLifelineOffset } from './drawing'
import LifelineIcon from './LifelineIcon'

const Lifeline = ({ name, icon, color, trace, context }) => {
  const streakLength = 10000
  const x = getLifelineOffset(name, trace, context)
  return (
    <g transform={`translate(${x}, 0)`}>
      <LifelineLabel label={name} theme={context} />
      <LifelineIcon icon={icon} color={color} theme={context} />
      <LifelineStreak length={streakLength} theme={context} />
    </g>
  )
}

export default Lifeline
