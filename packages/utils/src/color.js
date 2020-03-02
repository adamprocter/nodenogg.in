import { palette } from "@/constants/palettes"

/**
 * Selects a HEX color value depending on a supplied key reference,
 * providing a default (mono) value if none is found.
 *
 * @param {string} color - Target palette (from above)
 * @param {string} type - Target color type (light or dark)
 * @returns {string} hex color value
 *
 *  */
export const getPalette = (color = 'mono', type) =>
    palette[color] ? palette[color][type] : palette.mono[type]



export const paletteArray = () => {
    const result = []
    Object.keys(palette).forEach(p => {
        Object.keys(palette[p]).forEach(h => {
            result.push({ name: `${k}-${h}`, value: palette[p][h] })
        })
    })
    return result
}

export { palette }