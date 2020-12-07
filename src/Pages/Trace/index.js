import React, { useState, useEffect } from 'react'
import { Spin, Badge, Layout, Typography, Divider, Descriptions, Button } from 'antd'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import SequenceDiagram from '../../sequence-diagram/SequenceDiagramV2'
import * as logParser from '../../sequence-diagram/log-parser'
import { expandNodeGroup, collapseNodeGroup } from '../../sequence-diagram/node-grouping'
import { CloseOutlined } from '@ant-design/icons';
const parse = require('csv-parse/lib/sync')

const { Title } = Typography;

const StyledSpin = styled(Spin)`
  align-self: center;
  width: 100vw;
`

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
      .then( async (rawData) => {
        return logParser.logsToSequenceDiagram(rawData)
      })
      .then((sequenceDiagram) => {
        setSequenceDiagram(sequenceDiagram)
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

  const [showAnalysis, setShowAnalysis] = useState(false)

  const onShowAnalysis = () => setShowAnalysis(true)

  const onHideAnalysis = () => setShowAnalysis(false)

  return loading ? (
    <StyledSpin aria-label='Loading' size='large' />
  ) : (
    <Layout style={{ backgroundColor: 'white', width: '100vw'}}>
      <SequenceDiagram
        data={sequenceDiagram}
        onSelectNode={onSelectNode}
        selectedNode={selectedNode}
        onExpandNodeGroup={expand}
        onCollapseNodeGroup={collapse}
        onShowAnalysis={onShowAnalysis}
      />
      <Layout.Sider trigger={null} collapsible collapsed={!showAnalysis} collapsedWidth={0} style={{background: 'white'}} width={600}>

        <div style={{padding: 16 }}>
      <Descriptions title="Analysis" bordered  column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }} extra={<Button icon={<CloseOutlined />} onClick={onHideAnalysis}/>}>
          <Descriptions.Item label="Total trace time">32m</Descriptions.Item>
          <Descriptions.Item label="# of services">15</Descriptions.Item>
          <Descriptions.Item label="# of requests">48</Descriptions.Item>
          <Descriptions.Item label="# of messages">31</Descriptions.Item>
          <Descriptions.Item label="Most requested service">warriv</Descriptions.Item>
          <Descriptions.Item label="Slowest request">
            Endpoint: POST /api/transfer-out/:id <br/>
            Service: warriv <br/>
            Total time: <span>1.35s</span> <br />
          </Descriptions.Item>
          <Descriptions.Item label="Slowest message">
            Topic: TRANSFER-OUT-REQUESTED <br/>
            Service: horadric <br/>
            Total time: <span>3.1s</span> <br />
          </Descriptions.Item>
          <Descriptions.Item label="# errors by service">
            stormshield: 1
            <br />
            pidgey: 2
            <br />
          </Descriptions.Item>
        </Descriptions>
        </div>
      </Layout.Sider>
    </Layout>
  )
}

export default Trace
