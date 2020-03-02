import Vue from 'vue'
import Vuex from 'vuex'
import PouchDB from 'pouchdb'
PouchDB.plugin(require('pouchdb-find'))
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.use(Vuex)
Vue.component('vue-draggable-resizable', VueDraggableResizable)
var myclient = 'firstvisit'

if (localStorage.getItem('mylastMicrocosm') == null) {
  var microcosm = 'firstvisit'
} else {
  microcosm = localStorage.getItem('mylastMicrocosm')
}

if (localStorage.getItem('myNNClient') == null) {
  myclient = 'firstvisit'
} else {
  myclient = localStorage.getItem('myNNClient')
}


const {
  VUE_APP_COUCH_HTTP,
  VUE_APP_COUCH_USER,
  VUE_APP_COUCH_PASS,
  VUE_APP_COUCH_URL
} = process.env
var pouchdb = new PouchDB(microcosm)
var remote = `${VUE_APP_COUCH_HTTP}://${VUE_APP_COUCH_USER}:${VUE_APP_COUCH_PASS}@${VUE_APP_COUCH_URL}/${microcosm}`

const generateCouchURL = (_microcosm) =>
  `${VUE_APP_COUCH_HTTP}://${VUE_APP_COUCH_USER}:${VUE_APP_COUCH_PASS}@${VUE_APP_COUCH_URL}/${_microcosm}`


const store = new Vuex.Store({
  state: {
    version: process.env.VUE_APP_VERSION,
    localnodeid: '',
    global_pos_name: 'positions',
    global_con_name: 'connections',
    global_emoji_name: 'emojis',
    microcosm: '',
    myclient: myclient,
    activeNode: {},
    // this will be objects containing arrays of all the handles / connections and nodes
    configConnect: {
      x: -25,
      y: -25,
      height: 50,
      width: 50,
      fill: 'rgb(200, 0, 0)'
    },
    configHandle: {
      x: 25,
      y: 25,
      height: 10,
      width: 10,
      fill: 'black'
    },
    allNodes: [],
    myNodes: [
      // { nodeid: 1, nodetext: 'node 1' },
    ],
    otherNodes: [
      //{}
    ],
    configPositions: [
      //{}
    ],
    configConnections: [
      //{}
    ],
    configEmoji: [
      //{}
    ]
  },
  mutations: {
    CREATE_MICROCOSM(state, doc) {
      pouchdb.close().then(function () {
        microcosm = doc
        pouchdb = new PouchDB(microcosm)
        remote = generateCouchURL(microcosm)
        store.dispatch('syncDB')
      })
    },

    GET_ALL_NODES(state) {
      pouchdb
        .allDocs({
          include_docs: true,
          attachments: true
        })
        .then(function (doc) {
          state.microcosm = microcosm
          state.allNodes = doc.rows
          store.commit('SET_OTHER_NODES')
        })
        .catch(function (err) {
          console.log(err)
        })
    },

    SET_OTHER_NODES(state) {
      state.otherNodes = []
      var i
      var j
      for (i = 0; i < Object.keys(state.allNodes).length; i++) {
        if (
          state.allNodes[i].id != state.myclient &&
          state.allNodes[i].id != state.global_pos_name
        ) {
          for (
            j = 0;
            j < Object.keys(state.allNodes[i].doc.nodes).length;
            j++
          ) {
            const newNode = {
              nodeid: state.allNodes[i].doc.nodes[j].nodeid,
              nodetext: state.allNodes[i].doc.nodes[j].nodetext
            }

            state.otherNodes.push(newNode)
          }
        }
      }
      //console.log(state.otherNodes)
    },

    SET_CLIENT(state, doc) {
      state.myclient = doc
      store.commit('GET_MY_NODES')
    },

    GET_MY_NODES(state) {
      pouchdb
        .get(state.myclient)
        .then(function (doc) {
          state.myNodes = doc.nodes
        })
        .catch(function (err) {
          if (err.status == 404) {
            var uniqueid =
              Math.random()
                .toString(36)
                .substring(2, 15) +
              Math.random()
                .toString(36)
                .substring(2, 15)
            return pouchdb.put({
              _id: state.myclient,
              _attachments: {},
              nodes: [
                {
                  // FIXME: these values are here as GET_ALL_NODES cant hunt a blank
                  // this shouldnt need to be here

                  nodeid: uniqueid,
                  nodetext: 'Ignore this node' + state.myclient,
                  nodeowner: state.myclient,
                  content_type: 'sheet',
                  // TEMP: this hides the first node card as its effectivly auto deleted
                  deleted: true,
                  attachment_name: ''
                }
              ]
            })
          }
        })
    },

    GET_POSITIONS(state) {
      pouchdb
        .get(state.global_pos_name)
        .then(function (doc) {
          state.configPositions = doc.positions
        })
        .catch(function (err) {
          console.log(err)
          if (err.status == 404) {
            return pouchdb.put({
              _id: state.global_pos_name,
              positions: []
            })
          }
        })
    },

    MOVE_POS(state, e) {
      var i
      for (i = 0; i < Object.keys(state.configPositions).length; i++) {
        if (e.localnodeid == state.configPositions[i].nodeid) {
          state.configPositions[i].xpos = e.x
          state.configPositions[i].ypos = e.y
          state.configPositions[i].width = e.width
          state.configPositions[i].height = e.height
        }
      }

      pouchdb
        .get(state.global_pos_name)
        .then(function (doc) {
          //  console.log(doc)
          // put the store into pouchdb
          return pouchdb.bulkDocs([
            {
              _id: state.global_pos_name,
              _rev: doc._rev,
              positions: state.configPositions
            }
          ])
        })
        .then(function () {
          return pouchdb.get(state.global_pos_name).then(function (doc) {
            state.configPositions = doc.positions
          })
        })
        .catch(function (err) {
          if (err.status == 404) {
            // pouchdb.put({  })
          }
        })
    },

    ADD_NODE(state, e) {
      var uniqueid =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
      state.localnodeid = uniqueid

      pouchdb.get(state.myclient).then(function (doc) {
        if (e == undefined) {
          doc.nodes.push({
            nodeid: uniqueid,
            nodetext: '',
            nodeowner: state.myclient,
            content_type: 'sheet',
            deleted: false,
            attachment_name: e
          })
        }

        return pouchdb
          .put({
            _id: state.myclient,
            _rev: doc._rev,
            _attachments: doc._attachments,
            nodes: doc.nodes
          })
          .then(function () {
            return pouchdb.get(state.myclient).then(function (doc) {
              state.myNodes = doc.nodes
              var end = Object.keys(state.myNodes).length - 1
              const newNode = {
                nodeid: state.myNodes[end].id,
                nodetext: state.myNodes[end].text
                //  content_type: state.notes[end].content_type
              }
              state.activeNode = newNode
            })
          })
          .catch(function (err) {
            if (err.status == 404) {
              // pouchdb.put({  })
            }
          })
      })
      pouchdb.get(state.global_pos_name).then(function (doc) {
        doc.positions.push({
          nodeid: uniqueid,
          xpos: 50,
          ypos: 50,
          width: 200,
          height: 250
        })
        return pouchdb
          .put({
            _id: state.global_pos_name,
            _rev: doc._rev,
            positions: doc.positions
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    },

    EDIT_NODE(state, e) {
      var i
      for (i = 0; i < Object.keys(state.myNodes).length; i++) {
        if (e.nodeid == state.myNodes[i].nodeid) {
          state.myNodes[i].nodetext = e.nodetext
        }
      }
      pouchdb
        .get(state.myclient)
        .then(function (doc) {
          // put the store into pouchdb

          return pouchdb.bulkDocs([
            {
              _id: state.myclient,
              _rev: doc._rev,
              _attachments: doc._attachments,
              nodes: state.myNodes
            }
          ])
        })
        .then(function () {
          return pouchdb.get(state.myclient).then(function (doc) {
            state.myNodes = doc.nodes
          })
        })
        .catch(function (err) {
          if (err.status == 404) {
            // pouchdb.put({  })
          }
        })
    },

    DELETE_FLAG(state, e) {
      var i
      for (i = 0; i < Object.keys(state.myNodes).length; i++) {
        if (e.e == state.myNodes[i].nodeid) {
          state.myNodes[i].deleted = true
        }
      }
      pouchdb
        .get(state.myclient)
        .then(function (doc) {
          // put the store into pouchdb
          return pouchdb.bulkDocs([
            {
              _id: state.myclient,
              _rev: doc._rev,
              _attachments: doc._attachments,
              nodes: state.myNodes
            }
          ])
        })
        .then(function () {
          return pouchdb.get(state.myclient).then(function (doc) {
            state.myNodes = doc.nodes
          })
        })
        .catch(function (err) {
          if (err.status == 404) {
            // pouchdb.put({  })
          }
        })
    },
    GET_EMOJI(state) {
      console.log
      pouchdb
        .get(state.global_emoji_name)
        .then(function (doc) {
          state.configEmoji = doc.emojis
        })
        .catch(function (err) {
          console.log(err)
          if (err.status == 404) {
            return pouchdb.put({
              _id: state.global_emoji_name,
              emojis: []
            })
          }
        })
    },
    ADD_EMOJI(state, e) {
      var uniqueid =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
      pouchdb.get(state.global_emoji_name).then(function (doc) {
        doc.emojis.push({
          id: uniqueid,
          docid: e.docid,
          emojitext: e.emojitext
        })
        return pouchdb
          .put({
            _id: state.global_emoji_name,
            _rev: doc._rev,
            emojis: doc.emojis
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    }
  },

  actions: {
    syncDB: () => {
      pouchdb.replicate.from(remote).on('complete', function () {
        store.commit('GET_ALL_NODES')
        store.commit('GET_MY_NODES')
        store.commit('GET_POSITIONS')
        store.commit('GET_EMOJI')
        // turn on two-way, continuous, retriable sync
        pouchdb
          .sync(remote, { live: true, retry: true, attachments: true })
          .on('change', function () {
            // pop info into function to find out more
            store.commit('GET_ALL_NODES')
            store.commit('GET_MY_NODES')
            store.commit('GET_POSITIONS')
            store.commit('GET_EMOJI')
          })
          .on('paused', function () {
            // replication paused (e.g. replication up to date, user went offline)
            // console.log('replication paused')
          })
          .on('active', function () {
            // replicate resumed (e.g. new changes replicating, user went back online)
            //console.log('back active')
          })
          .on('denied', function () {
            // a document failed to replicate (e.g. due to permissions)
          })
          .on('complete', function () {
            // handle complete
            //console.log('complete')
          })
          .on('error', function (err) {
            console.log(err)
          })
      })
    },
    createMicrocosm: ({ commit }, e) => {
      commit('CREATE_MICROCOSM', e)
    },
    setClient: ({ commit }, e) => {
      commit('SET_CLIENT', e)
    },

    movePos: ({ commit }, nodeid, xpos, ypos, width, height) => {
      commit('MOVE_POS', nodeid, xpos, ypos, width, height)
    },

    addNode: ({ commit }, e) => {
      commit('ADD_NODE', e)
    },
    editNode: ({ commit }, { nodeid, nodetext }) => {
      commit('EDIT_NODE', { nodeid, nodetext })
    },
    deleteFlag: ({ commit }, e) => {
      // var text = e.target.value
      commit('DELETE_FLAG', e)
    },
    addEmoji: ({ commit }, { docid, emojitext }) => {
      commit('ADD_EMOJI', {
        docid,
        emojitext
      })
    }
  },
  modules: {}
})

export default store
store.dispatch('syncDB')
