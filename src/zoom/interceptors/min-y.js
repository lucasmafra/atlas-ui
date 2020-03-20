export const minY = ({ matrix, point, scaleFactor, options, ...rest }) => {
  const topMost = point.y * (matrix.d * (1 - scaleFactor)) + matrix.f
  if (topMost > options.minY) {
    matrix.f -= topMost - options.minY
  }
  return { matrix, point, scaleFactor, options, ...rest }
}
