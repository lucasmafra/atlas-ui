import { transform, translate, scale } from '../matrix'
import { pipe } from '../functional'
import { preventZoomOutsideFigure } from './interceptors/prevent-zoom-outside-figure'

const identity = x => x
export const zoom = (matrix, scaleFactor, point, options = {}, context = {}) => {
  const { scaleFactor: limitedScaleFactor, point: limitedPoint } = pipe(identity)({
    matrix,
    scaleFactor,
    point,
    options,
    context
  })

  console.log('scaleFactor', scaleFactor)
  console.log('limitedScaleFactor', limitedScaleFactor)
  console.log('point', point)
  console.log('limitedPoint', limitedPoint)

  return transform(
    matrix,
    translate(limitedPoint.x, limitedPoint.y),
    scale(limitedScaleFactor),
    translate(-point.x, -point.y)
  )
}
