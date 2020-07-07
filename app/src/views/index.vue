<template>
  <component
    v-if="!!view && views[view]"
    v-bind:is="view"
    v-bind:baseViewRoute="baseViewRoute"
  />
  <div v-else>
    <p>
      Sorry,
      <strong>{{ view }}</strong> is not a valid view type.
    </p>
    <p>
      Why not try
      <strong>webgl</strong>
      or
      <strong>list</strong>
    </p>
  </div>
</template>

<script>
import board from './board/index.vue'
import list from './list/index.vue'
import webgl from './webgl/index.vue'
import sandbox from './sandbox/index.vue'

export const viewComponents = {
  board,
  list,
  webgl,
  sandbox,
}

export const viewTypes = Object.keys(viewComponents).map((name) => {
  const { description, title, label } = viewComponents[name]
  return { description, title, name, label }
})

export default {
  name: 'ViewSerializer',
  props: {
    view: {
      type: String,
      required: true,
    },
    microcosm_id: {
      type: String,
      required: true,
    },
    node_id: {
      type: String,
    },
  },
  computed: {
    baseViewRoute() {
      return `/dev/${this.microcosm_id}/${this.view}`
    },
  },
  data() {
    return {
      views: viewComponents,
    }
  },
  components: viewComponents,
}
</script>
