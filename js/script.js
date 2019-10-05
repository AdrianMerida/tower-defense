window.onload = function () {

  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  const game = new Game(ctx)

  // EVENTS
  canvas.onmousedown = (e) => game._createTower(getCursorPosition(canvas, e),'fire')
  document.getElementById("start-btn").onclick = function () {
    startGame();
  };

  // FUNCTIONS
  function startGame() {
     game.run()
  }

  function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return {
      "x": x,
      "y": y
    }
  }
};
