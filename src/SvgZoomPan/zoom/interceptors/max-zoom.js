export const maxZoom = ({ matrix, scaleFactor, options, ...rest }) => {
  const limitedScaleFactor = scaleFactor * matrix.a > options.maxZoom ? 1 : scaleFactor
  return { matrix, scaleFactor: limitedScaleFactor, options, ...rest }
}
