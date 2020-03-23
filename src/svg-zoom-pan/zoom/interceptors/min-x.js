export const minX = ({ matrix, point, scaleFactor, options, ...rest }) => {
  const leftMost = point.x * (matrix.a * (1 - scaleFactor)) + matrix.e
  if (leftMost > options.minX) {
    matrix.e -= leftMost - options.minX
  }
  return { matrix, point, scaleFactor, options, ...rest }
}
