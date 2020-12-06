import React, { useMemo } from 'react'
import { getNodeCoordinates, getNodeTheme } from './drawing'

const withStartTime = (sequenceDiagram) => ({
  ...sequenceDiagram,
  startTime: sequenceDiagram.nodes.map(node => node.time).sort()[0]
})

const NodeGroup = ({ nodeGroup, sequenceDiagram, theme, onSelectNode, selectedNode, onExpand }) => {
  const { nodeGroupRadius, color } = getNodeTheme(theme)
  const { x, y } = useMemo(() => getNodeCoordinates(nodeGroup, withStartTime(sequenceDiagram), theme), [nodeGroup, sequenceDiagram, theme])
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx="0" cy="0" r={nodeGroupRadius} stroke={'black'} strokeWidth={2} fill={'blue'} onClick={() => onExpand(nodeGroup.id)}/>
      <foreignObject width={nodeGroupRadius * 2} height={nodeGroupRadius * 2} x={-nodeGroupRadius} y={-nodeGroupRadius} style={{
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                     }}>
        <span
          onClick={() => onExpand(nodeGroup.id)}
          style={{
            cursor: 'default',
            fontSize: 12,
            color: 'white',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            lineHeight: `${nodeGroupRadius * 2}px`
          }}>
        {nodeGroup.nodes.length}
        </span>
      </foreignObject>
    </g>
  )
}

export default NodeGroup
