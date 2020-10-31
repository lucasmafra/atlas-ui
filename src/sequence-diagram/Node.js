import React from 'react'
import { getNodeCoordinates, getNodeTheme } from './drawing'

const withStartTime = (sequenceDiagram) => ({
  ...sequenceDiagram,
  startTime: sequenceDiagram.nodes.map(node => node.time).sort()[0]
})

const Node = ({ node, sequenceDiagram, theme }) => {
  const { x, y } = getNodeCoordinates(node, withStartTime(sequenceDiagram), theme)
  const { radius } = getNodeTheme(theme)
  console.log('x, y', x, y)
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx="0" cy="0" r={radius} stroke="black" strokeWidth="2" fill="purple" />
    </g>
  )
}

export default Node
