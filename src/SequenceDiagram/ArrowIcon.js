import React from 'react'
import { getArrowTheme, getArrowRotation } from './drawing'

const ArrowIcon = ({ direction, length, theme }) => {
  const { color, headWidth, headHeight } = getArrowTheme(theme)
  const { degrees, x, y } = getArrowRotation(direction, length, theme)

  return (
    <g transform={`rotate(${degrees}, ${x}, ${y})`}>
      <path
        d={`M 0 ${headHeight} L ${length} ${headHeight}`}
        fill='none'
        stroke={color}
        strokeWidth='2'></path>
      <path
        d={`M ${length - 6} 12 L ${length + 2} ${headHeight} L ${length - 6} ${headWidth}`}
        fill='none'
        stroke={color}
        strokeWidth='2'></path>
    </g>
  )
}

export default ArrowIcon
