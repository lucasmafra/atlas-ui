import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import 'antd/dist/antd.css'
import SequenceDiagram from './sequence-diagram/SequenceDiagram'

function App() {
  const [loading, setLoading] = useState(true)
  const [sequenceDiagram, setSequenceDiagram] = useState(null)

  useEffect(() => {
    fetch('/mock.json')
      .then((r) => {
        return r.json()
      })
      .then((data) => {
        setSequenceDiagram(data)
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 1000)
      })
  }, [])

  return (
    <div
      style={{
        padding: 32,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      {loading ? <Spin aria-label='Loading' /> : <SequenceDiagram data={sequenceDiagram} />}
    </div>
  )
}

export default App
