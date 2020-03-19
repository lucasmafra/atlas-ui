import { transform, translate, scale, applyToPoint, inverse } from '../matrix'
import { pipe } from '../functional'
import { preventZoomOutsideFigure } from './interceptors/prevent-zoom-outside-figure'

function getSvgPoint(matrix, x, y) {
  const inverseMatrix = inverse(matrix)
  return applyToPoint(inverseMatrix, { x, y })
}

export const zoom = (matrix, scaleFactor, point, options = {}, context = {}) => {
  const svgPoint = getSvgPoint(matrix, point.x, point.y)

  const { scaleFactor: limitedScaleFactor, point: limitedPoint, matrix: limitedMatrix } = pipe(
    preventZoomOutsideFigure
  )({
    matrix,
    scaleFactor,
    point: svgPoint,
    options,
    context
  })

  return transform(
    limitedMatrix,
    translate(limitedPoint.x, limitedPoint.y),
    scale(limitedScaleFactor),
    translate(-limitedPoint.x, -limitedPoint.y)
  )
}
