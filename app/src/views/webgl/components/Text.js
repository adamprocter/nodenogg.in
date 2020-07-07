import DisplayObject from './DisplayObject.js'
import { Text, TextStyle } from 'pixi.js'

export default {
  mixins: [DisplayObject],
  props: {
    text: String,
    width: Number,
    padding: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      style: new TextStyle({
        padding: this.padding,
        align: 'left',
        fontSize: 14 * 2,
        fontFamily: `"Inter var", Helvetica, sans-serif`,
        wordWrap: true,
        breakWords: true,
        wordWrapWidth: this.width,
      }),
    }
  },
  computed: {
    instance: function () {
      return new Text('', this.style)
    },
  },
  watch: {
    instance: {
      // handler(newInstance, oldInstance) {
      handler(newInstance) {
        if (this.text) newInstance.text = this.text
      },
      immediate: true,
    },
    text: function (text) {
      this.instance.text = text
    },
  },
  render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined
  },
}
