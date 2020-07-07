import Vue from 'vue'
import Vuex from 'vuex'
import PouchDB from 'pouchdb'
//import Stream from 'pouchdb-replication-stream'
// Not sure find is used this way and I dont think I use it anymore anyway??
PouchDB.plugin(require('pouchdb-find'))
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import uiStore from '@/experimental/uiStore'
import Router from '@/router'

import { microcosmsStore } from './microcosms/microcosms.store'

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

var pouchdb = new PouchDB(microcosm)
var remote =
  process.env.VUE_APP_COUCH_HTTP +
  '://' +
  process.env.VUE_APP_COUCH_USER +
  ':' +
  process.env.VUE_APP_COUCH_PASS +
  process.env.VUE_APP_COUCH_URL +
  microcosm +
  '/'

//var remotetwo = 'http://127.0.0.1:5984/'

// console.log(remote)
const store = new Vuex.Store({
  state: {
    shortcutstate: false,
    version: process.env.VUE_APP_VERSION,
    localnodeid: '',
    global_pos_name: 'positions',
    global_con_name: 'connections',
    global_emoji_name: 'emojis',
    microcosm: '',
    myclient: myclient,
    activeNode: {},
    // this will be objects containing arrays of all the handles / connections and nodes
    configConnect: {},
    configHandle: {},
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
    ],
  },
  mutations: {
    CREATE_MICROCOSM(state, doc) {
      // const urldevice = Router.currentRoute.params.device
      const urlmicrocosm = Router.currentRoute.params.microcosm
      pouchdb.close().then(function () {
        if (urlmicrocosm != undefined) {
          // myclient = urldevice

          microcosm = urlmicrocosm
        } else {
          microcosm = doc
        }
        pouchdb = new PouchDB(microcosm)
        remote =
          process.env.VUE_APP_COUCH_HTTP +
          '://' +
          process.env.VUE_APP_COUCH_USER +
          ':' +
          process.env.VUE_APP_COUCH_PASS +
          process.env.VUE_APP_COUCH_URL +
          microcosm +
          '/'
        store.dispatch('syncDB')
      })
    },

    GET_ALL_NODES(state) {
      pouchdb
        .allDocs({
          include_docs: true,
          attachments: true,
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
          state.allNodes[i].id != state.global_pos_name &&
          state.allNodes[i].id != state.global_emoji_name &&
          state.allNodes[i].id != state.global_con_name //&&
          //
        ) {
          for (
            j = 0;
            j < Object.keys(state.allNodes[i].doc.nodes).length;
            j++
          ) {
            if (state.allNodes[i].doc.nodes[j].deleted != true) {
              const newNode = {
                node_id: state.allNodes[i].doc.nodes[j].node_id,
                node_text: state.allNodes[i].doc.nodes[j].node_text,
              }

              state.otherNodes.push(newNode)
            }
          }
        }
      }
      //// console.log(state.otherNodes)
    },

    SET_CLIENT(state, doc) {
      state.myclient = doc
      store.commit('GET_MY_NODES')
    },

    GET_URL_MICROCOSM(state, doc) {
      state.microcosm = doc
      localStorage.setItem('mylastMicrocosm', doc)
      // store.commit('GET_MY_NODES')
    },

    GET_MY_NODES(state) {
      pouchdb
        .get(state.myclient)
        .then(function (doc) {
          var i
          for (i = 0; i < Object.keys(doc.nodes).length; i++) {
            if (doc.nodes[i].deleted == true) {
              doc.nodes.splice(i, 1)
            }
            state.myNodes = doc.nodes
          }
        })
        .catch(function (err) {
          if (err.status == 404) {
            var uniqueid =
              Math.random().toString(36).substring(2, 15) +
              Math.random().toString(36).substring(2, 15)
            return pouchdb.put({
              _id: state.myclient,
              _attachments: {},
              nodes: [
                {
                  // FIXME: these values are here as GET_ALL_NODES cant hunt a blank
                  // this shouldnt need to be here though

                  node_id: uniqueid,
                  node_text: 'Ignore this node ' + state.myclient,
                  node_owner: state.myclient,
                  content_type: 'sheet',
                  // NOTE: first node is hidden due to no position
                  deleted: true,
                  attachment_name: '',
                },
              ],
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
              positions: [],
            })
          }
        })
    },

    GET_CONNECTIONS(state) {
      pouchdb
        .get(state.global_con_name)
        .then(function (doc) {
          state.configConnections = doc.connections
        })
        .catch(function (err) {
          console.log(err)
          if (err.status == 404) {
            return pouchdb.put({
              _id: state.global_con_name,
              connections: [],
            })
          }
        })
    },

    MAKE_CONNECT(state, e) {
      var connectid =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)

      state.configConnections.push({
        connect_id: connectid,
        start_id: e.fromnode,
        end_id: e.tonode,
        path: e.path,
        color: e.color,
        line_dash: e.linedash,
        line_width: e.linewidth,
      })

      //   from db   |   in app

      //  connect_id |   connectID
      //  start_id   |   startID

      pouchdb
        .get(state.global_con_name)
        .then(function (doc) {
          // put the store into pouchdb

          return pouchdb.bulkDocs([
            {
              _id: state.global_con_name,
              _rev: doc._rev,
              connections: state.configConnections,
            },
          ])
        })
        .then(function () {
          return pouchdb.get(state.global_con_name).then(function (doc) {
            state.configConnections = doc.connections
          })
        })
        .catch(function (err) {
          if (err.status == 404) {
            // pouchdb.put({  })
          }
        })
    },

    MOVE_POS(state, e) {
      var i
      for (i = 0; i < Object.keys(state.configPositions).length; i++) {
        if (e.localnodeid == state.configPositions[i].node_id) {
          state.configPositions[i].x_pos = e.x
          state.configPositions[i].y_pos = e.y
          state.configPositions[i].width = e.width
          state.configPositions[i].height = e.height
          state.configPositions[i].z_index = e.zindex
        }
      }

      pouchdb
        .get(state.global_pos_name)
        .then(function (doc) {
          //  // console.log(doc)
          // put the store into pouchdb
          return pouchdb.bulkDocs([
            {
              _id: state.global_pos_name,
              _rev: doc._rev,
              positions: state.configPositions,
            },
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

    //

    SHORTCUT_STATE(state, e) {
      state.shortcutstate = e
    },

    ADD_NODE(state, e) {
      var uniqueid =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      state.localnodeid = uniqueid

      pouchdb.get(state.myclient).then(function (doc) {
        if (e == undefined) {
          doc.nodes.push({
            node_id: uniqueid,
            node_text: '',
            node_owner: state.myclient,
            content_type: 'sheet',
            deleted: false,
            attachment_name: e,
          })
        }

        return pouchdb
          .put({
            _id: state.myclient,
            _rev: doc._rev,
            _attachments: doc._attachments,
            nodes: doc.nodes,
          })
          .then(function () {
            return pouchdb.get(state.myclient).then(function (doc) {
              state.myNodes = doc.nodes
              var end = Object.keys(state.myNodes).length - 1
              const newNode = {
                nodeid: state.myNodes[end].id,
                nodetext: state.myNodes[end].text,
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
          node_id: uniqueid,
          x_pos: 50,
          y_pos: 50,
          width: 220,
          height: 295,
          z_index: 1,
          read_mode: false,
        })
        return pouchdb
          .put({
            _id: state.global_pos_name,
            _rev: doc._rev,
            positions: doc.positions,
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    },

    EDIT_NODE(state, e) {
      var i
      for (i = 0; i < Object.keys(state.myNodes).length; i++) {
        if (e.nodeid == state.myNodes[i].node_id) {
          state.myNodes[i].node_text = e.nodetext
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
              nodes: state.myNodes,
            },
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
        if (e.e == state.myNodes[i].node_id) {
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
              nodes: state.myNodes,
            },
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

    READ_FLAG(state, e) {
      var i
      // console.log(e.e)
      for (i = 0; i < Object.keys(state.configPositions).length; i++) {
        if (e.e == state.configPositions[i].node_id) {
          state.configPositions[i].read_mode = e.readmode
        }
      }

      pouchdb
        .get(state.global_pos_name)
        .then(function (doc) {
          //  // console.log(doc)
          // put the store into pouchdb
          return pouchdb.bulkDocs([
            {
              _id: state.global_pos_name,
              _rev: doc._rev,
              positions: state.configPositions,
            },
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

    GET_EMOJI(state) {
      // console.log
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
              emojis: [],
            })
          }
        })
    },
    ADD_EMOJI(state, e) {
      var uniqueid =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      pouchdb.get(state.global_emoji_name).then(function (doc) {
        doc.emojis.push({
          emoji_id: uniqueid,
          node_id: e.nodeid,
          emoji_text: e.emojitext,
        })
        return pouchdb
          .put({
            _id: state.global_emoji_name,
            _rev: doc._rev,
            emojis: doc.emojis,
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    },
  },

  actions: {
    getURLParam: () => {
      const urlparam = Router.currentRoute.params.microcosm
      // // console.log(urlparam)
      store.commit('GET_URL_MICROCOSM', urlparam)
    },

    syncDB: () => {
      pouchdb.replicate.from(remote).on('complete', function () {
        store.commit('GET_ALL_NODES')
        store.commit('GET_MY_NODES')
        store.commit('GET_POSITIONS')
        store.commit('GET_CONNECTIONS')
        store.commit('GET_EMOJI')
        // turn on two-way, continuous, retriable sync
        pouchdb
          .sync(remote, {
            live: true,
            since: 'now',
            retry: true,
            attachments: true,
          })
          .on('change', function () {
            // pop info into function to find out more
            store.commit('GET_ALL_NODES')
            store.commit('GET_MY_NODES')
            store.commit('GET_POSITIONS')
            store.commit('GET_CONNECTIONS')
            store.commit('GET_EMOJI')
          })
          .on('paused', function () {
            // replication paused (e.g. replication up to date, user went offline)
            // // console.log('replication paused')
          })
          .on('active', function () {
            // replicate resumed (e.g. new changes replicating, user went back online)
            //// console.log('back active')
          })
          .on('denied', function () {
            // a document failed to replicate (e.g. due to permissions)
          })
          .on('complete', function () {
            // handle complete
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

    movePos: ({ commit }, nodeid, xpos, ypos, width, height, zindex) => {
      commit('MOVE_POS', nodeid, xpos, ypos, width, height, zindex)
    },
    readFlag: ({ commit }, e) => {
      // var text = e.target.value
      commit('READ_FLAG', e)
    },
    addNode: ({ commit }, e) => {
      commit('ADD_NODE', e)
    },
    editNode: ({ commit }, { nodeid, nodetext }) => {
      commit('EDIT_NODE', { nodeid, nodetext })
    },

    makeConnect: (
      { commit },
      { connectid, fromnode, tonode, path, color, linedash, linewidth }
    ) => {
      commit('MAKE_CONNECT', {
        connectid,
        fromnode,
        tonode,
        path,
        color,
        linedash,
        linewidth,
      })
    },
    shortcutState: ({ commit }, e) => {
      commit('SHORTCUT_STATE', e)
    },
    deleteFlag: ({ commit }, e) => {
      // var text = e.target.value
      commit('DELETE_FLAG', e)
    },

    addEmoji: ({ commit }, { nodeid, emojitext }) => {
      commit('ADD_EMOJI', {
        nodeid,
        emojitext,
      })
    },
  },
  modules: {
    ui: uiStore,
    microcosms: microcosmsStore,
  },
})

export default store

store.dispatch('syncDB')
