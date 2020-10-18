import { DrawRectTrait, TimerTrait } from "./common-traits"
import { worldGridScale } from "./constants"
import { Entity } from "./entity"
import { Rect } from "./rect"
import { Trait } from "./trait"
import { vec, Vector } from "./vector"

export class FlyingBlock extends Entity {
	constructor(centerPosition: Vector, direction: 1 | -1) {
		super([
			new DrawRectTrait("green"),
			new TimerTrait(2, (ent) => ent.destroy()),
			new DestructionTrait(direction),
		])
		this.rect = new Rect(
			vec(worldGridScale),
			centerPosition.minus(worldGridScale / 2),
		)
	}
}

class DestructionTrait extends Trait {
	static maxFreezeTime = 0.15
	static speed = 1000

	hits = 3
	freezeTime = 0

	constructor(private readonly direction: number) {
		super()
	}

	update(dt: number) {
		if (this.freezeTime > 0) {
			this.entity.velocity = vec(0, 0)
			this.freezeTime -= dt
		} else {
			this.entity.velocity = vec(DestructionTrait.speed * this.direction, 0)

			const hitBlock = this.world.entities.find(
				(other) =>
					other.has(FlyingBlockDestructionTargetTrait) &&
					this.entity.rect.intersects(other.rect),
			)

			if (hitBlock) {
				this.hits -= 1
				this.hits > 0 ? hitBlock.destroy() : this.entity.destroy()
				this.freezeTime = DestructionTrait.maxFreezeTime
			}
		}
	}
}

export class FlyingBlockDestructionTargetTrait extends Trait {}
