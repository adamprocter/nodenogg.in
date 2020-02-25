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
    x: lerp(from.x, to.x, extent)
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
