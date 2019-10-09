class BlackDragon extends Skeleton {
  constructor(ctx, name, path) {
    super(ctx, name, path)
    this.x = this.path[0][0] - 2
    this.y = this.path[0][1] - 2
    this.w = 35
    this.h = 35
    this.x0 = this.x
    this.y0 = this.y
    this.speed = 1.5

    this.goldGiven = 50
    this.hp = 500 // Vida
    this.hp0 = this.hp
    this.hpColor = '#a33400'

    // Imagen del enemigo
    this.img = new Image()
    this.img.src = "./Images/black-dragon.png"
    this.img.frames = 4
    this.img.frameIndex = 0

    this.pathIndex = 0

    this.tick = 0
  }

  draw() {

    // Imagen
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      this.img.height / 2,
      this.img.width / this.img.frames,
      this.img.height / 4,
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h
    )

    // Vida
    new Rectangle(
      this.ctx,
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w * this.hp / this.hp0,
      5,
      this.hpColor
    ).draw()

    this._animate()
  }

  _animate() {

    // Se sobreescribe porque tiene un frame más y para que lo pinte más rápido
    this.tick++
    if (this.tick > 10) {
      this.tick = 0
      this.img.frameIndex++
    }
    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0
    }
  }

}