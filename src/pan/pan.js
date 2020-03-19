import { transform, translate } from '../matrix'
import { pipe } from '../functional'
import { moveOnlyOneAxis } from './interceptors/move-only-one-axis'
import { preventPanOutsideFigure } from './interceptors/prevent-pan-outside-figure'
import { panVelocity } from './interceptors/pan-velocity'

export const pan = (matrix, delta, options = {}, context = {}) => {
  const { delta: limitedDelta } = pipe(
    moveOnlyOneAxis,
    preventPanOutsideFigure,
    panVelocity
  )({ matrix, options, delta, context })
  return transform(matrix, translate(limitedDelta.x, limitedDelta.y))
}
