import React, { useState, useRef } from 'react'
import { Button } from 'antd'
import { PlusOutlined, MinusOutlined, ExpandAltOutlined } from '@ant-design/icons'
import { pan } from './pan/pan'
import { zoom } from './zoom/zoom'
import BlockPageScroll from './BlockPageScroll'

const initialMatrix = {
  a: 1,
  b: 0,
  c: 0,
  d: 1,
  e: 0,
  f: 0
}

const panOptions = {
  moveOnlyOneAxis: true,
  preventPanOutsideFigure: true,
  panVelocity: 1.5
}

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

function mouseWheel(matrix, setMatrix, svg, diagram) {
  return e => {
    const zoomVelocity = 0.012
    const zoomMode = e.deltaY / (Math.abs(e.deltaY) || 1) < 0 ? 'ZOOM_IN' : 'ZOOM_OUT'
    const figureDimensions = diagram.current.getBoundingClientRect()
    const svgDimensions = svg.current.getBoundingClientRect()
    const point = { x: e.clientX, y: e.clientY - 100 }
    const zoomOptions = { zoomMode, zoomVelocity, preventZoomOutsideFigure: true }
    const zoomContext = { figureDimensions, svgDimensions }
    setMatrix(zoom(matrix, point, zoomOptions, zoomContext))
  }
}

function mouseMove(
  holdingClick,
  cursorLocation,
  setCursorLocation,
  matrix,
  setMatrix,
  svg,
  diagram
) {
  return e => {
    if (holdingClick) {
      setCursorLocation({
        x1: e.clientX,
        y1: e.clientY,
        x0: cursorLocation.x1,
        y0: cursorLocation.y1
      })
      const delta = { x: e.clientX - cursorLocation.x1, y: e.clientY - cursorLocation.y1 }
      const svgDimensions = svg.current.getBoundingClientRect()
      const figureDimensions = diagram.current.getBoundingClientRect()
      const panContext = { svgDimensions, figureDimensions }
      setMatrix(pan(matrix, delta, panOptions, panContext))
    }
  }
}

function resetMatrix(setMatrix) {
  return _ => setMatrix(initialMatrix)
}

function zoomIn(matrix, setMatrix) {
  return e => {}
}

function zoomOut(matrix, setMatrix) {
  return e => {}
}

function SequenceDiagram(props) {
  const [holdingClick, setHoldingClick] = useState(false)
  const [cursorLocation, setCursorLocation] = useState({ x0: null, y0: null, x1: null, y1: null })
  const [matrix, setMatrix] = useState(initialMatrix)
  const svg = useRef(null)
  const diagram = useRef(null)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <BlockPageScroll style={{ width: '100%', height: '100%' }}>
        <svg
          width='100%'
          height='100%'
          ref={svg}
          onMouseDown={mouseDown(setHoldingClick, setCursorLocation)}
          onMouseUp={mouseUp(setHoldingClick, setCursorLocation)}
          onMouseMove={mouseMove(
            holdingClick,
            cursorLocation,
            setCursorLocation,
            matrix,
            setMatrix,
            svg,
            diagram
          )}
          onMouseLeave={mouseUp(setHoldingClick, setCursorLocation)}
          onWheel={mouseWheel(matrix, setMatrix, svg, diagram)}>
          <g
            id='diagram'
            ref={diagram}
            transform={`matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, ${matrix.e}, ${matrix.f})`}>
            {props.children}
          </g>
        </svg>
      </BlockPageScroll>
      <div
        style={{
          position: 'absolute',
          right: 32,
          bottom: 32,
          display: 'flex'
        }}>
        <div>
          <Button size='large' icon={<PlusOutlined />} onClick={zoomIn(matrix, setMatrix)} />
        </div>
        <div style={{ marginLeft: 4 }}>
          <Button size='large' icon={<MinusOutlined />} onClick={zoomOut(matrix, setMatrix)} />
        </div>
        <div style={{ marginLeft: 4 }}>
          <Button size='large' icon={<ExpandAltOutlined />} onClick={resetMatrix(setMatrix)} />
        </div>
      </div>
    </div>
  )
}

export default SequenceDiagram
