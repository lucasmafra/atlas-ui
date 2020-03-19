export const preventZoomOutsideFigure = ({ matrix, scaleFactor, point, options, context }) => {
  if (!options.preventZoomOutsideFigure) {
    return { matrix, scaleFactor, point, options, context }
  }

  const { svgDimensions, figureDimensions } = context
  const maxE = 0
  const maxF = 0

  const minE = -(figureDimensions.width * matrix.a * scaleFactor - svgDimensions.width)
  const minF = -(figureDimensions.height * matrix.d * scaleFactor - svgDimensions.height)

  const newE = matrix.a * (point.x * (1 - scaleFactor)) + matrix.e
  const newF = matrix.d * (point.y * (1 - scaleFactor)) + matrix.f

  if (minE > maxE) {
    return { matrix, scaleFactor: 1, point, options, context }
  }

  const newPoint = {
    x:
      newE > minE
        ? newE < maxE
          ? point.x
          : matrix.e / (matrix.a * (scaleFactor - 1))
        : (matrix.a * scaleFactor * figureDimensions.width + matrix.e - svgDimensions.width) /
          (matrix.a * (scaleFactor - 1)),

    y:
      newF > minF
        ? newF < maxF
          ? point.y
          : matrix.f / (matrix.d * (scaleFactor - 1))
        : (matrix.d * scaleFactor * figureDimensions.height + matrix.f - svgDimensions.height) /
          (matrix.d * (scaleFactor - 1))
  }
  return { matrix, scaleFactor, point: newPoint, options, context }
}
