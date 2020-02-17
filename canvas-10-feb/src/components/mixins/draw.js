export const draw = {
  methods: {
    draw() {
      this.box(this.ctx, this.x, this.y)
    },

    box(ctx, x, y) {
      ctx.setTransform(1, 0, 0, 1, x, y)

      ctx.fillStyle = this.configConnect.fill
      ctx.fillRect(
        this.configConnect.x,
        this.configConnect.y,
        this.configConnect.height,
        this.configConnect.width
      )

      ctx.fillStyle = this.configHandle.fill
      ctx.fillRect(
        this.configHandle.x,
        this.configHandle.y,
        this.configHandle.height,
        this.configHandle.width
      )

      ctx.stroke()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
    }
  }
}
