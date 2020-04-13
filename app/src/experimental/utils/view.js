import { clamp, lerpPoint, scalePoint, distanceBetween } from '@/experimental/utils/numbers'

//////////////////////////////////////////////////////////////////////
// DOM UTILITIES
//////////////////////////////////////////////////////////////////////

/**
 * Returns position of interaction event both for the containing element
 * and the adjusted board position beneath
 *
 * @param {HTMLElement} target - base element for event
 * @param {Event} event
 * @param {Object} translation translated board position in {x,y}
 * @param {Number} scale board scale
 * @returns {Object}  
 *
 *  */
export const getNormalisedInteraction = (target, event, translation, scale) => {
    const rect = target.getBoundingClientRect()
    const x = event.clientX - parseInt(rect.left, 10)
    const y = event.clientY - parseInt(rect.top, 10)

    return {
        relativePoint: { x, y },
        boardPoint: containerToBoardPoint({ x, y }, translation, scale)
    }
}

export const containerToBoardPoint = (containerPoint, translation, scale) => {
    return {
        x: parseInt((containerPoint.x + -translation.x) / scale, 10),
        y: parseInt((containerPoint.y + -translation.y) / scale, 10)
    }
}

// ! TODO !
// export const boardToContainerPoint = (boardPoint, translation, scale) => {
// }


/**
 * @param {HTMLElement} target - base element for event
 * @param {Point} point point to transform
 * @param {Object} translation translated board position in {x,y}
 * @returns {Point}  
 *
 *  */
export const getTranslatedPositionFromContainer = (target, point, translation) => {
    const rect = target.getBoundingClientRect()

    return {
        x: point.x - (rect.left + translation.x),
        y: point.y - (rect.top + translation.y)
    }
} 

export const changeViewFromWheelEvent = (event, container, { translation, scale, minScale, maxScale }) => {
    const scaleChange = 2 ** (event.deltaY * 0.002)
    const newScale = clamp(
        scale + (1 - scaleChange),
        minScale,
        maxScale
    )
    const mousePosition = getTranslatedPositionFromContainer(
        container,
        { x: event.clientX, y: event.clientY },
        translation
    )

    const scaleRatio = newScale / (scale != 0 ? scale : 1)
    const focalPtDelta = scalePoint(mousePosition, scaleRatio)
    const newTranslation = {
        x: translation.x - focalPtDelta.x,
        y: translation.y - focalPtDelta.y
    }

    return [newScale, newTranslation]
}

export const changeViewFromMultiTouch = (startTouches, newTouches, container, {
    minScale,
    maxScale,
    interaction
}) => {
    const dist0 = distanceBetween(startTouches[0], startTouches[1])
    const dist1 = distanceBetween(newTouches[0], newTouches[1])
    const scaleChange = dist1 / dist0
    const startScale = interaction.origin.scale
    const targetScale = startScale + (scaleChange - 1) * startScale
    const newScale = clamp(targetScale, minScale, maxScale)

    // calculate mid points
    const newMidPoint = lerpPoint(
        touchPoint(newTouches[0]),
        touchPoint(newTouches[1]),
        0.5
    )
    const startMidpoint = lerpPoint(
        touchPoint(startTouches[0]),
        touchPoint(startTouches[1]),
        0.5
    )
    const dragDelta = {
        x: newMidPoint.x - startMidpoint.x,
        y: newMidPoint.y - startMidpoint.y
    }
    const scaleRatio = newScale / startScale
    const focalPoint = getTranslatedPositionFromContainer(
        container,
        startMidpoint,
        interaction.origin.pointer.translation
    )
    const focalPointDelta = scalePoint(focalPoint, scaleRatio)

    const newTranslation = {
        x: interaction.origin.pointer.translation.x - focalPointDelta.x + dragDelta.x,
        y: interaction.origin.pointer.translation.y - focalPointDelta.y + dragDelta.y
    }
    return [newTranslation, newScale]
}

/**
 * Normalises touch event position
 *
 * @param {Event} event
 * @returns {Point}  
 *
 *  */
export const touchPoint = touch => {
    return {
        x: touch.clientX,
        y: touch.clientY
    }
}