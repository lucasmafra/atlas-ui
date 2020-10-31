import React from 'react'
import { getLifelineTheme, getLifelineOffset } from './drawing'

const LifelineLabel = ({ label, theme, name, sequenceDiagram }) => {
  const { labelFontSize, labelWidth, labelLineHeight, labelLines } = getLifelineTheme(theme)
  const labelHeight = labelLineHeight * labelFontSize * labelLines
  const lifelineOffset = getLifelineOffset(name, sequenceDiagram, theme)
  const sin45 = 0.71
  return (
    <g transform={`translate(${lifelineOffset + ((labelWidth/2)* sin45)}, ${((-labelWidth/2)* sin45)}) rotate(-45, ${labelWidth/2}, ${labelHeight/2})`}>
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
              textAlign: 'start',
              width: '100%',
              textTransform: 'uppercase',
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

export default LifelineLabel
