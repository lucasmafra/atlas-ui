import * as _ from 'lodash'

export const isGrouped = (node, groupedNodes) => {
  return Object.keys(groupedNodes)
    .find((groupId) => groupedNodes[groupId].indexOf(node.id) !== -1)
    !== undefined
}

export const isGroupable = (node, denyList, groupedNodes) => {
  return denyList.indexOf(node.id) == -1 && !isGrouped(node, groupedNodes)
}

export const expandNodeGroup = (groupId, groupedNodes) => {
  return _.omit(groupedNodes, groupId)
}
