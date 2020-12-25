import * as allModes from '@/experimental/modes'

const store = {
  namespaced: true,
  state: {
    interaction: {
      active: false,
      origin: null,
      shape: {
        x: 10,
        y: 10,
        width: 100,
        height: 200,
      },
    },
    selection: {
      links: [],
      nodes: [],
    },
    mode: 'select',

    scale: 1,
    translation: {
      x: 0,
      y: 0,
    },
  },
  getters: {
    isScaled: (state) => !(state.scale === 1.0),
    isTranslated: (state) =>
      !(state.translation.x === 0 && state.translation.y === 0),
    activeMode: (state) => {
      return allModes[state.mode]
    },
    modeContainerStyle: (state) => {
      return {
        cursor: allModes[state.mode].cursor || 'initial',
      }
    },
    scalePercentage: (state) => {
      return `${(state.scale * 100).toFixed(0)}%`
    },
  },
  mutations: {
    setOrigin(state, origin) {
      state.interaction.origin = origin
    },
    resetOrigin(state) {
      state.interaction.origin = null
    },
    setMode(state, mode) {
      if (allModes[mode]) {
        state.mode = mode
        // console.log(mode)
      } else {
        console.warn(`${mode} is not a valid mode`)
      }
    },
    setScale(state, scale) {
      state.scale = scale
    },
    setTranslation(state, { x, y }) {
      state.translation = { x, y }
    },
  },
}

export default store
