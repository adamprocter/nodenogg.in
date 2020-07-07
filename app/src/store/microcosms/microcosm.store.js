export const registerMicrocosmStore = (microcosm_id, view) => {
  const [moduleName, moduleExists] = getMicrocosmStoreName(microcosm_id)

  // if the module for this microcosm doesn't exist, create it
  if (!moduleExists) {
    log(`Creating new module store @ ${moduleName}`)
    store.registerModule(
      [STORE_PREFIX, STORE_CHILD_PREFIX, moduleName],
      microcosmStoreTemplate(microcosm_id)
    )
  } else {
    log(`Using existing module store @ ${moduleName}`)
  }

  // add the microcosm to history
  store.dispatch('microcosms/addToHistory', { microcosm_id, view })

  manager
    .registerMicrocosm(microcosm_id, {
      remote: {
        secure: false,
        domain: 'localhost:5984',
        username: 'auto-admin',
        password: 'password',
      },
    })
    .then((instance) => {
      console.log(instance)
    })

  // return the module name and namedspaced helpers
  return {
    moduleName,
    namespace: `${STORE_PREFIX}/${STORE_CHILD_PREFIX}/${moduleName}`,
  }
}

// start the local PouchDB instance and sync it with remote
// PouchDBManager.init({
//   microcosm_id,
//   remote: {
//     username: 'auto-admin',
//     password: 'testing',
//     domain: 'localhost:5984',
//   },
// }).then((r) => {
//   console.log(r)
// })
