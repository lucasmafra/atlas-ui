export const preventPanOnFigureSmallerThanSvg = ({ options, delta, context, ...rest }) => {
  if (!options.preventPanOnFigureSmallerThanSvg) return { options, delta, context, ...rest }

  const { svgDimensions, figureDimensions } = context
  const limitedDelta = {
    x: figureDimensions.width <= svgDimensions.width ? 0 : delta.x,
    y: figureDimensions.height <= svgDimensions.height ? 0 : delta.y
  }
  return { options, delta: limitedDelta, context, ...rest }
}
