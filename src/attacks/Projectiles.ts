import { GameScene } from "../Scenes/GameScene"
import Player from "../entities/Player"
import Projectile from "./Projectile"
import { getTimestamp } from "../utils/functions"
import Enemy from "../entities/Enemy"

export default class Projectiles extends Phaser.Physics.Arcade.Group {
    timeFromLastProjectile: Number

    constructor(scene: GameScene, key: string) {
        super(scene.physics.world, scene)

        this.createMultiple({
            frameQuantity: 5,
            active: false,
            visible: false,
            key,
            classType: Projectile
        })
    }

    fireProjectile(initiator: Player | Enemy) {
        const projectile = this.getFirstDead(false)

        if(!projectile) return

        if(this.timeFromLastProjectile && 
            this.timeFromLastProjectile + projectile.cooldown > getTimestamp()) return

        const center = initiator.getCenter()
        let centerX = center.x

        if(initiator.lastDirection == Phaser.Physics.Arcade.FACING_RIGHT) {
            projectile.speed = Math.abs(projectile.speed)
            projectile.setFlipX(false)
            centerX += 10
        }else {
            projectile.speed = -Math.abs(projectile.speed)
            projectile.setFlipX(true)
            centerX -= 10
        }

        projectile.fire(centerX, center.y)
        this.timeFromLastProjectile = getTimestamp()
    }
}