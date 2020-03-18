import React from 'react'
import MobileIcon from './MobileIcon'
import HexagonIcon from './HexagonIcon'
import TopicIcon from './TopicIcon'

const icons = {
  mobile: <MobileIcon />,
  hexagon: <HexagonIcon />,
  topic: <TopicIcon />
}

function Lifeline(props) {
  const { name, icon, trace } = props
  const { lifelines } = trace
  const spaceBetweenLifelines = 300
  const baseLine = 40
  const x0 = 40
  const y0 = 152
  const length = 1800
  const index = lifelines.findIndex(l => l.name === name)
  const renderIcon = icons[icon]
  return (
    <g transform={`translate(${spaceBetweenLifelines * index}, 0)`}>
      <text
        x={40}
        y={baseLine + 8}
        fill='black'
        textAnchor='middle'
        style={{
          fontWeight: 600,
          fontSize: 16,
          textTransform: 'uppercase',
          WebkitTouchCallout: 'none' /* iOS Safari */,
          WebkitUserSelect: 'none' /* Safari */,
          KhtmlUserSelect: 'none' /* Konqueror HTML */,
          MozUserSelect: 'none' /* Old versions of Firefox */,
          msUserSelect: 'none' /* Internet Explorer/Edge */,
          userSelect: 'none'
        }}>
        {name}
      </text>
      <g transform={`translate(0, ${baseLine})`}>{renderIcon}</g>
      <path
        id='lifeLine'
        strokeDasharray='5,5'
        stroke='black'
        strokeWidth='2'
        d={`M ${x0} ${y0} L ${x0} ${y0 + length}`}
      />
    </g>
  )
}

export default Lifeline
