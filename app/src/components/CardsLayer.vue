<template>
  <div>
    <div v-if="deleted == false">
      <form class="nodes">
        <div v-for="value in $options.myArray" v-bind:key="value.node_id">
          <textarea
            v-if="nodeid == value.node_id"
            @focus="editTrue(true)"
            @blur="editTrue(false)"
            autofocus
            v-model="value.node_text"
            @input="editNode"
            :id="value.node_id"
            ref="nodetext"
            placeholder="Idea goes here!"
          ></textarea>
        </div>

        <!-- <div v-if="localreadmode == true && deleted == false">
          <p class="read" :id="nodeid" :inner-html.prop="nodetext | marked"></p>
        </div> -->
        <div class="allemoji">
          <div
            class="eachemoji"
            v-for="(emojis, index) in configEmoji"
            :key="index"
          >
            <p v-if="nodeid == emojis.node_id">
              {{ emojis.emoji_text }}
            </p>
          </div>
        </div>
        <p class="info">*markdown supported &amp; autosaves</p>
        <div class="btn-row">
          <BaseButton buttonClass="danger" @click="deleteFlag()"
            >Discard</BaseButton
          >
          <!-- <div v-if="localreadmode == true && deleted == false">
            <BaseButton class="read" buttonClass="action" @click="readFlag()"
              >Edit Mode
            </BaseButton>
          </div>
          <div v-else>
            <BaseButton class="read" buttonClass="action" @click="readFlag()"
              >Read Mode</BaseButton
            >
          </div> -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
//var readmode
export default {
  name: 'CardsLayer',

  data: function () {
    return {
      // localreadmode: false,
    }
  },

  props: {
    nodeid: String,
    nodetext: String,
    deleted: Boolean,
  },

  computed: mapState({
    myNodes: (state) => state.myNodes,
    configPositions: (state) => state.configPositions,
    configEmoji: (state) => state.configEmoji,
  }),

  myArray: null,
  created() {
    this.$options.myArray = this.myNodes
    this.readFlag
  },

  methods: {
    editNode(e) {
      var nodeid = e.target.id
      var nodetext = e.target.value
      this.$store.dispatch('editNode', { nodeid, nodetext })
    },

    editTrue(e) {
      this.$emit('editTrue', e)
    },

    deleteFlag(e) {
      e = this.nodeid
      this.$store.dispatch('deleteFlag', { e })
    },

    // readFlag(e) {
    //   e = this.nodeid

    //   var i
    //   for (i = 0; i < Object.keys(this.configPositions).length; i++) {
    //     if (this.configPositions[i].node_id == this.nodeid) {
    //       this.localreadmode = this.configPositions[i].read_mode
    //     }
    //   }

    //   if (this.localreadmode == true) {
    //     readmode = false
    //     this.$store.dispatch('readFlag', { e, readmode })
    //     this.mode = 'Read'
    //   } else {
    //     readmode = true
    //     this.$store.dispatch('readFlag', { e, readmode })
    //     this.mode = 'Edit'
    //   }
    // },
  },
}
</script>

<style lang="css" scoped>
h2 {
  color: red;
}

.nodes {
  width: 95%;
  border: 2px dashed black;
  background-color: rgb(155, 194, 216);
  margin-top: 1em;
  margin-left: 1em;
}

textarea {
  width: 90%;
  height: 175px;
  resize: none;
  box-sizing: border-box;
  font-family: 'Inter var', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 1em;
  border: none;
  outline: none;
  background-color: rgb(187, 227, 255);
  scrollbar-color: yellow rgb(187, 227, 255);
}
.btn-row {
  position: relative;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 15px;
  border-radius: 4px;
}

.allemoji {
  font-size: 2em;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(0, auto));

  /* float: left; */
}

.eachemoji p {
  margin: 0em;
}
</style>
