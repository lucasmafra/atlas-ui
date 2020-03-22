import React, { useState } from 'react'

export const fetchIcon = name => fetch(`/icons/${name}.svg`).then(r => r.text())

const Icon = ({ color, size, name }) => {
  const [icon, setIcon] = useState(null)

  fetchIcon(name).then(setIcon)

  return (
    <svg fill={color} width={size} height={size} aria-label='Svg'>
      <foreignObject width={size} height={size}>
        <div dangerouslySetInnerHTML={{ __html: icon }} />
      </foreignObject>
    </svg>
  )
}

export default Icon
