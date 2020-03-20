import { pipe } from '../../functional'
import { minZoom } from './min-zoom'
import { minX } from './min-x'
import { maxX } from './max-x'
import { minY } from './min-y'

export const preventZoomOutsideFigure = ({ matrix, scaleFactor, point, options, context }) => {
  if (!options.preventZoomOutsideFigure || scaleFactor >= 1) {
    return { matrix, scaleFactor, point, options, context }
  }

  const { figureDimensions, svgDimensions } = context
  const limit = {
    minZoom: svgDimensions.width / figureDimensions.width,
    minX: 0,
    minY: 0
  }
  return pipe(minZoom, minX, maxX, minY)({ matrix, scaleFactor, point, options: limit, context })
}
