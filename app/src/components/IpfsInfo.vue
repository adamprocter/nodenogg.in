<template>
  <div>
    <h1>{{ status }}</h1>
    <h2>ID: {{ id }}</h2>
    <h2>Agent version: {{ agentVersion }}</h2>

    <form>
      <input
        type="file"
        name="import_file"
        v-on:change="selectedFile($event)"
      />
    </form>
  </div>
</template>

<script>
import VueIpfs from 'ipfs'
const ipfs = VueIpfs.create()

// var ipfs = VueIpfs
// TODO: WOULD BE TO USE add and data is what has come from Vue Form
// ipfs.add(data, [options])

//  The below code should create an IPFS node to add files to
export default {
  name: 'IpfsInfo',
  data: function () {
    return {
      status: 'Connecting to IPFS...',
      id: '',
      agentVersion: '',
    }
  },
  mounted: function () {
    console.log(VueIpfs)
    this.getIpfsNodeInfo()
  },
  methods: {
    selectedFile(event) {
      this.file = event.target.files[0]
      console.log(this.file)
      //  ipfs.add(this.file)
    },
    async getIpfsNodeInfo() {
      try {
        // Await for ipfs node instance.
        const node = await ipfs
        //console.log(ipfs)
        // Call ipfs `id` method.
        // Returns the identity of the Peer.
        const { agentVersion, id } = await node.id()
        this.agentVersion = agentVersion
        this.id = id
        // Set successful status text.
        this.status = 'Connected to IPFS =)'
      } catch (err) {
        // Set error status text.
        this.status = `Error: ${err}`
      }
    },
  },
}
</script>

<style lang="css" scoped></style>
