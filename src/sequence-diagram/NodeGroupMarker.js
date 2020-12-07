import React, { useMemo } from 'react'
import { getNodeCoordinates, getNodeTheme } from './drawing'
import { Badge } from 'antd'
import { getLowerNode, getUpperNode } from './node-grouping'
import { PlusOutlined } from '@ant-design/icons';
import * as _ from 'lodash';
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useHover } from  '../hooks/useHover.js'

const withStartTime = (sequenceDiagram) => ({
  ...sequenceDiagram,
  startTime: sequenceDiagram.nodes.map(node => node.time).sort()[0]
})

const NodeGroupMarker = ({ nodeGroup, sequenceDiagram, theme, onSelectNode, selectedNode, onCollapse }) => {

  const { nodeGroupRadius, color, borderColor, radius } = getNodeTheme(theme)

  const lowerNode = getLowerNode(nodeGroup)
  const upperNode = getUpperNode(nodeGroup)
  const { x: x1, y: y1 } = useMemo(() => getNodeCoordinates(lowerNode, withStartTime(sequenceDiagram), theme), [nodeGroup, sequenceDiagram, theme])
  const { x: x2, y: y2 } = useMemo(() => getNodeCoordinates(upperNode, withStartTime(sequenceDiagram), theme), [nodeGroup, sequenceDiagram, theme])
  const streakWidth = 2
  const horizontalDistance = radius + 4
  const [hoverRef, isHovered] = useHover();
  const strokeColor = isHovered ? 'black' : borderColor

  return (
    <g>
      <path
        id='marker1'
        strokeDasharray='4,4'
        stroke={strokeColor}
        strokeWidth={streakWidth}
        style={{ cursor: 'pointer'}}
        d={`M ${x1 + radius} ${y1} L ${x1 + horizontalDistance} ${y1}`}
      />
      <path
        id='marker2'
        strokeDasharray='4,4'
        strokeWidth={streakWidth}
        stroke={strokeColor}
        style={{ cursor: 'pointer'}}
        d={`M ${x1 + horizontalDistance} ${y1} L ${x1 + horizontalDistance} ${y2}`}
      />
      <path
        id='pseudo'
        strokeWidth={20}
        stroke={'transparent'}
        style={{ cursor: 'pointer'}}
        d={`M ${x1 + horizontalDistance} ${y1} L ${x1 + horizontalDistance} ${y2}`}
        ref={hoverRef}
        onClick={() => onCollapse(nodeGroup)}
      />
      <path
        id='marker3'
        strokeDasharray='4,4'
        stroke={strokeColor}
        strokeWidth={streakWidth}
        style={{ cursor: 'pointer'}}
        d={`M ${x1 + horizontalDistance} ${y2} L ${x1 + radius} ${y2}`}
      />
    </g>
  )
}

export default NodeGroupMarker
