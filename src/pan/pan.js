import { transform, translate } from '../matrix'
import { pipe } from '../functional'
import { moveOnlyOneAxis } from './interceptors/move-only-one-axis'
import { preventPanOnFigureSmallerThanSvg } from './interceptors/prevent-pan-on-figure-smaller-than-svg'
import { preventPanOutsideFigure } from './interceptors/prevent-pan-outside-figure'

export const pan = (matrix, delta, options = {}, context = {}) => {
  const { delta: limitedDelta } = pipe(
    moveOnlyOneAxis,
    preventPanOnFigureSmallerThanSvg,
    preventPanOutsideFigure
  )({ matrix, options, delta, context })
  return transform(matrix, translate(limitedDelta.x, limitedDelta.y))
}
