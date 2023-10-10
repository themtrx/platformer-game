export class GameScene extends Phaser.Scene {

    mapWidth: number = 1600
    isGameRunning: boolean = false
    zoomFactor: number = 1.5

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

    constructor(key: string){
        super(key)
    }
}