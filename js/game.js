class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.intervalID = null
    this.ctxW = this.ctx.canvas.width
    this.ctxH = this.ctx.canvas.height

    this.path = [
      [0.6 * this.ctxW, 0.5 * this.ctxH],
      [0.1 * this.ctxW, 0.2 * this.ctxH],
      [0.3 * this.ctxW, 0.2 * this.ctxH],
      [0.3 * this.ctxW, 0.8 * this.ctxH],
      [0.5 * this.ctxW, 0.8 * this.ctxH],
      [0.5 * this.ctxW, 0.5 * this.ctxH],
      [0.7 * this.ctxW, 0.5 * this.ctxH],
      [0.7 * this.ctxW, 0.2 * this.ctxH],
      [0.9 * this.ctxW, 0.2 * this.ctxH],
      [0.9 * this.ctxW, 0.5 * this.ctxH]
    ]

    this.board = new Board(this.ctx, this.path)
    this.enemies = [new Skeleton(this.ctx, "Esqueleto", this.path)]
    // this.towers = [new FireTower(this.ctx, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2)]
    this.towers = []
    this.tick = 0
    this.userHP = 20
  }

  run() {
    this.intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
      this._checkEnemieInTowerRange()
      this._checkEnemiesReachGoal()
      this._updateUserHP()
      this._clearEnemiesReachGoal()
      this._clearDeadEnemies()

    }, FPS)
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  _draw() {
    this.board.draw()
    this.enemies.forEach(e => e.draw())
    this.towers.forEach(e => e.draw())

    // this.tick++
    // if (this.tick % 100 === 0) {
    //   this.tick = 0
    //    this._addEnemie()
    // }
  }

  _move() {
    this.enemies.forEach(e => e.move())
  }

  // ENEMIGOS
  _addEnemie() {
    this.enemies.push(new Skeleton(this.ctx, "Esqueleto"))
  }

  _checkEnemiesReachGoal() {
    this.enemies.forEach(e => {
      if (e._reachGoal()) {
        this._substractHP()
      }
    })
  }

  _clearEnemiesReachGoal() {
    this.enemies = this.enemies.filter(e => {
      return e.x + e.w <= this.ctx.canvas.width
    })
  }

  _clearDeadEnemies() {
    this.enemies = this.enemies.filter(e => {
      return e.getHP() > 0
    })
  }

  // TORRES
  _checkEnemieInTowerRange() {
    this.towers.forEach(tower => {
      this.enemies.forEach(enemie => {
        if (tower._enemieInRange(enemie)) {
          enemie.receiveDamage(tower.getPower())
          // console.log("in range!")
        }
      })
    })
  }

  // USUARIO
  _substractHP() {
    this.userHP -= 1
  }

  _updateUserHP() {
    const HP = document.getElementById("hp-value")
    HP.innerText = this.userHP
  }

  _createTower(obj, type) {
    switch (type) {
      case "fire":
        this.towers.push(new FireTower(this.ctx, obj.x, obj.y))
        break;
    }
  }

}