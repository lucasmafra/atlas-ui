export const panVelocity = ({ delta, options, ...rest }) => {
  const { panVelocity: velocity = 1 } = options
  const newDelta = { x: delta.x * velocity, y: delta.y * velocity }
  return { delta: newDelta, options, ...rest }
}
