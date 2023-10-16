import { GameScene } from "../Scenes/GameScene"

export default class Hud extends Phaser.GameObjects.Container {
    scene: GameScene

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y)
        this.scene = scene
        this.scene.add.existing(this)

        this.setPosition(this.scene.rigthTopCorner.x -100, this.scene.rigthTopCorner.y + 10)
        this.setScrollFactor(0)

        this.setupList()
    }

    setupList() {
        const scoreBoard = this.scene.add.text(0, 0, 'Score: 0', {fontSize: '20px', color: '#fff'})
        
        this.add(scoreBoard)
    }
}