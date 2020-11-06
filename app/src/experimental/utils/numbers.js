//////////////////////////////////////////////////////////////////////
// MATHS AND NUMBERS
//////////////////////////////////////////////////////////////////////

/**
 * Returns the distance between two {x,y} points
 *
 * @param {Node} from - Origin node
 * @param {Node} from - Target node
 * @return {number} Distance between points
 *
 *  */
export const distance = (from, to) => Math.hypot(to.x - from.x, to.y - from.y)

/**
 * Returns an interpolated value between two numbers
 *
 * @param {number} from
 * @param {number} to
 * @param {number} extent - between 0.0 and 1.0
 * @return {number}
 *
 *  */
export const lerp = (from, to, extent) => from * (1 - extent) + to * extent

/**
 * Returns an interpolated value between two points
 *
 * @param {Point} from
 * @param {Point} to
 * @param {number} extent - between 0.0 and 1.0
 * @return {Point}
 *
 *  */
export const lerpPoint = (from, to, extent) => {
  return {
    x: lerp(from.x, to.x, extent),
    y: lerp(from.y, to.y, extent),
  }
}

/**
 * Map a @number from one range to another
 *
 * @param {number} value - value to map
 * @param {number} from1
 * @param {number} to1
 * @param {number} from2
 * @param {number} to2
 * @return {number}
 *
 *  */
export const mapRange = (value, from1, to1, from2, to2) =>
  ((value - from1) * (to2 - from2)) / (to1 - from1) + from2

/**
 * Calculates the angle between two points
 *
 * @param {Point} point1
 * @param {Point} point2
 * @return {number}
 *
 *  */
export const angleBetween = (point1, point2) =>
  Math.atan2(point2.y - point1.y, point2.x - point1.x)

/**
 * Constrains a value within a range
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 *
 *  */
export const clamp = (value, min, max) => {
  return Math.max(min, Math.min(value, max))
}

/**
 * ! TODO ! confusing naming
 * Scales a coordinate value
 */
export const scaleCoordinate = (coordinate, scaleRatio) => {
  return scaleRatio * coordinate - coordinate
}

/**
 * ! TODO ! confusing naming
 * Scales a @Point
 */
export const scalePoint = ({ x, y }, scale) => {
  return {
    x: scaleCoordinate(x, scale),
    y: scaleCoordinate(y, scale),
  }
}

/**
 * ! TODO ! dynamic contraints based on width/height of board
 */
export const constrainTranslation = (targetTranslation, translationBounds) => {
  const { x, y } = targetTranslation
  let { xMax, xMin, yMax, yMin } = translationBounds
  xMin = xMin != undefined ? xMin : -Infinity
  yMin = yMin != undefined ? yMin : -Infinity
  xMax = xMax != undefined ? xMax : Infinity
  yMax = yMax != undefined ? yMax : Infinity
  return {
    x: clamp(x, xMin, xMax),
    y: clamp(y, yMin, yMax),
  }
}
