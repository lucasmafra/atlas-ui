import React, { useMemo } from 'react'
import { getNodeCoordinates, getNodeTheme } from './drawing'

const withStartTime = (sequenceDiagram) => ({
  ...sequenceDiagram,
  startTime: sequenceDiagram.nodes.map(node => node.time).sort()[0]
})

const NodeGroup = ({ nodeGroup, sequenceDiagram, theme, onSelectNode, selectedNode, onExpand }) => {
  const { radius, color } = getNodeTheme(theme)
  const { x, y } = useMemo(() => getNodeCoordinates(nodeGroup, withStartTime(sequenceDiagram), theme), [nodeGroup, sequenceDiagram, theme])
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx="0" cy="0" r={radius * 1.5} stroke={'black'} strokeWidth={2} fill={'blue'} onClick={() => onExpand(nodeGroup.id)}/>
      <foreignObject width={radius * 3} height={radius * 3} x={-9} y={-9} style={{
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                     }}>
        <span
          onClick={() => onExpand(nodeGroup.id)}
          style={{
            fontSsize: 10,
            color: 'white',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            lineHeight: '18px'
          }}>
        {nodeGroup.nodes.length}
        </span>
      </foreignObject>
    </g>
  )
}

export default NodeGroup
