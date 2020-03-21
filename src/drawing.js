export const getStreakY = context => {
  const {
    lifeline: {
      labelLineHeight,
      labelFontSize,
      labelLines,
      iconSize,
      labelIconMargin,
      iconStreakMargin
    }
  } = context
  const labelHeight = labelLineHeight * labelFontSize * labelLines
  return labelHeight + iconSize + labelIconMargin + iconStreakMargin
}

export const getLifelineHorizontalCenter = context => {
  const {
    lifeline: { labelWidth }
  } = context
  return labelWidth / 2
}
