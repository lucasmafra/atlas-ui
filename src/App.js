import React from 'react'
import ExecutionBox from './sequence-diagram/ExecutionBox'
import Lifeline from './sequence-diagram/Lifeline'
import Arrow from './sequence-diagram/Arrow'
import { trace } from './mock'
import SequenceDiagram from './SequenceDiagram'
import 'antd/dist/antd.css'
import { theme } from './theme'

function App() {
  const renderLifelines = trace.lifelines.map(({ name, icon, color }) => (
    <Lifeline key={name} name={name} icon={icon} trace={trace} color={color} context={theme} />
  ))

  const renderArrows = trace.operations.map(({ id, from, to, y, startTime, label }) => (
    <Arrow
      key={id}
      from={from}
      to={to}
      y={y}
      startTime={startTime}
      label={label}
      trace={trace}
      context={theme}
    />
  ))

  const renderExecutionBoxes = trace.processes.map(({ id, lifeline, startTime, durationMs }) => (
    <ExecutionBox
      key={id}
      lifeline={lifeline}
      startTime={startTime}
      durationMs={durationMs}
      trace={trace}
      context={theme}
    />
  ))

  const svgDimensions = { width: 2400, height: 2000 }
  return (
    <div style={{ margin: 32, border: '1px solid #cecece', height: 'calc(100vh - 66px)' }}>
      <SequenceDiagram>
        <svg width={svgDimensions.width} height={svgDimensions.height}>
          {renderLifelines}
          {renderArrows}
          {renderExecutionBoxes}
        </svg>
      </SequenceDiagram>
    </div>
  )
}

export default App
