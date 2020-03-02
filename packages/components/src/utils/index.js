import { palette } from "@/constants/color"

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

