import React, { useState } from 'react'
import { scale, transform, translate, inverse, applyToPoint } from './matrix'
import { Button, Tooltip } from 'antd'
import { PlusOutlined, MinusOutlined, ExpandAltOutlined } from '@ant-design/icons'

const initialMatrix = {
  a: 0.8590683010253904,
  b: 0,
  c: 0,
  d: 0.8590683010253904,
  e: 3.3387490216066467,
  f: -5.144605668334748
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

function mouseWheel(matrix, setMatrix) {
  return e => {
    const zoomVelocity = 0.005
    const scaleFactor = 1 - zoomVelocity * (e.deltaY / (Math.abs(e.deltaY) || 1))
    const svgPoint = getSvgPoint(matrix, e.clientX, e.clientY)
    const newMatrix = transform(
      matrix,
      translate(svgPoint.x, svgPoint.y),
      scale(scaleFactor, scaleFactor),
      translate(-svgPoint.x, -svgPoint.y)
    )
    setMatrix(newMatrix)
    e.preventDefault()
  }
}

function limitPan(matrix) {
  return matrix
}

function mouseMove(holdingClick, pan, setPan, matrix, setMatrix) {
  const panVelocity = 1.5
  return e => {
    if (holdingClick) {
      setPan({ x1: e.clientX, y1: e.clientY, x0: pan.x1, y0: pan.y1 })
      const delta = { x: (e.clientX - pan.x1) * panVelocity, y: (e.clientY - pan.y1) * panVelocity }
      let newMatrix = transform(matrix, translate(delta.x, delta.y))
      newMatrix = limitPan(newMatrix)
      setMatrix(newMatrix)
    }
  }
}

function resetMatrix(setMatrix) {
  return e => setMatrix(initialMatrix)
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
  const [pan, setPan] = useState({ x0: null, y0: null, x1: null, y1: null })
  const [matrix, setMatrix] = useState(initialMatrix)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg
        width='100%'
        height='100%'
        onMouseDown={mouseDown(setHoldingClick, setPan)}
        onMouseUp={mouseUp(setHoldingClick, setPan)}
        onMouseMove={mouseMove(holdingClick, pan, setPan, matrix, setMatrix)}
        onMouseLeave={mouseUp(setHoldingClick, setPan)}
        onWheel={mouseWheel(matrix, setMatrix)}>
        <g
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
