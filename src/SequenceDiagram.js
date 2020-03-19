import React, { useState, useRef } from 'react'
import { scale, transform, translate, inverse, applyToPoint } from './matrix'
import { Button } from 'antd'
import { PlusOutlined, MinusOutlined, ExpandAltOutlined } from '@ant-design/icons'
import { pan } from './pan/pan'
import { zoom } from './zoom/zoom'

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

function getSvgPoint(matrix, x, y) {
  const inverseMatrix = inverse(matrix)
  return applyToPoint(inverseMatrix, { x, y })
}

function mouseWheel(matrix, setMatrix, svg, diagram) {
  return e => {
    const zoomVelocity = 0.012
    const scaleFactor = 1 - zoomVelocity * (e.deltaY / (Math.abs(e.deltaY) || 1))
    const svgPoint = getSvgPoint(matrix, e.clientX, e.clientY - 100)
    // const { width: diagramWidth, height: diagramHeight } = diagram.current.getBoundingClientRect()
    // const { width: svgWidth, height: svgHeight } = svg.current.getBoundingClientRect()

    // const margin = 40
    /*let newMatrix = transform(
      matrix,
      translate(svgPoint.x, svgPoint.y),
      scale(scaleFactor, scaleFactor),
      translate(-svgPoint.x, -svgPoint.y)
    )*/
    //const originalDiagramWidith = inverse(matrix).a * diagramWidth
    //const { x: nextDiagramWidth } = applyToPoint(newMatrix, { x: originalDiagramWidith, y: 0 })
    /*if (scaleFactor < 1 && nextDiagramWidth + margin < svgWidth) {
      e.preventDefault()
      return
    }

    if (newMatrix.e > initialMatrix.e) {
      const exceeded = newMatrix.e - initialMatrix.e
      newMatrix = transform(newMatrix, translate(-exceeded, 0))
    }

    if (
      diagramWidth > svgWidth &&
      Math.abs(newMatrix.e) + Math.abs(svgWidth) - margin > Math.abs(diagramWidth)
    ) {
      const exceeded = Math.abs(newMatrix.e) + Math.abs(svgWidth) - margin - Math.abs(diagramWidth)
      newMatrix = transform(newMatrix, translate(exceeded, 0))
    }

    if (newMatrix.f > initialMatrix.f) {
      const exceeded = newMatrix.f - initialMatrix.f
      newMatrix = transform(newMatrix, translate(0, -exceeded))
    }

    if (
      diagramHeight > svgHeight &&
      Math.abs(newMatrix.f) + Math.abs(svgHeight) - margin > Math.abs(diagramHeight)
    ) {
      const exceeded =
        Math.abs(newMatrix.f) + Math.abs(svgHeight) - margin - Math.abs(diagramHeight)
      newMatrix = transform(newMatrix, translate(0, exceeded))
    }*/
    const zoomOptions = { minZoom: 0.5, maxZoom: 1.5 }
    setMatrix(zoom(matrix, scaleFactor, svgPoint, zoomOptions))
    e.preventDefault()
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
  return e => {
    const zoomVelocity = 0.025
    const scaleFactor = 1 + zoomVelocity
    const svgPoint = getSvgPoint(matrix, e.clientX, e.clientY)
    const newMatrix = transform(
      matrix,
      translate(svgPoint.x, svgPoint.y),
      scale(scaleFactor, scaleFactor),
      translate(-svgPoint.x, -svgPoint.y)
    )
    setMatrix(newMatrix)
  }
}

function zoomOut(matrix, setMatrix) {
  return e => {
    const zoomVelocity = -0.025
    const scaleFactor = 1 + zoomVelocity
    const svgPoint = getSvgPoint(matrix, e.clientX, e.clientY)
    const newMatrix = transform(
      matrix,
      translate(svgPoint.x, svgPoint.y),
      scale(scaleFactor, scaleFactor),
      translate(-svgPoint.x, -svgPoint.y)
    )
    setMatrix(newMatrix)
  }
}

function SequenceDiagram(props) {
  const [holdingClick, setHoldingClick] = useState(false)
  const [cursorLocation, setCursorLocation] = useState({ x0: null, y0: null, x1: null, y1: null })
  const [matrix, setMatrix] = useState(initialMatrix)
  const svg = useRef(null)
  const diagram = useRef(null)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
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
