import React from 'react'
import { getArrowCoordinates, getArrowDirection, getArrowLength } from './drawing'
import ArrowLabel from './ArrowLabel'
import ArrowIcon from './ArrowIcon'

const Arrow = ({ from, to, startTime, prefix, label, sequenceDiagram, theme }) => {
  const direction = getArrowDirection(from, to, sequenceDiagram)
  const { x, y } = getArrowCoordinates(from, to, startTime, sequenceDiagram, theme)
  const length = getArrowLength(from, to, sequenceDiagram, theme)

  return (
    <g transform={`translate(${x}, ${y})`}>
      <ArrowLabel prefix={prefix} label={label} length={length} theme={theme} />
      <ArrowIcon direction={direction} length={length} theme={theme} />
    </g>
  )
}

export default Arrow
