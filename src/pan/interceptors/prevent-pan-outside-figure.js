import { pipe } from '../../functional'
import { minX } from './min-x'
import { maxX } from './max-x'
import { minY } from './min-y'
import { maxY } from './max-y'

export const preventPanOutsideFigure = ({ matrix, options, delta, context }) => {
  if (!options.preventPanOutsideFigure) return { matrix, delta, options, context }

  const { svgDimensions, figureDimensions } = context
  const boundaries = {
    minX: -(figureDimensions.width - svgDimensions.width),
    maxX: 0,
    minY: -(figureDimensions.height - svgDimensions.height),
    maxY: 0
  }
  return pipe(minX, maxX, minY, maxY)({ matrix, options: boundaries, delta, context })
}
