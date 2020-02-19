import Vue from 'vue'
import Vuex from 'vuex'
import PouchDB from 'pouchdb'
import accounts from '../assets/settings.json'

Vue.use(Vuex)
// var rando = Math.random()
//   .toString(16)
//   .slice(2)
var microcosm = 'podcast2020'
var pouchdb = new PouchDB(microcosm)
var remote =
  'https://' +
  accounts.settings[0].name +
  ':' +
  accounts.settings[0].password +
  '@nn.adamprocter.co.uk/' +
  microcosm +
  '/'

const store = new Vuex.Store({
  state: {
    localnodeid: null,
    global_pos_name: 'positions',
    // this is set with localStorage or could be random on Every Load
    // so long as you can edit all nodes
    myclient: 'mac',
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
    myNodes: [
      // { nodeid: 1, nodetext: 'node 1' },
    ],
    otherNodes: [
      //{}
    ],
    configPositions: [
      //{}
    ]
  },
  mutations: {
    GET_NODES(state) {
      pouchdb
        .allDocs({
          include_docs: true,
          attachments: true
        })
        .then(function(doc) {
          var i
          var j
          for (i = 0; i < Object.keys(doc.rows).length; i++) {
            if (state.myclient == doc.rows[i].key) {
              state.myNodes = doc.rows[i].doc.nodes
            }
            if (
              state.myclient != doc.rows[i].key &&
              state.global_pos_name != doc.rows[i].key &&
              state.global_con_name != doc.rows[i].key &&
              state.global_emoji_name != doc.rows[i].key
            ) {
              for (j = 0; j < Object.keys(doc.rows[i].doc.nodes).length; j++) {
                console.log(doc.rows[i].doc.nodes[j].nodeid)
                console.log(doc.rows[i].doc.nodes[j].nodetext)
                const newNode = {
                  nodeid: doc.rows[i].doc.nodes[j].nodeid,
                  nodetext: doc.rows[i].doc.nodes[j].nodetext
                }
                state.otherNodes.push(newNode)
              }
            }
          }
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    GET_POSITIONS(state) {
      pouchdb
        .get(state.global_pos_name)
        .then(function(doc) {
          state.configPositions = doc.positions
        })
        .catch(function(err) {
          console.log(err)
          if (err.status == 404) {
            return pouchdb.put({
              _id: state.global_pos_name,
              positions: []
            })
          }
        })
    },

    MOVE_POS() {},

    ADD_DOC(state, e) {
      var uniqueid =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
      state.localnodeid = uniqueid

      pouchdb.get(state.myclient).then(function(doc) {
        if (e == undefined) {
          doc.notes.push({
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
            nodes: doc.notes
          })
          .then(function() {
            return pouchdb.get(state.myclient).then(function(doc) {
              state.myNodes = doc.nodes
              var end = Object.keys(state.myNodes).length - 1
              const newNode = {
                nodetext: state.myNodes[end].text,
                nodeid: state.myNodes[end].id,
                content_type: state.notes[end].content_type
              }
              state.activeNode = newNode
            })
          })
          .catch(function(err) {
            if (err.status == 404) {
              // pouchdb.put({  })
            }
          })
      })
      pouchdb.get(state.global_pos_name).then(function(doc) {
        doc.positions.push({
          nodeid: uniqueid,
          xpos: 50,
          ypos: 50
        })
        return pouchdb
          .put({
            _id: state.global_pos_name,
            _rev: doc._rev,
            positions: doc.positions
          })
          .catch(function(err) {
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
        .then(function(doc) {
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
        .then(function() {
          return pouchdb.get(state.myclient).then(function(doc) {
            state.myNodes = doc.nodes
          })
        })
        .catch(function(err) {
          if (err.status == 404) {
            // pouchdb.put({  })
          }
        })
    }
  },
  actions: {
    syncDB: () => {
      pouchdb.replicate.from(remote).on('complete', function() {
        store.commit('GET_NODES')
        store.commit('GET_POSITIONS')
        // turn on two-way, continuous, retriable sync
        pouchdb
          .sync(remote, { live: true, retry: true, attachments: true })
          .on('change', function() {
            // pop info into function to find out more
            console.log('change')
            store.commit('GET_NODES')
            store.commit('GET_POSITIONS')
          })
          .on('paused', function() {
            // replication paused (e.g. replication up to date, user went offline)
            // console.log('replication paused')
          })
          .on('active', function() {
            // replicate resumed (e.g. new changes replicating, user went back online)
            //console.log('back active')
          })
          .on('denied', function() {
            // a document failed to replicate (e.g. due to permissions)
          })
          .on('complete', function() {
            // handle complete
            //console.log('complete')
          })
          .on('error', function(err) {
            console.log(err)
          })
      })
    },

    editNode: ({ commit }, { nodeid, nodetext }) => {
      commit('EDIT_NODE', { nodeid, nodetext })
    }
  },
  modules: {}
})

export default store
store.dispatch('syncDB')
