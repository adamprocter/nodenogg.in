export const shortcutsMixin = {
  created() {
    //  // console.log('hey mix')
  },
  methods: {
    handleKeyPress(e) {
      if (this.shortcutstate == false) {
        if (e.keyCode == 78) {
          // n for new
          this.addNode()
        }
        if (e.keyCode == 83) {
          // s for selection
          this.selectMode('select')
        }
        if (e.keyCode == 65) {
          // a as alternative for selection
          this.selectMode('select')
        }
        if (e.keyCode == 67) {
          // c for connect
          this.selectMode('connect')
        }
        if (e.keyCode == 77) {
          // m for selection
          this.selectMode('move')
        }
        // FIXME: doesn't trigger upload file dialog yet but does swap modes
        if (e.keyCode == 85) {
          // u for upload
          this.selectMode('upload')
        }
      }
    },
  },
}
