import { isUndefined } from '../../utils'

export const minY = ({ matrix, options, delta, ...rest }) => {
  if (isUndefined(options.minY)) return { matrix, options, delta, ...rest }

  const limitedDelta = { x: delta.x, y: matrix.f + delta.y < options.minY ? 0 : delta.y }
  return { matrix, options, delta: limitedDelta, ...rest }
}
