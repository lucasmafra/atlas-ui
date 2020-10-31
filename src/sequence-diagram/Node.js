import React from 'react'
import { getNodeCoordinates, getNodeTheme } from './drawing'

const withStartTime = (sequenceDiagram) => ({
  ...sequenceDiagram,
  startTime: sequenceDiagram.nodes.map(node => node.time).sort()[0]
})

const Node = ({ node, sequenceDiagram, theme }) => {
  const { x, y } = getNodeCoordinates(node, withStartTime(sequenceDiagram), theme)
  const { radius } = getNodeTheme(theme)
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx="0" cy="0" r={radius} stroke="black" strokeWidth="1" fill="purple" />
    </g>
  )
}

export default Node
