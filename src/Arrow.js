import React from 'react'
import { getStreakY, getLifelineHorizontalCenter } from './drawing'

function Arrow(props) {
  const { from, to, startTime, label, trace, context } = props
  const {
    spaceBetweenLifelines,
    executionBox,
    arrow: { labelFontSize, labelLineHeight, labelLines }
  } = context
  const { lifelines, durationMs: traceDurationMs, startTime: traceStartTime } = trace
  const fromIndex = lifelines.findIndex(l => l.name === from)
  const toIndex = lifelines.findIndex(l => l.name === to)
  const direction = fromIndex < toIndex ? 'right' : 'left'
  const headWidth = 4
  const headHeight = 8
  const labelHeight = labelFontSize * labelLineHeight * labelLines
  const x = getLifelineHorizontalCenter(context) + executionBox.width - 8
  const xOffset =
    direction === 'right' ? spaceBetweenLifelines * fromIndex : spaceBetweenLifelines * toIndex

  const y = getStreakY(context)
  const yOffset = ((startTime - traceStartTime) * 100) / traceDurationMs

  const length = Math.abs(toIndex - fromIndex) * spaceBetweenLifelines - 20

  const color = '#545b64'

  const rotate =
    direction === 'right' ? '' : `rotate(180, ${(length + headWidth) / 2}, ${headHeight})`

  return (
    <g>
      <foreignObject
        width={length}
        x={x + xOffset}
        y={y + yOffset - labelHeight}
        height={labelHeight}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            height: '100%'
          }}>
          <p
            style={{
              fontStyle: 'italic',
              fontSize: labelFontSize,
              lineHeight: labelLineHeight,
              margin: 0,
              textAlign: 'center',
              userSelect: 'none',
              wordBreak: 'break-all',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box'
            }}>
            {label}
          </p>
        </div>
      </foreignObject>
      <g transform={`translate(${x + xOffset}, ${y + yOffset}) ${rotate}`}>
        <path
          d={`M 0 ${headHeight} L ${length} ${headHeight}`}
          fill='none'
          stroke={color}
          strokeMiterlimit='10'
          strokeWidth='2'></path>
        <path
          d={`M ${length - 6} 12 L ${length + 2} ${headHeight} L ${length - 6} ${headWidth}`}
          fill='none'
          stroke={color}
          strokeWidth='2'
          strokeMiterlimit='10'></path>
      </g>
    </g>
  )
}

export default Arrow
