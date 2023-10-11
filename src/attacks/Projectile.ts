import { GameScene } from "../Scenes/GameScene";

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
    scene: GameScene

    speed: number = 300
    maximumDistance: number = 300
    traveledDistance: number = 0
    cooldown: number = 500

    constructor(scene: GameScene, x: number, y: number, key: string){
        super(scene, x, y, key)
        this.scene = scene

        scene.add.existing(this)
        scene.physics.add.existing(this)
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta)

        this.traveledDistance += this.body.deltaAbsX()

        if(this.isOutOfRange()) {
            this.setActive(false)
            this.setVisible(false)
            this.traveledDistance = 0
        }
    }

    fire(x: number, y: number) {
        this.setActive(true)
        this.setVisible(true)
        this.body.reset(x, y)
        this.setVelocityX(this.speed)
    }

    isOutOfRange() {
        return this.traveledDistance && 
            this.traveledDistance >= this.maximumDistance
    }
    
}