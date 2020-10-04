import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import 'antd/dist/antd.css'
import styled from 'styled-components'
import SequenceDiagram from './sequence-diagram/SequenceDiagram'
import { objectKeysToCamel } from './common-js/misc'

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  height: 100vh;
  padding: 32px;
`

function App() {
  const [loading, setLoading] = useState(true)
  const [sequenceDiagram, setSequenceDiagram] = useState(null)

  useEffect(() => {
    fetch('/mock_transaction_feed.json')
      .then((r) => r.json())
      .then((data) => {
        setSequenceDiagram(objectKeysToCamel(data).sequenceDiagram)
      })
      .catch((e) => {
        // TODO error handling
        console.log(e)
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 1000)
      })
  }, [])

  return (
    <Container>
      <div style={{ gridColumn: 'span 2' }}>
        <p>header</p>
      </div>

      <div style={{ width: '200px' }}>
        <p>sidebar</p>
      </div>
      {loading ? <Spin aria-label='Loading' /> : <SequenceDiagram data={sequenceDiagram} />}
    </Container>
  )
}

export default App
