import { tap } from './utils'

export const getArrowTheme = context => context.arrow
export const getLifelineTheme = context => context.lifeline
export const getExecutionBoxTheme = context => context.executionBox

export const getStreakY = context => {
  const {
    labelLineHeight,
    labelFontSize,
    labelLines,
    iconSize,
    labelIconMargin,
    iconStreakMargin
  } = getLifelineTheme(context)
  const labelHeight = labelLineHeight * labelFontSize * labelLines
  return labelHeight + iconSize + labelIconMargin + iconStreakMargin
}

export const getLifelineHorizontalCenter = context => {
  const {
    lifeline: { labelWidth }
  } = context
  return labelWidth / 2
}

export const getArrowCoordinates = (from, to, startTime, trace, context) => {
  const { spaceBetweenLifelines } = context
  const { width: executionBoxWidth } = getExecutionBoxTheme(context)
  const { lifelines, durationMs: traceDurationMs, startTime: traceStartTime } = trace
  const fromIndex = lifelines.findIndex(l => l.name === from)
  const toIndex = lifelines.findIndex(l => l.name === to)
  const direction = fromIndex < toIndex ? 'right' : 'left'
  const xOffset =
    direction === 'right' ? spaceBetweenLifelines * fromIndex : spaceBetweenLifelines * toIndex
  const yOffset = ((startTime - traceStartTime) * 100) / traceDurationMs
  return {
    x: getLifelineHorizontalCenter(context) + xOffset + executionBoxWidth - 8,
    y: getStreakY(context) + yOffset
  }
}

export const getArrowDirection = (from, to, trace) => {
  const { lifelines } = trace
  const fromIndex = lifelines.findIndex(l => l.name === from)
  const toIndex = lifelines.findIndex(l => l.name === to)
  return fromIndex < toIndex ? 'right' : 'left'
}

export const getArrowLength = (from, to, trace, context) => {
  const { spaceBetweenLifelines } = context
  const { width: executionBoxWidth } = getExecutionBoxTheme(context)
  const { headWidth } = getArrowTheme(context)
  const { lifelines } = trace
  const fromIndex = lifelines.findIndex(l => l.name === from)
  const toIndex = lifelines.findIndex(l => l.name === to)
  return Math.abs(toIndex - fromIndex) * spaceBetweenLifelines - executionBoxWidth - headWidth
}

export const getArrowLabelHeight = context => {
  const { labelFontSize, labelLineHeight, labelLines } = getArrowTheme(context)
  return labelFontSize * labelLineHeight * labelLines
}

export const getArrowLabelCoordinates = context => {
  const { headHeight, labelMargin } = getArrowTheme(context)
  const labelHeight = getArrowLabelHeight(context)
  return { x: 0, y: -labelHeight + headHeight - labelMargin }
}

export const getArrowRotation = (direction, length, context) => {
  const { headWidth, headHeight } = getArrowTheme(context)
  const degrees = tap(direction) === 'right' ? 0 : 180
  const x = (length + headWidth) / 2
  const y = headHeight
  return { degrees, x, y }
}
