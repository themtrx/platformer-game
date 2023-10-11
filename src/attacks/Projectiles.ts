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
    }
}