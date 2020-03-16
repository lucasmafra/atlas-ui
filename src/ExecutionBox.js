import React from 'react'

function ExecutionBox(props) {
  const { startTime, durationMs, lifeline, trace } = props
  const { durationMs: traceDurationMs, startTime: traceStartTime } = trace
  const index = trace.lifelines.findIndex(l => l.name === lifeline)
  const spaceBetweenLifelines = 300
  const baseLine = 160
  const x = spaceBetweenLifelines * index + 32
  const y = ((startTime - traceStartTime) * 100) / traceDurationMs + baseLine
  const length = (durationMs / traceDurationMs) * 100
  const width = 16
  const fill = '#FFD966'
  return <rect id='executionBox' x={x} y={y} width={width} height={length} fill={fill} />
}

export default ExecutionBox
