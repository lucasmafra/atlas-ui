import { transform, translate } from './matrix'
import { pipe } from './functional'

const restrictDirection = ({ options, delta, ...rest }) => {
  const { moveOnlyOneAxis } = options
  if (!moveOnlyOneAxis) return { options, delta, ...rest }

  const moveAxis = Math.abs(delta.x) >= Math.abs(delta.y) ? 'x' : 'y'
  const limitedDelta = moveAxis === 'x' ? { x: delta.x, y: 0 } : { x: 0, y: delta.y }
  return { options, delta: limitedDelta, ...rest }
}

const restrictPanOnFigureSmallerThanSvg = ({ options, delta, context, ...rest }) => {
  const { dontPanOnFigureSmallerThanSvg } = options
  if (!dontPanOnFigureSmallerThanSvg) return { options, delta, context, ...rest }

  const { svgDimensions, figureDimensions } = context
  const limitedDelta = {
    x: figureDimensions.width <= svgDimensions.width ? 0 : delta.x,
    y: figureDimensions.height <= svgDimensions.height ? 0 : delta.y
  }
  return { options, delta: limitedDelta, context, ...rest }
}

const restrictMinX = ({ matrix, options, delta, ...rest }) => {
  const { minX } = options
  if (!minX) return { matrix, options, delta, ...rest }

  const limitedDelta = { x: matrix.e + delta.x < minX ? 0 : delta.x, y: delta.y }
  return { options, delta: limitedDelta, ...rest }
}

const restrictMaxX = ({ matrix, options, delta, ...rest }) => {
  const { maxX } = options
  if (!maxX) return { matrix, options, delta, ...rest }

  const limitedDelta = { x: matrix.e + delta.x > maxX ? 0 : delta.x, y: delta.y }
  return { options, delta: limitedDelta, ...rest }
}

const restrictMinY = ({ matrix, options, delta, ...rest }) => {
  const { minY } = options
  if (!minY) return { matrix, options, delta, ...rest }

  const limitedDelta = { x: delta.x, y: matrix.f + delta.y < minY ? 0 : delta.y }
  return { options, delta: limitedDelta, ...rest }
}

const restrictMaxY = ({ matrix, options, delta, ...rest }) => {
  const { maxY } = options
  if (!maxY) return { matrix, options, delta, ...rest }

  const limitedDelta = { x: delta.x, y: matrix.f + delta.y > maxY ? 0 : delta.y }
  return { options, delta: limitedDelta, ...rest }
}

export const pan = (matrix, delta, options = {}, context = {}) => {
  const { delta: limitedDelta } = pipe(
    restrictDirection,
    restrictPanOnFigureSmallerThanSvg,
    restrictMinX,
    restrictMaxX,
    restrictMinY,
    restrictMaxY
  )({ matrix, options, delta, context })
  return transform(matrix, translate(limitedDelta.x, limitedDelta.y))
}
