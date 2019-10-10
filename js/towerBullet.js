class TowerBullet {
  constructor(ctx, x, y, fpX, fpY) {
    this.ctx = ctx
    this.y = y
    this.x = x
    this.fpX = fpX // final position X
    this.fpY = fpY // final position Y
    this.r = 2
    this.speed = 20
  }

  draw() {
    this.ctx.fillStyle = 'red'
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath()
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