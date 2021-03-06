class TowerBullet {
  constructor(ctx, x, y, fpX, fpY, towerType) {
    this.ctx = ctx
    this.y = y
    this.x = x
    this.fpX = fpX // final position X
    this.fpY = fpY // final position Y
    this.r = 2
    this.speed = 20
    this.towerType = towerType

    if (this.towerType === 'fire' || this.towerType === 'ice') {
      this.w = 6
      this.h = 6
    } else {
      this.w = 12
      this.h = 12
    }
    

    this.img = new Image()
    this.img.type = {
      "fire": "./Images/fireBullet.png",
      "ice": "./Images/iceBullet.png",
      "fire-upgrade": "./Images/fireBulletUpgrade.png",
      "ice-upgrade": "./Images/iceBulletUpgrade.png",
    }
    
    this.img.src = this.img.type[towerType]

  }

  draw() {
    // this.ctx.fillStyle = 'red'
    // this.ctx.beginPath();
    // this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    // this.ctx.fill();
    // this.ctx.closePath()
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    )
  }

   move() {
    const distX = (this.fpX - this.x)
    const distY = (this.fpY - this.y)
    const percentageX = (Math.abs(distX) / (Math.abs(distX) + Math.abs(distY)))
    const percentageY = 1 - percentageX

    if (distX > 0) {
      this.x += this.speed * percentageX // derecha
    } else {
      this.x -= this.speed * percentageX // izquierda
    }

    if (distY > 0) {
      this.y += this.speed * percentageY // abajo
    } else {
      this.y -= this.speed * percentageY // arriba
    }
  }

  reachFinalPosition() {
    return ((this.x + 20) >= this.fpX && (this.x - 20) <= this.fpX &&
      (this.y + 20) >= this.fpY && (this.y - 20) <= this.fpY)
  }

}