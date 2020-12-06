import React, { useMemo } from 'react'
import { getNodeCoordinates, getNodeTheme, getLifelineIndex } from './drawing'
import { Menu, Dropdown, Button, Space, Table } from 'antd';
import styled from 'styled-components'
import './Node.css';
import { useHover } from  '../hooks/useHover.js'
const _ = require('lodash');

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 16px;
  align-content: start;
  width: 480px;
  padding: 16px;
  height: 100%;
  overflow: auto;
`

const columns = [
  {
    title: 'Field',
    dataIndex: 'field',
    key: 'field',
    className: 'log-value-cell',
    colSpan: 1,
    width: 100
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'key',
    className: 'log-value-cell',
    colSpan: 2
  },
];

const sortFields = [
  'source',
  'log',
  'log_level',
  '_time',
  'cid',
  '_raw',
  'method',
  'host'
]

const nodeToDataSource = node => Object.keys(node.meta).map(k => ({ field: k, value: node.meta[k], key: `${k}-${node.meta[k]}` })).filter((row) => row.value)

const safeNodeToDataSource = (node) => {
  if (!node) return []
  return nodeToDataSource(node)
}

const withSorting = dataSource => _.sortBy(dataSource, (row) => {
 const index= sortFields.indexOf(row.field)
  if (index === -1) return 9999
  return index
})

const withPicking = node => ({ ...node, meta: { ..._.pick(node.meta, ['source', 'log', '_time', 'groupId']), groupId: node.groupId } })

const makeMenu = node => (
  <Container>
    <Table dataSource={withSorting(safeNodeToDataSource(withPicking(node)))} columns={columns} pagination={{pageSize: 200}}/>
  </Container>
)

const withStartTime = (sequenceDiagram) => ({
  ...sequenceDiagram,
  startTime: sequenceDiagram.nodes.map(node => node.time).sort()[0]
})

const Node = ({ node, sequenceDiagram, theme, onSelectNode, selectedNode }) => {
  const { radius, color, hoverColor } = getNodeTheme(theme)
  const { x, y } = useMemo(() => getNodeCoordinates(node, withStartTime(sequenceDiagram), theme), [node, sequenceDiagram, theme])
  const [hoverRef, isHovered] = useHover();
  const actualRadius = isHovered ? radius * 1.4 : radius
  const strokeWidth = 1
  const strokeColor = 'black'
  const fillColor = isHovered ? hoverColor : color
  const menu = makeMenu(node)
  const lifelineIndex = getLifelineIndex(node.lifeline, sequenceDiagram)
  const dropdownPosition = lifelineIndex < sequenceDiagram.lifelines.length / 2 ? 'topLeft' : 'topRight'
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx="0" cy="0" r={actualRadius} stroke={strokeColor} strokeWidth={strokeWidth} fill={fillColor} onClick={() => onSelectNode(node)}/>
      <foreignObject width={radius * 2} height={radius * 2} x={-radius} y={-radius}>
        <Dropdown overlay={menu} placement={dropdownPosition}>
          <span style={{width: radius * 2, height: radius * 2, display: 'block'}} ref={hoverRef}/>
        </Dropdown>
      </foreignObject>
    </g>
  )
}

export default Node
