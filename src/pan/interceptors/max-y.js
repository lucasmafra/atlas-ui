import { isUndefined } from '../../utils'

export const maxY = ({ matrix, options, delta, ...rest }) => {
  if (isUndefined(options.maxY)) return { matrix, options, delta, ...rest }

  const limitedDelta = { x: delta.x, y: matrix.f + delta.y > options.maxY ? 0 : delta.y }
  return { matrix, options, delta: limitedDelta, ...rest }
}
