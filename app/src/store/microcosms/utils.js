import set from 'set-value'
import { STORE_PREFIX, MICROCOSM_ROUTES } from './constants'

export const updateHistory = (history = {}, { microcosm_id, data, edit }) => {
  const newHistory = Object.assign({}, history)
  const timestamp = new Date()
  set(
    newHistory,
    microcosm_id,
    Object.assign({}, newHistory[microcosm_id] || {}, {
      microcosm_id,
      ...data,
      lastViewed: timestamp,
      ...edit && { lastEdited: timestamp }
    })
  )
  return newHistory
}

export const isMicrocosmRoute = ({ name }) =>
  MICROCOSM_ROUTES.indexOf(name) > -1

export const connectRouterToMicrocosmStore = (router, store) =>
  router.afterEach((to) => {
    store.dispatch(`${STORE_PREFIX}/handleRouteChange`, to)
  })

export const logger = (origin, color, ...message) => {
  console.log(`%c[${origin}]`, `color: ${color}`, ...message)
}

/**
 * @description
 * Utility to generate a base URL for remote CouchDB
 *
 * @param {Object} options
 * @param {Boolean} options.secure - Use a secure (HTTPS) connection (default: false)
 * @param {Boolean} options.domain - Domain name for CouchDB
 * @param {Boolean} options.username - Admin username for CouchDB
 * @param {Boolean} options.password - Admin password for CouchDB
 */
export const generateRemoteURL = ({
  secure = false,
  domain,
  username,
  password,
  microcosm_id
}, defaultMicrocosmID) => {
  const credentials = username && password ? `${username}:${password}@` : ''
  return `http${secure ? 's' : ''}://${credentials}${domain}/${microcosm_id || defaultMicrocosmID}`
}
