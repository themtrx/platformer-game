import { GameScene } from "../Scenes/GameScene"
import Enemy from "../entities/Enemy"
import EffectManager from "../effects/EffectManager"

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
    scene: GameScene

    speed: number = 300
    maximumDistance: number = 300
    traveledDistance: number = 0
    cooldown: number = 500
    damage: number = 10
    effectManager = new EffectManager(this.scene)

    constructor(scene: GameScene, x: number, y: number, key: string){
        super(scene, x, y, key)
        this.scene = scene

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(this.width - 13, this.height - 13)
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta)

        this.traveledDistance += this.body.deltaAbsX()

        if(this.isOutOfRange()) {
            this.activateProjectile(false)
            this.traveledDistance = 0
            this.body.reset(0, 0)
        }
    }

    fire(x: number, y: number) {
        this.activateProjectile(true)
        this.body.reset(x, y)
        this.setVelocityX(this.speed)
    }

    deliversHit(target: Enemy) {
        this.activateProjectile(false)
        this.traveledDistance = 0

        const impactPosition = { x: this.x, y: this.y }

        this.body.reset(0, 0)
        this.effectManager.playEffectOn('hit-effect', target, impactPosition)
    }

    activateProjectile(isActive: boolean) {
        this.setActive(isActive)
        this.setVisible(isActive)
    }

    isOutOfRange() {
        return this.traveledDistance && 
            this.traveledDistance >= this.maximumDistance
    }
    
}