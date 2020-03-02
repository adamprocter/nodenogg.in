//////////////////////////////////////////////////////////////////////
// UTILITIES AND HELPERS
//////////////////////////////////////////////////////////////////////

/**
 * Expresses an array length in text
 */
const pluralize = (arr, noun, plural) => {
  const num = arr.length;
  const nounPlural = plural || `${noun}s`;
  return `${num > 0 ? num : 'No'} ${num > 1 ? nounPlural : noun}`;
};
/**
 * Filter to retrieve unique values from array
 */

const shallowUnique = (value, index, item) => item.indexOf(value) === index;
/**
 * Removes item from an array
 */

const shallowRemoveFromArray = (arr, item) => {
  const newArray = [...arr];
  const index = arr.indexOf(item);

  if (index > -1) {
    newArray.splice(index, 1);
  }

  return newArray;
};
/**
 * Utility method to group array of objects by key value
 * from https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
 */

const groupBy = key => array => array.reduce((objectsByKeyValue, obj) => {
  const value = obj[key];
  objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
  return objectsByKeyValue;
}, {});
/**
 * Helper to check if the code is running in a browser
 * This helps avoid errors in components that depend on
 * window when building static site in CI/node.js)
 */

const isClient = typeof window === "object";
/**
 * Checks if variable is a function
 */

function isFunction(func) {
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
}
const domWindow = {
  width: isClient ? window.innerWidth : 1000,
  height: isClient ? window.innerHeight : 1000
};

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
const nodeToArea = (node, threshold = 0.0) => {
  return {
    x1: node.x * (1.0 - threshold),
    y1: node.y * (1.0 - threshold),
    x2: (node.x + node.width) * (1.0 + threshold),
    y2: (node.y + node.height) * (1.0 + threshold)
  };
};
/**
 * Converts an @Area into a node
 *
 * @param {Area} area - Origin node 
 * @return {Node}
 *
 *  */

const areaToNode = area => {
  return {
    x: area.x1,
    y: area.y1,
    width: Math.abs(area.x2 - area.x1),
    height: Math.abs(area.y2 - area.y1)
  };
};
/**
 * Returns whether one @Area completely contains another @Area
 *
 * @param {Area} a
 * @param {Area} b
 * @return {boolean}
 *
 *  */

const areaContains = (a, b) => !(b.x1 < a.x1 || b.y1 < a.y1 || b.x2 > a.x2 || b.y2 > a.y2);
/**
 * Returns whether one @Area overlaps another @Area
 *
 * @param {Area} a
 * @param {Area} b
 * @return {boolean}
 *
 *  */

const areaOverlaps = (a, b) => {
  if (a.x1 >= b.x2 || b.x1 >= a.x2) return false;
  if (a.y1 >= b.y2 || b.y1 >= a.y2) return false;
  return true;
};
/**
 * Returns anchor positions for drawing links between two Nodes.
 *
 * @param {Node} from - Origin node 
 * @param {Node} from - Target node
 * @return {array} Array of {x,y} positions
 *
 *  */

const generateLinkHandles = (from, to) => {
  const toLeft = to.x > from.x;
  return [{
    x: from.x + from.width,
    y: from.y + from.height / 2
  }, {
    // x: to.x + to.width / 2,
    x: to.x + 10,
    y: to.y + to.height / 2
  }];
};
/**
 * Returns a list of nodes which overlap with a given {x1,y1,x2,y2} @Area
 *
 * @param {Area} area - Origin node
 * @param {array} node - List of nodes to check against
 * @param {number} threshold - Additional threshold area (optional)
 * @return {array} Array of @Node objects which match
 *
 *  */

const areaNodeIntersections = (targetNode, nodes, threshold = 0.) => {
  return nodes.filter(node => areaOverlaps(nodeToArea(targetNode), nodeToArea(node, threshold))).map(({
    id
  }) => id);
};
/**
 * Returns a list of nodes which overlap with a given {x,y} @Point
 *
 * @param {Point} point 
 * @param {array} node - List of nodes to check against
 * @return {array} Array of @Node objects which match
 *
 *  */

const pointNodeIntersections = (point, nodes) => {
  return nodes.filter(node => pointWithinNode(point, node)).map(({
    id
  }) => id);
};
/**
 * Checks whether a @Point is within a @Node
 *
 * @param {Point} point
 * @param {Node} node
 * @return {boolean}
 *
 *  */

const pointWithinNode = (point, node) => {
  const {
    x1,
    y1,
    x2,
    y2
  } = nodeToArea(node);
  return x1 <= point.x && point.x <= x2 && y1 <= point.y && point.y <= y2;
};
/**
 * Converts an array of nodes into a single large @Area
 *
 * @param {array} node - List of nodes
 * @return {Area}
 *
 *  */

const generateAreaFromNodes = nodes => {
  const sum = {};

  for (let node of nodes) {
    const area = nodeToArea(node);

    if (!sum.x1 || area.x1 < sum.x1) {
      sum.x1 = area.x1;
    }

    if (!sum.y1 || area.y1 < sum.y1) {
      sum.y1 = area.y1;
    }

    if (!sum.x2 || area.x2 > sum.x2) {
      sum.x2 = area.x2;
    }

    if (!sum.y2 || area.y2 > sum.y2) {
      sum.y2 = area.y2;
    }
  }

  return sum;
};
/**
 * Generates a node shape from two given points
 *  */

const generateNode = (origin, point) => {
  const minusX = origin.x > point.x;
  const minusY = origin.y > point.y;
  const width = Math.abs(point.x - origin.x);
  const height = Math.abs(point.y - origin.y);
  return {
    x: minusX ? origin.x - width : origin.x,
    y: minusY ? origin.y - height : origin.y,
    width,
    height
  };
};
/**
 * Transforms a grouped set of nodes based on a base transformation
 * 
 * @param {Node[]} nodes - List of nodes
 * @param {Point} transform – transform
 * @return {Node[]}
 *  */

const transformNodeSelection = (nodes, transform) => {
  const baseCoordinates = {}; // iterate through all nodes to get underlying coordinates of group

  for (let node of nodes) {
    if (!baseCoordinates.x || node.x < baseCoordinates.x) {
      baseCoordinates.x = node.x;
    }

    if (!baseCoordinates.y || node.y < baseCoordinates.y) {
      baseCoordinates.y = node.y;
    }
  }

  return nodes.map(node => {
    const relativeTransform = {
      x: node.x - baseCoordinates.x,
      y: node.y - baseCoordinates.y
    };
    return Object.assign({}, node, {
      x: transform.x + relativeTransform.x,
      y: transform.y + relativeTransform.y
    });
  });
};

var nodes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    nodeToArea: nodeToArea,
    areaToNode: areaToNode,
    areaContains: areaContains,
    areaOverlaps: areaOverlaps,
    generateLinkHandles: generateLinkHandles,
    areaNodeIntersections: areaNodeIntersections,
    pointNodeIntersections: pointNodeIntersections,
    pointWithinNode: pointWithinNode,
    generateAreaFromNodes: generateAreaFromNodes,
    generateNode: generateNode,
    transformNodeSelection: transformNodeSelection
});

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
const distance = (from, to) => Math.hypot(to.x - from.x, to.y - from.y);
/**
 * Returns an interpolated value between two numbers
 *
 * @param {number} from
 * @param {number} to
 * @param {number} extent - between 0.0 and 1.0
 * @return {number}
 *
 *  */

const lerp = (from, to, extent) => from * (1 - extent) + to * extent;
/**
 * Returns an interpolated value between two points
 *
 * @param {Point} from
 * @param {Point} to
 * @param {number} extent - between 0.0 and 1.0
 * @return {Point}
 *
 *  */

const lerpPoint = (from, to, extent) => {
  return {
    x: lerp(from.x, to.x, extent),
    x: lerp(from.y, to.y, extent)
  };
};
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

const mapRange = (value, from1, to1, from2, to2) => (value - from1) * (to2 - from2) / (to1 - from1) + from2;
/**
 * Calculates the angle between two points
 *
 * @param {Point} point1
 * @param {Point} point2
 * @return {number}
 *
 *  */

const angleBetween$1 = (point1, point2) => Math.atan2(point2.y - point1.y, point2.x - point1.x);

var number = /*#__PURE__*/Object.freeze({
    __proto__: null,
    distance: distance,
    lerp: lerp,
    lerpPoint: lerpPoint,
    mapRange: mapRange,
    angleBetween: angleBetween$1
});

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

const drawLinkBezierCurve = (context, from, to, tension) => {
  const [fromHandle, toHandle] = generateLinkHandles(from, to); // This is a simple way to adjust the link tension depending
  // on the distance the link covers

  const adjustedTension = mapRange(distance(fromHandle, toHandle), 0, domWindow.width, tension * 0.01, tension * 2.);
  context.beginPath();
  context.moveTo(fromHandle.x, fromHandle.y);
  context.bezierCurveTo(fromHandle.x * (1 + adjustedTension), fromHandle.y, toHandle.x * (1 - adjustedTension), toHandle.y, toHandle.x, toHandle.y);
};
/**
 * Adds an arrow head to the end of a link
 *
 * @param {CanvasRenderingContext2D} context - 2D rendering context
 * @param {Point} from - Origin point
 * @param {Point} to - Target point
 * @param {number} size - Arrowhead size
 *
 *  */

const drawArrowHead = (context, from, to, size = 10) => {
  const [fromHandle, toHandle] = generateLinkHandles(from, to);
  const angle = angleBetween(fromHandle, toHandle);
  context.setLineDash([0, 0]);
  context.setTransform(1, 0, 0, 1, toHandle.x - size, toHandle.y);
  context.rotate(angle * 0.65);
  context.moveTo(-size, -size / 1.25);
  context.lineTo(0, 0);
  context.lineTo(-size, size / 1.25);
  context.setTransform(1, 0, 0, 1, 0, 0);
};
/**
 * Clears the drawing context
 *
 * @param {CanvasRenderingContext2D} context - 2D rendering context
 * @param {number} width
 * @param {number} height
 *
 *  */

const clear = (context, width, height) => {
  context.clearRect(0, 0, width, height);
};

var canvas = /*#__PURE__*/Object.freeze({
    __proto__: null,
    drawLinkBezierCurve: drawLinkBezierCurve,
    drawArrowHead: drawArrowHead,
    clear: clear
});

// DOM UTILITIES
//////////////////////////////////////////////////////////////////////

/**
 * !! INCOMPLETE !!
 * Normalises mouse/touch interaction events
 *
 * @param {HTMLElement} target - base element for event
 * @param {Event} event
 * @returns {Point}
 *
 *  */

const getInteractionPoint = (target, event) => {
  const rect = target.getBoundingClientRect();
  return {
    x: parseInt((event.clientX - rect.left) / (rect.right - rect.left) * target.offsetWidth),
    y: parseInt((event.clientY - rect.top) / (rect.bottom - rect.top) * target.offsetHeight)
  };
};
const matches = ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'];
const matchesSelectorToParentElements = (el, selector, baseNode) => {
  let node = el;
  const matchesSelectorFunc = matches.find(func => isFunction(node[func]));
  if (!isFunction(node[matchesSelectorFunc])) return false;

  do {
    if (node[matchesSelectorFunc](selector)) return true;
    if (node === baseNode) return false;
    node = node.parentNode;
  } while (node);

  return false;
};
const addEvent = (el, event, handler) => {
  if (!el) {
    return;
  }

  if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true);
  } else {
    el['on' + event] = handler;
  }
};
const removeEvent = (el, event, handler) => {
  if (!el) {
    return;
  }

  if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true);
  } else {
    el['on' + event] = null;
  }
};

var dom = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getInteractionPoint: getInteractionPoint,
    matchesSelectorToParentElements: matchesSelectorToParentElements,
    addEvent: addEvent,
    removeEvent: removeEvent
});

const generateBezierCurve = (from, to, tension) => {
  if (from && to) {
    const [fromHandle, toHandle] = generateLinkHandles(from, to); // This is a simple way to adjust the link tension depending
    // on the distance the link covers

    const adjustedTension = mapRange(distance(fromHandle, toHandle), 0, domWindow.width, tension * 0.01, tension * 2.);
    return `M${fromHandle.x},${fromHandle.y} C${fromHandle.x * (1 + adjustedTension)},${fromHandle.y} ${toHandle.x * (1 - adjustedTension)},${toHandle.y} ${toHandle.x},${toHandle.y}`;
  }
};
const makeBezier = (fromHandle, toHandle, tension) => {
  // This is a simple way to adjust the link tension depending
  // on the distance the link covers
  const adjustedTension = mapRange(distance(fromHandle, toHandle), 0, domWindow.width, tension * 0.01, tension * 2.);
  return `M${fromHandle.x},${fromHandle.y} C${fromHandle.x * (1 + adjustedTension)},${fromHandle.y} ${toHandle.x * (1 - adjustedTension)},${toHandle.y} ${toHandle.x},${toHandle.y}`;
};

var svg = /*#__PURE__*/Object.freeze({
    __proto__: null,
    generateBezierCurve: generateBezierCurve,
    makeBezier: makeBezier
});

export { canvas, dom, domWindow, groupBy, isClient, isFunction, nodes, number, pluralize, shallowRemoveFromArray, shallowUnique, svg };
