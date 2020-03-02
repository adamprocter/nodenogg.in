import { domWindow as win } from "@/helpers"
import { generateLinkHandles } from "@/nodes"
import { mapRange, distance } from "@/number"

export const generateBezierCurve = (from, to, tension) => {
    if (from && to) {

        const [fromHandle, toHandle] = generateLinkHandles(from, to);

        // This is a simple way to adjust the link tension depending
        // on the distance the link covers
        const adjustedTension = mapRange(distance(fromHandle, toHandle), 0, win.width, tension * 0.01, tension * 2.)

        return `M${fromHandle.x},${fromHandle.y} C${fromHandle.x * (1 + adjustedTension)},${fromHandle.y} ${toHandle.x * (1 - adjustedTension)},${toHandle.y} ${toHandle.x},${toHandle.y}`
    }
}

export const makeBezier = (fromHandle, toHandle, tension) => {
    // This is a simple way to adjust the link tension depending
    // on the distance the link covers
    const adjustedTension = mapRange(distance(fromHandle, toHandle), 0, win.width, tension * 0.01, tension * 2.)

    return `M${fromHandle.x},${fromHandle.y} C${fromHandle.x * (1 + adjustedTension)},${fromHandle.y} ${toHandle.x * (1 - adjustedTension)},${toHandle.y} ${toHandle.x},${toHandle.y}`
}
