import PropTypes from 'prop-types'
import React from 'react'
import LifelineLabel from './LifelineLabel'
import LifelineStreak from './LifelineStreak'
import { getLifelineOffset } from './drawing'
import LifelineIcon from './LifelineIcon'

const Lifeline = ({ name, kind, sequenceDiagram, theme }) => {

  return (
    <g>
      <LifelineLabel name={name} sequenceDiagram={sequenceDiagram} label={name} theme={theme} />
      <LifelineIcon name={name} sequenceDiagram={sequenceDiagram} kind={kind} theme={theme} />
      <LifelineStreak name={name} sequenceDiagram={sequenceDiagram} theme={theme} />
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
