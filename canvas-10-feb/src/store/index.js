import Vue from 'vue'
import Vuex from 'vuex'
import PouchDB from 'pouchdb'
import accounts from '../assets/settings.json'

Vue.use(Vuex)
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
    myclient: 'mac',
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
    configNodes: [
      // { nodeid: 1, nodetext: 'node 1' },
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
          state.configNodes = doc.rows[1].doc.nodes
        })
        .catch(function(err) {
          console.log(err)
        })
    },

    EDIT_NODE(state, e) {
      var i
      for (i = 0; i < Object.keys(state.configNodes).length; i++) {
        if (e.nodeid == state.configNodes[i].nodeid) {
          state.configNodes[i].nodetext = e.nodetext
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
              nodes: state.configNodes
            }
          ])
        })
        .then(function() {
          return pouchdb.get(state.myclient).then(function(doc) {
            state.configNodes = doc.nodes
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
        // turn on two-way, continuous, retriable sync
        pouchdb
          .sync(remote, { live: true, retry: true, attachments: true })
          .on('change', function() {
            // pop info into function to find out more
            //console.log('change')
            store.commit('GET_NODES')
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
