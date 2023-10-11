import { GameScene } from "../Scenes/GameScene";

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
    scene: GameScene

    speed: number = 300

    constructor(scene: GameScene, x: number, y: number, key: string){
        super(scene, x, y, key)
        this.scene = scene

        scene.add.existing(this)
        scene.physics.add.existing(this)
    }

    fire() {
        this.setVelocityX(this.speed)
    }
    
}