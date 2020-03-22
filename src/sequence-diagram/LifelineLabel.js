import React from 'react'
import { getLifelineTheme } from './drawing'

const LifelineLabel = ({ label, theme }) => {
  const { labelFontSize, labelWidth, labelLineHeight, labelLines } = getLifelineTheme(theme)
  const labelHeight = labelLineHeight * labelFontSize * labelLines
  return (
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
            WebkitLineClamp: labelLines,
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box'
          }}>
          {label}
        </p>
      </div>
    </foreignObject>
  )
}

export default LifelineLabel
