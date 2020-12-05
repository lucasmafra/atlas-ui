import * as _ from 'lodash'

export const isGrouped = (node, groupedNodes) => {
  return (groupedNodes[node.groupId]?.nodes ?? []).find((n) => n.id === node.id) !== undefined
}

export const isGroupable = (node, denyList) => {
  return denyList.indexOf(node.id) == -1
}

export const expandNodeGroup = (groupId, groupedNodes) => {
  return _.omit(groupedNodes, groupId)
}

export const makeNodeGroupId = (lowerNode, upperNode) => {
  return `node-group-${lowerNode.id}-${upperNode.id}`
}

export const findNodeGroupLowerBound = (node, nodes, denyList) => {
  const sortedNodes = _.sortBy(nodes.filter((n) => n.time <= node.time && n.lifeline === node.lifeline), 'time')
  const index = _.findIndex(sortedNodes, (n) => n.id === node.id)
  let i = index
  while (i >= 0 && isGroupable(sortedNodes[i], denyList)) {
    i--
  }
  return sortedNodes[Math.min(i+1, index)]
}

export const findNodeGroupUpperBound = (node, nodes, denyList) => {
  const sortedNodes = _.sortBy(nodes.filter((n) => n.time >= node.time && n.lifeline === node.lifeline), 'time')
  const index = _.findIndex(sortedNodes, (n) => n.id === node.id)
  let i = index
  while (i < sortedNodes.length && isGroupable(sortedNodes[i], denyList)) {
    i++
  }
  return sortedNodes[Math.max(i-1, index)]
}

export const withNodeGroupId = (node, nodes, denyList) => {
  const lowerNode = findNodeGroupLowerBound(node, nodes, denyList)
  const upperNode = findNodeGroupUpperBound(node, nodes, denyList)
  return {
    ...node,
    groupId: makeNodeGroupId(lowerNode, upperNode)
  }
}

export const collapseNode = (node, groupedNodes) => {
  const group = groupedNodes[node.groupId] || {
    id: node.groupId,
    time: node.time,
    lifeline: node.lifeline,
    meta: {},
    nodes: [],
  }
  return {
    ...groupedNodes,
    [node.groupId]: {
      ...group,
      time: Math.min(node.time, group.time),
      nodes: [...group.nodes, node]
    }
  }
}


export const collapseNodes = (nodes, groupedNodes) => {
  return _.pickBy(
    _.reduce(nodes, (acc, current) => collapseNode(current, acc), groupedNodes),
    (value, _) => {
      return value.nodes.length > 1
    }
  )
}

export const getUngroupedNodes = (nodes, groupedNodes) => {
  return nodes.filter((node) => !isGrouped(node, groupedNodes))
}