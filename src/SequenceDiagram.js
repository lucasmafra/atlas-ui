import React, { useState, useRef } from 'react'
import ZoomControls from './ZoomControls'
import { pan } from './pan/pan'
import { zoom } from './zoom/zoom'
import BlockPageScroll from './BlockPageScroll'

const initialMatrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }

const panOptions = { moveOnlyOneAxis: true, preventPanOutsideFigure: true, panVelocity: 1.5 }

const mouseDown = (setHoldingClick, setPan) => {
  return e => {
    setHoldingClick(true)
    setPan({ x0: e.clientX, y0: e.clientY, x1: e.clientX, y1: e.clientY })
  }
}

const mouseUp = (setHoldingClick, setPan) => {
  return e => {
    setHoldingClick(false)
    setPan({ x0: null, y0: null, x1: null, y1: null })
  }
}

const mouseWheel = (matrix, setMatrix, dimensions) => {
  return e => {
    const zoomVelocity = 0.012
    const zoomMode = e.deltaY / (Math.abs(e.deltaY) || 1) < 0 ? 'ZOOM_IN' : 'ZOOM_OUT'
    const point = { x: e.clientX, y: e.clientY - 100 }
    const zoomOptions = { zoomMode, zoomVelocity, preventZoomOutsideFigure: true }
    const zoomContext = { svgDimensions: dimensions.svg, figureDimensions: dimensions.figure }
    setMatrix(zoom(matrix, point, zoomOptions, zoomContext))
  }
}

const mouseMove = (holdingClick, cursor, setCursor, matrix, setMatrix, dimensions) => {
  return e => {
    if (holdingClick) {
      const newCursor = { x1: e.clientX, y1: e.clientY, x0: cursor.x1, y0: cursor.y1 }
      setCursor(newCursor)
      const delta = { x: e.clientX - cursor.x1, y: e.clientY - cursor.y1 }
      const panContext = { svgDimensions: dimensions.svg, figureDimensions: dimensions.figure }
      setMatrix(pan(matrix, delta, panOptions, panContext))
    }
  }
}

function resetMatrix(setMatrix) {
  return _ => setMatrix(initialMatrix)
}

const zoomIn = (matrix, setMatrix, dimensions) => {
  return e => {
    const zoomVelocity = 0.05
    const zoomMode = 'ZOOM_IN'
    const point = { x: dimensions.svg.width / 2, y: dimensions.svg.height / 2 }
    const zoomOptions = { zoomMode, zoomVelocity, preventZoomOutsideFigure: true }
    const zoomContext = { svgDimensions: dimensions.svg, figureDimensions: dimensions.figure }
    setMatrix(zoom(matrix, point, zoomOptions, zoomContext))
  }
}

const zoomOut = (matrix, setMatrix, dimensions) => {
  return e => {
    const zoomVelocity = 0.05
    const zoomMode = 'ZOOM_OUT'
    const point = { x: dimensions.svg.width / 2, y: dimensions.svg.height / 2 }
    const zoomOptions = { zoomMode, zoomVelocity, preventZoomOutsideFigure: true }
    const zoomContext = { svgDimensions: dimensions.svg, figureDimensions: dimensions.figure }
    setMatrix(zoom(matrix, point, zoomOptions, zoomContext))
  }
}

const getDimensions = el => {
  if (!el.current) return { width: 0, height: 0 }
  return el.current.getBoundingClientRect()
}

const SequenceDiagram = props => {
  const [holdingClick, setHoldingClick] = useState(false)
  const [cursor, setCursor] = useState()
  const [matrix, setMatrix] = useState(initialMatrix)
  const svg = useRef()
  const figure = useRef()
  const dimensions = { svg: getDimensions(svg), figure: getDimensions(figure) }
  const { a, b, c, d, e, f } = matrix

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <BlockPageScroll style={{ width: '100%', height: '100%' }}>
        <svg
          width='100%'
          height='100%'
          ref={svg}
          onMouseDown={mouseDown(setHoldingClick, setCursor)}
          onMouseUp={mouseUp(setHoldingClick, setCursor)}
          onMouseMove={mouseMove(holdingClick, cursor, setCursor, matrix, setMatrix, dimensions)}
          onMouseLeave={mouseUp(setHoldingClick, setCursor)}
          onWheel={mouseWheel(matrix, setMatrix, dimensions)}>
          <g ref={figure} transform={`matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`}>
            {props.children}
          </g>
        </svg>
      </BlockPageScroll>
      <div style={{ position: 'absolute', right: 32, bottom: 32 }}>
        <ZoomControls
          onZoomIn={zoomIn(matrix, setMatrix, dimensions)}
          onZoomOut={zoomOut(matrix, setMatrix, dimensions)}
          onFitToScreen={resetMatrix(setMatrix)}
        />
      </div>
    </div>
  )
}

export default SequenceDiagram
