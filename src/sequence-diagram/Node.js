import React, { useMemo } from 'react'
import { getNodeCoordinates, getNodeTheme, getNodeIndex } from './drawing'

const withStartTime = (sequenceDiagram) => ({
  ...sequenceDiagram,
  startTime: sequenceDiagram.nodes.map(node => node.time).sort()[0]
})

const Node = ({ node, sequenceDiagram, theme, onSelectNode, selectedNode }) => {
  const { radius, color } = getNodeTheme(theme)
  const { x, y } = useMemo(() => getNodeCoordinates(node, withStartTime(sequenceDiagram), theme), [node, sequenceDiagram, theme])
  const nodeIndex = useMemo(() => getNodeIndex(node, withStartTime(sequenceDiagram)), [node, sequenceDiagram, theme])
  const actualRadius = selectedNode && selectedNode.id === node.id ? radius * 1.4 : radius
  const strokeWidth = selectedNode && selectedNode.id === node.id ? 3 : 1
  const strokeColor = selectedNode && selectedNode.id === node.id ? 'blue' : 'black'
  return (
    <g transform={`translate(${x}, ${y})`} nodeIndex={nodeIndex}>
      <circle cx="0" cy="0" r={actualRadius} stroke={strokeColor} strokeWidth={strokeWidth} fill={color} onClick={() => onSelectNode(node)} />
    </g>
  )
}

export default Node
