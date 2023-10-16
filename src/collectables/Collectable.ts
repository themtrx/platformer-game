import { GameScene } from "../Scenes/GameScene"

export default class Collectable extends Phaser.Physics.Arcade.Sprite {

    scene: GameScene
    score: number = 1

    constructor(scene: GameScene, x: number, y: number, key: string){
        super(scene, x, y, key)

        scene.add.existing(this)

        this.scene = scene

        this.scene.tweens.add({
            targets: this,
            y: this.y - 3,
            duration: Phaser.Math.Between(1500, 2500),
            repeat: -1,
            ease: 'linear',
            yoyo: true
        })
    }
   
}