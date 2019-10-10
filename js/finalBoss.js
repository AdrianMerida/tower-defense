class FinalBoss extends BlackDragon {
  constructor(ctx, name, path) {
    super(ctx, name, path)
    this.x = this.path[0][0] - 2
    this.y = this.path[0][1] - 2
    this.w = 60
    this.h = 60
    this.x0 = this.x
    this.y0 = this.y
    this.pathIndex = 0
    this.tick = 0

    // Stats
    this.speed = 0.5
    this.goldGiven = 0 // cuando muera es gg
    this.hp = 20000 // Vida
    this.hp0 = this.hp
    this.hpColor = '#a30e00'

    // Imagen del enemigo
    this.img = new Image()
    this.img.src = "./Images/adult-black-dragon.png"
    this.img.frames = 4
    this.img.frameIndex = 0

    this.direction = 0

  }
}