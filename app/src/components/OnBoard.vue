<template>
  <div ref="nodes" class="node">
    <div v-if="this.currentroute.name == 'Home'">
      <vue-draggable-resizable
        class="innernode"
        :w="300"
        :h="335"
        :x="5"
        :y="15"
        :z="1"
        :draggable="true"
        :resizable="false"
        style="background-color: #6fcf97"
      >
        <div>
          <p id="nodeid" :inner-html.prop="nodetext | marked"></p>
          <div v-if="name == false">
            <input
              id="clientid"
              type="text"
              v-model.trim="clientid"
              placeholder="name"
              autocorrect="off"
              autocapitalize="none"
              ref="objectname"
              v-on:keyup.enter="setClient()"
              autofocus
              @focus="editTrue(true)"
              @blur="editTrue(false)"
            />

            <div class="btn-row">
              <BaseButton buttonClass="special" @click="setClient()"
                >Store</BaseButton
              >
            </div>
          </div>
          <div v-else>
            <h4>Saved</h4>
          </div>
        </div>
      </vue-draggable-resizable>

      <vue-draggable-resizable
        class="innernode"
        :w="310"
        :h="375"
        :x="600"
        :y="15"
        :z="1"
        :draggable="true"
        :resizable="false"
        style="background-color: #6fcf97"
      >
        <div class="content">
          <p id="nodeid" :inner-html.prop="nodetext2 | marked"></p>
          <div v-if="microcosm == false">
            <input
              id="microcosm"
              ref="microcosm"
              type="text"
              v-model.trim="localmicrocosm"
              placeholder="microcosm name"
              autocorrect="off"
              autocapitalize="none"
              @focus="editTrue(true)"
              @blur="editTrue(false)"
              v-on:keyup.enter="createMicrocosm(), letsGo()"
            />

            <div class="btn-row">
              <BaseButton
                buttonClass="special"
                @click="createMicrocosm(), letsGo()"
                >Create or Rejoin a Microcosm</BaseButton
              >
            </div>
          </div>
          <div v-else>
            <h4>Loading...</h4>
          </div>
        </div>
      </vue-draggable-resizable>
    </div>
    <div v-else>
      <div class="nodes">
        <p id="nodeid" :inner-html.prop="nodetext | marked"></p>
        <div v-if="name == false">
          <input
            type="text"
            id="clientid"
            v-model.trim="clientid"
            placeholder="name"
            autocorrect="off"
            autocapitalize="none"
            v-on:keyup.enter="setClient()"
            autofocus
            @focus="editTrue(true)"
            @blur="editTrue(false)"
          />

          <div class="btn-row">
            <BaseButton buttonClass="special" @click="setClient()"
              >Store</BaseButton
            >
          </div>
        </div>
        <div v-else>
          <h4>Saved</h4>
        </div>
      </div>

      <div class="nodes">
        <p id="nodeid" :inner-html.prop="nodetext2 | marked"></p>
        <div v-if="microcosm == false">
          <input
            id="microcosm"
            type="text"
            v-model.trim="localmicrocosm"
            placeholder="microcosm name"
            autocorrect="off"
            ref="microcosm"
            autocapitalize="none"
            @focus="editTrue(true)"
            @blur="editTrue(false)"
            v-on:keyup.enter="createMicrocosm(), letsGo()"
          />

          <div class="btn-row">
            <BaseButton
              buttonClass="special"
              @click="createMicrocosm(), letsGo()"
              >Create or Rejoin a Microcosm</BaseButton
            >
          </div>
        </div>
        <div v-else>
          <h4>Loading...</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Router from '@/router'
import marked from 'marked'

export default {
  data: function () {
    return {
      currentroute: Router.currentRoute,
      localmicrocosm: Router.currentRoute.params.microcosm,
      clientid: '',
      nodetext:
        '## What shall we call you ? 👩‍🚀 \n First we need to connect this device to your ideas. This name is what allows you to create and edit your nodes and can be anything you like and this name is always anonymous.',
      nodetext2:
        '## Join/Start a microcosm ! 🚀 \n Now you can create your own microcosm to store your ideas and ask people to join you, either just tell them the name of the microcosm or share the alpha.nodenogg.in URL and add the ending; </br><em><b>/microcosm/nameofyourmicrocosm</b></em>',
      name: false,
      microcosm: false,
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
      this.microcosm = true
    },
    setClient() {
      this.$store.dispatch('setClient', this.clientid),
        localStorage.setItem('myNNClient', this.clientid)
      this.name = true
      this.focusInput()
    },

    editTrue(e) {
      this.$emit('editTrue', e)
    },

    letsGo() {
      this.$emit('clientAdded')
    },

    focusInput() {
      this.$refs.microcosm.focus()
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

.content {
  overflow: hidden;
  max-height: 100%;
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

.nodes {
  margin: 1em;
  padding: 0 1em 0 1em;
  width: 95%;
  border: 2px dashed black;
  background-color: #6fcf97;
  margin-top: 1em;
}
</style>
