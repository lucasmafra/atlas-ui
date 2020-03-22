import React from 'react'
import { getArrowTheme, getArrowLabelHeight, getArrowLabelCoordinates } from './drawing'

const ArrowLabel = ({ label, context, length }) => {
  const { labelFontSize, labelLineHeight, labelLines } = getArrowTheme(context)
  const labelHeight = getArrowLabelHeight(context)

  const { x, y } = getArrowLabelCoordinates(context)

  return (
    <g transform={`translate(${x}, ${y})`}>
      <foreignObject width={length} height={labelHeight}>
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
              WebkitLineClamp: labelLines,
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box'
            }}>
            {label}
          </p>
        </div>
      </foreignObject>
    </g>
  )
}

export default ArrowLabel
