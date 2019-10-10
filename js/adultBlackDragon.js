class AdultBlackDragon extends BlackDragon {
  constructor(ctx, name, path) {
    super(ctx, name, path)
    this.x = this.path[0][0] - 2
    this.y = this.path[0][1] - 2
    this.w = 40
    this.h = 40
    this.x0 = this.x
    this.y0 = this.y
    this.pathIndex = 0
    this.tick = 0
    
    // Stats
    this.speed = 1
    this.goldGiven = 500
    this.hp = 2500 // Vida
    this.hp0 = this.hp
    this.hpColor = '#a30e00'

    // Imagen del enemigo
    this.img = new Image()
    this.img.src = "./Images/adult-black-dragon.png"
    this.img.frames = 4
    this.img.frameIndex = 0

    this.direction = {
      "down": false,
      "left": false,
      "right": false,
      "up": false
    }
  }
}