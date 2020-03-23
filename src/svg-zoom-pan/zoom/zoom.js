import { transform, translate, scale, applyToPoint, inverse } from '../matrix'
import { pipe } from '../../common-js/functional'
import { preventZoomOutsideFigure } from './interceptors/prevent-zoom-outside-figure'
import { scaleFactor } from './interceptors/scale-factor'

function getSvgPoint(matrix, x, y) {
  const inverseMatrix = inverse(matrix)
  return applyToPoint(inverseMatrix, { x, y })
}

export const zoom = (matrix, point, options, context = {}) => {
  const svgPoint = getSvgPoint(matrix, point.x, point.y)

  const { scaleFactor: limitedScaleFactor, point: limitedPoint, matrix: limitedMatrix } = pipe(
    scaleFactor,
    preventZoomOutsideFigure
  )({
    matrix,
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
