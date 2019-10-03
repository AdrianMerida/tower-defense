class Skeleton extends Enemie {

  constructor(ctx, name) {
    super(ctx, name)
    this.x = 0
    this.w = 10
    this.h = 10
    this.y = this.ctx.canvas.height / 2 - this.w / 2
    this.vx = 1
    this.goldGiven = 10
    this.hp = 10

    // Imagen del enemigo
    this.img = new Image()
    this.img.src = "./Images/skeleton.png"
    this.img.frames = 4
    this.img.frameIndex = 0

    this.tick = 0
  }


  // poner un círculo para asegurarnos que cuando llega el enemigo al rango muere
  draw() {
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      this.img.height / 4,
      this.img.width / this.img.frames,
      this.img.height / 4,
      this.x,
      this.y,
      this.w,
      this.h
    )


    this._animate()

  }

  move() {
    this.x += this.vx
  }

  _animate() {
    this.tick++
    if (this.tick > 20) {
      this.tick = 0
      this.img.frameIndex++
    }
    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0
    }
  }

  _reachGoal() {
    return ((this.x + this.w) > this.ctx.canvas.width)
  }

  _isDead() {
    return this.hp <= 0
  }

  getGoldGiven() {
    return this.goldGiven
  }

}