class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.intervalID = null
    this.ctxW = this.ctx.canvas.width
    this.ctxH = this.ctx.canvas.height
    this.gameMode = ""

    this.path = [
      [0, 0.5 * this.ctxH],
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

    // Para que no coja decimales
    this.path = this.path.map(p => p.map(e => Math.floor(e)))

    this.widthPath = 30

    this.waves = new Wave(this.ctx, this.path)
    this.waveIndex = 0
    this.waveEnemiesIndex = 0

    this.board = new Board(this.ctx, this.path, this.widthPath)
    this.enemies = []
    this.towers = []
    this.tick = 0
    this.userHP = 20
    this.userGold = 500;
    this.audio = new Audio("./Images/evil-sound.mp3")
    this.audio.loop = true;

  }

  run() {

    this.audio.play()
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
      this._updateEnemiesQty()
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

  setMode(mode) {
    this.gameMode = mode;
  }

  // ENEMIGOS
  _addEnemyFromWave() {
    // Si no ha acabado la wave, que siga sacando un monstruo
    if (this.waveEnemiesIndex < this.waves.wave[this.waveIndex].length) {
      this.enemies.push(this.waves.wave[this.waveIndex][this.waveEnemiesIndex])
      this.waveEnemiesIndex += 1
    } else {
      if (this.waveIndex < this.waves.wave.length && this.enemies.length === 0) {
        setTimeout(this._nextWave(), 3000)
      } else {
        // FIN DEL JUEGO
      }
    }
  }

  _nextWave() {
    this.enemies = []
    this.waveEnemiesIndex = 0
    this.waveIndex += 1
    if (this.waveIndex === 1) { // Oleada nº 2
      this._unlockUpgradedTowers()
    }
    this._updateWavesIndicator()
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
      this.enemies.forEach(enemy => {
        if (!tower.isHitting()) {
          if (tower.enemyInRange(enemy)) {
            if ((tower.type === 'ice' || tower.type === 'ice-upgrade') && enemy.speedReduced === false) {
              enemy.reduceSpeed(tower.speedReduction)
            }
            enemy.receiveDamage(tower.getPower())
          }
        }
      })
    })
  }

  _updateTowersQuantity() {
    this._updateFireTowersQuantity()
    this._updateIceTowersQuantity()
  }

  _unlockUpgradedTowers() {
    document.querySelectorAll('.locked').forEach(el => {
      el.classList.remove('locked')
      el.classList.add('unlocked')
    })
  }

  _updateFireTowersQuantity() {

    const fireTowers = this.towers.filter(t => t.type === 'fire')
    const fireTowersQty = document.getElementById("fire-qty")
    fireTowersQty.innerText = fireTowers.length
  }

  _updateIceTowersQuantity() {
    const iceTowers = this.towers.filter(t => t.type === 'ice')
    const iceTowersQty = document.getElementById("ice-qty")
    iceTowersQty.innerText = iceTowers.length
  }

  _updateWavesIndicator() {
    const waveIndicator = document.getElementById("wave-value")
    waveIndicator.innerText = this.waveIndex + 1
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

  _updateEnemiesQty() {

    const skeletons = this.enemies.filter(e => e.name === 'skeleton')
    const blackDragons = this.enemies.filter(e => e.name === 'black-dragon')
    const adultBlackDraongs = this.enemies.filter(e => e.name === 'adult-black-dragon')
    const finalBoss = this.enemies.filter(e => e.name === 'final-boss')
    const skeletonsQty = document.getElementById("skeleton-qty")
    const blackDragonsQty = document.getElementById("black-dragon-qty")
    const adultBlackDraongsQty = document.getElementById("adult-black-dragon-qty")
    const finalBossQty = document.getElementById("final-boss-qty")

    skeletonsQty.innerText = skeletons.length
    blackDragonsQty.innerText = blackDragons.length
    adultBlackDraongsQty.innerText = adultBlackDraongs.length
    finalBossQty.innerText = finalBoss.length

  }

  createTower(pos, type) {
    if (pos.click === LEFT_CLICK) {
      let tower = null
      let towerCost = 0

      if (!this._towerOverTower(pos)) {
        switch (type) {
          case "fire":
            tower = new FireTower(this.ctx, pos.x, pos.y)
            towerCost = tower.getCost()
            // Si tiene pelas
            if (this.userGold >= towerCost) {
              if (!tower.inPath(this.path, pos, this.widthPath)) {
                this.towers.push(tower)
                this.userGold -= towerCost
              }
            }
            break;
          case "ice":
            tower = new IceTower(this.ctx, pos.x, pos.y)
            towerCost = tower.getCost()
            // Si tiene pelas
            if (this.userGold >= towerCost) {
              if (!tower.inPath(this.path, pos, this.widthPath)) {
                this.towers.push(tower)
                this.userGold -= towerCost
              }
            }
            break;
          case "fire-upgrade":
            tower = new FireTower(this.ctx, pos.x, pos.y)
            tower.upgradeTower()
            towerCost = tower.getCost()
            if (this.userGold >= towerCost) {
              if (!tower.inPath(this.path, pos, this.widthPath)) {
                this.towers.push(tower)
                this.userGold -= towerCost
              }
            }
            break;
          case "ice-upgrade":
            tower = new IceTower(this.ctx, pos.x, pos.y)
            tower.upgradeTower()
            towerCost = tower.getCost()
            if (this.userGold >= towerCost) {
              if (!tower.inPath(this.path, pos, this.widthPath)) {
                this.towers.push(tower)
                this.userGold -= towerCost
              }
            }
            break;
        }
      }

      this._updateTowersQuantity()
    }
  }

  _towerOverTower(pos) {
    for (let i = 0; i <= this.towers.length - 1; i++) {
      if (Math.sqrt(Math.pow(this.towers[i].x - pos.x, 2) + Math.pow(this.towers[i].y - pos.y, 2)) <= this.towers[i].w) {
        return true
      }
    }
    return false
  }

}