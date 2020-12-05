import React from 'react'
import styled from 'styled-components'
import { Table } from 'antd'
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

const Sidebar = ({ selectedNode}) => {
  console.log('selectedNode', selectedNode)
  return (
    <Container>
      <Table dataSource={withSorting(safeNodeToDataSource(selectedNode))} columns={columns} pagination={{pageSize: 200}}/>
    </Container>
  )
}

export default Sidebar
