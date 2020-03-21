import React, { useState } from 'react'

const fetchIcon = name => fetch(`/icons/${name}.svg`).then(r => r.text())

function TopicIcon() {
  const color = '#1ba1e2'
  const size = 72
  const name = 'topic'
  const [icon, setIcon] = useState(null)

  fetchIcon(name).then(icon => setIcon(icon))

  return (
    <svg fill={color} width={size} height={size}>
      <foreignObject width={size} height={size}>
        <div dangerouslySetInnerHTML={{ __html: icon }} />
      </foreignObject>
    </svg>
  )
}

export default TopicIcon
