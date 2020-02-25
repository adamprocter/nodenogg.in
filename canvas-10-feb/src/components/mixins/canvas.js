import { generateLinkHandles } from '../utils/nodes.js'
import { mapRange, distance } from '../utils/numbers.js'

//////////////////////////////////////////////////////////////////////
// CANVAS UTILITIES
//////////////////////////////////////////////////////////////////////
// Because these helpers directly manipulate the drawing context,
// their methods don't need to return anything

/**
 * Adds a bezier curve to the drawing context
 *
 * @param {CanvasRenderingContext2D} context - 2D rendering context
 * @param {Node} from - Origin node
 * @param {Node} to - Target node
 * @param {number} tension - Tension of the curve to be drawn
 *
 *  */
export const drawLinkBezierCurve = (context, from, to, tension) => {
  const [fromHandle, toHandle] = generateLinkHandles(from, to)

  // This is a simple way to adjust the link tension depending
  // on the distance the link covers
  const adjustedTension = mapRange(
    distance(fromHandle, toHandle),
    0,
    1000,
    tension * 0.01,
    tension * 2
  )

  context.beginPath()
  context.moveTo(fromHandle.x, fromHandle.y)
  context.bezierCurveTo(
    fromHandle.x * (1 + adjustedTension),
    fromHandle.y,
    toHandle.x * (1 - adjustedTension),
    toHandle.y,
    toHandle.x,
    toHandle.y
  )
}

export const drawArrowHead = (context, from, to, size = 10) => {
  const [fromHandle, toHandle] = generateLinkHandles(from, to)
  var angleBetween = null
  const angle = angleBetween(fromHandle, toHandle)

  context.setLineDash([0, 0])
  context.setTransform(1, 0, 0, 1, toHandle.x - size, toHandle.y)

  context.rotate(angle * 0.65)

  context.moveTo(-size, -size / 1.25)
  context.lineTo(0, 0)
  context.lineTo(-size, size / 1.25)
  context.setTransform(1, 0, 0, 1, 0, 0)
}
