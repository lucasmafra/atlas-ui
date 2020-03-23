import React from 'react'
import Lifeline from './Lifeline'
import Arrow from './Arrow'
import { theme } from './theme'
import ExecutionBox from './ExecutionBox'
import SvgZoomPan from '../svg-zoom-pan/SvgZoomPan'

const SequenceDiagram = ({ data }) => {
  const { lifelines, arrows, executionBoxes } = data

  const renderLifelines = lifelines.map(({ name, icon, color }) => (
    <Lifeline
      key={name}
      name={name}
      icon={icon}
      sequenceDiagram={data}
      color={color}
      theme={theme}
    />
  ))

  const renderArrows = arrows.map(({ id, from, to, startTime, label }) => (
    <Arrow
      key={id}
      from={from}
      to={to}
      startTime={startTime}
      label={label}
      sequenceDiagram={data}
      theme={theme}
    />
  ))

  const renderExecutionBoxes = executionBoxes.map(({ id, lifeline, startTime, durationMs }) => (
    <ExecutionBox
      key={id}
      lifeline={lifeline}
      startTime={startTime}
      durationMs={durationMs}
      sequenceDiagram={data}
      theme={theme}
    />
  ))

  return (
    <div style={{ margin: 32, border: '1px solid #cecece', height: 'calc(100vh - 66px)' }}>
      <SvgZoomPan>
        <g>
          {renderLifelines}
          {renderArrows}
          {renderExecutionBoxes}
        </g>
      </SvgZoomPan>
    </div>
  )
}

export default SequenceDiagram
