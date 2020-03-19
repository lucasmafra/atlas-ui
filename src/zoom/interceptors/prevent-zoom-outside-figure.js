export const preventZoomOutsideFigure = ({ matrix, scaleFactor, point, options, context }) => {
  if (!options.preventZoomOutsideFigure) {
    return { matrix, scaleFactor, point, options, context }
  }

  if (scaleFactor >= 1) {
    return { matrix, scaleFactor, point, options, context }
  }

  const { figureDimensions, svgDimensions } = context

  if (figureDimensions.width * scaleFactor < svgDimensions.width) {
    return { matrix, scaleFactor: 1, point, options, context }
  }

  const missingToMaxX =
    svgDimensions.width -
    figureDimensions.width * scaleFactor -
    point.x * (matrix.a * (1 - scaleFactor)) -
    matrix.e

  const exceedingMinX = point.x * (matrix.a * (1 - scaleFactor)) + matrix.e

  const exceedingMinY = point.y * (matrix.d * (1 - scaleFactor)) + matrix.f

  if (missingToMaxX > 0) {
    matrix.e += missingToMaxX
  } else if (exceedingMinX > 0) {
    matrix.e -= exceedingMinX
  }

  if (exceedingMinY > 0) {
    matrix.f -= exceedingMinY
  }

  return { matrix, scaleFactor, point, options, context }
}
