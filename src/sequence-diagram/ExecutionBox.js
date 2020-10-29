import React from 'react'
import { getExecutionBoxTheme, getExecutionBoxCoordinates, getExecutionBoxLength } from './drawing'

const ExecutionBox = ({ startTime, durationMs, lifeline, sequenceDiagram, theme }) => {
  const { color, width } = getExecutionBoxTheme(theme)
  const { x, y } = getExecutionBoxCoordinates(lifeline, startTime, sequenceDiagram, theme)
  const length = getExecutionBoxLength(startTime, durationMs, sequenceDiagram, theme)
  return <rect data-testid='execution-box' x={x} y={y} width={width} height={length} fill={color} />
}

export default ExecutionBox
