import { isUndefined } from '../../utils'

export const maxX = ({ matrix, options, delta, ...rest }) => {
  if (isUndefined(options.maxX)) return { matrix, options, delta, ...rest }

  const limitedDelta = { x: matrix.e + delta.x > options.maxX ? 0 : delta.x, y: delta.y }
  return { matrix, options, delta: limitedDelta, ...rest }
}
