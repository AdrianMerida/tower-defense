class Enemy {
  constructor(ctx, name, path) {
    this.ctx = ctx
    this.name = name
    this.path = path
  }

  setHP(value) {
    this.hp = value
  }

  receiveDamage(value) {
    this.hp -= value
  }

  getHP() {
    return this.hp
  }

}