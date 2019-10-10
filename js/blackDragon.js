class BlackDragon extends Skeleton {
  constructor(ctx, name, path) {
    super(ctx, name, path)
    this.x = this.path[0][0] - 2
    this.y = this.path[0][1] - 2
    this.w = 35
    this.h = 35
    this.x0 = this.x
    this.y0 = this.y
    this.pathIndex = 0
    this.tick = 0

    // Stats
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

    this.direction = 0
  }

  // Como el sprite tiene distinta dirección solo es necesario actualizar este método
  _updateDirection(dir) {
    switch (dir) {
      case 'up':
        this.direction = 3
        break;
      case 'right':
        this.direction = 2
        break;
      case 'down':
        this.direction = 0
        break;
      case 'left':
        this.direction = 1
        break;
    }
  }

  // Se sobreescribe porque tiene un frame más y para que lo pinte más rápido
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

}