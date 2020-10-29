import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { objectKeysToCamel } from '../../common-js/misc'
import SequenceDiagram from '../../sequence-diagram/SequenceDiagram'

const StyledSpin = styled(Spin)`
  align-self: center;
`

const Trace = () => {
  const [loading, setLoading] = useState(true)
  const [sequenceDiagram, setSequenceDiagram] = useState(null)
  const { traceId } = useParams()

  useEffect(() => {
    console.log('dentro trace ID = ', traceId)
    setLoading(true)
    fetch('http://localhost:9000/api/traces/mock_transfer_out/sequence-diagram')
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
  }, [traceId])

  return loading ? (
    <StyledSpin aria-label='Loading' size='large' />
  ) : (
    <SequenceDiagram data={sequenceDiagram} />
  )
}

export default Trace
