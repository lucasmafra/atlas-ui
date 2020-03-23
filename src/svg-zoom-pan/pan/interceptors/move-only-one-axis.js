export const moveOnlyOneAxis = ({ options, delta, ...rest }) => {
  if (!options.moveOnlyOneAxis) return { options, delta, ...rest }

  const moveAxis = Math.abs(delta.x) >= Math.abs(delta.y) ? 'x' : 'y'
  const limitedDelta = moveAxis === 'x' ? { x: delta.x, y: 0 } : { x: 0, y: delta.y }
  return { options, delta: limitedDelta, ...rest }
}
