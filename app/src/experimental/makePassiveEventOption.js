let passiveSupported = false
try {
  const options = {
    /* eslint-disable getter-return */
    get passive() {
      passiveSupported = true
    }
  }
  window.addEventListener('test', options, options)
  window.removeEventListener('test', options, options)
} catch {
  passiveSupported = false
}

const makePassiveEventOption = passive => {
  return passiveSupported ? { passive } : passive
}

export default makePassiveEventOption
