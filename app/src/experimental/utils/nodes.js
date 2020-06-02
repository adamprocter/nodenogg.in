//////////////////////////////////////////////////////////////////////
// TYPE DEFINITIONS
//////////////////////////////////////////////////////////////////////

/**
 * A representation of a point
 * @typedef {Object} Point
 * @property {number} x - Horizontal (x) position in pixels
 * @property {number} y - Vertical (y) position in pixels
 */

/**
 * A representation of an area
 * @typedef {Object} Area
 * @property {number} x1 - Top left (x) position in pixels
 * @property {number} y1 - Top left (y) position in pixels
 * @property {number} x2 - Bottom right (x) position in pixels
 * @property {number} y2 - Bottom right (y) position in pixels
 */

/**
 * A representation of a node
 * @typedef {Object} Node
 * @property {number} x - Horizontal (x) position in pixels
 * @property {number} y - Vertical (y) position in pixels
 * @property {number} width - Node width in pixels
 * @property {number} height - Node height in pixels
 */

//////////////////////////////////////////////////////////////////////
// NODES
//////////////////////////////////////////////////////////////////////
// Helpers for working with nodes, points and areas

/**
 * Converts a @Node into the @Area it covers
 *
 * @param {Node} node - Origin node
 * @param {number} threshold - Additional threshold area (optional)
 * @return {Area} Area covered by box, including threshold
 *
 *  */
export const nodeToArea = (node, threshold = 0.0) => {
  return {
    x1: node.x * (1.0 - threshold),
    y1: node.y * (1.0 - threshold),
    x2: (node.x + node.width) * (1.0 + threshold),
    y2: (node.y + node.height) * (1.0 + threshold)
  }
}

/**
 * Converts an @Area into a node
 *
 * @param {Area} area - Origin node
 * @return {Node}
 *
 *  */
export const areaToNode = area => {
  return {
    x: area.x1,
    y: area.y1,
    width: Math.abs(area.x2 - area.x1),
    height: Math.abs(area.y2 - area.y1)
  }
}

/**
 * Returns whether one @Area completely contains another @Area
 *
 * @param {Area} a
 * @param {Area} b
 * @return {boolean}
 *
 *  */
export const areaContains = (a, b) =>
  !(b.x1 < a.x1 || b.y1 < a.y1 || b.x2 > a.x2 || b.y2 > a.y2)

/**
 * Returns whether one @Area overlaps another @Area
 *
 * @param {Area} a
 * @param {Area} b
 * @return {boolean}
 *
 *  */
export const areaOverlaps = (a, b) => {
  if (a.x1 >= b.x2 || b.x1 >= a.x2) return false
  if (a.y1 >= b.y2 || b.y1 >= a.y2) return false

  return true
}

/**
 * Returns anchor positions for drawing links between two Nodes.
 *
 * @param {Node} from - Origin node
 * @param {Node} from - Target node
 * @return {array} Array of {x,y} positions
 *
 *  */
export const generateLinkHandles = (from, to) => {
  //   const toLeft = to.x > from.x
  return [
    {
      x: from.x + from.width,
      y: from.y + from.height / 2
    },
    {
      // x: to.x + to.width / 2,
      x: to.x + 10,
      y: to.y + to.height / 2
    }
  ]
}

/**
 * Returns a list of nodes which overlap with a given {x1,y1,x2,y2} @Area
 *
 * @param {Area} area - Origin node
 * @param {array} node - List of nodes to check against
 * @param {number} threshold - Additional threshold area (optional)
 * @return {array} Array of @Node objects which match
 *
 *  */
export const areaNodeIntersections = (targetNode, nodes, threshold = 0) => {
  return nodes
    .filter(node =>
      areaOverlaps(nodeToArea(targetNode), nodeToArea(node, threshold))
    )
    .map(({ id }) => id)
}

/**
 * Returns a list of nodes which overlap with a given {x,y} @Point
 *
 * @param {Point} point
 * @param {array} node - List of nodes to check against
 * @return {array} Array of @Node objects which match
 *
 *  */
export const pointNodeIntersections = (point, nodes) => {
  return nodes.filter(node => pointWithinNode(point, node)).map(({ id }) => id)
}

/**
 * Checks whether a @Point is within a @Node
 *
 * @param {Point} point
 * @param {Node} node
 * @return {boolean}
 *
 *  */
export const pointWithinNode = (point, node) => {
  const { x1, y1, x2, y2 } = nodeToArea(node)
  return x1 <= point.x && point.x <= x2 && y1 <= point.y && point.y <= y2
}

/**
 * Converts an array of nodes into a single large @Area
 *
 * @param {array} node - List of nodes
 * @return {Area}
 *
 *  */
export const generateAreaFromNodes = nodes => {
  const sum = {}

  for (let node of nodes) {
    const area = nodeToArea(node)
    if (!sum.x1 || area.x1 < sum.x1) {
      sum.x1 = area.x1
    }
    if (!sum.y1 || area.y1 < sum.y1) {
      sum.y1 = area.y1
    }
    if (!sum.x2 || area.x2 > sum.x2) {
      sum.x2 = area.x2
    }
    if (!sum.y2 || area.y2 > sum.y2) {
      sum.y2 = area.y2
    }
  }
  return sum
}

/**
 * Generates a node shape from two given points
 *
 * @param {Point} origin
 * @param {Point} target
 * @return {Node}
 *  */
export const generateNode = (origin, target) => {
  const minusX = origin.x > target.x
  const minusY = origin.y > target.y
  const width = Math.abs(target.x - origin.x)
  const height = Math.abs(target.y - origin.y)

  return {
    x: minusX ? origin.x - width : origin.x,
    y: minusY ? origin.y - height : origin.y,
    width,
    height
  }
}

/**
 * Transforms a grouped set of nodes based on a base transformation
 *
 * @param {Node[]} nodes - List of nodes
 * @param {Point} transform – transform
 * @return {Node[]}
 *  */
export const transformNodeSelection = (nodes, transform) => {
  const baseCoordinates = {}

  // iterate through all nodes to get underlying coordinates of group
  for (let node of nodes) {
    if (!baseCoordinates.x || node.x < baseCoordinates.x) {
      baseCoordinates.x = node.x
    }
    if (!baseCoordinates.y || node.y < baseCoordinates.y) {
      baseCoordinates.y = node.y
    }
  }

  return nodes.map(node => {
    const relativeTransform = {
      x: node.x - baseCoordinates.x,
      y: node.y - baseCoordinates.y
    }

    return Object.assign({}, node, {
      x: transform.x + relativeTransform.x,
      y: transform.y + relativeTransform.y
    })
  })
}
