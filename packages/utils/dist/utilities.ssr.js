'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}//////////////////////////////////////////////////////////////////////
// UTILITIES AND HELPERS
//////////////////////////////////////////////////////////////////////

/**
 * Expresses an array length in text
 */
var pluralize = function pluralize(arr, noun, plural) {
  var num = arr.length;
  var nounPlural = plural || "".concat(noun, "s");
  return "".concat(num > 0 ? num : 'No', " ").concat(num > 1 ? nounPlural : noun);
};
/**
 * Filter to retrieve unique values from array
 */

var shallowUnique = function shallowUnique(value, index, item) {
  return item.indexOf(value) === index;
};
/**
 * Removes item from an array
 */

var shallowRemoveFromArray = function shallowRemoveFromArray(arr, item) {
  var newArray = _toConsumableArray(arr);

  var index = arr.indexOf(item);

  if (index > -1) {
    newArray.splice(index, 1);
  }

  return newArray;
};
/**
 * Utility method to group array of objects by key value
 * from https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
 */

var groupBy = function groupBy(key) {
  return function (array) {
    return array.reduce(function (objectsByKeyValue, obj) {
      var value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
  };
};
/**
 * Helper to check if the code is running in a browser
 * This helps avoid errors in components that depend on
 * window when building static site in CI/node.js)
 */

var isClient = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object";
/**
 * Checks if variable is a function
 */

function isFunction(func) {
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
}
var domWindow = {
  width: isClient ? window.innerWidth : 1000,
  height: isClient ? window.innerHeight : 1000
};//////////////////////////////////////////////////////////////////////
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
var nodeToArea = function nodeToArea(node) {
  var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.0;
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

var areaToNode = function areaToNode(area) {
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

var areaContains = function areaContains(a, b) {
  return !(b.x1 < a.x1 || b.y1 < a.y1 || b.x2 > a.x2 || b.y2 > a.y2);
};
/**
 * Returns whether one @Area overlaps another @Area
 *
 * @param {Area} a
 * @param {Area} b
 * @return {boolean}
 *
 *  */

var areaOverlaps = function areaOverlaps(a, b) {
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

var generateLinkHandles = function generateLinkHandles(from, to) {
  var toLeft = to.x > from.x;
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

var areaNodeIntersections = function areaNodeIntersections(targetNode, nodes) {
  var threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.;
  return nodes.filter(function (node) {
    return areaOverlaps(nodeToArea(targetNode), nodeToArea(node, threshold));
  }).map(function (_ref) {
    var id = _ref.id;
    return id;
  });
};
/**
 * Returns a list of nodes which overlap with a given {x,y} @Point
 *
 * @param {Point} point 
 * @param {array} node - List of nodes to check against
 * @return {array} Array of @Node objects which match
 *
 *  */

var pointNodeIntersections = function pointNodeIntersections(point, nodes) {
  return nodes.filter(function (node) {
    return pointWithinNode(point, node);
  }).map(function (_ref2) {
    var id = _ref2.id;
    return id;
  });
};
/**
 * Checks whether a @Point is within a @Node
 *
 * @param {Point} point
 * @param {Node} node
 * @return {boolean}
 *
 *  */

var pointWithinNode = function pointWithinNode(point, node) {
  var _nodeToArea = nodeToArea(node),
      x1 = _nodeToArea.x1,
      y1 = _nodeToArea.y1,
      x2 = _nodeToArea.x2,
      y2 = _nodeToArea.y2;

  return x1 <= point.x && point.x <= x2 && y1 <= point.y && point.y <= y2;
};
/**
 * Converts an array of nodes into a single large @Area
 *
 * @param {array} node - List of nodes
 * @return {Area}
 *
 *  */

var generateAreaFromNodes = function generateAreaFromNodes(nodes) {
  var sum = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var node = _step.value;
      var area = nodeToArea(node);

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
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return sum;
};
/**
 * Generates a node shape from two given points
 *  */

var generateNode = function generateNode(origin, point) {
  var minusX = origin.x > point.x;
  var minusY = origin.y > point.y;
  var width = Math.abs(point.x - origin.x);
  var height = Math.abs(point.y - origin.y);
  return {
    x: minusX ? origin.x - width : origin.x,
    y: minusY ? origin.y - height : origin.y,
    width: width,
    height: height
  };
};
/**
 * Transforms a grouped set of nodes based on a base transformation
 * 
 * @param {Node[]} nodes - List of nodes
 * @param {Point} transform – transform
 * @return {Node[]}
 *  */

var transformNodeSelection = function transformNodeSelection(nodes, transform) {
  var baseCoordinates = {}; // iterate through all nodes to get underlying coordinates of group

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var node = _step2.value;

      if (!baseCoordinates.x || node.x < baseCoordinates.x) {
        baseCoordinates.x = node.x;
      }

      if (!baseCoordinates.y || node.y < baseCoordinates.y) {
        baseCoordinates.y = node.y;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return nodes.map(function (node) {
    var relativeTransform = {
      x: node.x - baseCoordinates.x,
      y: node.y - baseCoordinates.y
    };
    return Object.assign({}, node, {
      x: transform.x + relativeTransform.x,
      y: transform.y + relativeTransform.y
    });
  });
};var nodes=/*#__PURE__*/Object.freeze({__proto__:null,nodeToArea: nodeToArea,areaToNode: areaToNode,areaContains: areaContains,areaOverlaps: areaOverlaps,generateLinkHandles: generateLinkHandles,areaNodeIntersections: areaNodeIntersections,pointNodeIntersections: pointNodeIntersections,pointWithinNode: pointWithinNode,generateAreaFromNodes: generateAreaFromNodes,generateNode: generateNode,transformNodeSelection: transformNodeSelection});//////////////////////////////////////////////////////////////////////
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
var distance = function distance(from, to) {
  return Math.hypot(to.x - from.x, to.y - from.y);
};
/**
 * Returns an interpolated value between two numbers
 *
 * @param {number} from
 * @param {number} to
 * @param {number} extent - between 0.0 and 1.0
 * @return {number}
 *
 *  */

var lerp = function lerp(from, to, extent) {
  return from * (1 - extent) + to * extent;
};
/**
 * Returns an interpolated value between two points
 *
 * @param {Point} from
 * @param {Point} to
 * @param {number} extent - between 0.0 and 1.0
 * @return {Point}
 *
 *  */

var lerpPoint = function lerpPoint(from, to, extent) {
  return _defineProperty({
    x: lerp(from.x, to.x, extent)
  }, "x", lerp(from.y, to.y, extent));
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

var mapRange = function mapRange(value, from1, to1, from2, to2) {
  return (value - from1) * (to2 - from2) / (to1 - from1) + from2;
};
/**
 * Calculates the angle between two points
 *
 * @param {Point} point1
 * @param {Point} point2
 * @return {number}
 *
 *  */

var angleBetween$1 = function angleBetween(point1, point2) {
  return Math.atan2(point2.y - point1.y, point2.x - point1.x);
};var number=/*#__PURE__*/Object.freeze({__proto__:null,distance: distance,lerp: lerp,lerpPoint: lerpPoint,mapRange: mapRange,angleBetween: angleBetween$1});// CANVAS UTILITIES
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

var drawLinkBezierCurve = function drawLinkBezierCurve(context, from, to, tension) {
  var _generateLinkHandles = generateLinkHandles(from, to),
      _generateLinkHandles2 = _slicedToArray(_generateLinkHandles, 2),
      fromHandle = _generateLinkHandles2[0],
      toHandle = _generateLinkHandles2[1]; // This is a simple way to adjust the link tension depending
  // on the distance the link covers


  var adjustedTension = mapRange(distance(fromHandle, toHandle), 0, domWindow.width, tension * 0.01, tension * 2.);
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

var drawArrowHead = function drawArrowHead(context, from, to) {
  var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;

  var _generateLinkHandles3 = generateLinkHandles(from, to),
      _generateLinkHandles4 = _slicedToArray(_generateLinkHandles3, 2),
      fromHandle = _generateLinkHandles4[0],
      toHandle = _generateLinkHandles4[1];

  var angle = angleBetween(fromHandle, toHandle);
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

var clear = function clear(context, width, height) {
  context.clearRect(0, 0, width, height);
};var canvas=/*#__PURE__*/Object.freeze({__proto__:null,drawLinkBezierCurve: drawLinkBezierCurve,drawArrowHead: drawArrowHead,clear: clear});// DOM UTILITIES
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

var getInteractionPoint = function getInteractionPoint(target, event) {
  var rect = target.getBoundingClientRect();
  return {
    x: parseInt((event.clientX - rect.left) / (rect.right - rect.left) * target.offsetWidth),
    y: parseInt((event.clientY - rect.top) / (rect.bottom - rect.top) * target.offsetHeight)
  };
};
var matches = ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'];
var matchesSelectorToParentElements = function matchesSelectorToParentElements(el, selector, baseNode) {
  var node = el;
  var matchesSelectorFunc = matches.find(function (func) {
    return isFunction(node[func]);
  });
  if (!isFunction(node[matchesSelectorFunc])) return false;

  do {
    if (node[matchesSelectorFunc](selector)) return true;
    if (node === baseNode) return false;
    node = node.parentNode;
  } while (node);

  return false;
};
var addEvent = function addEvent(el, event, handler) {
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
var removeEvent = function removeEvent(el, event, handler) {
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
/**
 * Adds a color palette to a specified DOM element as CSS variables
 * 
 * @param {HTMLElement} target - root to which variables will be attached
 * @param {Object} palette - color palette
 *  */

var addPaletteToCSSVariables = function addPaletteToCSSVariables(targetElement, palette) {
  if (isClient && targetElement) {
    Object.keys(palette).forEach(function (p) {
      Object.keys(palette[p]).forEach(function (h) {
        targetElement.style.setProperty("--".concat(h, "-").concat(p), palette[p][h]);
      });
    });
  }
};var dom=/*#__PURE__*/Object.freeze({__proto__:null,getInteractionPoint: getInteractionPoint,matchesSelectorToParentElements: matchesSelectorToParentElements,addEvent: addEvent,removeEvent: removeEvent,addPaletteToCSSVariables: addPaletteToCSSVariables});var generateBezierCurve = function generateBezierCurve(from, to, tension) {
  if (from && to) {
    var _generateLinkHandles = generateLinkHandles(from, to),
        _generateLinkHandles2 = _slicedToArray(_generateLinkHandles, 2),
        fromHandle = _generateLinkHandles2[0],
        toHandle = _generateLinkHandles2[1]; // This is a simple way to adjust the link tension depending
    // on the distance the link covers


    var adjustedTension = mapRange(distance(fromHandle, toHandle), 0, domWindow.width, tension * 0.01, tension * 2.);
    return "M".concat(fromHandle.x, ",").concat(fromHandle.y, " C").concat(fromHandle.x * (1 + adjustedTension), ",").concat(fromHandle.y, " ").concat(toHandle.x * (1 - adjustedTension), ",").concat(toHandle.y, " ").concat(toHandle.x, ",").concat(toHandle.y);
  }
};
var makeBezier = function makeBezier(fromHandle, toHandle, tension) {
  // This is a simple way to adjust the link tension depending
  // on the distance the link covers
  var adjustedTension = mapRange(distance(fromHandle, toHandle), 0, domWindow.width, tension * 0.01, tension * 2.);
  return "M".concat(fromHandle.x, ",").concat(fromHandle.y, " C").concat(fromHandle.x * (1 + adjustedTension), ",").concat(fromHandle.y, " ").concat(toHandle.x * (1 - adjustedTension), ",").concat(toHandle.y, " ").concat(toHandle.x, ",").concat(toHandle.y);
};var svg=/*#__PURE__*/Object.freeze({__proto__:null,generateBezierCurve: generateBezierCurve,makeBezier: makeBezier});var _palette;

var palette = (_palette = {
  coral: {
    light: '#FFD8E1',
    dark: '#F56789'
  },
  lime: {
    light: '#EEFFBC',
    dark: '#B9DF4E'
  },
  blue: {
    light: '#CDEAFF',
    dark: '#4EB4FF'
  }
}, _defineProperty(_palette, "coral", {
  light: '#FFD8CC',
  dark: '#FF8762'
}), _defineProperty(_palette, "purple", {
  light: '#DAD9FE',
  dark: '#8A80F6'
}), _defineProperty(_palette, "pink", {
  light: '#FBE9FF',
  dark: '#E47EFD'
}), _defineProperty(_palette, "yellow", {
  light: '#FFF3CA',
  dark: '#FFD84F'
}), _defineProperty(_palette, "mono", {
  light: "#FFFFFF",
  dark: "#A3A3A3"
}), _palette);/**
 * Selects a HEX color value depending on a supplied key reference,
 * providing a default (mono) value if none is found.
 *
 * @param {string} color - Target palette (from above)
 * @param {string} type - Target color type (light or dark)
 * @returns {string} hex color value
 *
 *  */

var getPalette = function getPalette() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mono';
  var type = arguments.length > 1 ? arguments[1] : undefined;
  return palette[color] ? palette[color][type] : palette.mono[type];
};
var paletteArray = function paletteArray() {
  var result = [];
  Object.keys(palette).forEach(function (p) {
    Object.keys(palette[p]).forEach(function (h) {
      result.push({
        name: "".concat(k, "-").concat(h),
        value: palette[p][h]
      });
    });
  });
  return result;
};var color=/*#__PURE__*/Object.freeze({__proto__:null,getPalette: getPalette,paletteArray: paletteArray,palette: palette});exports.canvas=canvas;exports.color=color;exports.dom=dom;exports.domWindow=domWindow;exports.groupBy=groupBy;exports.isClient=isClient;exports.isFunction=isFunction;exports.nodes=nodes;exports.number=number;exports.pluralize=pluralize;exports.shallowRemoveFromArray=shallowRemoveFromArray;exports.shallowUnique=shallowUnique;exports.svg=svg;