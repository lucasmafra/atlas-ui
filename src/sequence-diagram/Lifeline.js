import PropTypes from 'prop-types'
import React from 'react'
import LifelineLabel from './LifelineLabel'
import LifelineStreak from './LifelineStreak'
import { getLifelineOffset } from './drawing'
import LifelineIcon from './LifelineIcon'

const Lifeline = ({ name, kind, sequenceDiagram, theme }) => {
  const streakLength = 1500 // TODO think of a better way to define this length
  const x = getLifelineOffset(name, sequenceDiagram, theme)
  return (
    <g transform={`translate(${x}, 0)`}>
      <LifelineLabel label={name} theme={theme} />
      <LifelineIcon kind={kind} theme={theme} />
      <LifelineStreak length={streakLength} theme={theme} />
    </g>
  )
}

Lifeline.propTypes = {
  kind: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sequenceDiagram: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default Lifeline
