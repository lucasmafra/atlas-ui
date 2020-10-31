import React from 'react'
import LifelineLabel from './LifelineLabel'
import LifelineIcon from './LifelineIcon'
import Lifeline from './Lifeline'
import LifelineStreak from './LifelineStreak'
// import ArrowV2 from './ArrowV2'
import { theme } from './theme'
import Node from './Node'
import useDimensions from "react-cool-dimensions";

// import SvgZoomPan from '../svg-zoom-pan/SvgZoomPan'

const SequenceDiagramV2 = ({ data }) => {
  const { lifelines, arrows, nodes } = data

  const renderLifelinesHeader = lifelines.map(({ id, label }) => (
    <g>
      <LifelineLabel key={id} name={label} label={label} sequenceDiagram={data} theme={theme} />
      <LifelineIcon key={id} name={label} sequenceDiagram={data} theme={theme} kind={'service'} />
    </g>
  ))

  const renderLifelines = lifelines.map(({ id, label }) => (
    <Lifeline key={id} name={label} kind={'service'} sequenceDiagram={data} theme={theme} />
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
      sequenceDiagram={data}
      theme={theme}
    />
  })

  const { horizontalMargin, verticalMargin } = theme

  const { ref, width, height, entry, unobserve, observe } = useDimensions({
    onResize: ({ width, height, entry, unobserve, observe }) => {
      // Triggered whenever the size of the target is changed
    },
  });

  console.log('width', width, 'height', height)

  return (
    <div style={{ border: '1px solid #cecece', height: '100%', width: '100%', overflow: 'auto' }}>
      <svg width={width + 100} height="120" style={{position: 'sticky', top: 0, background: 'white'}}>
        <g transform={`translate(${horizontalMargin}, ${verticalMargin})`}>
          {renderLifelinesHeader}
        </g>
      </svg>
      <svg width={width + 100} height={height}>
        <g transform={`translate(${horizontalMargin}, ${-verticalMargin})`} ref={ref}>
        {renderLifelinesStreak}
          {renderNodes}
        </g>
      </svg>
    </div>
  )
}

export default SequenceDiagramV2
