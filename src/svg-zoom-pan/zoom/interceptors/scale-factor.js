export const scaleFactor = ({ options, ...rest }) => {
  const { zoomMode, zoomVelocity = 0.01 } = options
  return {
    options,
    ...rest,
    scaleFactor: zoomMode === 'ZOOM_IN' ? 1 + zoomVelocity : 1 - zoomVelocity
  }
}
