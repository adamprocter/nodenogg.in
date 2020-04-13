import { isFunction } from '@/experimental/utils/helpers'

//////////////////////////////////////////////////////////////////////
// DOM UTILITIES
//////////////////////////////////////////////////////////////////////

/**
 * Normalises mouse/touch interaction events
 *
 * @param {HTMLElement} target - base element for event
 * @param {Event} event
 * @returns {Point}
 *
 *  */
export const getInteractionPoint = (target, event) => {
  const rect = target.getBoundingClientRect()

  return {
    x: parseInt(
      ((event.clientX - rect.left) / (rect.right - rect.left)) *
      target.offsetWidth
    ),
    y: parseInt(
      ((event.clientY - rect.top) / (rect.bottom - rect.top)) *
      target.offsetHeight
    )
  }
}

const matches = [
  'matches',
  'webkitMatchesSelector',
  'mozMatchesSelector',
  'msMatchesSelector',
  'oMatchesSelector'
]

export const matchesSelectorToParentElements = (el, selector, baseNode) => {
  let node = el

  const matchesSelectorFunc = matches.find(func => isFunction(node[func]))

  if (!isFunction(node[matchesSelectorFunc])) return false

  do {
    if (node[matchesSelectorFunc](selector)) return true
    if (node === baseNode) return false
    node = node.parentNode
  } while (node)

  return false
}

export const addEvent = (el, event, handler) => {
  if (!el) {
    return
  }
  if (el.attachEvent) {
    el.attachEvent('on' + event, handler)
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true)
  } else {
    el['on' + event] = handler
  }
}

export const removeEvent = (el, event, handler) => {
  if (!el) {
    return
  }
  if (el.detachEvent) {
    el.detachEvent('on' + event, handler)
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true)
  } else {
    el['on' + event] = null
  }
}
