import PouchDB from 'pouchdb-browser'
import { generateNode } from '@/store/dev-utils'

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
const generateRemoteURL = ({ secure = false, domain, username, password }) =>
  `http${secure ? 's' : ''}://${username}:${password}@${domain}`

// options for sync replication with remote CouchDB
const dbSyncOptions = {
  skip_setup: true,
  live: true,
  retry: true,
}

class PouchDBManager {
  /**
   * @description
   * Initiates a PouchDB instance based on a supplied microcosm identifier
   *
   * @param {Object} options
   * @param {String} options.microcosm_id - Target microcosm
   * @param {Object} options.remote - Configuration for remote CouchDB
   * @param {Boolean} options.remote.secure - Use a secure (HTTPS) connection
   * @param {Boolean} options.remote.domain - Domain name for CouchDB
   * @param {Boolean} options.remote.username - Admin username for CouchDB
   * @param {Boolean} options.remote.password - Admin password for CouchDB
   */
  init = async ({ microcosm_id, remote }) => {
    this.loading = false
    this.nodes = []

    // create a new local instance of PouchDB
    this.db = new PouchDB(microcosm_id, { skip_setup: true })

    // if the existing instance is being synced with CouchDB, cancel that process
    await this.cancelReplication()

    // if a remote CouchDB instance is specified, start replication to sync with
    // the local PouchDB instance
    if (remote) {
      // generate a base URL for our remote CouchDB instance
      const url = generateRemoteURL(remote)

      // test to see if the remote instance is accessible
      this.testReplication(microcosm_id, url)
        .then((info) => {
          console.log(info)

          // start two-way sync
          this.startReplication(microcosm_id, url, dbSyncOptions)
        })
        .catch(this.handleError)
    }

    await this.updateContent()

    return this.nodes
  }

  /**
   * @description
   * Handles info messages from PouchDB instance
   *
   * @param {Object} info - info object
   */
  handleInfo = (info) => {
    console.log(info)
  }

  /**
   * @description
   * Handles errors
   *
   * @param {Object} err - error object
   */
  handleError = (err) => {
    console.log(err)
  }

  /**
   * @description
   * Tests to see if PouchDB can be synced with remote CouchDB
   *
   * @param {String} microcosm_id - Target microcosm
   * @param {String} url - Remote base URL for CouchDB
   */
  testReplication = (microcosm_id, url) =>
    new Promise((resolve, reject) => {
      this.db.replicate
        .from(`${url}/${microcosm_id}`)
        .on('complete', resolve)
        .on('error', reject)
    })

  /**
   * @description
   * Starts two-way replication between local PouchDB and the
   * remote CouchDB instance
   *
   * @param {String} microcosm_id - Target microcosm
   * @param {String} url - Remote base URL for CouchDB
   * @param {Object} options - Configuration for PouchDB sync
   */
  startReplication = async (microcosm_id, url, options) => {
    this.replication = PouchDB.sync(
      microcosm_id,
      `${url}/${microcosm_id}`,
      options
    )
      .on('change', this.handleReplicationChange)
      .on('complete', this.handleReplicationComplete)
      .on('error', this.handleError)
  }

  /**
   * @description
   * Handles a change from remote DB
   */
  handleReplicationChange = async () => {
    await this.updateContent()
  }

  /**
   * @description
   * Handles when replication has been completed or terminated
   */
  handleReplicationComplete = async (info) => {
    this.handleInfo(info)
  }

  /**
   * @description
   * Cancels replication
   */
  cancelReplication = async () => {
    if (this.replication) {
      this.replication.cancel()
    }
  }
  updateContent = async () => {
    const allDocs = await this.db.allDocs({
      include_docs: true,
    })
    this.nodes = allDocs.rows.map((row) => row.doc)
    this.loading = false
  }
  addNode = async () => {
    const newNode = generateNode()
    const addition = await this.db.post(newNode)
    if (addition.ok) {
      await this.updateContent()
    }
  }
  updateNode = async () => {
    // const { todo } = event.detail
    // const update = await this.db.put(todo)
    // if (update.ok) {
    //     await updateTodos()
    // }
  }
  removeNode = async (event) => {
    const { node: nodeToRemove } = event.detail
    const removal = await this.db.remove(nodeToRemove)
    if (removal.ok) {
      // For removal, we can just update the local state instead of reloading everything from PouchDB,
      // since we no longer care about the doc’s revision.
      this.nodes = this.nodes.filter((node) => {
        return node._id !== nodeToRemove._id
      })
    }
  }
}

export default new PouchDBManager()
