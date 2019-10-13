class Skeleton extends Enemy {

  constructor(ctx, name, path) {
    super(ctx, name, path)
    this.x = this.path[0][0] - 2
    this.y = this.path[0][1] - 2
    this.w = 30
    this.h = 30
    this.x0 = this.x
    this.y0 = this.y
    this.pathIndex = 0
    this.tick = 0
    this.speedReduced = false

    // Stats
    this.goldGiven = 15
    this.hp = 200 // Vida
    this.hp0 = this.hp
    this.speed = 1.7
    this.hpColor = '#10E348'

    // Imagen del enemigo
    this.img = new Image()
    this.img.src = "./Images/skeleton2.png"
    this.img.frames = 3
    this.img.frameIndex = 0
    this.dirreduceSpeedection = 0
  }


  // poner un círculo para asegurarnos que cuando llega el enemigo al rango muere
  draw() {

    // Imagen
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      this.img.height / 4 * this.direction,
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

  move() {
    // Mientras haya posiciones en el array
    if (this.pathIndex < this.path.length) {
      this._followPath()
    }
  }

  _followPath() {

    const distX = (this.path[this.pathIndex][0] - this.x0)
    const distY = (this.path[this.pathIndex][1] - this.y0)
    const percentageX = (Math.abs(distX) / (Math.abs(distX) + Math.abs(distY)))
    const percentageY = 1 - percentageX

    if (distX > 0) {
      this._updateDirection('right')
      this.x += this.speed * percentageX // derecha
    } else if (distX < 0) {
      this._updateDirection('left')
      this.x -= this.speed * percentageX // izquierda
    }

    if (distY > 0) {
      this._updateDirection('down')
      this.y += this.speed * percentageY // abajo
    } else if (distY < 0) {
      this._updateDirection('up')
      this.y -= this.speed * percentageY // arriba
    }

    // Si llega al destino marcado, cambia a nuevo destino
    if ((this.x + 1) >= this.path[this.pathIndex][0] &&
      (this.x - 1) <= this.path[this.pathIndex][0] &&
      (this.y + 1) >= this.path[this.pathIndex][1] &&
      (this.y - 1) <= this.path[this.pathIndex][1]) {

      this.x0 = this.path[this.pathIndex][0]
      this.y0 = this.path[this.pathIndex][1]
      this.pathIndex += 1
    }
  }

  _updateDirection(dir) {
    switch (dir) {
      case 'up':
        this.direction = 0
        break;
      case 'right':
        this.direction = 1
        break;
      case 'down':
        this.direction = 2
        break;
      case 'left':
        this.direction = 3
        break;
    }
  }

  _animate() {
    this.tick++
    if (this.tick > 10) {
      this.tick = 0
      this.img.frameIndex++
    }
    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0
    }
  }

  _reachGoal() {
    return ((this.x + this.w / 2) > this.ctx.canvas.width)
  }

  isDead() {
    return this.hp <= 0
  }

  getGoldGiven() {
    return this.goldGiven
  }

  reduceSpeed(rate) {
    const OriginalSpeed = this.speed
    this.speed *= rate
    this.speedReduced = true

    // Se le reduce la velocidad durante 5 segundos
    setTimeout(() => {
      this.speed = OriginalSpeed
      this.speedReduced = false
    }, 5000);
  }

}