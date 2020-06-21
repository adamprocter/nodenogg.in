<template>
  <div class="ipfstest">
    <h1>IPFS View</h1>
    <h3>Testing Only</h3>
    <h1>{{ status }}</h1>
    <!-- <h2>ID: {{ id }}</h2> -->
    <!-- <h2>Agent version: {{ agentVersion }}</h2> -->
    <!-- <h3>Files : {{ fileContents }}</h3> -->
    <!-- <h3>Path: {{ path }}</h3> -->
    <div v-if="path == 'ready'"></div>
    <div v-else>
      <img :src="'https://ipfs.io/ipfs/' + path" />
    </div>
    <!-- <img :src="'data:image/jpg;base64,' + output" /> -->

    <form>
      <input
        class="fileInput"
        type="file"
        name="fileInput"
        ref="fileInput"
        @change="onFileSelected"
      />

      <!-- <button @click="this.refs.selectedFile.click()">Choose File</button> -->
      <button type="button" @click="saveIPFS">Upload</button>

      <button type="button" @click="getIPFS">Get IPFS</button>
    </form>
  </div>
</template>

<script>
import VueIpfs from 'ipfs'
const ipfs = VueIpfs.create()
var node
var output
var path = 'ready'
//const fileContents = []

//  The below code should create an IPFS node to add files to
export default {
  name: 'IpfsInfo',
  data: function () {
    return {
      status: 'Connecting to IPFS...',
      // id: '',
      // agentVersion: '',
      selectedFile: null,
      fileContents: this.fileContents,
      output: output,
      path: path,
    }
  },
  mounted: function () {
    // console.log(VueIpfs)
    this.getIpfsNodeInfo()
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
    },

    async saveIPFS() {
      // file = node.files.write('/' + this.selectedFile.name, this.selectedFile, {
      //   create: true,
      // })
      // return file
      for await (const result of node.add(this.selectedFile)) {
        //console.log(result.cid.string)
        this.fileContents = result
        // console.log(this.fileContents.path)
      }
    },

    // getIPFS() {
    //   const resultPart = node.files.ls('/')
    //   fileContents.push(resultPart)
    //   //  console.log(fileContents)
    //   return fileContents
    // },

    async getIPFS() {
      // const resultPart = node.files.read('/')
      // fileContents.push(resultPart)
      // //  console.log(fileContents)
      // return fileContents

      for await (const newfile of node.get(this.fileContents.path)) {
        console.log(newfile.path)
        this.path = newfile.path
      }

      // const chunks = []
      // for await (const chunk of node.cat(file)) {
      //   chunks.push(chunk)
      // }
      // output = Buffer.concat(chunks).toString('base64')
      // //output = this.fileContents.path
      // file = this.fileContents.path
      // console.log(Buffer.concat(chunks).toString('base64'))
    },

    async getIpfsNodeInfo() {
      try {
        // Await for ipfs node instance.
        node = await ipfs
        //console.log(ipfs)
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
  },
}
</script>

<style lang="css" scoped>
.fileInput {
  /* display: none; */
}

.ipfstest {
  margin-left: 1em;
  margin-bottom: 1em;
  margin-right: 1em;
}

img {
  width: 50%;
}

h1 {
  font-size: 1em;
}

h2 {
  overflow-wrap: break-word;
}

h3 {
  color: red;
}
</style>
