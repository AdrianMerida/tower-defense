class Skeleton extends Enemie {

  constructor(ctx, name, path) {
    super(ctx, name, path)
    this.x = 0
    this.w = 30
    this.h = 30
    this.y = this.ctx.canvas.height / 2 - this.w / 2
   
    this.x0 = this.x
    this.y0 = this.y

    this.goldGiven = 10
    this.hp = 10

    // Imagen del enemigo
    this.img = new Image()
    this.img.src = "./Images/skeleton.png"
    this.img.frames = 4
    this.img.frameIndex = 0

    this.pathIndex = 0

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
    // Mientras haya posiciones en el array
    if (this.pathIndex < this.path.length) {
      this._followPath()
    } 
  }

  _followPath() {

    
    const distX = (this.path[this.pathIndex][0] - this.x0) / 100
    const distY = (this.path[this.pathIndex][1] - this.y0) / 100
    this.x += distX
    this.y += distY
 
    if ((this.x + 1) >= this.path[this.pathIndex][0] && 
        (this.x - 1) <= this.path[this.pathIndex][0] &&
        (this.y + 1) >= this.path[this.pathIndex][1] &&
        (this.y - 1) <= this.path[this.pathIndex][1]) {

      this.x0 = this.x
      this.y0 = this.y
      this.pathIndex += 1
    }

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