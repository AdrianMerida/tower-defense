window.onload = function () {

  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  


  document.getElementById("start-btn").onclick = function () {
    startGame();
  };

  function startGame() {
    new Game(ctx).run()
  }
};
