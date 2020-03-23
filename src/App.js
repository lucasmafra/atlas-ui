import React from 'react'
import { data } from './mock'
import 'antd/dist/antd.css'
import SequenceDiagram from './sequence-diagram/SequenceDiagram'

function App() {
  return (
    <div style={{ padding: 32, height: '100vh' }}>
      <SequenceDiagram data={data} />
    </div>
  )
}

export default App
