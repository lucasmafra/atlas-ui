import * as nut from './node-grouping'

describe('isGrouped', () => {
  it('returns whether a node is already grouped', () => {
    const nodeA = { id: '1' }
    const nodeB = { id: '6' }
    const groupedNodes = {
      'group1': [],
      'group2': ['2', '3', '4'],
      'group3': ['5', '1', '0']
    }
    expect(nut.isGrouped(nodeA, groupedNodes)).toBe(true)
    expect(nut.isGrouped(nodeB, groupedNodes)).toBe(false)
  })
})

describe('isGroupable', () => {
  const node = { id: '1' }
  const denyList = []
  const groupedNodes = {}

  describe('when node is deny list', () => {
    const denyList = ['1']

    it('returns false', () => {
      expect(nut.isGroupable(node, denyList, {})).toBe(false)
    })
  })

  describe('when node is already grouped', () => {
    const groupedNodes = {
      'group1': ['1']
    }

    it('returns false', () => {
      expect(nut.isGroupable(node, denyList, groupedNodes)).toBe(false)
    })
  })

  describe('otherwise', () => {
    it('returns true', () => {
      expect(nut.isGroupable(node, [], {})).toBe(true)
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
