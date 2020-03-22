import React from 'react'
import { getLifelineTheme, getLifelineIconCoordinates } from './sequence-diagram/drawing'
import Icon from './Icon'

const LifelineIcon = ({ theme, icon, color }) => {
  const { iconSize } = getLifelineTheme(theme)
  const renderIcon = <Icon name={icon} size={iconSize} color={color} />
  const { x, y } = getLifelineIconCoordinates(theme)
  return <g transform={`translate(${x}, ${y})`}>{renderIcon}</g>
}

export default LifelineIcon
