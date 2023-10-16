import { GameScene } from "../Scenes/GameScene"

export default class Hud extends Phaser.GameObjects.Container {
    scene: GameScene

    containerWidth: number = 50
    fontSize: number = 20
    color: string = '#fff'
    scoreBoard: Phaser.GameObjects.Container

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y)
        this.scene = scene
        this.scene.add.existing(this)

        this.setPosition(this.scene.rigthTopCorner.x - this.containerWidth, this.scene.rigthTopCorner.y + 10)
        this.setScrollFactor(0)

        this.setupList()
    }

    setupList() {
        this.scoreBoard = this.createScoreBoard()
        this.add(this.scoreBoard)
    }

    createScoreBoard() {
        const scoreText = this.scene.add.text(0, 0, '0', {fontSize: `${this.fontSize}px`, color: this.color})
        const scoreImg = this.scene.add.image(scoreText.width + 5, scoreText.y, 'diamond').setScale(1.2).setOrigin(0)

        const scoreBoard = this.scene.add.container(0, 0, [scoreText, scoreImg])
        scoreBoard.setName('scoreBoard')

        return scoreBoard
    }

    updateScoreBoard(score: number) {
        const scoreBoard = this.getByName('scoreBoard') as  Phaser.GameObjects.Container
        const [ scoreText, scoreImg ] = scoreBoard.list as Phaser.GameObjects.Text[]

        scoreText.setText(score.toString())
        scoreImg.x = scoreText.width + 5
    }
}