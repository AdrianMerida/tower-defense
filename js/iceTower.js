class IceTower extends FireTower {
  constructor(ctx, x, y) {
    super(ctx, x, y)
    this.w = 30
    this.h = 40
    this.power = 1
    this.cost = 150
    this.range = 125
    this.type = "ice"
    this.speedReduction = 0.5 // 50% speed reduction
    this.bullets = []

    // Para más adelante
    this.img = new Image()
    this.img.src = "./Images/ice-tower.png"
  }

  upgradeTower() {
    this.img.src = "./Images/ice-tower-upgrade.png"
    this.power = 3
    this.cost = 300
    this.range = 150
    this.towerLevel = 2
    this.w = 50
    this.h = 40
    this.speedReduction = 0.3
    this.type = "ice-upgrade"
  }

}