export const shortcutsMixin = {
  created() {
    //  console.log('hey mix')
  },
  methods: {
    handleKeyPress(e) {
      if (this.shortcutstate == false) {
        if (e.keyCode == 78) {
          // n for new

          this.addNode()
        }
      }
    }
  }
}
