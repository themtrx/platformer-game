export class GameScene extends Phaser.Scene {

    mapWidth: number = 1600
    isGameRunning: boolean = false
    zoomFactor: number = 1.5

    canGoBack: boolean = false
    menu: Object[]

    get gameWidth() {
        return this.game.config.width as number
    }

    get gameHeight() {
        return this.game.config.height as number
    }

    get mapOffset() {
        if(this.mapWidth > this.gameWidth) {
            return this.mapWidth - this.gameWidth
        }

        return 0
    }

    get debugMode() {
        return this.game.config.physics.arcade.debug
    }

    get leftTopCorner() {
        const widhtByZoom = this.gameWidth / this.zoomFactor
        const heightByZoom = this.gameHeight / this.zoomFactor

        const x = (this.gameWidth - widhtByZoom) / 2
        const y = (this.gameHeight - heightByZoom) / 2

        return { x, y }
    }

    get rigthTopCorner() {
        const widhtByZoom = this.gameWidth / this.zoomFactor
        const heightByZoom = this.gameHeight / this.zoomFactor

        const x = widhtByZoom + ((this.gameWidth - widhtByZoom) / 2)
        const y = (this.gameHeight - heightByZoom) / 2

        return { x, y }
    }

    constructor(key: string){
        super(key)
    }
}