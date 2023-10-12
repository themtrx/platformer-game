import { GameScene } from "../Scenes/GameScene"
import Player from "../entities/Player"
import Enemy from "../entities/Enemy"
import EffectManager from "../effects/EffectManager"

export default class MeleWeapon extends Phaser.Physics.Arcade.Sprite {
    scene: GameScene

    damage: number = 15
    attackSpeed: number = 1000
    weaponName: string
    wielder: Player
    weaponAnim: string
    effectManager = new EffectManager(this.scene)

    constructor(scene: GameScene, x: number, y: number, weaponName: string){
        super(scene, x, y, weaponName)
        this.scene = scene

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.weaponName = weaponName
        this.setOrigin(0.5, 1)
        this.setDepth(1)

        this.activateWeapon(false)

        this.weaponAnim = weaponName + '-swing'

        this.on('animationcomplete', (animation: Phaser.Animations.Animation) => {
            if(animation.key == this.weaponAnim){
                this.activateWeapon(false)
                this.body.reset(0, 0)
                this.body.checkCollision.none = false
            }
        })
    }

    protected preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta)

        if(!this.active) return

        if(this.wielder.lastDirection == Phaser.Physics.Arcade.FACING_RIGHT){
            this.setFlipX(false)
            this.body.reset(this.wielder.x + 15, this.wielder.y)
        }else {
            this.setFlipX(true)
            this.body.reset(this.wielder.x - 15, this.wielder.y)
        }
    }

    swing(wielder: Player) {
        this.wielder = wielder
        this.activateWeapon(true)
        this.anims.play(this.weaponAnim, true)
    }

    activateWeapon(isActivate: boolean) {
        this.setActive(isActivate)
        this.setVisible(isActivate)
    }

    deliversHit(target: Enemy) {
        const impactPosition = { x: this.x, y: this.getRightCenter().y }
        this.effectManager.playEffectOn('hit-effect', target, impactPosition)
        this.body.checkCollision.none = true
    }
    
}