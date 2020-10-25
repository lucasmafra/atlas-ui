import { isUndefined } from '../../../common-js/misc'

export const minX = ({ matrix, options, delta, ...rest }) => {
  if (isUndefined(options.minX)) return { matrix, options, delta, ...rest }

  const limitedDelta = { x: matrix.e + delta.x < options.minX ? 0 : delta.x, y: delta.y }
  return { matrix, options, delta: limitedDelta, ...rest }
}
