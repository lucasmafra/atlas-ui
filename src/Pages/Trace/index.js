import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import SequenceDiagram from '../../sequence-diagram/SequenceDiagramV2'
import * as logParser from '../../sequence-diagram/log-parser'
const parse = require('csv-parse/lib/sync')

const StyledSpin = styled(Spin)`
  align-self: center;
`

const Trace = ({ onSelectNode, selectedNode }) => {
  const [loading, setLoading] = useState(true)
  const [sequenceDiagram, setSequenceDiagram] = useState(null)
  const { traceId } = useParams()

  useEffect(() => {
    console.log('dentro trace ID = ', traceId)
    setLoading(true)
    fetch('/transfer_out_log.csv')
      .then((r) => {
        return r.text()
      })
      .then((rawData) => {
        const logs = parse(rawData, { columns: true, skip_empty_lines: true })
        const data = {
          lifelines: logParser.parseLifelines(logs),
          nodes: logParser.parseNodes(logs),
          arrows: logParser.parseArrows(logs)
        }
        setSequenceDiagram(data)
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
    <SequenceDiagram data={sequenceDiagram} onSelectNode={onSelectNode} selectedNode={selectedNode} />
  )
}

export default Trace
