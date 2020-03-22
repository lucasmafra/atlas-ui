import React from 'react'
import { getExecutionBoxTheme, getExecutionBoxCoordinates, getExecutionBoxLength } from './drawing'

const ExecutionBox = ({ startTime, durationMs, lifeline, trace, context }) => {
  const { color, width } = getExecutionBoxTheme(context)
  const { x, y } = getExecutionBoxCoordinates(lifeline, startTime, trace, context)
  const length = getExecutionBoxLength(durationMs, trace)
  return <rect x={x} y={y} width={width} height={length} fill={color} />
}

export default ExecutionBox
