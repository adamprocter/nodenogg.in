import Emitter from 'eventemitter3'

import { MicrocosmInstance } from './MicrocosmInstance'

const log = (...message) =>
  console.log(`%c[MicrocosmInstanceManager]`, `color: #9ef03e`, ...message)

export class MicrocosmInstanceManager extends Emitter {
  microcosmInstances = new Map()

  add = (microcosm_id, options = {}) =>
    new Promise((resolve) => {
      this.get(microcosm_id)
        .then(() => {
          log(`Using existing PouchDB instance @ ${microcosm_id}`)
          resolve(true)
        })
        .catch(() => {
          log(`Creating new PouchDB instance @ ${microcosm_id}`)
          this.microcosmInstances.set(
            microcosm_id,
            new MicrocosmInstance(microcosm_id, options)
          )
          resolve(false)
        })
    })
  notify = (microcosm_id, event, detail) => {
    log(`[${microcosm_id}] -->`, event, detail)
  }
  get = (microcosm_id) =>
    new Promise((resolve, reject) => {
      const targetInstance = this.microcosmInstances.get(microcosm_id)
      if (targetInstance) {
        if (targetInstance.ready) {
          resolve(targetInstance)
        } else {
          reject(`[${microcosm_id}] Instance not ready`)
        }
      } else {
        reject(`Could not find instance @ ${microcosm_id}`)
      }
    })
  remove = (microcosm_id) =>
    new Promise((resolve, reject) => {
      this.get(microcosm_id)
        .then((instance) => {
          instance.remove()
          this.microcosmInstances.remove(microcosm_id)
          resolve()
        })
        .catch(reject)
    })
}
