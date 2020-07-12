import PouchDB from 'pouchdb-browser'
import PouchFind from 'pouchdb-find'
import PouchAuthentication from 'pouchdb-authentication'
import { isRemote } from 'pouchdb-utils'

import { microcosmManager } from './microcosms.store'
import { generateRemoteURL } from './utils'

PouchDB.plugin(PouchFind)
PouchDB.plugin(PouchAuthentication)

export class MicrocosmInstance {
  _localDBReady = false
  constructor(microcosm_id, options = {}) {
    this.microcosm_id = microcosm_id

    this.registerLocalDB()
    if (options.remote) {
      this.setRemote(options.remote)
      // await this.registerRemoteDB(remote)
    }
  }
  get db() {
    return this.localDB
  }
  emit = (event, detail) => {
    microcosmManager.notify(this.microcosm_id, event, detail)
  }
  get ready() {
    return !!this.localDB && this._localDBReady
  }
  createPouchInstance = async ({ db, options = {} }) => {
    return new PouchDB(db, options)
      .on('created', () => {
        this.emit(`db-created`, {
          microcosm: db,
          ok: true,
        })
        this._localDBReady = true
      })
      .on('destroyed', () => {
        this.emit(`db-destroyed`, {
          microcosm: db,
          ok: true,
        })
      })
  }
  setRemote = async (remote) => {
    this.emit('setting remote', remote)
    // await this.replicate()
    // await this.sync()
  }

  registerLocalDB = async () => {
    this.localDB = await this.createPouchInstance({
      db: this.microcosm_id,
    })
  }
  registerRemoteDB = async (remote) => {
    const remoteURL = generateRemoteURL(remote, this.microcosm_id)
    this.remoteDB = await this.createPouchInstance({
      db: remoteURL
    })
  }
  fetchSession = () => {
    return new Promise((resolve) => {
      this.localDB
        .getSession()
        .then((session) => {
          this.localDB
            .getUser(session.userCtx.name)
            .then((userData) => {
              let userObj = Object.assign({}, session.userCtx, userData)
              resolve({
                user: userObj,
                hasAccess: true,
              })
            })
            .catch((error) => {
              resolve(error)
            })
        })
        .catch((error) => {
          resolve(error)
        })
    })
  }

  login = (username, password) => {
    return new Promise((resolve) => {
      this.localDB
        .logIn(username, password)
        .then((user) => {
          this.localDB
            .getUser(user.name)
            .then((userData) => {
              let userObj = Object.assign({}, user, userData)
              resolve({
                user: userObj,
                hasAccess: true,
              })
            })
            .catch((error) => {
              resolve(error)
            })
        })
        .catch((error) => {
          resolve(error)
        })
    })
  }

  connect = (username, password) => {
    return new Promise((resolve) => {
      if (!isRemote(this.localDB)) {
        resolve({
          message: 'database is not remote',
          error: 'bad request',
          status: 400,
        })
        return
      }
      this.login(username, password).then((res) => {
        resolve(res)
      })
    })
  }

  createUser = (username, password) => {
    return this.localDB
      .signUp(username, password)
      .then(() => {
        return this.connect(username, password)
      })
      .catch((error) => {
        return new Promise((resolve) => {
          resolve(error)
        })
      })
  }
  putUser = (username, metadata = {}) => {
    return this.localDB
      .putUser(username, {
        metadata,
      })
      .catch((error) => {
        return new Promise((resolve) => {
          resolve(error)
        })
      })
  }
  deleteUser = (username) => {
    return this.localDB.deleteUser(username).catch((error) => {
      return new Promise((resolve) => {
        resolve(error)
      })
    })
  }
  changePassword = (username, password) => {
    return this.localDB.changePassword(username, password).catch((error) => {
      return new Promise((resolve) => {
        resolve(error)
      })
    })
  }
  changeUsername = (oldUsername, newUsername) => {
    return this.localDB
      .changeUsername(oldUsername, newUsername)
      .catch((error) => {
        return new Promise((resolve) => {
          resolve(error)
        })
      })
  }
  signUpAdmin = (adminUsername, adminPassword) => {
    return this.localDB
      .signUpAdmin(adminUsername, adminPassword)
      .catch((error) => {
        return new Promise((resolve) => {
          resolve(error)
        })
      })
  }
  deleteAdmin = (adminUsername) => {
    return this.localDB.deleteAdmin(adminUsername).catch((error) => {
      return new Promise((resolve) => {
        resolve(error)
      })
    })
  }
  disconnect = () => {
    return new Promise((resolve) => {
      if (!isRemote(this.localDB)) {
        resolve({
          message: 'database is not remote',
          error: 'bad request',
          status: 400,
        })
        return
      }
      this.localDB
        .logOut()
        .then((res) => {
          resolve({
            ok: res.ok,
            user: null,
            hasAccess: false,
          })
        })
        .catch((error) => {
          resolve(error)
        })
    })
  }

  destroy = () => {
    return this.localDB.destroy()
  }

  close = () => {
    return this.localDB.close()
  }

  getSession = () => {
    if (!isRemote(this.localDB)) {
      return new Promise((resolve) => {
        resolve({
          message: 'database is not remote',
          error: 'bad request',
          status: 400,
        })
      })
    }
    return this.fetchSession()
  }
  update = (message) => {
    this.emit('update', message)
  }
  replicate = () =>
    new Promise((resolve, reject) => {
      if (!this.remoteDB) {
        reject(new Error(`Remote PouchDB instance has not been started`))
      }
      this.localDB.replicate.to(this.remoteDB).on('complete', resolve())
    })
  sync = (options = {}) =>
    new Promise((resolve, reject) => {
      console.log('attempting sync')
      if (!this.remoteDB) {
        reject(new Error(`Remote PouchDB instance has not been started`))
      }
      let _options = Object.assign(
        {},
        {
          live: true,
          retry: true,
          skip_setup: true,
          back_off_function: (delay) => {
            if (delay === 0) {
              return 1000
            }
            return delay * 3
          },
        },
        options
      )
      this.replication = this.localDB
        .sync(this.remoteDB, _options)
        .on('paused', (err) => {
          if (err) {
            this.emit('sync-error', {
              microcosm: this.microcosm_id,
              error: err,
            })
            return
          } else {
            this.emit('sync-paused', {
              microcosm: this.microcosm_id,
              paused: true,
            })
          }
        })
        .on('change', (info) => {
          this.emit('sync-change', {
            microcosm: this.microcosm_id,
            info: info,
          })
        })
        .on('active', () => {
          this.emit('sync-active', {
            microcosm: this.microcosm_id,
            active: true,
          })
        })
        .on('denied', (err) => {
          this.emit('sync-denied', {
            microcosm: this.microcosm_id,
            error: err,
          })
        })
        .on('complete', (info) => {
          this.emit('sync-complete', {
            microcosm: this.microcosm_id,
            info: info,
          })
        })
        .on('error', (err) => {
          this.emit('sync-error', {
            microcosm: this.microcosm_id,
            error: err,
          })
        })
    })
  push = (remoteDB, options = {}) => {
    let _options = Object.assign(
      {},
      {
        live: true,
        retry: true,
        back_off_function: (delay) => {
          if (delay === 0) {
            return 1000
          }
          return delay * 3
        },
      },
      options
    )

    let rep = this.localDB.replicate
      .to(remoteDB, _options)
      .on('paused', (err) => {
        if (err) {
          this.emit('push-error', {
            microcosm: this.microcosm_id,
            error: err,
          })
          return
        } else {
          this.emit('push-paused', {
            microcosm: this.microcosm_id,
            paused: true,
          })
        }
      })
      .on('change', (info) => {
        this.emit('push-change', {
          microcosm: this.microcosm_id,
          info: info,
        })
      })
      .on('active', () => {
        this.emit('push-active', {
          microcosm: this.microcosm_id,
          active: true,
        })
      })
      .on('denied', (err) => {
        this.emit('push-denied', {
          microcosm: this.microcosm_id,
          error: err,
        })
      })
      .on('complete', (info) => {
        this.emit('push-complete', {
          microcosm: this.microcosm_id,
          info: info,
        })
      })
      .on('error', (err) => {
        this.emit('push-error', {
          microcosm: this.microcosm_id,
          error: err,
        })
      })

    return rep
  }
  pull = (remoteDB, options = {}) => {
    let _options = Object.assign(
      {},
      {
        live: true,
        retry: true,
        back_off_function: (delay) => {
          if (delay === 0) {
            return 1000
          }
          return delay * 3
        },
      },
      options
    )

    let rep = this.localDB.replicate
      .from(remoteDB, _options)
      .on('paused', (err) => {
        if (err) {
          this.emit('pull-error', {
            microcosm: this.microcosm_id,
            error: err,
          })
          return
        } else {
          this.emit('pull-paused', {
            microcosm: this.microcosm_id,
            paused: true,
          })
        }
      })
      .on('change', (info) => {
        this.emit('pull-change', {
          microcosm: this.microcosm_id,
          info: info,
        })
      })
      .on('active', () => {
        this.emit('pull-active', {
          microcosm: this.microcosm_id,
          active: true,
        })
      })
      .on('denied', (err) => {
        this.emit('pull-denied', {
          microcosm: this.microcosm_id,
          error: err,
        })
      })
      .on('complete', (info) => {
        this.emit('pull-complete', {
          microcosm: this.microcosm_id,
          info: info,
        })
      })
      .on('error', (err) => {
        this.emit('pull-error', {
          microcosm: this.microcosm_id,
          error: err,
        })
      })

    return rep
  }

  changes = (options = {}) => {
    let _options = Object.assign(
      {},
      {
        live: true,
        retry: true,
        back_off_function: (delay) => {
          if (delay === 0) {
            return 1000
          }
          return delay * 3
        },
      },
      options
    )

    let changes = this.localDB
      .changes(_options)
      .on('change', (info) => {
        this.emit('changes-change', {
          microcosm: this.microcosm_id,
          info: info,
        })
      })
      .on('complete', (info) => {
        this.emit('changes-complete', {
          microcosm: this.microcosm_id,
          info: info,
        })
      })
      .on('error', (err) => {
        this.emit('changes-error', {
          microcosm: this.microcosm_id,
          error: err,
        })
      })

    return changes
  }
  get(object, options = {}) {
    return this.localDB.get(object, options)
  }
  put(object, options = {}) {
    return this.localDB.put(object, options)
  }
  post(object, options = {}) {
    return this.localDB.post(object, options)
  }
  remove(object, options = {}) {
    return this.localDB.remove(object, options)
  }
  query(fun, options = {}) {
    return this.localDB.query(fun, options)
  }
  find(options) {
    return this.localDB.find(options)
  }
  createIndex(index) {
    return this.localDB.createIndex(index)
  }
  allDocs(options = {}) {
    let _options = Object.assign({}, { include_docs: true }, options)

    return this.localDB.allDocs(_options)
  }
  bulkDocs(docs, options = {}) {
    return this.localDB.bulkDocs(docs, options)
  }
  compact = (options = {}) => {
    return this.localDB.compact(options)
  }
  viewCleanup = () => {
    return this.localDB.viewCleanup()
  }
  info = () => {
    return this.localDB.info()
  }
  putAttachment = (docId, rev, attachment) => {
    return this.localDB.putAttachment(
      docId,
      attachment.id,
      rev ? rev : null,
      attachment.data,
      attachment.type
    )
  }
  getAttachment = (docId, attachmentId) => {
    return this.localDB.getAttachment(docId, attachmentId)
  }
  deleteAttachment(docId, attachmentId, docRev) {
    return this.localDB.removeAttachment(docId, attachmentId, docRev)
  }
}
