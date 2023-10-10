import { GameScene } from "../Scenes/GameScene";

export default class Healthbar {
    scene: GameScene

    bar: Phaser.GameObjects.Graphics
    x: number
    y: number

    size = {
        width: 50,
        height: 8
    }

    pixelPerHealth: number

    constructor(scene: GameScene, x: number, y: number, health: number){
        this.bar = new Phaser.GameObjects.Graphics(scene)
        this.scene = scene

        this.bar.setScrollFactor(0)

        this.x = x
        this.y = y

        this.pixelPerHealth = this.size.width / health

        scene.add.existing(this.bar)

        this.draw()
    }

    draw() {
        this.bar.clear()
        const { width, height } = this.size

        this.bar.fillStyle(0x9B00FF)
        this.bar.fillRect(this.x, this.y, width, height)
    }
}