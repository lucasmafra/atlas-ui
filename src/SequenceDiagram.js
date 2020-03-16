import React, { useState } from 'react'

function mouseDown(setHoldingClick, setPan) {
  return e => {
    setHoldingClick(true)
    setPan({ x0: e.clientX, y0: e.clientY, x1: e.clientX, y1: e.clientY })
  }
}

function mouseUp(setHoldingClick, setPan) {
  return e => {
    setHoldingClick(false)
    setPan({ x0: null, y0: null, x1: null, y1: null })
  }
}

function mouseMove(holdingClick, pan, setPan, delta, setDelta) {
  const panVelocity = 0.5
  return e => {
    if (holdingClick) {
      setPan({ x1: e.clientX, y1: e.clientY, x0: pan.x1, y0: pan.y1 })
      setDelta({
        x: delta.x + (e.clientX - pan.x0) * panVelocity,
        y: delta.y + (e.clientY - pan.y0) * panVelocity
      })
    }
  }
}

function SequenceDiagram(props) {
  const [holdingClick, setHoldingClick] = useState(false)
  const [pan, setPan] = useState({ x0: null, y0: null, x1: null, y1: null })
  const [delta, setDelta] = useState({ x: 0, y: 0 })

  return (
    <svg
      width='100%'
      height='100%'
      onMouseDown={mouseDown(setHoldingClick, setPan)}
      onMouseUp={mouseUp(setHoldingClick, setPan)}
      onMouseMove={mouseMove(holdingClick, pan, setPan, delta, setDelta)}
      onMouseLeave={mouseUp(setHoldingClick, setPan)}>
      <g transform={`translate(${delta.x}, ${delta.y})`}>{props.children}</g>
    </svg>
  )
}

export default SequenceDiagram
