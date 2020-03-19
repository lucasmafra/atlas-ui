export function scale(sx, sy = undefined) {
  if (typeof sy === 'undefined') sy = sx
  return {
    a: sx,
    b: 0,
    c: 0,
    d: sy,
    e: 0,
    f: 0
  }
}

export function transform(...matrices) {
  matrices = Array.isArray(matrices[0]) ? matrices[0] : matrices

  const multiply = (m1, m2) => {
    return {
      a: m1.a * m2.a + m1.c * m2.b,
      b: m1.b * m2.a + m1.d * m2.b,
      c: m1.a * m2.c + m1.c * m2.d,
      d: m1.b * m2.c + m1.d * m2.d,
      e: m1.a * m2.e + m1.c * m2.f + m1.e,
      f: m1.b * m2.e + m1.d * m2.f + m1.f
    }
  }

  switch (matrices.length) {
    case 0:
      throw new Error('no matrices provided')

    case 1:
      return matrices[0]

    case 2:
      return multiply(matrices[0], matrices[1])

    default: {
      const [m1, m2, ...rest] = matrices
      const m = multiply(m1, m2)
      return transform(m, ...rest)
    }
  }
}

export function translate(dx, dy = 0) {
  return {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: dx,
    f: dy
  }
}

export function inverse(matrix) {
  // http://www.wolframalpha.com/input/?i=Inverse+%5B%7B%7Ba,c,e%7D,%7Bb,d,f%7D,%7B0,0,1%7D%7D%5D

  const { a, b, c, d, e, f } = matrix

  const denom = a * d - b * c

  return {
    a: d / denom,
    b: b / -denom,
    c: c / -denom,
    d: a / denom,
    e: (d * e - c * f) / -denom,
    f: (b * e - a * f) / denom
  }
}

export function applyToPoint(matrix, point) {
  return Array.isArray(point)
    ? [
        matrix.a * point[0] + matrix.c * point[1] + matrix.e,
        matrix.b * point[0] + matrix.d * point[1] + matrix.f
      ]
    : {
        x: matrix.a * point.x + matrix.c * point.y + matrix.e,
        y: matrix.b * point.x + matrix.d * point.y + matrix.f
      }
}
