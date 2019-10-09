class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.intervalID = null
    this.ctxW = this.ctx.canvas.width
    this.ctxH = this.ctx.canvas.height

    this.path = [
      [0, this.ctxH / 2],
      [0.1 * this.ctxW, 0.5 * this.ctxH],
      [0.1 * this.ctxW, 0.2 * this.ctxH],
      [0.7 * this.ctxW, 0.2 * this.ctxH],
      [0.7 * this.ctxW, 0.8 * this.ctxH],
      [0.5 * this.ctxW, 0.8 * this.ctxH],
      [0.5 * this.ctxW, 0.5 * this.ctxH],
      [0.3 * this.ctxW, 0.5 * this.ctxH],
      [0.3 * this.ctxW, 0.2 * this.ctxH],
      [0.9 * this.ctxW, 0.2 * this.ctxH],
      [0.9 * this.ctxW, 0.5 * this.ctxH],
      [this.ctxW, this.ctxH / 2]
    ]

    this.widthPath = 30

    this.waves = new Wave(this.ctx, this.path)
    this.waveIndex = 0
    this.waveEnemiesIndex = 0

    this.board = new Board(this.ctx, this.path, this.widthPath)
    this.enemies = []
    this.towers = []
    this.tick = 0
    this.userHP = 20
    this.userGold = 300;
  }

  run() {
    this.intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
      this._checkEnemyInTowerRange()
      this._checkEnemiesReachGoal()
      this._updateUserHP()
      this._updateUserGold()
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
    this.towers.forEach(t => t.draw())

    this.tick++
    if (this.tick % 100 === 0) {
      this.tick = 0
      this._addEnemyFromWave()
    }
  }

  _move() {
    this.enemies.forEach(e => e.move())
    this.towers.forEach(t => t.move())
  }

  // ENEMIGOS
  _addEnemy() {
    this.enemies.push(new Skeleton(this.ctx, "Esqueleto", this.path))
  }

  _addEnemyFromWave() {
    // Si no ha acabado la wave, que siga sacando un monstruo
    if (this.waveEnemiesIndex < this.waves.wave[this.waveIndex].length) {
      this.enemies.push(this.waves.wave[this.waveIndex][this.waveEnemiesIndex])
      this.waveEnemiesIndex += 1
    } else {
      if (this.waveIndex < this.waves.wave.length) {
        this._nextWave()
      } else {
        // FIN DEL JUEGO
      }
    }
  }

  _nextWave() {
    this.enemies = []
    this.waveEnemiesIndex = 0
    this.waveIndex += 1
  }

  _checkEnemiesReachGoal() {
    this.enemies.forEach(e => {
      if (e._reachGoal()) {
        this._subtractHP()
      }
    })
  }

  _clearEnemiesReachGoal() {
    this.enemies = this.enemies.filter(e => {
      return e.x + e.w <= this.ctx.canvas.width
    })
  }

  _clearDeadEnemies() {
    this._getGoldFromDeadEnemies()
    this.enemies = this.enemies.filter(e => {
      return e.getHP() > 0
    })
  }

  _getGoldFromDeadEnemies() {
    this.enemies.forEach(e => {
      if (e.isDead()) {
        this.userGold += e.getGoldGiven()
      }
    })
  }

  // TORRES
  _checkEnemyInTowerRange() {
    this.towers.forEach(tower => {
      this.enemies.forEach(enemie => {
        if (!tower.isHitting()) {
          if (tower.enemyInRange(enemie)) {
            enemie.receiveDamage(tower.getPower())
          }
        }
      })
    })
  }

  _updateTowersQuantity() {
    const fireTowers = this.towers.filter(t => t.type = 'fire')
    const fireTowersQty = document.getElementById("fire-qty")
    fireTowersQty.innerText = fireTowers.length
  }

  // USUARIO
  _subtractHP() {
    this.userHP -= 1
  }

  _updateUserHP() {
    const HP = document.getElementById("hp-value")
    HP.innerText = this.userHP
  }

  _updateUserGold() {
    const gold = document.getElementById("gold-value")
    gold.innerText = this.userGold
  }

  createTower(pos, type) {
    if (pos.click === LEFT_CLICK) {
      switch (type) {
        case "fire":
          const tower = new FireTower(this.ctx, pos.x, pos.y)
          const towerCost = tower.getCost()
          // Si tiene pelas
          if (this.userGold >= towerCost) {
            if (!tower.inPath(this.path, pos, this.widthPath)) {
              this.towers.push(tower)
              this.userGold -= towerCost
            }
          }
          break;
      }

      this._updateTowersQuantity()
    }
  }

}