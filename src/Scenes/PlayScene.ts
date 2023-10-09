import { GameScene } from "./GameScene"
import { Player } from "../entities/Player"

class PlayScene extends GameScene {
   
    map: Phaser.Tilemaps.Tilemap
    platforms: Phaser.Tilemaps.TilemapLayer
    platformCollider: Phaser.Tilemaps.TilemapLayer
    environment: Phaser.Tilemaps.TilemapLayer

    player: Player

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

        this.platformCollider = this.map.createLayer("platform_colliders", tileset1)
        this.environment = this.map.createLayer("environment", tileset1)
        this.platforms = this.map.createLayer("platforms", tileset1)

        this.platformCollider.setCollisionByProperty({collides: true})
    }

    createPlayer() {
        this.player = new Player(this, 100, 100)
        this.physics.add.collider(this.player, this.platformCollider)
    }
    
}

export default PlayScene