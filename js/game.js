class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.intervalID = null
    this.board = new Board(ctx)
    this.enemies = []
    this.towers = [new FireTower(this.ctx,this.ctx.canvas.width/2, this.ctx.canvas.height/2)] // De momento se pone una a pelo
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

    this.tick++
    if (this.tick % 100 === 0) {
      this.tick = 0
      this._addEnemie()
    }
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

}