import React from 'react'
import { data } from './mock'
import 'antd/dist/antd.css'
import SequenceDiagram from './sequence-diagram/SequenceDiagram'

function App() {
  return <SequenceDiagram data={data} />
}

export default App
