import React from 'react'
import ExecutionBox from './ExecutionBox'
import Lifeline from './Lifeline'
import Arrow from './Arrow'
import { trace } from './mock'
import SequenceDiagram from './SequenceDiagram'

function App() {
  const renderLifelines = trace.lifelines.map(({ name, icon }) => (
    <Lifeline key={name} name={name} icon={icon} trace={trace} />
  ))

  const renderArrows = trace.operations.map(({ id, from, to, y, startTime, label }) => (
    <Arrow key={id} from={from} to={to} y={y} startTime={startTime} label={label} trace={trace} />
  ))

  const renderExecutionBoxes = trace.processes.map(({ id, lifeline, startTime, durationMs }) => (
    <ExecutionBox
      key={id}
      lifeline={lifeline}
      startTime={startTime}
      durationMs={durationMs}
      trace={trace}
    />
  ))

  return (
    <div style={{ margin: 32, border: '1px solid #cecece', height: 'calc(100vh - 66px)' }}>
      <SequenceDiagram>
        {renderLifelines}
        {renderArrows}
        {renderExecutionBoxes}
      </SequenceDiagram>
    </div>
  )
}

export default App
