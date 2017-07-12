import * as pixi from 'pixi.js'

export type InteractionEvent = pixi.interaction.InteractionEvent

export class Game {
  private state = new GameState()

  constructor(private app: pixi.Application) {
    app.ticker.add(dt => this.state.update(dt / 60))

    const interaction = new pixi.interaction.InteractionManager(app.renderer)
    interaction.addListener('keydown', (event: InteractionEvent) => this.state.keydown(event))
    interaction.addListener('keyup', (event: InteractionEvent) => this.state.keyup(event))
    interaction.addListener('pointerdown', (event: InteractionEvent) => this.state.pointerdown(event))
    interaction.addListener('pointerup', (event: InteractionEvent) => this.state.pointerup(event))
    interaction.addListener('pointermove', (event: InteractionEvent) => this.state.pointermove(event))
  }

  setState(state: GameState) {
    state.game = this
    this.app.stage.removeChildren()
    this.state.leave()
    this.state = state
    this.state.enter()
  }
}

export class GameState {
  game: Game
  enter() {}
  leave() {}
  update(dt: number) {}
  keyup(event: InteractionEvent) {}
  keydown(event: InteractionEvent) {}
  pointerdown(event: InteractionEvent) {}
  pointerup(event: InteractionEvent) {}
  pointermove(event: InteractionEvent) {}
}
