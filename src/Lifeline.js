import React from 'react'
import Icon from './Icon'
import { tap } from './utils'

const Lifeline = props => {
  const { name, icon, color, trace, context } = props
  const {
    spaceBetweenLifelines,
    lifeline: {
      labelFontSize,
      iconSize,
      labelWidth,
      labelLineHeight,
      labelLines,
      labelIconMargin,
      iconStreakMargin,
      streakWidth
    }
  } = context
  const { lifelines } = trace
  const labelHeight = labelLineHeight * labelFontSize * labelLines
  const xCenter = labelWidth / 2
  const yIcon = labelHeight + labelIconMargin
  const yStreak = labelHeight + labelIconMargin + iconSize + iconStreakMargin
  const length = 10000
  const index = lifelines.findIndex(l => l.name === name)
  const renderIcon = <Icon name={icon} size={iconSize} color={tap(color)} />

  return (
    <g transform={`translate(${spaceBetweenLifelines * index}, 0)`}>
      <foreignObject width={labelWidth} height={labelHeight}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}>
          <p
            style={{
              fontWeight: 600,
              fontSize: labelFontSize,
              lineHeight: labelLineHeight,
              margin: 0,
              textAlign: 'center',
              textTransform: 'uppercase',
              userSelect: 'none',
              wordBreak: 'break-all',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box'
            }}>
            {name}
          </p>
        </div>
      </foreignObject>
      <g transform={`translate(${xCenter - iconSize / 2}, ${yIcon})`}>{renderIcon}</g>
      <path
        id='lifeLine'
        strokeDasharray='5,5'
        stroke='black'
        strokeWidth={streakWidth}
        d={`M ${xCenter} ${yStreak} L ${xCenter} ${yStreak + length}`}
      />
    </g>
  )
}

export default Lifeline
