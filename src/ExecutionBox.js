import React from 'react'

const ExecutionBox = props => {
  const { startTime, durationMs, lifeline, trace, context } = props
  const {
    spaceBetweenLifelines,
    lifeline: {
      labelWidth,
      labelFontSize,
      labelLines,
      labelLineHeight,
      iconSize,
      labelIconMargin,
      iconStreakMargin
    },
    executionBox: { width }
  } = context
  const labelHeight = labelLineHeight * labelFontSize * labelLines
  const { durationMs: traceDurationMs, startTime: traceStartTime } = trace
  const index = trace.lifelines.findIndex(l => l.name === lifeline)
  const xCenter = spaceBetweenLifelines * index + labelWidth / 2 - width / 2
  const y = labelHeight + iconSize + labelIconMargin + iconStreakMargin
  const yOffset = ((startTime - traceStartTime) * 100) / traceDurationMs
  const length = (durationMs / traceDurationMs) * 100
  const fill = '#ffd966'
  return <rect x={xCenter} y={y + yOffset} width={width} height={length} fill={fill} />
}

export default ExecutionBox
