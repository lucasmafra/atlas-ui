import PropTypes from 'prop-types'
import React from 'react'
import { getLifelineTheme, getLifelineIconCoordinates } from './drawing'
import Icon from './Icon'

const kindToIcon = {
  service: {
    name: 'hexagon',
    color: '#4387fd'
  },
  topic: {
    name: 'topic',
    color: '#4387fd'
  },
  mobile: {
    name: 'mobile',
    color: '#aa00ff'
  }
}

const LifelineIcon = ({ theme, kind }) => {
  const { iconSize } = getLifelineTheme(theme)
  const { name: iconName, color: iconColor } = kindToIcon[kind]
  const renderIcon = <Icon name={iconName} size={iconSize} color={iconColor} />
  const { x, y } = getLifelineIconCoordinates(theme)
  return (
    <svg>
      <g transform={`translate(${x}, ${y})`}>{renderIcon}</g>
    </svg>
  )
}

LifelineIcon.propTypes = {
  kind: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
}

export default LifelineIcon
