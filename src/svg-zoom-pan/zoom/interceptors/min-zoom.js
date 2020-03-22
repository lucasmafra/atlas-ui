export const minZoom = ({ matrix, scaleFactor, options, ...rest }) => {
  const limitedScaleFactor = scaleFactor < options.minZoom ? 1 : scaleFactor
  return { matrix, scaleFactor: limitedScaleFactor, options, ...rest }
}
