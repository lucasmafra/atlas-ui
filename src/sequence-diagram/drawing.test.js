import * as nut from './drawing'

test('getArrowTheme', () => {
  expect(nut.getArrowTheme({ arrow: 'value' })).toBe('value')
})

test('getLifelineTheme', () => {
  expect(nut.getLifelineTheme({ lifeline: 'value' })).toBe('value')
})

test('getExecutionBoxTheme', () => {
  expect(nut.getExecutionBoxTheme({ executionBox: 'value' })).toBe('value')
})

test('getStreakCoordinates', () => {
  const theme = {
    lifeline: {
      labelWidth: 120,
      labelFontSize: 16,
      labelLineHeight: 1.5,
      labelLines: 2,
      iconSize: 48,
      labelIconMargin: 8,
      iconStreakMargin: 4
    }
  }
  expect(nut.getStreakCoordinates(theme)).toStrictEqual({ x: 60, y: 108 })
})

test('getLifelineOffset', () => {
  const sequenceDiagram = {
    lifelines: [{ name: 'a' }, { name: 'b' }, { name: 'c' }]
  }
  const theme = { spaceBetweenLifelines: 250 }
  expect(nut.getLifelineOffset('a', sequenceDiagram, theme)).toBe(0)
  expect(nut.getLifelineOffset('b', sequenceDiagram, theme)).toBe(250)
  expect(nut.getLifelineOffset('c', sequenceDiagram, theme)).toBe(500)
})

test('getLifelineLabelHeight', () => {
  const theme = {
    lifeline: {
      labelFontSize: 12,
      labelLineHeight: 1.5,
      labelLines: 2
    }
  }
  expect(nut.getLifelineLabelHeight(theme)).toBe(36)
})

test('getLifelineIconCoordinates', () => {
  const theme = {
    lifeline: {
      labelWidth: 80,
      iconSize: 32,
      labelFontSize: 12,
      labelLineHeight: 1.5,
      labelLines: 2,
      labelIconMargin: 4
    }
  }
  expect(nut.getLifelineIconCoordinates(theme)).toStrictEqual({ x: 24, y: 40 })
})

describe('getArrowDirection', () => {
  const sequenceDiagram = { lifelines: [{ name: 'a' }, { name: 'b' }] }

  test('right', () => {
    expect(nut.getArrowDirection('a', 'b', sequenceDiagram)).toBe('right')
  })

  test('left', () => {
    expect(nut.getArrowDirection('b', 'a', sequenceDiagram)).toBe('left')
  })
})

test('getArrowXCoordinate', () => {
  const theme = {
    spaceBetweenLifelines: 300,
    executionBox: { width: 32 }
  }
  const streakCoordinates = { x: 100, y: 0 }
  const sequenceDiagram = { lifelines: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] }

  expect(nut.getArrowXCoordinate('a', 'b', sequenceDiagram, streakCoordinates, theme)).toBe(116)
  expect(nut.getArrowXCoordinate('b', 'a', sequenceDiagram, streakCoordinates, theme)).toBe(116)
  expect(nut.getArrowXCoordinate('b', 'c', sequenceDiagram, streakCoordinates, theme)).toBe(416)
})

test('getArrowYCoordinate', () => {
  const streakCoordinates = { x: 100, y: 0 }
  const sequenceDiagram = { startTime: 10, durationMs: 100 }
  expect(nut.getArrowYCoordinate(50, sequenceDiagram, streakCoordinates)).toBe(40)
})

test('getArrowCoordinates', () => {
  const from = 'b'
  const to = 'c'
  const startTime = 50
  const sequenceDiagram = {
    lifelines: [{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'd' }],
    startTime: 10,
    durationMs: 100
  }
  const theme = {
    spaceBetweenLifelines: 160,
    lifeline: {
      labelWidth: 120,
      labelFontSize: 16,
      labelLineHeight: 1.5,
      labelLines: 2,
      iconSize: 48,
      labelIconMargin: 8,
      iconStreakMargin: 4
    },
    executionBox: { width: 32 }
  }
  expect(nut.getArrowCoordinates(from, to, startTime, sequenceDiagram, theme)).toStrictEqual({
    x: 236,
    y: 148
  })
})

test('getArrowLenght', () => {
  const theme = {
    spaceBetweenLifelines: 200,
    executionBox: { width: 32 },
    arrow: { headWidth: 8 }
  }
  const sequenceDiagram = { lifelines: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] }

  expect(nut.getArrowLength('a', 'b', sequenceDiagram, theme)).toBe(160)
  expect(nut.getArrowLength('b', 'a', sequenceDiagram, theme)).toBe(160)
  expect(nut.getArrowLength('a', 'c', sequenceDiagram, theme)).toBe(360)
})

test('getArrowLabelHeight', () => {
  const theme = {
    arrow: {
      labelFontSize: 12,
      labelLineHeight: 1.5,
      labelLines: 2
    }
  }
  expect(nut.getArrowLabelHeight(theme)).toBe(36)
})

test('getArrowLabelCoordinates', () => {
  const theme = {
    arrow: {
      headHeight: 8,
      labelMargin: 4,
      labelFontSize: 12,
      labelLineHeight: 1.5,
      labelLines: 2
    }
  }
  expect(nut.getArrowLabelCoordinates(theme)).toStrictEqual({ x: 0, y: -32 })
})

test('getArrowRotation', () => {
  const theme = {
    arrow: {
      headWidth: 4,
      headHeight: 8
    }
  }
  const length = 200

  expect(nut.getArrowRotation('right', length, theme).degrees).toBe(0)
  expect(nut.getArrowRotation('left', length, theme)).toStrictEqual({
    degrees: 180,
    x: 102,
    y: 8
  })
})
