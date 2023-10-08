import { GameScene } from "./GameScene"

class PlayScene extends GameScene {
   
    map: Phaser.Tilemaps.Tilemap
    platforms: Phaser.Tilemaps.TilemapLayer
    environment: Phaser.Tilemaps.TilemapLayer

    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

    constructor() {
        super("PlayScene")
    }

    create() {
        this.createMap()
        this.createLayers()

        this.createPlayer()
    } 

    update(time: number, delta: number) {
        
    }

    createMap() {
        this.map = this.make.tilemap({ key: "map" })
        this.map.addTilesetImage("main_lev_build_1", "tiles-1")
    }

    createLayers() {
        const tileset1 = this.map.getTileset("main_lev_build_1")
        this.platforms = this.map.createLayer("platforms", tileset1)
        this.environment = this.map.createLayer("environment", tileset1)
    }

    createPlayer() {
        this.player = this.physics.add.sprite(100, 100, "player")
        this.player.setGravityY(500)
        this.player.setCollideWorldBounds(true)
    }
    
}

export default PlayScene