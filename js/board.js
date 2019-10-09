class Board {
  constructor(ctx, path, widthPath) {
    this.ctx = ctx
    this.x = 0
    this.y = 0
    this.w = this.ctx.canvas.width
    this.h = this.ctx.canvas.height
    this.path = path
    this.widthPath = widthPath

    // Suelo
    this.img = new Image()
    this.img.src = "./Images/suelo.png"

    this.boardImg = new Image()
    this.boardImg.src = "./Images/fondo_juego.png"

    this.img.onload = () => {
      this.pat = this.ctx.createPattern(this.img, 'repeat')
    }

    // this.boardImg.onload = () => {
    //   this.patBoard = this.ctx.createPattern(this.boardImg, 'repeat')
    // }

  }

  draw() {

    // Fondo
    // this.ctx.fillStyle = this.patBoard
    // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    // Camino
    this.ctx.fillStyle = this.pat

    for (let i = 0, l = this.path.length; i < l - 1; i++) {

      const dX = (this.path[i + 1][0] - this.path[i][0])
      const dY = (this.path[i + 1][1] - this.path[i][1])
      
      if (dX === 0) { // Arriba - abajo
        if (dY > 0) {
          this._drawVerticalDown(i)
        } else {
          this._drawVerticalUp(i)
        }
      } else if (dY === 0) { // Derecha - izquierda
        if (dX > 0) {
          this._drawHorizontalRight(i) // Derecha
        } else {
          this._drawHorizontalLeft(i) // Izquierda
        }
      }
    }
  }

  _drawVerticalUp(i) {

    this.ctx.beginPath()

    this.ctx.moveTo(
      this.path[i][0] - this.widthPath,
      this.path[i][1] - this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i][0] - this.widthPath,
      this.path[i][1] + this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i][0] + this.widthPath,
      this.path[i][1] + this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i][0] + this.widthPath,
      this.path[i][1] - this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i + 1][0] + this.widthPath,
      this.path[i + 1][1] + this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i + 1][0] + this.widthPath,
      this.path[i + 1][1] - this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i + 1][0] - this.widthPath,
      this.path[i + 1][1] - this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i + 1][0] - this.widthPath,
      this.path[i + 1][1] + this.widthPath,
    )

    this.ctx.fill()
    this.ctx.closePath()
  }

  _drawVerticalDown(i) {

    this.ctx.beginPath()

    this.ctx.moveTo(
      this.path[i][0] - this.widthPath,
      this.path[i][1] + this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i][0] - this.widthPath,
      this.path[i][1] - this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i][0] + this.widthPath,
      this.path[i][1] - this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i][0] + this.widthPath,
      this.path[i][1] + this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i + 1][0] + this.widthPath,
      this.path[i + 1][1] - this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i + 1][0] + this.widthPath,
      this.path[i + 1][1] + this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i + 1][0] - this.widthPath,
      this.path[i + 1][1] + this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i + 1][0] - this.widthPath,
      this.path[i + 1][1] - this.widthPath,
    )

    this.ctx.fill()
    this.ctx.closePath()
  }

  _drawHorizontalRight(i) {

    this.ctx.beginPath()

    this.ctx.moveTo(
      this.path[i][0] + this.widthPath,
      this.path[i][1] + this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i][0] - this.widthPath,
      this.path[i][1] + this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i][0] - this.widthPath,
      this.path[i][1] - this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i][0] + this.widthPath,
      this.path[i][1] - this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i + 1][0] - this.widthPath,
      this.path[i + 1][1] - this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i + 1][0] + this.widthPath,
      this.path[i + 1][1] - this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i + 1][0] + this.widthPath,
      this.path[i + 1][1] + this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i + 1][0] - this.widthPath,
      this.path[i + 1][1] + this.widthPath,
    )

    this.ctx.fill()
    this.ctx.closePath()
  }

  _drawHorizontalLeft(i) {

    this.ctx.beginPath()

    this.ctx.moveTo(
      this.path[i][0] - this.widthPath,
      this.path[i][1] - this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i][0] + this.widthPath,
      this.path[i][1] - this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i][0] + this.widthPath,
      this.path[i][1] + this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i][0] - this.widthPath,
      this.path[i][1] + this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i + 1][0] + this.widthPath,
      this.path[i + 1][1] + this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i + 1][0] - this.widthPath,
      this.path[i + 1][1] + this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i + 1][0] - this.widthPath,
      this.path[i + 1][1] - this.widthPath,
    )

    this.ctx.lineTo(
      this.path[i + 1][0] + this.widthPath,
      this.path[i + 1][1] - this.widthPath,
    )

    this.ctx.fill()
    this.ctx.closePath()
  }

}