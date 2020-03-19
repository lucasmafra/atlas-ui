export const minZoom = ({ matrix, scaleFactor, options, ...rest }) => {
  const limitedScaleFactor = scaleFactor * matrix.a < options.minZoom ? 1 : scaleFactor
  return { matrix, scaleFactor: limitedScaleFactor, options, ...rest }
}
