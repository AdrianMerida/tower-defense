class Enemie {
  constructor(ctx, name) {
    this.ctx = ctx
    this.name = name
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