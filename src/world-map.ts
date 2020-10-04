import { Collider } from "./collision"
import { MapBlock } from "./map-block"

export class WorldMap {
  private readonly blocks = [
    new MapBlock(0, 0, 30, 1),
    new MapBlock(1, 1, 28, 1),
    new MapBlock(2, 2, 26, 1),
  ]

  readonly left = Math.min(...this.blocks.map((block) => block.rect.left))
  readonly right = Math.max(...this.blocks.map((block) => block.rect.right))

  constructor(collider: Collider) {
    for (const block of this.blocks) {
      collider.add(block, ...block.rect.values)
    }
  }

  draw() {
    for (const block of this.blocks) {
      block.draw()
    }
  }
}