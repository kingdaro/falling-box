import * as pixi from 'pixi.js'
import { lerpClamped } from '../util/math'

const size = 50
const movementSpeed = 500
const movementStiffness = 15
const gravity = 2500
const jumpStrength = 800

export class Player {
  sprite = new pixi.Graphics()
  xvel = 0
  yvel = 0
  movement = 0

  constructor() {
    this.sprite.beginFill(0xffffff)
    this.sprite.drawRect(0, 0, size, size)
    this.sprite.endFill()
  }

  update(dt: number) {
    this.xvel = lerpClamped(this.xvel, this.movement * movementSpeed, dt * movementStiffness)
    this.yvel += gravity * dt

    this.sprite.x += this.xvel * dt
    this.sprite.y += this.yvel * dt

    if (this.sprite.y + this.sprite.height > 720) {
      this.sprite.y = 720 - this.sprite.height
    }
  }

  jump() {
    this.yvel = -jumpStrength
  }
}

export class PlayerInput {
  constructor(private player: Player) {}

  keydown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') this.player.jump()
    if (event.key === 'ArrowLeft') this.player.movement = -1
    if (event.key === 'ArrowRight') this.player.movement = 1
  }

  keyup(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' && this.player.movement < 0) this.player.movement = 0
    if (event.key === 'ArrowRight' && this.player.movement > 0) this.player.movement = 0
  }
}
