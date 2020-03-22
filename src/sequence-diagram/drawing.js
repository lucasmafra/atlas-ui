/*
 * Retrieves arrow specific theme from general theme
 */
export const getArrowTheme = theme => theme.arrow

/*
 * Retrieves lifeline specific theme from general theme
 */
export const getLifelineTheme = theme => theme.lifeline

/*
 * Retrieves execution-box specific theme from general theme
 */
export const getExecutionBoxTheme = theme => theme.executionBox

/*
 * Computes (x, y) of streak based on theme config
 */
export const getStreakCoordinates = theme => {
  const {
    labelWidth,
    labelLineHeight,
    labelFontSize,
    labelLines,
    iconSize,
    labelIconMargin,
    iconStreakMargin
  } = getLifelineTheme(theme)
  const labelHeight = labelLineHeight * labelFontSize * labelLines
  return {
    x: labelWidth / 2,
    y: labelHeight + iconSize + labelIconMargin + iconStreakMargin
  }
}

/*
 * Computes lifeline horizontal offset
 */
export const getLifelineOffset = (lifeline, sequenceDiagram, theme) => {
  const { lifelines } = sequenceDiagram
  const { spaceBetweenLifelines } = theme
  const index = lifelines.findIndex(l => l.name === lifeline)
  return index * spaceBetweenLifelines
}

/*
 * Computes lifeline label height based on <theme>
 */
export const getLifelineLabelHeight = theme => {
  const { labelFontSize, labelLineHeight, labelLines } = getLifelineTheme(theme)
  return labelLineHeight * labelFontSize * labelLines
}

/*
 * Computes icon coordinate based on <theme> and relative to the lifeline
 */
export const getLifelineIconCoordinates = theme => {
  const { labelWidth, iconSize, labelIconMargin } = getLifelineTheme(theme)
  const labelHeight = getLifelineLabelHeight(theme)
  return {
    x: (labelWidth - iconSize) / 2,
    y: labelHeight + labelIconMargin
  }
}

/*
 * Returns 'right' or 'left' according to <from> and <to> positions in <sequenceDiagram>
 */
export const getArrowDirection = (from, to, sequenceDiagram) => {
  const { lifelines } = sequenceDiagram
  const fromIndex = lifelines.findIndex(l => l.name === from)
  const toIndex = lifelines.findIndex(l => l.name === to)
  return fromIndex < toIndex ? 'right' : 'left'
}

/*
 * Computes arrow x coordinate
 */
export const getArrowXCoordinate = (from, to, sequenceDiagram, streakCoordinates, theme) => {
  const { width: executionBoxWidth } = getExecutionBoxTheme(theme)
  const direction = getArrowDirection(from, to, sequenceDiagram)
  const lifeline = direction === 'right' ? from : to
  const lifelineOffset = getLifelineOffset(lifeline, sequenceDiagram, theme)
  return streakCoordinates.x + lifelineOffset + executionBoxWidth / 2
}

/*
 * Computes arrow y coordinate
 */
export const getArrowYCoordinate = (startTime, sequenceDiagram, streakCoordinates) => {
  const { durationMs: traceDurationMs, startTime: traceStartTime } = sequenceDiagram
  const yOffset = ((startTime - traceStartTime) * 100) / traceDurationMs
  return streakCoordinates.y + yOffset
}

/*
 * Computes (x, y) of arrow
 */
export const getArrowCoordinates = (from, to, startTime, sequenceDiagram, theme) => {
  const streakCoordinates = getStreakCoordinates(theme)
  return {
    x: getArrowXCoordinate(from, to, sequenceDiagram, streakCoordinates, theme),
    y: getArrowYCoordinate(startTime, sequenceDiagram, streakCoordinates)
  }
}

/*
 * Computes arrow length
 */
export const getArrowLength = (from, to, sequenceDiagram, theme) => {
  const { width: executionBoxWidth } = getExecutionBoxTheme(theme)
  const { headWidth } = getArrowTheme(theme)
  const fromOffset = getLifelineOffset(from, sequenceDiagram, theme)
  const toOffset = getLifelineOffset(to, sequenceDiagram, theme)
  return Math.abs(fromOffset - toOffset) - executionBoxWidth - headWidth
}

/*
 * Computes height of arrow label
 */
export const getArrowLabelHeight = theme => {
  const { labelFontSize, labelLineHeight, labelLines } = getArrowTheme(theme)
  return labelFontSize * labelLineHeight * labelLines
}

/*
 * Computes coordinates of arrow label relative to the arrow according to <theme>
 */
export const getArrowLabelCoordinates = theme => {
  const { headHeight, labelMargin } = getArrowTheme(theme)
  const labelHeight = getArrowLabelHeight(theme)
  return { x: 0, y: -labelHeight + headHeight - labelMargin }
}

/*
 * Computes rotation to be applied on arrow so it can be turned from right to left
 */
export const getArrowRotation = (direction, length, context) => {
  const { headWidth, headHeight } = getArrowTheme(context)
  const degrees = direction === 'right' ? 0 : 180
  const x = (length + headWidth) / 2
  const y = headHeight
  return { degrees, x, y }
}
