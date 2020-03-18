import React from 'react'

function Arrow(props) {
  const { from, to, startTime, label, trace } = props
  const { lifelines, durationMs: traceDurationMs, startTime: traceStartTime } = trace
  const fromIndex = lifelines.findIndex(l => l.name === from)
  const toIndex = lifelines.findIndex(l => l.name === to)
  const spaceBetweenLifelines = 300
  const direction = fromIndex < toIndex ? 'right' : 'left'
  const baseLine = 160

  const x =
    direction === 'right'
      ? spaceBetweenLifelines * fromIndex + 48
      : spaceBetweenLifelines * toIndex + 48

  const y = ((startTime - traceStartTime) * 100) / traceDurationMs + baseLine

  const length = Math.abs(toIndex - fromIndex) * spaceBetweenLifelines - 20

  const headWidth = 4
  const headHeight = 8
  const color = '#545b64'

  const rotate =
    direction === 'right' ? '' : `rotate(180, ${(length + headWidth) / 2}, ${headHeight})`

  return (
    <g>
      <foreignObject width={length} x={x} y={y - 36} height='40'>
        <p
          style={{
            fontStyle: 'italic',
            fontSize: 12,
            height: '100%',
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            margin: 0
          }}>
          <span
            style={{
              alignSelf: 'flex-end',
              WebkitTouchCallout: 'none' /* iOS Safari */,
              WebkitUserSelect: 'none' /* Safari */,
              KhtmlUserSelect: 'none' /* Konqueror HTML */,
              MozUserSelect: 'none' /* Old versions of Firefox */,
              msUserSelect: 'none' /* Internet Explorer/Edge */,
              userSelect: 'none'
            }}>
            {label}
          </span>
        </p>
      </foreignObject>
      <g transform={`translate(${x}, ${y}) ${rotate}`}>
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
