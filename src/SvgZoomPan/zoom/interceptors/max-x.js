export const maxX = ({ matrix, point, scaleFactor, options, context, ...rest }) => {
  const { svgDimensions, figureDimensions } = context

  const rightMost =
    figureDimensions.width * scaleFactor + point.x * (matrix.a * (1 - scaleFactor)) + matrix.e

  if (rightMost < svgDimensions.width) {
    matrix.e += svgDimensions.width - rightMost
  }

  return { matrix, point, scaleFactor, options, context, ...rest }
}
