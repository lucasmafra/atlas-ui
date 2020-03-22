import React from 'react'
import { getArrowTheme, getArrowRotation } from './sequence-diagram/drawing'

const ArrowIcon = ({ context, direction, length }) => {
  const { color, headWidth, headHeight } = getArrowTheme(context)
  const { degrees, x, y } = getArrowRotation(direction, length, context)

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
