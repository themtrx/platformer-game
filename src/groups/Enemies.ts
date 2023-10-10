import { ENEMY_TYPES } from "../entities/enemyTypes"
import collidable from "../mixins/collidable";

export default class Enemies extends Phaser.GameObjects.Group {

    addCollider: (otherGameObject: Phaser.Types.Physics.Arcade.ArcadeColliderType, callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback) => any

    constructor(scene: Phaser.Scene) {
        super(scene)

        Object.assign(this, collidable)
    }

    getTypes() {
        return ENEMY_TYPES
    }
}