import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      loading: (state) => state.microcosms.loading,
    }),
    view() {
      return this.$route.params.view
    },
    microcosm_id() {
      return this.$route.params.microcosm_id
    },
    node_id() {
      return this.$route.params.node_id
    },
  },
}
