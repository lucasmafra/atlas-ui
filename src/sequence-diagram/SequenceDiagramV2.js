import React, { useState } from 'react'
import LifelineLabel from './LifelineLabel'
import LifelineIcon from './LifelineIcon'
import LifelineStreak from './LifelineStreak'
import Arrow from './Arrow'
import { theme } from './theme'
import Node from './Node'
import NodeGroup from './NodeGroup'
import NodeGroupMarker from './NodeGroupMarker';
import ExecutionBox from './ExecutionBox';
import useDimensions from "react-cool-dimensions";
import { logProfile } from '../common-js/debug'
import { getUngroupedNodes } from './node-grouping'
import { Affix, Button, Tooltip } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';

const SequenceDiagramV2 = ({ data, onSelectNode, selectedNode, onExpandNodeGroup, onCollapseNodeGroup, onShowAnalysis }) => {
  const { lifelines, arrows, nodes, groupedNodes, executionBoxes } = data
  console.log('EXECUTION BOOXES', executionBoxes)
  console.log('NODES', nodes)
  const ungroupedNodes = getUngroupedNodes(nodes, groupedNodes)

  const myExecutionBoxes = [{
    from: {
      groupId: "node-group-service-2-service-2",
      id: "service-2",
      lifeline: "bff",
      meta: {log: "in-request", logLevel: "INFO", time: "2017-07-14T02:40:00.050Z"},
      time: 1500000000050
    },
    to: {
      groupId: "node-group-service-2-in-response-service-2-in-response",
      id: "service-2-in-response",
      lifeline: "bff",
      meta: {log: "in-response",logLevel: "INFO",time: "2017-07-14T02:40:03.050Z"},
      time: 1500000003050
    },
  }]

  const renderLifelinesHeader = lifelines.map(({ id, label, kind }) => {
    console.log('id', id, 'label', label, 'kind', kind)
    return (
      <g key={id}>
        <LifelineLabel name={label} label={label} sequenceDiagram={data} theme={theme} />
        <LifelineIcon  name={label} sequenceDiagram={data} theme={theme} kind={kind} />
      </g>
    )
  })

  const renderLifelinesStreak = lifelines.map(({ id, label }) => (
    <LifelineStreak key={id} name={label} sequenceDiagram={data} theme={theme} />
  ))

  const renderArrows = arrows.map((arrow) => (
    <Arrow
      key={arrow.id}
      arrow={arrow}
      sequenceDiagram={data}
      theme={theme}
    />
  ))

  const renderExecutionBoxes = executionBoxes.map((executionBox) => (
    <ExecutionBox
      key={executionBox.id}
      executionBox={executionBox}
      sequenceDiagram={data}
      theme={theme}
    />
  ))


  const renderNodes = ungroupedNodes.map((node) => {
    return <Node
             key={node.id}
             node={node}
             onSelectNode={onSelectNode}
             selectedNode={selectedNode}
             sequenceDiagram={data}
             theme={theme}
           />
  })

  const renderNodeGroups = Object.values(groupedNodes).filter((nodeGroup) => nodeGroup.collapsed).map((nodeGroup) => {
    return <NodeGroup
             key={nodeGroup.id}
             nodeGroup={nodeGroup}
             onSelectNode={onSelectNode}
             selectedNode={selectedNode}
             sequenceDiagram={data}
             theme={theme}
             onExpand={onExpandNodeGroup}
           />
  })

  const renderNodeGroupMarkers = Object.values(groupedNodes).filter((nodeGroup) => !nodeGroup.collapsed).map((nodeGroup) => {
    return <NodeGroupMarker
             key={nodeGroup.id}
             nodeGroup={nodeGroup}
             onSelectNode={onSelectNode}
             selectedNode={selectedNode}
             sequenceDiagram={data}
             theme={theme}
             onCollapse={onCollapseNodeGroup}
           />
  })

  const { horizontalMargin, verticalMargin } = theme

  const { ref, width, height } = useDimensions({});

  return (
    <div style={{ border: '1px solid #cecece', height: '100%', width: '100%', overflow: 'auto' }}>
      <svg width={width + 120} height="138" style={{position: 'sticky', top: 0, background: 'white'}}>
        <g transform={`translate(${horizontalMargin}, ${verticalMargin})`}>
          {renderLifelinesHeader}
        </g>
      </svg>
      <svg width={width + 120} height={height} ref={ref}>
        <g transform={`translate(${horizontalMargin}, ${-verticalMargin})`} >
          {renderLifelinesStreak}
          {renderExecutionBoxes}
          {renderNodes}
          {renderNodeGroups}
          {renderNodeGroupMarkers}
          {renderArrows}
        </g>
      </svg>
      <Affix style={{ position: 'absolute', bottom: 32, right: 32 }}>
        <Tooltip title="Analysis">
          <Button type="primary" shape="circle" icon={<LineChartOutlined />} size={'large'} onClick={onShowAnalysis}/>
        </Tooltip>
      </Affix>
    </div>
  )
}

export default SequenceDiagramV2
