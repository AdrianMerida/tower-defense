class FireTower {
  constructor(ctx, x, y) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.w = 25
    this.h = 50

    // Stats
    this.power = 2
    this.cost = 100
    this.range = 150
    this.type = "fire"
    this.upgradeCost = 500
    this.towerLevel = 1
    
    this.bullets = []

    this.img = new Image()
    this.img.src = "./Images/fireTower.png"
  }

  draw() {

    // Tower
    this.ctx.drawImage(
      this.img,
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h
    )

    // Range
    this.ctx.beginPath()
    this.ctx.arc(
      this.x,
      this.y,
      this.range,
      0, 2 * Math.PI
    );
    this.ctx.stroke()
    this.ctx.closePath()

    this.bullets.forEach(b => b.draw())
    this._deleteBullets()
  }

  move() {
    this._animate()
    this.bullets.forEach(b => b.move())
  }

  _animate() {

  }

  getPower() {
    return this.power
  }

  _deleteBullets() {
    this.bullets = this.bullets.filter(b => b.reachFinalPosition() === false)
  }

  getCost() {
    return this.cost
  }

  enemyInRange(e) {
    // Si la hipotenusa es <= al rango de la torre, devuelve true
    const inRange = Math.sqrt((e.x - this.x) * (e.x - this.x) + (e.y - this.y) * (e.y - this.y)) <= this.range
    const bullet = new TowerBullet(this.ctx, this.x, this.y, e.x, e.y)

    if (inRange) {
      this.bullets.push(bullet)
    }

    return inRange
  }

  isHitting() {
    return this.bullets.length > 0
  }

  inPath(path, pos, widthPath) {
    let collide = false

    for (let i = 0; i < path.length - 1; i++) {
      const dX = path[i][0] - path[i + 1][0]
      const dY = path[i][1] - path[i + 1][1]

      if (dX === 0) {// Vertical
        if (Math.abs(path[i][0] - pos.x) < (widthPath + this.w/2) &&
          (
            (pos.y > path[i][1] - widthPath && pos.y < path[i + 1][1] + widthPath) ||
            (pos.y < path[i][1] + widthPath && pos.y > path[i + 1][1] - widthPath)
          )
        ) {
          collide = true
        }
      } else if (dY === 0) { // Horizontal
        if (Math.abs(path[i][1] - pos.y) < (widthPath + this.h/2) &&
          (
            (pos.x > path[i][0] - widthPath && pos.x < path[i + 1][0] + widthPath) ||
            (pos.x < path[i][0] + widthPath && pos.x > path[i + 1][0] - widthPath)
          )
        ) {
          collide = true
        }
      }
    }

    return collide
  }

  upgradeTower() {
    this.power = 10
    this.cost = 200
    this.range = 200
    this.towerLevel = 2
  }

}