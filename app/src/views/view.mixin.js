import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    baseViewRoute: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      getMicrocosmFromRoute: 'microcosms/getMicrocosmFromRoute',
      getNodeFromRoute: 'microcosms/getNodeFromRoute',
    }),
    nodes() {
      return this.getMicrocosmFromRoute.nodes
    },
    activeNode() {
      return this.getNodeFromRoute
    },
  },
  methods: {
    ...mapActions(['microcosms/createNodeFromRoute']),
    createNode(newNode) {
      this['microcosms/createNodeFromRoute'](newNode)
    },
  },
}
