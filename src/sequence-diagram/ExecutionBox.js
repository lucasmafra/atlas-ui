import React, { useMemo } from 'react'
import { getExecutionBoxTheme, getNodeCoordinates, getNodeTheme } from './drawing'
import { useHover } from  '../hooks/useHover.js'

const withStartTime = (sequenceDiagram) => ({
  ...sequenceDiagram,
  startTime: sequenceDiagram.nodes.map(node => node.time).sort()[0]
})

const ExecutionBox = ({ executionBox: { from, to }, sequenceDiagram, theme }) => {
  const { color, width } = getExecutionBoxTheme(theme)
  const { radius } = getNodeTheme(theme)
  const { x: x1, y: y1 } = useMemo(() => getNodeCoordinates(from, withStartTime(sequenceDiagram), theme), [from, sequenceDiagram, theme])
  const { x: x2, y: y2 } = useMemo(() => getNodeCoordinates(to, withStartTime(sequenceDiagram), theme), [to, sequenceDiagram, theme])
  return <rect data-testid='execution-box' x={x1-width/2} y={y1-radius - 4} width={width} height={y2-y1 + 2*radius + 8} stroke={color} strokeWidth={2} fill={'transparent'} />
}

export default ExecutionBox
