class IceTower extends FireTower {
  constructor(ctx, x, y) {
    super(ctx, x, y)
    this.w = 50
    this.h = 100
    this.power = 20
    this.cost = 150
    this.range = 125
    this.type = "ice"
    this.speedReduction = 0.5 // 50% speed reduction
    this.bullets = []

    // Para más adelante
    this.img = new Image()
    this.img.src = "./Images/ice-tower.png"
  }



}