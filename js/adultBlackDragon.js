class AdultBlackDragon extends BlackDragon {
  constructor(ctx, name, path) {
    super(ctx, name, path)
    this.x = this.path[0][0] - 2
    this.y = this.path[0][1] - 2
    this.w = 30
    this.h = 30
    this.x0 = this.x
    this.y0 = this.y
    this.speed = 2

    this.goldGiven = 150
    this.hp = 1000 // Vida
    this.hp0 = this.hp
    this.hpColor = '#a30e00'

    // Imagen del enemigo
    this.img = new Image()
    this.img.src = "./Images/adult-black-dragon.png"
    this.img.frames = 4
    this.img.frameIndex = 0

    this.pathIndex = 0

    this.tick = 0
  }
}