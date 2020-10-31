import React from 'react'
import Lifeline from './Lifeline'
// import ArrowV2 from './ArrowV2'
import { theme } from './theme'
import Node from './Node'
import SvgZoomPan from '../svg-zoom-pan/SvgZoomPan'

const SequenceDiagramV2 = ({ data }) => {
  const { lifelines, arrows, nodes } = data

  const renderLifelines = lifelines.map(({ id, label }) => (
    <Lifeline key={id} name={label} sequenceDiagram={data} theme={theme} kind={'service'} />
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


  const renderNodes = nodes.map((node) => (
    <Node
      key={node.id}
      node={node}
      sequenceDiagram={data}
      theme={theme}
    />
  ))

  const { horizontalMargin, verticalMargin } = theme
  return (
    <div style={{ border: '1px solid #cecece', height: '100%', width: '100%' }}>
      <SvgZoomPan>
        <g transform={`translate(${horizontalMargin}, ${verticalMargin})`}>
          {renderLifelines}
          {renderNodes}
        </g>
      </SvgZoomPan>
    </div>
  )
}

export default SequenceDiagramV2
