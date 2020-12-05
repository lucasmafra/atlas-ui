import * as nut from './node-grouping'

describe('isGrouped', () => {
  it('returns whether a node is already grouped', () => {
    const nodeA = { id: '1', groupId: 'group3' }
    const nodeB = { id: '6', groupId: 'group2' }
    const groupedNodes = {
      'group1':  { nodes: [] },
      'group2': { nodes: [{id: '2'}, {id: '3'}, {id: '4'}] },
      'group3': { nodes: [{id: '5'}, {id: '1'}, {id: '0'}] }
    }
    expect(nut.isGrouped(nodeA, groupedNodes)).toBe(true)
    expect(nut.isGrouped(nodeB, groupedNodes)).toBe(false)
  })
})

describe('isGroupable', () => {
  const node = { id: '1' }
  const denyList = []

  describe('when node is deny list', () => {
    const denyList = ['1']

    it('returns false', () => {
      expect(nut.isGroupable(node, denyList)).toBe(false)
    })
  })

  describe('otherwise', () => {
    it('returns true', () => {
      expect(nut.isGroupable(node, [])).toBe(true)
    })
  })
})

describe('expandNodeGroup', () => {
  it('removes the given group from groupedNodes', () => {
    const groupedNodes = { group1: [{id: '1'}], group2: [{id: '2'}]}
    expect(nut.expandNodeGroup('group1', groupedNodes)).toStrictEqual({
      group2: [{id: '2'}]
    })
  })
})

describe('makeNodeGroupId', () => {
  it('concatenates the id of lower and upper nodes', () => {
    const lowerNode = {
      id: '1',
    }
    const upperNode = {
      id: '2',
    }
    expect(nut.makeNodeGroupId(lowerNode, upperNode)).toBe('node-group-1-2')
  })
})

describe('findNodeGroupLowerBound', () => {
  const node1 = {
    id: '1',
    time: 0,
    lifeline: 'a'
  }
  const node2 = {
    id: '2',
    time: 1,
    lifeline: 'b'
  }
  const node3 = {
    id: '3',
    time: 2,
    lifeline: 'b'
  }
  const node4 = {
    id: '4',
    time: 3,
    lifeline: 'b'
  }
  const node5 = {
    id: '5',
    time: 4,
    lifeline: 'a'
  }
  const node6 = {
    id: '6',
    time: 5,
    lifeline: 'b'
  }
  const node7 = {
    id: '7',
    time: 6,
    lifeline: 'a'
  }
  const nodes = [node1, node2, node3, node4, node5, node6, node7]

  const denyList = []
1
  it('returns the earliest node in the lifeline', () => {
    expect(nut.findNodeGroupLowerBound(node1, nodes, denyList)).toStrictEqual(node1)
    expect(nut.findNodeGroupLowerBound(node2, nodes, denyList)).toStrictEqual(node2)
    expect(nut.findNodeGroupLowerBound(node3, nodes, denyList)).toStrictEqual(node2)
    expect(nut.findNodeGroupLowerBound(node4, nodes, denyList)).toStrictEqual(node2)
    expect(nut.findNodeGroupLowerBound(node5, nodes, denyList)).toStrictEqual(node1)
    expect(nut.findNodeGroupLowerBound(node6, nodes, denyList)).toStrictEqual(node2)
    expect(nut.findNodeGroupLowerBound(node7, nodes, denyList)).toStrictEqual(node1)
  })

  describe('when there\s a node in deny list', () => {
    const denyList = ['2', '5']
    it('returns the earliest node after the node in the deny list', () => {
      expect(nut.findNodeGroupLowerBound(node1, nodes, denyList)).toStrictEqual(node1)
      expect(nut.findNodeGroupLowerBound(node3, nodes, denyList)).toStrictEqual(node3)
      expect(nut.findNodeGroupLowerBound(node4, nodes, denyList)).toStrictEqual(node3)
      expect(nut.findNodeGroupLowerBound(node6, nodes, denyList)).toStrictEqual(node3)
      expect(nut.findNodeGroupLowerBound(node7, nodes, denyList)).toStrictEqual(node7)
    })
  })
})

describe('findNodeGroupUpperBound', () => {
  const node1 = {
    id: '1',
    time: 0,
    lifeline: 'a'
  }
  const node2 = {
    id: '2',
    time: 1,
    lifeline: 'b'
  }
  const node3 = {
    id: '3',
    time: 2,
    lifeline: 'b'
  }
  const node4 = {
    id: '4',
    time: 3,
    lifeline: 'b'
  }
  const node5 = {
    id: '5',
    time: 4,
    lifeline: 'a'
  }
  const node6 = {
    id: '6',
    time: 5,
    lifeline: 'b'
  }
  const node7 = {
    id: '7',
    time: 6,
    lifeline: 'a'
  }
  const nodes = [node1, node2, node3, node4, node5, node6, node7]

  const denyList = []

  it('returns the latest node in the lifeline', () => {
    expect(nut.findNodeGroupUpperBound(node1, nodes, denyList)).toStrictEqual(node7)
    expect(nut.findNodeGroupUpperBound(node2, nodes, denyList)).toStrictEqual(node6)
    expect(nut.findNodeGroupUpperBound(node3, nodes, denyList)).toStrictEqual(node6)
    expect(nut.findNodeGroupUpperBound(node4, nodes, denyList)).toStrictEqual(node6)
    expect(nut.findNodeGroupUpperBound(node5, nodes, denyList)).toStrictEqual(node7)
    expect(nut.findNodeGroupUpperBound(node6, nodes, denyList)).toStrictEqual(node6)
    expect(nut.findNodeGroupUpperBound(node7, nodes, denyList)).toStrictEqual(node7)
  })

  describe('when there\s a node in deny list', () => {
    const denyList = ['4', '5']
    it('returns the latest node before the node in the deny list', () => {
      expect(nut.findNodeGroupUpperBound(node1, nodes, denyList)).toStrictEqual(node1)
      expect(nut.findNodeGroupUpperBound(node2, nodes, denyList)).toStrictEqual(node3)
      expect(nut.findNodeGroupUpperBound(node3, nodes, denyList)).toStrictEqual(node3)
      expect(nut.findNodeGroupUpperBound(node6, nodes, denyList)).toStrictEqual(node6)
      expect(nut.findNodeGroupUpperBound(node7, nodes, denyList)).toStrictEqual(node7)
    })
  })
})

describe('collapseNode', () => {
  it('adds the node to the corresponding group', () => {
    const node1 = { id: '1', groupId: 'group-1-2', lifeline: 'a', time: 0}
    const node2 = { id: '3', groupId: 'group-3-5', lifeline: 'b', time: 5}
    const node4 = { id: '4', groupId: 'group-3-5', lifeline: 'b', time: 5}
    const groupedNodes = { 'group-3-5': { id: 'group-3-5', lifeline: 'b', nodes: [node4], time: 3, meta: {} } }
    expect(nut.collapseNode(node1, groupedNodes)).toStrictEqual({
      'group-1-2': { id: 'group-1-2', nodes: [node1], lifeline: 'a', meta: {}, time: 0 },
      'group-3-5': { id: 'group-3-5', nodes: [node4], lifeline: 'b', meta: {}, time: 3  }
    })
  })
})

describe('collapseNodes', () => {
  it('adds the nodes to the corresponding groups', () => {
    const node1 = { id: '1', groupId: 'group-1-2', lifeline: 'a', time: 0}
    const node2 = { id: '3', groupId: 'group-3-5', lifeline: 'b', time: 5}
    const groupedNodes = { }
    expect(nut.collapseNodes([node1, node2], groupedNodes)).toStrictEqual({
      'group-1-2': { id: 'group-1-2', nodes: [node1], lifeline: 'a', meta: {}, time: 0 },
      'group-3-5': { id: 'group-3-5', nodes: [node2], lifeline: 'b', meta: {}, time: 5  }
    })
  })
})
