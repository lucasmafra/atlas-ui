import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { getLifelineTheme, getLifelineIconCoordinates, getLifelineOffset } from './drawing'
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

const LifelineIcon = ({ theme, kind, name, sequenceDiagram }) => {
  const { iconSize } = getLifelineTheme(theme)
  const { name: iconName, color: iconColor } = kindToIcon[kind]
  const renderIcon = <Icon name={iconName} size={iconSize} color={iconColor} />
  const { x, y } = getLifelineIconCoordinates(theme)
  const lifelineOffset = useMemo(() => getLifelineOffset(name, sequenceDiagram, theme), [name, sequenceDiagram, theme])
  return <g transform={`translate(${x + lifelineOffset}, ${y})`}>{renderIcon}</g>
}

LifelineIcon.propTypes = {
  kind: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
}

export default LifelineIcon
