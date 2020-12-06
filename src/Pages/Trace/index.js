import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import SequenceDiagram from '../../sequence-diagram/SequenceDiagramV2'
import * as logParser from '../../sequence-diagram/log-parser'
import { withNodeGroupId, collapseNodes, expandNodeGroup, collapseNodeGroup } from '../../sequence-diagram/node-grouping'
const parse = require('csv-parse/lib/sync')

const StyledSpin = styled(Spin)`
  align-self: center;
  width: 100vw;
`

const inOrOutNodes = ['in-request', 'in-response', 'out-request', 'out-response', 'in-message', 'out-message']

const Trace = ({ onSelectNode, selectedNode }) => {
  const [loading, setLoading] = useState(true)
  const [sequenceDiagram, setSequenceDiagram] = useState(null)
  const { traceId } = useParams()

  useEffect(() => {
    setLoading(true)
    fetch(`/${traceId}.csv`)
      .then((r) => {
        return r.text()
      })
      .then((rawData) => {
        const logs = parse(rawData, { columns: true, skip_empty_lines: true })
        const nodes = logParser.parseNodes(logs)
        const ungroupableNodes = nodes.filter((node) => inOrOutNodes.indexOf(node.meta.log) !== -1)
        const nodesWithGroupId = nodes.map((node) => withNodeGroupId(node, nodes, ungroupableNodes.map(node => node.id)))
        const groupableNodes = nodesWithGroupId.filter((node) => inOrOutNodes.indexOf(node.meta.log) == -1)
        const data = {
          lifelines: logParser.parseLifelines(logs),
          nodes: nodesWithGroupId,
          groupedNodes: collapseNodes(groupableNodes, {}),
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


  const expand = (groupId) => {
    setSequenceDiagram({
      ...sequenceDiagram,
      groupedNodes: expandNodeGroup(groupId, sequenceDiagram.groupedNodes)
    })
  }

  const collapse = (nodeGroup) => {
    setSequenceDiagram({
      ...sequenceDiagram,
      groupedNodes: collapseNodeGroup(nodeGroup.id, sequenceDiagram.groupedNodes)
    })
  }

  return loading ? (
    <StyledSpin aria-label='Loading' size='large' />
  ) : (
      <SequenceDiagram
        data={sequenceDiagram}
        onSelectNode={onSelectNode}
        selectedNode={selectedNode}
        onExpandNodeGroup={expand}
        onCollapseNodeGroup={collapse}
      />
  )
}

export default Trace
