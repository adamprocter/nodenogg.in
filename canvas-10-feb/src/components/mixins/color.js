export const palette = {
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
  },
  purple: {
    light: '#DAD9FE',
    dark: '#8A80F6'
  },
  pink: {
    light: '#FBE9FF',
    dark: '#E47EFD'
  },
  yellow: {
    light: '#FFF3CA',
    dark: '#FFD84F'
  },
  mono: {
    light: '#FFFFFF',
    dark: '#A3A3A3'
  }
}

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
