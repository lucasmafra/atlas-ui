import React from 'react'
import LifelineLabel from './LifelineLabel'
import LifelineIcon from './LifelineIcon'
import LifelineStreak from './LifelineStreak'
import Arrow from './Arrow'
import { theme } from './theme'
import Node from './Node'
import NodeGroup from './NodeGroup'
import NodeGroupMarker from './NodeGroupMarker';
import useDimensions from "react-cool-dimensions";
import { logProfile } from '../common-js/debug'
import { getUngroupedNodes } from './node-grouping'

const SequenceDiagramV2 = ({ data, onSelectNode, selectedNode, onExpandNodeGroup, onCollapseNodeGroup }) => {
  const { lifelines, arrows, nodes, groupedNodes } = data
  const ungroupedNodes = getUngroupedNodes(nodes, groupedNodes)

  const renderLifelinesHeader = lifelines.map(({ id, label }) => (
    <g key={id}>
      <LifelineLabel name={label} label={label} sequenceDiagram={data} theme={theme} />
      <LifelineIcon  name={label} sequenceDiagram={data} theme={theme} kind={'service'} />
    </g>
  ))

  const renderLifelinesStreak = lifelines.map(({ id, label }) => (
    <LifelineStreak key={id} name={label} sequenceDiagram={data} theme={theme} />
  ))


  console.log('arrows', arrows)
  const renderArrows = arrows.map((arrow) => (
    <Arrow
      key={arrow.id}
      arrow={arrow}
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
      <svg width={width + 100} height="138" style={{position: 'sticky', top: 0, background: 'white'}}>
        <g transform={`translate(${horizontalMargin}, ${verticalMargin})`}>
          {renderLifelinesHeader}
        </g>
      </svg>
      <svg width={width + 100} height={height} ref={ref}>
        <g transform={`translate(${horizontalMargin}, ${-verticalMargin})`} >
          {renderLifelinesStreak}
          {renderNodes}
          {renderNodeGroups}
          {renderNodeGroupMarkers}
          {renderArrows}
        </g>
      </svg>
    </div>
  )
}

export default SequenceDiagramV2
