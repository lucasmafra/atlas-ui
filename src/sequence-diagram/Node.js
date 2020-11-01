import React from 'react'
import { getNodeCoordinates, getNodeTheme } from './drawing'

const withStartTime = (sequenceDiagram) => ({
  ...sequenceDiagram,
  startTime: sequenceDiagram.nodes.map(node => node.time).sort()[0]
})

const Node = ({ node, sequenceDiagram, theme, onSelectNode, selectedNode }) => {
  const { x, y } = getNodeCoordinates(node, withStartTime(sequenceDiagram), theme)
  const { radius, color } = getNodeTheme(theme)
  const actualRadius = selectedNode && selectedNode.id === node.id ? radius * 1.4 : radius
  const strokeWidth = selectedNode && selectedNode.id === node.id ? 3 : 1
  const strokeColor = selectedNode && selectedNode.id === node.id ? 'blue' : 'black'
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx="0" cy="0" r={actualRadius} stroke={strokeColor} strokeWidth={strokeWidth} fill={color} onClick={() => onSelectNode(node)} />
    </g>
  )
}

export default Node
