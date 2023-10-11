import { GameScene } from "../Scenes/GameScene";

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
    scene: GameScene

    speed: number = 300
    maximumDistance: number = 300
    traveledDistance: number = 0

    constructor(scene: GameScene, x: number, y: number, key: string){
        super(scene, x, y, key)
        this.scene = scene

        scene.add.existing(this)
        scene.physics.add.existing(this)
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta)

        this.traveledDistance += this.body.deltaAbsX()

        if(this.traveledDistance >= this.maximumDistance) {
            this.destroy()
        }
    }

    fire() {
        this.setVelocityX(this.speed)
    }
    
}