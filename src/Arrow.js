import React from 'react'
import { getArrowCoordinates, getArrowDirection, getArrowLength } from './sequence-diagram/drawing'
import ArrowLabel from './ArrowLabel'
import ArrowIcon from './ArrowIcon'

const Arrow = ({ from, to, startTime, label, trace, context }) => {
  const direction = getArrowDirection(from, to, trace)
  const { x, y } = getArrowCoordinates(from, to, startTime, trace, context)
  const length = getArrowLength(from, to, trace, context)

  return (
    <g transform={`translate(${x}, ${y})`}>
      <ArrowLabel label={label} length={length} context={context} />
      <ArrowIcon direction={direction} length={length} context={context} />
    </g>
  )
}

export default Arrow
