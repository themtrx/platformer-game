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
    value: number
    scale: number

    constructor(scene: GameScene, x: number, y: number, scale: number = 1, health: number){
        this.bar = new Phaser.GameObjects.Graphics(scene)
        this.scene = scene

        this.bar.setScrollFactor(0)

        this.x = x / scale
        this.y = y / scale
        this.value = health
        this.scale = scale

        this.pixelPerHealth = this.size.width / this.value

        scene.add.existing(this.bar)

        this.draw()
    }

    decrease(amount: number){
        if(amount <= 0){
            this.value = 0
        }else {
            this.value = amount
        }

        this.draw()
    }

    draw() {
        this.bar.clear()
        const { width, height } = this.size

        const margin = 2

        this.bar.fillStyle(0x000)
        this.bar.fillRect(this.x, this.y, width + margin, height + margin)

        this.bar.fillStyle(0xFFFFFF)
        this.bar.fillRect(this.x + margin, this.y + margin, width- margin, height - margin)

        const healthWidth = Math.floor(this.value * this.pixelPerHealth)

        if(healthWidth <= this.size.width /3 ){
            this.bar.fillStyle(0xFF0000)
        }else {
            this.bar.fillStyle(0x00FF00)
        }

        if(healthWidth > 0) {
            this.bar.fillRect(this.x + margin, this.y + margin, healthWidth- margin, height - margin)
        }

        this.bar.setScrollFactor(0).setScale(this.scale)

    }
}