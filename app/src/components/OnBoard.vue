<template>
  <div ref="nodes" class="node">
    <vue-draggable-resizable
      class="innernode"
      :w="300"
      :h="335"
      :x="560"
      :y="50"
      :z="0"
      :draggable="true"
      style="background-color: #6fcf97;"
    >
      <form>
        <div>
          <p id="nodeid" :inner-html.prop="nodetext | marked"></p>
          <input
            type="text"
            v-model.trim="clientid"
            placeholder="device name"
            autocorrect="off"
            autocapitalize="none"
            ref="objectname"
            v-on:keyup.enter="setClient()"
            @focus="editTrue(true)"
            @blur="editTrue(false)"
          />
          <div class="btn-row">
            <BaseButton buttonClass="special" @click="setClient()"
              >Store</BaseButton
            >
          </div>
        </div>
      </form>
    </vue-draggable-resizable>

    <vue-draggable-resizable
      class="innernode"
      :w="300"
      :h="345"
      :x="1100"
      :y="50"
      :z="0"
      :draggable="true"
      style="background-color: #6fcf97;"
    >
      <form>
        <div>
          <p id="nodeid" :inner-html.prop="nodetext2 | marked"></p>
          <input
            type="text"
            v-model.trim="localmicrocosm"
            placeholder="microcosm name"
            autocorrect="off"
            autocapitalize="none"
            autofocus
            v-on:keyup.enter="createMicrocosm()"
            @focus="editTrue(true)"
            @blur="editTrue(false)"
          />
          <div class="btn-row">
            <BaseButton
              buttonClass="special"
              @click="createMicrocosm(), letsGo()"
              >Create Microcosm</BaseButton
            >
          </div>
        </div>
      </form>
    </vue-draggable-resizable>
  </div>
</template>

<script>
import Router from '@/router'
import marked from 'marked'

export default {
  data: function () {
    return {
      localmicrocosm: Router.currentRoute.params.microcosm,
      clientid: '',
      nodetext:
        '## What shall we call you ? 💥 \n First we need to connect this device to your ideas. This name is what allows you to create and edit your nodes and can be anything you like and this name is always anonymous.',
      nodetext2:
        '## Start those engines ! 🏎 \n Now you can create your own microcosm to store your ideas and ask people to join you, either just tell them the name of the microcosm or share the alpha.nodenogg.in URL and add the ending; </br><em><b>/microcosm/nameofyourmicrocosm</b></em>',
      // parta: true,
      // partb: false,
      // partc: false,
    }
  },

  mounted() {
    if (localStorage.myNNClient && localStorage.mylastMicrocosm) {
      this.clientid = localStorage.myNNClient
      this.localmicrocosm = localStorage.mylastMicrocosm
      this.createMicrocosm()
      this.setClient()
      this.letsGo()
    }
  },
  filters: {
    marked: marked,
  },

  methods: {
    createMicrocosm() {
      this.$store.dispatch('createMicrocosm', this.localmicrocosm)
      localStorage.setItem('mylastMicrocosm', this.localmicrocosm)
    },
    setClient() {
      this.$store.dispatch('setClient', this.clientid),
        localStorage.setItem('myNNClient', this.clientid)
    },

    editTrue(e) {
      this.$emit('editTrue', e)
    },

    letsGo() {
      this.$emit('clientAdded')
    },
  },
}
</script>

<style lang="css" scoped>
.start {
  opacity: 0;
  filter: alpha(opacity=0);
}
.vdr {
  padding: 0 0.5em;
}

h1,
h2,
h3,
p {
  margin: 0px;
}

h2 {
  float: right;
  font-size: 3em;
}

h3 {
  font-size: 3em;
  margin-top: 0.5em;
}

.btn-row {
  margin-bottom: 5px;
  padding: 0px 0px 15px 10px;
  border-radius: 4px;
}

input {
  font-size: 1em;
  padding: 10px;
  /* margin-left: 20px; */
  border-radius: 4px;
  display: flex;
  justify-content: center;
  margin: 10px;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-style: dotted;
}
</style>
