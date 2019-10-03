class FireTower {
  constructor(ctx, x, y) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.w = 20
    this.h = 20
    this.power = 1
    this.cost = 100
    this.range = 50

    // Para más adelante
    this.img = new Image()
    this.img.src = ""
  }

  draw() {
    new Rectangle(
      this.ctx,
      this.x,
      this.y,
      this.w,
      this.h,
      '#db3535'
    ).draw()


    this.ctx.beginPath()
    this.ctx.arc(
      this.x + this.w/2,
      this.y + this.h/2,
      this.range,
      0, 2 * Math.PI
    );
    this.ctx.stroke()
    this.ctx.closePath()
  }

  move() {
    this._animate()
  }

  _animate() {

  }

  getPower() {
    return this.power
  }

  _enemieInRange(e) {
    // Si la hipotenusa es <= al rango de la torre, devuelve true
    return (Math.sqrt((e.x - this.x) * (e.x - this.x) + (e.y - this.y) * (e.y - this.y)) <= this.range)
  }

}