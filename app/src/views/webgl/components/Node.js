import DisplayObject from './DisplayObject.js'
import { Container, Graphics, utils } from 'pixi.js'
import marked from 'marked'
import MultiStyleText from 'pixi-multistyle-text'

export default {
  mixins: [DisplayObject],
  props: {
    height: Number,
    width: Number,
    dragging: {
      type: Boolean,
      default: false,
    },
    node_id: {
      type: String,
    },
    text: {
      type: String,
    },
    borderColor: {
      type: String,
      default: '#000000',
    },
    borderWidth: {
      type: Number,
      default: 2,
    },
    borderAlpha: {
      type: Number,
      default: 1.0,
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF',
    },
    backgroundAlpha: {
      type: Number,
      default: 1.0,
    },
    borderRadius: {
      type: Number,
      default: 5,
    },
    padding: {
      type: Number,
      default: 20,
    },
    scale: {
      type: Number,
      default: 2.0,
    },
    fontSize: {
      type: Number,
      default: 12,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    interactiveChildren: Boolean,
  },
  computed: {
    markdownToHTML() {
      return marked(this.text)
    },
    size() {
      return [this.width * this.scale, this.height * this.scale]
    },
    _width() {
      return this.width * this.scale
    },
    _height() {
      return this.height * this.scale
    },
    _padding() {
      return this.padding * this.scale
    },
    _fontSize() {
      return this.fontSize * this.scale
    },
    _borderWidth() {
      return this.borderWidth * this.scale
    },
    _relativeScale() {
      return 1 / this.scale
    },
    instance: () => new Container({ interactiveChildren: false }),
    _background: () => new Graphics(),
    _backgroundShadow: () => new Graphics(),
    _content: () => new Container({ interactiveChildren: false }),
  },
  created() {
    this.initContainer()

    this.initBackground()
    this.renderBackground()
  },
  mounted() {
    setTimeout(() => {
      this.initContent()
      this.updateContent()
    }, 500)
  },
  methods: {
    handleDragStart({ data }) {
      const dragPosition = data.getLocalPosition(this.instance)
      this.$emit(
        'dragStart',
        this.node_id,
        { dragging: true, dragPosition },
        data
      )
    },
    handleDrag({ data }) {
      if (this.dragging) {
        const dragPosition = data.getLocalPosition(this.instance.parent)
        this.$emit('drag', this.node_id, { dragPosition }, data)
      }
    },
    handleDragEnd({ data }) {
      const dragPosition = data.getLocalPosition(this.instance.parent)
      this.$emit(
        'dragEnd',
        this.node_id,
        { dragging: false, dragPosition },
        data
      )
    },
    handleClick({ data }) {
      const dragPosition = data.getLocalPosition(this.instance.parent)
      const screenPos = this.instance.parent.toScreen(
        dragPosition.x,
        dragPosition.y
      )
      this.$emit('click', this.node_id, data, screenPos)
    },
    handleRightClick({ data }) {
      this.$emit('rightClick', this.node_id, data)
    },
    initContainer() {
      this.instance.scale.x = this._relativeScale
      this.instance.scale.y = this._relativeScale
      this.instance.interactive = true

      this.instance
        .on('rightclick', this.handleRightClick.bind(this))
        .on('click', this.handleClick.bind(this))
        .on('mousedown', this.handleDragStart.bind(this))
        .on('touchstart', this.handleDragStart.bind(this))
        .on('mouseup', this.handleDragEnd.bind(this))
        .on('mouseupoutside', this.handleDragEnd.bind(this))
        .on('touchend', this.handleDragEnd.bind(this))
        .on('touchendoutside', this.handleDragEnd.bind(this))
        .on('mousemove', this.handleDrag.bind(this))
        .on('touchmove', this.handleDrag.bind(this))
    },
    initBackground() {
      this._backgroundShadow.zIndex = -1
      this.instance.addChild(this._backgroundShadow)

      this._background.zIndex = -1
      this.instance.addChild(this._background)
    },
    renderBackground() {
      this._backgroundShadow.clear()
      // this._background.lineStyle(this._borderWidth, utils.string2hex(this.borderColor), this.borderAlpha);
      this._backgroundShadow.beginFill(0x000000, this.selected ? 1.0 : 0.1)
      this._backgroundShadow.drawRoundedRect(
        -6,
        -6,
        this._width + 12,
        this._height + 12,
        this.borderRadius + 4
      )
      this._backgroundShadow.endFill()
      this._background.clear()

      this._background.beginFill(
        utils.string2hex(this.backgroundColor),
        this.backgroundAlpha
      )
      this._background.drawRoundedRect(
        0,
        0,
        this._width,
        this._height,
        this.borderRadius
      )
      this._background.endFill()
    },
    resizeContent() {
      if (this._text) {
        this._text.style.wordWrapWidth = this._width - this._padding * 2
      } else {
        this.style = {
          default: {
            align: 'left',
            fontSize: this._fontSize,
            fontFamily: `"Inter var", Helvetica, sans-serif`,
            wordWrapWidth: this._width - this._padding * 2,
            wordWrap: true,
            fill: 0x3c3c3c,
          },
          h1: {
            fontSize: 48 * 2,
          },
          h2: {
            fontSize: 32 * 2,
          },
          h3: {
            fontSize: 28 * 2,
          },
          h4: {
            fontSize: 20 * 2,
          },
          p: {
            fontSize: 18 * 2,
          },
          strong: {
            fontWeight: 'bold',
          },
        }
      }
    },
    initContent() {
      this.resizeContent()
      this._text = new MultiStyleText(this.markdownToHTML, this.style)
      this._content.addChild(this._text)
      this._content.zIndex = 1
      this._content.x = this._padding
      this._content.y = this._padding
      this.instance.addChild(this._content)
    },
    updateContent() {
      this._content.text = this.markdownToHTML
    },
  },
  watch: {
    instance: {
      handler(instance) {
        if (this.width) instance.width = this._width
        if (this.height) instance.height = this._height
        if (this.interactive) instance.interactive = this.interactive
      },
      immediate: true,
    },
    text: function (text) {
      this._text.text = text
    },
    size: function () {
      this.renderBackground()
      this.resizeContent()
      this.updateContent()
    },
    backgroundColor: function () {
      this.renderBackground()
    },
    selected: function () {
      this.renderBackground()
    },
    interactive: function (interactive) {
      this.instance.interactive = interactive
    },
  },
  render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : null
    // : h('article', this.text)
  },
}
