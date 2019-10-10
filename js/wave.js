class Wave {
  constructor(ctx, path) {
    this.ctx = ctx
    this.path = path
    this.wave = [this._createEasyWave(), this._createNormalWave(), this._createFinalWave()]
  }

  _createEasyWave() {
    let wave = []
    for (let i = 1; i <= 2; i++) {
      wave.push(new Skeleton(this.ctx, "skeleton", this.path)) // 30 Skeleton
      if (i % 10 === 0) {
        wave.push(new BlackDragon(this.ctx, "black-dragon", this.path)) // 3 black dragon
      }
    }

    return wave
  }

  _createNormalWave() {
    let wave = []
    for (let i = 1; i <= 30; i++) {
      wave.push(new Skeleton(this.ctx, "skeleton", this.path)) // 30 Skeletons
      if (i % 5 === 0) {
        wave.push(new BlackDragon(this.ctx, "black-dragon", this.path)) // 6 black dragons
      }
      if (i % 10 === 0) {
        wave.push(new AdultBlackDragon(this.ctx, "adult-black-dragon", this.path)) // 3 Adult dragon
      }
    }

    return wave
  }

  _createFinalWave() {
    let wave = []
    for (let i = 1; i <= 30; i++) {
      wave.push(new Skeleton(this.ctx, "skeleton", this.path)) // 30 Skeletons
      if (i % 3 === 0) {
        wave.push(new BlackDragon(this.ctx, "black-dragon", this.path)) // 10 black dragons
      }
      if (i % 5 === 0) {
        wave.push(new AdultBlackDragon(this.ctx, "adult-black-dragon", this.path)) // 6 Adult dragon
      }
      if (i === 29) {
        wave.push(new FinalBoss(this.ctx, "final-boss", this.path)) // 1 Final boss
      }
    }

    return wave
  }

}