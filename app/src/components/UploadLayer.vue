<template>
  <div v-if="this.currentroute.name == 'Organise'">
    <div class="ipfsupload dropORG" id="dropContainer">
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
        <p>Drop media here to upload.</p>

        <textarea id="ipfshash" v-model="copytext"></textarea>
        <div class="btn-row">
          <button v-on:click.prevent="copyDone()" id="copyme" hidden>
            Copy
          </button>
        </div>
      </form>
    </div>
  </div>
  <div v-else>
    <div class="ipfsupload dropList" id="dropContainer">
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
        <p>Drop media here to upload.</p>

        <textarea id="ipfshash" v-model="copytext"></textarea>
        <div class="btn-row">
          <button v-on:click.prevent="copyDone()" id="copyme" hidden>
            Copy
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VueIpfs from 'ipfs'
import Router from '@/router'
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
      currentroute: Router.currentRoute,
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
      ;['dragenter', 'dragover'].forEach((eventName) => {
        dropArea.addEventListener(eventName, overState)
      })
      ;['dragleave', 'dragend', 'drop'].forEach((eventName) => {
        dropArea.addEventListener(eventName, leaveState)
      })
      ;['dragenter', 'dragover'].forEach((eventName) => {
        dropArea.addEventListener(eventName, overStateList)
      })
      ;['dragleave', 'dragend', 'drop'].forEach((eventName) => {
        dropArea.addEventListener(eventName, leaveStateList)
      })

      dropArea.addEventListener('drop', this.handleDrop, false)

      function overStateList() {
        document.getElementsByClassName('dropList')[0].className =
          'ipfsupload dropList dragover'
      }

      function leaveStateList() {
        document.getElementsByClassName('dropList')[0].className =
          'ipfsupload dropList'
      }

      function overState() {
        document.getElementsByClassName('dropORG')[0].className =
          'ipfsupload dropORG dragover'
      }

      function leaveState() {
        document.getElementsByClassName('dropORG')[0].className =
          'ipfsupload dropORG'
      }
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

        this.getIPFS(files[0].type)
      } catch (err) {
        // Set error status text.
        this.status = `Error: ${err}`
        console.log(this.status)
      }
    },

    async getIPFS(type) {
      try {
        for await (const newfile of node.get(this.fileContents.path)) {
          // console.log(newfile.path)
          this.path = newfile.path
          this.copyClipBoard(this.path, type)
        }
      } catch (err) {
        // Set error status text.
        this.status = `Error: ${err}`
        console.log(this.status)
      }
    },

    copyClipBoard(e, type) {
      switch (true) {
        case type.includes('image/'):
          this.copytext = '![](https://ipfs.io/ipfs/' + e + ')'
          break
        case type.includes('audio/'):
          this.copytext =
            '<audio src="https://ipfs.io/ipfs/' + e + '" controls></audio>'
          break
        case type.includes('video/'):
          this.copytext =
            '<video src="https://ipfs.io/ipfs/' + e + '" controls></video>'
          break
        default:
          this.copytext = 'https://ipfs.io/ipfs/' + e
      }
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
  border: 1px solid rgb(180, 180, 180);
  height: 100px;
  margin: 1em;
}

.dropList {
  padding: 1em;
  background-color: white;
}
.dropORG {
  margin: 0em;
  position: fixed;
  bottom: 0em;
  left: 27em;
  padding: 1em;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgb(180, 180, 180);
  border-radius: 20px;
  height: 100px;
  background-color: white;
  outline: 2px dashed rgb(180, 180, 180);
  outline-offset: -10px;
}

.dragover {
  outline: 2px dashed black;
  outline-offset: -10px;
  background-color: rgb(180, 180, 180);
}

textarea {
  position: absolute;
  top: 10px;
  left: 0em;
  height: 0px;
  width: 0px;
  padding: 0px;
}
</style>
