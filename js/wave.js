class Wave {
  constructor(ctx, path, mode) {
    this.ctx = ctx
    this.path = path
    this.mode = mode
    this.wave = [this._createWave1(), this._createWave2(), this._createWave3()]
  }

  //  EASY WAVES
  _createWave1() {
    let wave = []
    for (let i = 1; i <= 1; i++) {
      wave.push(new Skeleton(this.ctx, "skeleton", this.path)) // 30 Skeleton

      if (this.mode === "easy") {
        if (i % 10 === 0) {
          wave.push(new BlackDragon(this.ctx, "black-dragon", this.path)) // 3 black dragon
        }
      } else if (this.mode === "normal") {
        if (i % 7 === 0) {
          wave.push(new BlackDragon(this.ctx, "black-dragon", this.path)) // 4 black dragon
        }
      } else {
        if (i % 5 === 0) {
          wave.push(new BlackDragon(this.ctx, "black-dragon", this.path)) // 6 black dragon
        }
      }

    }
    return wave
  }

  _createWave2() {
    let wave = []
    for (let i = 1; i <= 1; i++) {
      wave.push(new Skeleton(this.ctx, "skeleton", this.path)) // 30 Skeletons

      if (this.mode === "easy") {
        if (i % 5 === 0) {
          wave.push(new BlackDragon(this.ctx, "black-dragon", this.path)) // 6 black dragons
        }
        if (i % 10 === 0) {
          wave.push(new AdultBlackDragon(this.ctx, "adult-black-dragon", this.path)) // 3 Adult dragon
        }

      } else if (this.mode === "normal") {
        if (i % 4 === 0) {
          wave.push(new BlackDragon(this.ctx, "black-dragon", this.path)) // 7 black dragons
        }
        if (i % 6 === 0) {
          wave.push(new AdultBlackDragon(this.ctx, "adult-black-dragon", this.path)) // 5 Adult dragon
        }

      } else {
        if (i % 3 === 0) {
          wave.push(new BlackDragon(this.ctx, "black-dragon", this.path)) // 10 black dragons
        }
        if (i % 5 === 0) {
          wave.push(new AdultBlackDragon(this.ctx, "adult-black-dragon", this.path)) // 6 Adult dragon
        }
      }

    }
    return wave
  }

  _createWave3() {
    let wave = []
    for (let i = 1; i <= 1; i++) {
      wave.push(new Skeleton(this.ctx, "skeleton", this.path)) // 30 Skeletons

      if (this.mode === "easy") {
        if (i % 3 === 0) {
          wave.push(new BlackDragon(this.ctx, "black-dragon", this.path)) // 10 black dragons
        }
        if (i % 5 === 0) {
          wave.push(new AdultBlackDragon(this.ctx, "adult-black-dragon", this.path)) // 6 Adult dragon
        }
        if (i === 30) {
          wave.push(new FinalBoss(this.ctx, "final-boss", this.path)) // 1 Final boss
        }

      } else if (this.mode === "normal") {
        if (i % 2.5 === 0) {
          wave.push(new BlackDragon(this.ctx, "black-dragon", this.path)) // 12 black dragons
        }
        if (i % 4 === 0) {
          wave.push(new AdultBlackDragon(this.ctx, "adult-black-dragon", this.path)) // 7 Adult dragon
        }
        if (i % 15 === 0) {
          wave.push(new FinalBoss(this.ctx, "final-boss", this.path)) // 2 Final boss
        }

      } else {
        if (i % 2 === 0) {
          wave.push(new BlackDragon(this.ctx, "black-dragon", this.path)) // 15 black dragons
        }
        if (i % 3 === 0) {
          wave.push(new AdultBlackDragon(this.ctx, "adult-black-dragon", this.path)) // 10 Adult dragon
        }
        if (i % 10 === 0) {
          wave.push(new FinalBoss(this.ctx, "final-boss", this.path)) // 3 Final boss
        }
      }

    }
    return wave
  }
}