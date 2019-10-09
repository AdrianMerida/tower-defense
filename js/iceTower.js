class IceTower extends fireTower {
  constructor(ctx, x, y) {
    super(ctx, x, y)
    this.w = 75
    this.h = 75
    this.power = 20
    this.cost = 150
    this.range = 125
    this.type = "ice"

    this.bullets = []

    // Para más adelante
    this.img = new Image()
    this.img.src = "./Images/ice-tower.png"
  }
}