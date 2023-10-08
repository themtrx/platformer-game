import { GameScene } from "./GameScene"

class PlayScene extends GameScene {
   
    map: Phaser.Tilemaps.Tilemap
    platforms: Phaser.Tilemaps.TilemapLayer
    environment: Phaser.Tilemaps.TilemapLayer

    constructor() {
        super("PlayScene")
    }

    create() {
        this.createMap()
        this.createLayers()
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
    
}

export default PlayScene