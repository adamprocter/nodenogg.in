export const clamp = (min, value, max) => {
  return Math.max(min, Math.min(value, max))
}

export const distance = (p1, p2) => {
  const dx = p1.x - p2.x
  const dy = p1.y - p2.y
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}

export const midpoint = (p1, p2) => {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2
  }
}

export const touchPt = touch => {
  return { x: touch.clientX, y: touch.clientY }
}

export const touchDistance = (t0, t1) => {
  const p0 = touchPt(t0)
  const p1 = touchPt(t1)
  return distance(p0, p1)
}

export const coordChange = (coordinate, scaleRatio) => {
  return scaleRatio * coordinate - coordinate
}
