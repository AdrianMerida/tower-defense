class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.intervalId = null
    this.ctxW = this.ctx.canvas.width
    this.ctxH = this.ctx.canvas.height
    this.gameMode = ""
    this.state = "normal"

    // this.path = [
    //   [0, 0.5 * this.ctxH],
    //   [0.1 * this.ctxW, 0.5 * this.ctxH],
    //   [0.1 * this.ctxW, 0.2 * this.ctxH],
    //   [0.7 * this.ctxW, 0.2 * this.ctxH],
    //   [0.7 * this.ctxW, 0.8 * this.ctxH],
    //   [0.5 * this.ctxW, 0.8 * this.ctxH],
    //   [0.5 * this.ctxW, 0.5 * this.ctxH],
    //   [0.3 * this.ctxW, 0.5 * this.ctxH],
    //   [0.3 * this.ctxW, 0.2 * this.ctxH],
    //   [0.9 * this.ctxW, 0.2 * this.ctxH],
    //   [0.9 * this.ctxW, 0.5 * this.ctxH],
    //   [this.ctxW, this.ctxH / 2]
    // ]

    this.path = [
      [0, 0.5 * this.ctxH],
      [0.1 * this.ctxW, 0.5 * this.ctxH],
      [0.1 * this.ctxW, 0.2 * this.ctxH],
      [0.9 * this.ctxW, 0.2 * this.ctxH],
      [0.9 * this.ctxW, 0.8 * this.ctxH],
      [0.1 * this.ctxW, 0.8 * this.ctxH],
      [0.1 * this.ctxW, 0.5 * this.ctxH],
      [this.ctxW, this.ctxH / 2]
    ]

    // this.path = [
    //   [0, 0.5 * this.ctxH],
    //   [this.ctxW, this.ctxH / 2]
    // ]

    // Para que no coja decimales
    this.path = this.path.map(p => p.map(e => Math.floor(e)))

    this.widthPath = 30

    this.waves = []
    this.waveIndex = 0
    this.waveEnemiesIndex = 0

    this.board = new Board(this.ctx, this.path, this.widthPath)
    this.enemies = []
    this.towers = []
    this.tick = 0
    this.userHP = 20
    this.userGold = 500
    this.audio = new Audio("./Images/evil-sound.mp3")
    this.audio.loop = true;

    this.gameOverAudio = new Audio("./Images/game-over.mp3")
    this.gameWonAudio = new Audio("./Images/game-won.mp3")

    this.towerCosts = {
      "fire": 100,
      "ice": 150,
      "fire-upgrade": 250,
      "ice-upgrade": 300
    }

  }

  run() {

    this.waves = new Wave(this.ctx, this.path, this.gameMode)
    this.audio.play()

    this.intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
      this._checkEnemyInTowerRange()
      this._checkEnemiesReachGoal()
      this._updateUserGold()
      this._clearEnemiesReachGoal()
      this._clearDeadEnemies()
      this._updateEnemiesQty()
      this._updateUserHP()
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

      if (this.waveIndex < this.waves.wave.length - 1 && this.enemies.length === 0) {
        setTimeout(this._nextWave(), 3000)
      } else if (this.waveIndex === this.waves.wave.length - 1 && this.enemies.length === 0) {
        // FIN DEL JUEGO
        this._gameWon()
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
      return e.x + e.w / 2 <= this.ctx.canvas.width
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

    // Upgrade
    const fireUpgradeTowers = this.towers.filter(t => t.type === 'fire-upgrade')
    const fireUpgradeTowersQty = document.getElementById("fire-qty-upgrade")
    fireUpgradeTowersQty.innerText = fireUpgradeTowers.length
  }

  _updateIceTowersQuantity() {
    const iceTowers = this.towers.filter(t => t.type === 'ice')
    const iceTowersQty = document.getElementById("ice-qty")
    iceTowersQty.innerText = iceTowers.length

    //Upgrade
    const iceUpgradeTowers = this.towers.filter(t => t.type === 'ice-upgrade')
    const iceUpgradeTowersQty = document.getElementById("ice-qty-upgrade")
    iceUpgradeTowersQty.innerText = iceUpgradeTowers.length
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
    if (this.userHP === 0) {
      this._gameOver()
    }
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

  sellTowers(type) {
    const towerQty = this.towers.filter(t => t.type === type).length
    this.userGold += this.towerCosts[type] * towerQty
    this.towers = this.towers.filter(t => t.type !== type)
    this._updateTowersQuantity()
  }

  // GAME EVENTS
  _gameOver() {
    this.game = "game-over"
    this.audio.pause()
    clearInterval(this.intervalId)
    this.gameOverAudio.play()
    this.ctx.font = "60px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = '#ad400e'
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    )
  }

  restart() {
    clearInterval(this.intervalId)
    this.intervalId = null
    this.state = "normal"
    this._clear()
    this.waves = []
    this.waveIndex = 0
    this.waveEnemiesIndex = 0
    this.enemies = []
    this.towers = []
    this.tick = 0
    this.userHP = 20
    this.userGold = 500
    this._updateTowersQuantity()
    this._updateWavesIndicator()
    this.run()
  }

  _gameWon() {
    this.state = "game-won"
    this.audio.pause()
    clearInterval(this.intervalId)
    this.gameWonAudio.play()
    this.ctx.font = "60px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = '#71c994'
    this.ctx.fillText(
      "YOU WIN",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    )
  }

  pauseGame() {
    if (this.state === "normal") {
      this.state = "pause"
      this.audio.pause()
      clearInterval(this.intervalId)
      this.ctx.font = "60px Comic Sans MS";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = '#1be0da'
      this.ctx.fillText(
        "PAUSE",
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2
      )
    } else if (this.state === "pause") {
      this.state = "normal"
      this.audio.play()
      this.run()
    }
  }

}