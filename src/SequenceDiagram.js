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

function mouseWheel(zoom, setZoom) {
  const zoomVelocity = 0.001
  return e => {
    setZoom(zoom - e.deltaY * zoomVelocity)
    console.log(e.deltaX, e.deltaY)
  }
}

function mouseMove(holdingClick, pan, setPan, delta, setDelta) {
  const panVelocity = 0.5
  return e => {
    if (holdingClick) {
      setPan({ x1: e.clientX, y1: e.clientY, x0: pan.x1, y0: pan.y1 })
      const deltaX = (e.clientX - pan.x0) * panVelocity
      const deltaY = (e.clientY - pan.y0) * panVelocity
      const movDirection = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical'
      if (movDirection == 'horizontal') {
        setDelta({
          x: delta.x + deltaX,
          y: delta.y
        })
      } else {
        setDelta({ x: delta.x, y: delta.y + deltaY })
      }
    }
  }
}

function SequenceDiagram(props) {
  const [holdingClick, setHoldingClick] = useState(false)
  const [pan, setPan] = useState({ x0: null, y0: null, x1: null, y1: null })
  const [delta, setDelta] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  return (
    <svg
      width='100%'
      height='100%'
      onMouseDown={mouseDown(setHoldingClick, setPan)}
      onMouseUp={mouseUp(setHoldingClick, setPan)}
      onMouseMove={mouseMove(holdingClick, pan, setPan, delta, setDelta)}
      onMouseLeave={mouseUp(setHoldingClick, setPan)}
      onWheel={mouseWheel(zoom, setZoom)}>
      <g transform={`translate(${delta.x}, ${delta.y}) scale(${zoom}, ${zoom})`}>
        {props.children}
      </g>
    </svg>
  )
}

export default SequenceDiagram
