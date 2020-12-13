<template>
  <div class="ipfsupload" id="dropContainer">
    <form>
      <input
        id="file"
        class="fileInput"
        type="file"
        name="fileInput"
        ref="fileInput"
        @change="onFileSelected"
      />
      <!--  -->
      <p>Drop here to upload.</p>

      <textarea id="ipfshash" v-model="copytext"></textarea>
      <div class="btn-row">
        <button v-on:click.prevent="copyDone()" id="copyme" hidden>Copy</button>
      </div>
    </form>
  </div>
</template>

<script>
import VueIpfs from 'ipfs'
// import { mapState } from 'vuex'
const ipfs = VueIpfs.create()
var node
var output
var path = 'ready'
var copytext = ''
let dropArea
//const fileContents = []

//  The below code should create an IPFS node to add files to
export default {
  name: 'UploadLayer',

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

  // computed: {
  //   ...mapState({
  //     myNodes: (state) => state.myNodes,
  //   }),
  // },

  mounted: function () {
    this.getIpfsNodeInfo()
    setTimeout(this.dropReady, 300)
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
    dropReady() {
      dropArea = document.getElementById('dropContainer')
      ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
        dropArea.addEventListener(eventName, this.preventDefaults, false)
      })

      dropArea.addEventListener('drop', this.handleDrop, false)
    },
    preventDefaults(e) {
      e.preventDefault()
      e.stopPropagation()
    },

    handleDrop(e) {
      let dt = e.dataTransfer
      let files = dt.files
      this.handleFiles(files)
    },

    handleFiles(files) {
      // console.log(files)
      this.dropIPFS(files)

      // ;[...files].forEach(this.dropIPFS(files))
    },

    async getIpfsNodeInfo() {
      try {
        // Await for ipfs node instance.
        node = await ipfs

        // Call ipfs `id` method.
        // Returns the identity of the Peer.
        //  const { agentVersion, id } = await node.id()
        //  this.agentVersion = agentVersion
        //   this.id = id
        // Set successful status text.
        //  this.status = 'Connected to IPFS 😊'
      } catch (err) {
        // Set error status text.
        this.status = `Error: ${err}`
        console.log(this.status)
      }
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      this.saveIPFS()
    },

    async saveIPFS() {
      try {
        this.fileContents = await node.add(this.selectedFile)
        this.getIPFS()
      } catch (err) {
        // Set error status text.
        this.status = `Error: ${err}`
        console.log(this.status)
      }
    },

    async dropIPFS(files) {
      try {
        this.fileContents = await node.add(files)
        this.getIPFS()
      } catch (err) {
        // Set error status text.
        this.status = `Error: ${err}`
        console.log(this.status)
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
        console.log(this.status)
      }
    },

    copyClipBoard(e) {
      this.copytext = '![](https://ipfs.io/ipfs/' + e + ')'
      // this.$store.dispatch('addNode')
      //this.copyready = true
      // setTimeout(this.copyClick, 3000)
    },

    copyClick() {
      document.getElementById('copyme').click()
    },

    copyDone() {
      var copyHash = document.getElementById('ipfshash')
      copyHash.select()

      copyHash.setSelectionRange(0, 99999) /*For mobile devices*/
      document.execCommand('copy')
      // this.$emit('upload-added')
      this.$emit('copy-done')
    },
  },
}
</script>

<style lang="css" scoped>
.fileInput {
  display: none;
}
#dropContainer {
  margin: 0em;
  position: fixed;
  background-color: white;
  bottom: 1em;
  left: 30em;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgb(180, 180, 180);
  border-radius: 20px;
  height: 100px;
}

textarea {
  position: absolute;
  top: 0px;
  height: 0px;
  width: 0px;
  padding: 0px;
}
</style>
