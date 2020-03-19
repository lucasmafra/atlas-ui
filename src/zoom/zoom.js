import { transform, translate, scale } from '../matrix'
import { pipe } from '../functional'
import { minZoom } from './interceptors/min-zoom'
import { maxZoom } from './interceptors/max-zoom'

export const zoom = (matrix, scaleFactor, point, options = {}) => {
  const { scaleFactor: limitedScaleFactor } = pipe(
    minZoom,
    maxZoom
  )({ matrix, scaleFactor, point, options })

  return transform(
    matrix,
    translate(point.x, point.y),
    scale(limitedScaleFactor),
    translate(-point.x, -point.y)
  )
}
