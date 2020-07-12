<template>
  <nav>
    <multiselect
      v-model="newMicrocosm"
      tag-placeholder="Create new microcosm"
      placeholder="Search or add"
      label="microcosm_id"
      track-by="microcosm_id"
      selectLabel="Go to microcosm"
      deselectLabel="Close microcosm"
      :showLabels="false"
      :options="microcosmList"
      :multiple="false"
      :taggable="true"
      :allow-empty="false"
      @select="handleSelect"
      @tag="handleAddMicrocosm"
    >
      <template slot="noOptions"
        >You haven't created any microcosms yet</template
      >
    </multiselect>
  </nav>
</template>

<script>
import Multiselect from 'vue-multiselect'
import slugify from 'slugify'
import { get } from '@ngard/tiny-get'
import { mapState, mapGetters, mapActions } from 'vuex'
import router from '@/router'

export default {
  data() {
    return {
      open: false,
      newMicrocosm: this.activeMicrocosm || null,
      defaultView: 'board',
    }
  },
  computed: {
    ...mapState({
      microcosmHistory: (state) => {
        return state.microcosms.history
      },
    }),
    ...mapGetters({
      activeMicrocosm: 'microcosms/getMicrocosmFromRoute',
    }),
    microcosmList() {
      return Object.keys(this.microcosmHistory).map(
        (key) => this.microcosmHistory[key]
      )
    },
    activeMicrocosmId() {
      return get(this, 'activeMicrocosm.microcosm_id', '')
    },
  },
  watch: {
    activeMicrocosm() {
      this.newMicrocosm = this.activeMicrocosm
    },
  },
  methods: {
    ...mapActions({
      clearHistory: 'microcosms/clearHistory',
    }),
    handleClearHistory() {
      this.clearHistory()
    },
    // handleInputEnter() {
    //   const microcosm_id = this.newMicrocosm.trim()
    //   router.push({
    //     name: 'microcosm.view',
    //     params: { microcosm_id },
    //   })
    //   this.reset()
    // },
    handleSelect(targetMicrocosm) {
      router.push({
        name: 'microcosm.view',
        params: targetMicrocosm,
      })
    },
    handleAddMicrocosm(value) {
      const targetMicrocosm = {
        microcosm_id: slugify(value),
        view: this.defaultView,
      }
      console.log(targetMicrocosm)
      this.newMicrocosm = targetMicrocosm
      router.push({
        name: 'microcosm.view',
        params: targetMicrocosm,
      })
    },
    // handleInput(event) {
    //   this.newMicrocosm = slugify(event.target.value)
    // },
    reset() {
      this.open = false
      // this.newMicrocosm = null
    },
  },
  components: {
    Multiselect,
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.multiselect {
  width: 400px;
}
.multiselect__tags {
  border: none;
}
.multiselect__current,
.multiselect__content-wrapper,
.multiselect__tags {
  border: 1px solid rgba(0, 0, 0, 0.5);
}

.multiselect__content-wrapper {
  border-top: none;
}
.multiselect__option--highlight {
  background: #5044cf;
  outline: none;
  color: white;
}
.multiselect__placeholder {
  padding: none;
  font-size: 15px;
  margin: none;
  display: block;
  /* display: inline-block;
  margin-bottom: 10px;
  padding-top: 2px; */
}

.multiselect__option--highlight:after {
  content: attr(data-select);
  background: #5044cf;
  color: white;
}
.multiselect__option--selected {
  background: #f3f3f3;
  color: #35495e;
  font-weight: bold;
}

.multiselect__option--selected.multiselect__option--highlight {
  background: #5044cf;
  color: #fff;
}
.multiselect__option--selected.multiselect__option--highlight:after {
  background: #5044cf;
  content: attr(data-deselect);
  color: #fff;
}
</style>
<style lang="css" scoped>
nav {
  width: 100%;
  height: 60px;
  padding: 0 10px;
  /* box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.14); */
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: 100;
  user-select: none;
}
.microcosm-list {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 10px;
  left: 10px;
  background: white;
  width: 300px;
  box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.14);
  border-radius: 3px;
  z-index: 2;
}

.microcosm-title {
  position: absolute;
  height: 40px;
  padding: 0 10px 0 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: bold;
  top: 10px;
  left: 10px;
  width: 300px;
  z-index: 1;
}

small {
  border: 2px solid rgba(0, 0, 0, 0.1);
  padding: 1px 5px;
  font-size: 13px;
  border-radius: 2px;
  margin-left: 10px;
}
.microcosm-list.open {
  opacity: 1;
  pointer-events: initial;
}
input,
.microcosm-list > div {
  height: 40px;
  width: 100%;
  padding: 0 10px 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

span {
  color: rgb(110, 110, 110);
  border-radius: 3px;
  font-size: 11px;
  font-weight: bold;
  padding: 1px 4px 1px 4px;
}
input {
  border: none;
  font: inherit;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0px 0px 3px 3px;
}
.active {
  font-weight: bold;
}
button {
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 3px;
  background: white;
  box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.14);
  border-radius: 3px;
  width: 120px;
  height: 40px;
  font: inherit;
  border: none;
  text-align: left;
}
button::before,
button::after {
  position: absolute;
  content: '–';
  text-align: center;
  font-size: 24px;
}
button::after {
  bottom: 0;
  left: 0;
  width: 40px;
}
button::before {
  top: 0;
  left: 0;
  width: 40px;
}
.view-controls {
  margin-left: 10px;
  font-size: 14px;
  height: 32px;
  border-radius: 16px;
  background: white;
  display: inline-block;
  background: rgba(0, 0, 0, 0.1);
}
.view-controls > a {
  height: 100%;
  border-radius: inherit;
  display: inline-block;
  padding: 5px 14px 0 14px;
  color: rgb(40, 40, 40);
}

.view-controls > a.active {
  background: rgb(40, 40, 40);
  color: white;
  /* box-shadow: 0px 1px 4px 1px rgba(0,0,0,0.2); */
}
.view-controls > a:last-child {
  border: initial;
}
</style>
