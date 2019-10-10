window.onload = function () {

  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  const game = new Game(ctx)
  const fireTower = document.getElementById("fire-tower")
  const iceTower = document.getElementById("ice-tower")
  let towerActive = ""

  // Events
  canvas.onmousedown = (e) => {
    game.createTower(getCursorPosition(canvas, e), towerActive)
  }

  fireTower.addEventListener("click", function () {
    towerActive = "fire"
    fireTower.classList.toggle("tower-active")
    iceTower.classList.remove("tower-active")
  });

  iceTower.addEventListener("click", function () {
    towerActive = "ice"
    fireTower.classList.remove("tower-active")
    iceTower.classList.toggle("tower-active")
  });

  document.getElementById("start-btn").onclick = function () {
    startGame();
  };

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
