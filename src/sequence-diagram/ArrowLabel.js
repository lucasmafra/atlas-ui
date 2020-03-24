import React from 'react'
import { getArrowTheme, getArrowLabelHeight, getArrowLabelCoordinates } from './drawing'

const ArrowLabel = ({ prefix, label, theme, length }) => {
  const { labelFontSize, labelLineHeight, labelLines } = getArrowTheme(theme)
  const labelHeight = getArrowLabelHeight(theme)

  const { x, y } = getArrowLabelCoordinates(theme)

  return (
    <svg transform={`translate(${x}, ${y})`}>
      <g>
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
              {prefix} <br />
              {label}
            </p>
          </div>
        </foreignObject>
      </g>
    </svg>
  )
}

export default ArrowLabel
