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

  const { horizontalMargin, verticalMargin } = theme
  return (
    <div style={{ border: '1px solid #cecece', height: '100%' }}>
      <SvgZoomPan>
        <g transform={`translate(${horizontalMargin}, ${verticalMargin})`}>
          {renderLifelines}
          {renderArrows}
          {renderExecutionBoxes}
        </g>
      </SvgZoomPan>
    </div>
  )
}

export default SequenceDiagram
