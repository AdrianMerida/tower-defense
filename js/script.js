window.onload = function () {

  const gameInterface = document.getElementById("interface")
  const gamePanel = document.getElementById("game-panel")
  const startGameBtn = document.getElementById("start-game-btn")
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  const game = new Game(ctx)
  const fireTower = document.getElementById("fire-tower")
  const iceTower = document.getElementById("ice-tower")
  const fireTowerUpgrade = document.getElementById("fire-tower-upgrade")
  const iceTowerUpgrade = document.getElementById("ice-tower-upgrade")
  const easyMode = document.getElementById("easy-img")
  const normalMode = document.getElementById("normal-img")
  const hardMode = document.getElementById("hard-img")
  const restartGameBtn = document.getElementById("restart-btn")
  const sellFireTowersBtn = document.getElementById("sell-fire-btn")
  const sellIceTowersBtn = document.getElementById("sell-ice-btn")
  const sellFireUpgradeTowersBtn = document.getElementById("sell-fire-upgrade-btn")
  const sellIceUpgradeTowersBtn = document.getElementById("sell-ice-upgrade-btn")

  let towerActive = ""
  let gameMode = "easy"

  // Events
  startGameBtn.addEventListener("click", function () {
    gameInterface.classList.remove("interface")
    gameInterface.classList.add("hide")
    gamePanel.classList.remove("hide")
    game.setMode(gameMode)
    startGame();
  })

  restartGameBtn.addEventListener("click", function () {
    game.restart()
  })

  canvas.onmousedown = (e) => {
    game.createTower(getCursorPosition(canvas, e), towerActive)
  }

  fireTower.addEventListener("click", function () {
    towerActive = "fire"
    fireTower.classList.add("tower-active")
    iceTower.classList.remove("tower-active")
    fireTowerUpgrade.classList.remove("tower-active")
    iceTowerUpgrade.classList.remove("tower-active")
  });

  iceTower.addEventListener("click", function () {
    towerActive = "ice"
    fireTower.classList.remove("tower-active")
    iceTower.classList.add("tower-active")
    fireTowerUpgrade.classList.remove("tower-active")
    iceTowerUpgrade.classList.remove("tower-active")
  });

  fireTowerUpgrade.addEventListener("click", function () {
    if (game.waveIndex >= 1) {
      towerActive = "fire-upgrade"
      fireTower.classList.remove("tower-active")
      iceTower.classList.remove("tower-active")
      fireTowerUpgrade.classList.add("tower-active")
      iceTowerUpgrade.classList.remove("tower-active")
    }
  })

  iceTowerUpgrade.addEventListener("click", function () {
    if (game.waveIndex >= 1) {
      towerActive = "ice-upgrade"
      fireTower.classList.remove("tower-active")
      iceTower.classList.remove("tower-active")
      fireTowerUpgrade.classList.remove("tower-active")
      iceTowerUpgrade.classList.add("tower-active")
    }
  })

  // SELL BUTTONS
  sellFireTowersBtn.addEventListener("click", function () {
    game.sellTowers("fire")
  })

  sellIceTowersBtn.addEventListener("click", function () {
    game.sellTowers("ice")
  })

  sellFireUpgradeTowersBtn.addEventListener("click", function () {
    game.sellTowers("fire-upgrade")
  })

  sellIceUpgradeTowersBtn.addEventListener("click", function () {
    game.sellTowers("ice-upgrade")
  })

  // GAME MODES
  easyMode.addEventListener("click", function () {
    gameMode = "easy"
    easyMode.classList.add("tower-active")
    normalMode.classList.remove("tower-active")
    hardMode.classList.remove("tower-active")
  })

  normalMode.addEventListener("click", function () {
    gameMode = "normal"
    easyMode.classList.remove("tower-active")
    normalMode.classList.add("tower-active")
    hardMode.classList.remove("tower-active")
  })

  hardMode.addEventListener("click", function () {
    gameMode = "hard"
    easyMode.classList.remove("tower-active")
    normalMode.classList.remove("tower-active")
    hardMode.classList.add("tower-active")
  })

  // Pausa
  document.onkeydown = (e) => {
    if (e.keyCode === PAUSE) {
      game.pauseGame()
    }
  }


  // Functions
  function startGame() {
    game.run()
  }

  function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return {
      "x": x,
      "y": y,
      "click": event.button
    }
  }
};
