import React from 'react'
import LifelineLabel from './LifelineLabel'
import LifelineIcon from './LifelineIcon'
import LifelineStreak from './LifelineStreak'
// import ArrowV2 from './ArrowV2'
import { theme } from './theme'
import Node from './Node'
import useDimensions from "react-cool-dimensions";
import { logProfile } from '../common-js/debug'
// import SvgZoomPan from '../svg-zoom-pan/SvgZoomPan'

const SequenceDiagramV2 = ({ data, onSelectNode, selectedNode }) => {
  const { lifelines, arrows, nodes } = data

  const renderLifelinesHeader = lifelines.map(({ id, label }) => (
    <g key={id}>
      <LifelineLabel name={label} label={label} sequenceDiagram={data} theme={theme} />
      <LifelineIcon  name={label} sequenceDiagram={data} theme={theme} kind={'service'} />
    </g>
  ))

  const renderLifelinesStreak = lifelines.map(({ id, label }) => (
    <LifelineStreak key={id} name={label} sequenceDiagram={data} theme={theme} />
  ))

  //////////////////////////////////////////////////
  // const renderArrows = arrows.map((arrow) => ( //
  //   <ArrowV2                                   //
  //     arrow={arrow}                            //
  //     sequenceDiagram={data}                   //
  //     theme={theme}                            //
  //   />                                         //
  // ))                                           //
  //////////////////////////////////////////////////

  const renderNodes = nodes.map((node) => {
    return <Node
             key={node.id}
             node={node}
             onSelectNode={onSelectNode}
             selectedNode={selectedNode}
             sequenceDiagram={data}
             theme={theme}
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
        </g>
      </svg>
    </div>
  )
}

export default SequenceDiagramV2
