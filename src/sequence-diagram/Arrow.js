import React, { useMemo } from 'react'
import { getNodeCoordinates, getNodeTheme } from './drawing'

const withStartTime = (sequenceDiagram) => ({
  ...sequenceDiagram,
  startTime: sequenceDiagram.nodes.map(node => node.time).sort()[0]
})

const Arrow = ({ arrow: { from, to, kind }, sequenceDiagram, theme }) => {
  const { nodeGroupRadius, color, borderColor, radius } = getNodeTheme(theme)
  const { x: x1, y: y1 } = useMemo(() => getNodeCoordinates(from, withStartTime(sequenceDiagram), theme), [from, sequenceDiagram, theme])
  const { x: x2, y: y2 } = useMemo(() => getNodeCoordinates(to, withStartTime(sequenceDiagram), theme), [to, sequenceDiagram, theme])

  const direction = x1 < x2 ? 'right' : 'left'

  const actualX1 = direction ==  'right' ? x1 + radius : x1 - radius
  const actualX2 = direction == 'right' ? x2 - radius - 2 : x2 + radius + 2

  return (
    <g debug="arrow">
      <marker id="markerArrow" viewBox="0 0 10 10" refX="5" refY="5"
        markerWidth="6" markerHeight="6"
        orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
      <path
        marker-end='url(#markerArrow)'
        strokeDasharray={kind == 'sync' ? undefined : '4,4'}
        id='arrow'
        stroke={'black'}
        strokeWidth={1}
        style={{ cursor: 'pointer'}}
        d={`M ${actualX1} ${y1} L ${actualX2} ${y2}`}
      />
    </g>
  )
}

export default Arrow
