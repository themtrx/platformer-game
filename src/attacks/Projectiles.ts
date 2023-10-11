import { GameScene } from "../Scenes/GameScene"
import Player from "../entities/Player"
import Projectile from "./Projectile"

export default class Projectiles extends Phaser.Physics.Arcade.Group {

    constructor(scene: GameScene) {
        super(scene.physics.world, scene)

        this.createMultiple({
            frameQuantity: 5,
            active: false,
            visible: false,
            key: 'iceball',
            classType: Projectile
        })
    }

    fireProjectile(initiator: Player) {
        const projectile = this.getFirstDead(false)

        if(!projectile) return

        projectile.fire(initiator.x, initiator.y)
    }
}