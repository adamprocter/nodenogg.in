<template>
  <div ref="nodes" class="node">
    <div v-if="this.currentroute.name == 'Organise'">
      <draggable
        class="innernode"
        :w="300"
        :h="335"
        :x="5"
        :y="15"
        :z="1"
        :scale="scale"
        :draggable="true"
        :resizable="false"
        style="background-color: #6fcf97"
      >
        <div>
          <p id="nodeid" :inner-html.prop="nodetext | marked"></p>
          <div v-if="name == false">
            <input
              type="text"
              v-model.trim="clientid"
              placeholder="name"
              autocorrect="off"
              autocapitalize="none"
              ref="objectname"
              v-on:keyup.enter="setClient()"
              v-on:keydown.tab="setClient()"
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
            <h4>Saved as : {{ clientid }}</h4>
            <div class="btn-row">
              <BaseButton buttonClass="special" @click="clearClient()"
                >Clear</BaseButton
              >
            </div>
          </div>
        </div>
      </draggable>

      <draggable
        class="innernode"
        :w="310"
        :h="375"
        :x="600"
        :y="15"
        :z="1"
        :scale="scale"
        :draggable="true"
        :resizable="false"
        style="background-color: #6fcf97"
      >
        <div class="content">
          <p id="nodeid" :inner-html.prop="nodetext2 | marked"></p>
          <div v-if="microcosm == false">
            <input
              type="text"
              v-model.trim="localmicrocosm"
              placeholder="microcosm name"
              autocorrect="off"
              autocapitalize="none"
              @focus="editTrue(true)"
              ref="microcosm"
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
      </draggable>
    </div>
    <div v-else>
      <div class="nodes">
        <draggable class="hide"></draggable>
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
            v-on:keydown.tab="setClient()"
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
          <h4>Saved as : {{ clientid }}</h4>
          <div class="btn-row">
            <BaseButton buttonClass="special" @click="clearClient()"
              >Clear</BaseButton
            >
          </div>
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
import draggable from '@/experimental/Draggable'
import Router from '@/router'
import marked from 'marked'
import { mapState } from 'vuex'

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
    if (localStorage.myNNClient) {
      this.clientid = localStorage.myNNClient
      this.setClient()
    }

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
      var result
      var str = this.localmicrocosm
      var lower = str.toLowerCase()
      var spaces = lower
      lower = spaces.split(' ').join('')
      result = lower.split('-').join('')

      if (this.clientid != '') {
        this.$store.dispatch('createMicrocosm', result)
        localStorage.setItem('mylastMicrocosm', result)
        this.microcosm = true
      } else {
        // console.log('name not set')
      }
    },
    setClient() {
      var result
      var str = this.clientid
      var lower = str.toLowerCase()
      var spaces = lower
      lower = spaces.split(' ').join('')
      result = lower.split('-').join('')

      this.$store.dispatch('setClient', result),
        localStorage.setItem('myNNClient', result)
      this.name = true
      this.focusInput()
    },
    clearClient() {
      this.clientid = ''
      this.name = false
      localStorage.removeItem('myNNClient')
    },

    editTrue(e) {
      // needs to be KebabCase now
      //  this.$emit('my-event')
      this.$emit('edit-true', e)
    },

    letsGo() {
      if (this.clientid != '') {
        this.$emit('client-added')
      } else {
        //console.log('name not set ')
      }
    },

    focusInput() {
      this.$refs.microcosm.focus()
    },
  },
  computed: mapState({
    scale: (state) => state.ui.scale,
  }),
  components: {
    draggable,
  },
}
</script>

<style lang="css" scoped>
.hide {
  display: none;
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
  padding: 0 1em 0 1em;
  width: 95%;
  border: 1px dashed black;
  background-color: #6fcf97;
  margin: 0.9em 0 0 0.3em;
}
</style>
