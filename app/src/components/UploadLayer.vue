<template>
  <div class="ipfsupload">
    <form>
      <input
        id="file"
        class="fileInput"
        type="file"
        name="fileInput"
        ref="fileInput"
        @change="onFileSelected"
      />
      <!-- <h1>{{ status }}</h1>
      <h2>ID: {{ id }}</h2>
      <h2>Agent version: {{ agentVersion }}</h2> -->
      <!-- 
      <button type="button" @click="saveIPFS">Upload</button>
      <button type="button" @click="getIPFS">Get IPFS</button> -->
      <!-- {{ uploadready }} -->
      <textarea id="ipfshash" v-model="copytext"></textarea>
      <div class="btn-row">
        <button v-on:click.prevent="copyDone()" id="copyme" hidden>
          Copy
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import VueIpfs from 'ipfs'
const ipfs = VueIpfs.create()
var node
var output
var path = 'ready'
var copytext = ''

//const fileContents = []

//  The below code should create an IPFS node to add files to
export default {
  name: 'IpfsInfo',

  props: {
    uploadready: Boolean,
    copyready: Boolean,
  },
  data: function () {
    return {
      status: 'Connecting to IPFS...',
      // id: '',
      // agentVersion: '',
      selectedFile: null,
      fileContents: this.fileContents,
      output: output,
      path: path,
      copytext: copytext,
    }
  },
  mounted: function () {
    // console.log(VueIpfs)
    this.getIpfsNodeInfo()
  },

  watch: {
    uploadready: function (newVal) {
      // watch it
      //console.log(newVal)
      if (newVal == true) {
        document.getElementById('file').click()
      }
    },
    copyready: function (newVal2) {
      // watch it
      //console.log(newVal2)
      if (newVal2 == true) {
        document.getElementById('copyme').click()
      }
    },
  },
  methods: {
    async getIpfsNodeInfo() {
      try {
        // Await for ipfs node instance.
        node = await ipfs
        // console.log(node)
        // Call ipfs `id` method.
        // Returns the identity of the Peer.
        const { agentVersion, id } = await node.id()
        this.agentVersion = agentVersion
        this.id = id
        // Set successful status text.
        this.status = 'Connected to IPFS 😊'
      } catch (err) {
        // Set error status text.
        this.status = `Error: ${err}`
      }
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      this.saveIPFS()
    },

    async saveIPFS() {
      try {
        for await (const result of node.add(this.selectedFile)) {
          //console.log(result.cid.string)
          this.fileContents = result
          // console.log(this.fileContents.path)
          // node.swarm.peers().then((a) => console.log(a))
          this.getIPFS()
        }
      } catch (err) {
        // Set error status text.
        this.status = `Error: ${err}`
      }
    },

    async getIPFS() {
      try {
        for await (const newfile of node.get(this.fileContents.path)) {
          // console.log(newfile.path)
          this.path = newfile.path
          this.copyClipBoard(this.path)
        }
      } catch (err) {
        // Set error status text.
        this.status = `Error: ${err}`
      }
    },

    copyClipBoard(e) {
      this.copytext = '![](https://ipfs.io/ipfs/' + e + ')'
      //this.copyready = true
      // setTimeout(this.copyClick, 1000)
    },

    // copyClick() {
    //   document.getElementById('copyme').click()
    // },

    copyDone() {
      var copyHash = document.getElementById('ipfshash')
      copyHash.select()

      copyHash.setSelectionRange(0, 99999) /*For mobile devices*/
      document.execCommand('copy')
      this.$emit('uploadAdded')
      this.$emit('copyDone')
    },
  },
}
</script>

<style lang="css" scoped>
.fileInput {
  display: none;
}

textarea {
  position: absolute;
  top: 0px;
  height: 0px;
  width: 0px;
  padding: 0px;
}
</style>
