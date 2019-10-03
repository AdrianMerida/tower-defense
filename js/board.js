class Board {
  constructor(ctx) {
    this.ctx = ctx
    this.x = 0
    this.y = 0
    this.w = this.ctx.canvas.width
    this.h = this.ctx.canvas.height

    // Demomento sin imagen
    this.img = new Image()
    this.img.src = ""
  }

  draw() {

    new Rectangle(
      this.ctx,
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height * 0.2,
      'rgb(50, 64, 64)'
    ).draw()


    new Rectangle(
      this.ctx,
      0,
      this.ctx.canvas.height * 0.2,
      this.ctx.canvas.width,
      this.ctx.canvas.height * 0.6,
      'rgb(120, 171, 171)'
    ).draw()


    new Rectangle(
      this.ctx,
      0,
      this.ctx.canvas.height * 0.8,
      this.ctx.canvas.width,
      this.ctx.canvas.height * 0.2,
      'rgb(50, 64, 64)'
    ).draw()
  }
}