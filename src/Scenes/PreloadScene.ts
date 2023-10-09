import Phaser from "phaser"

class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene")
    }

    preload() {
        this.load.tilemapTiledJSON("map", "crystal_world_map.json")
        this.load.image("tiles-1", "main_lev_build_1.png")
        this.load.image("tiles-2", "main_lev_build_2.png")

        this.load.spritesheet('player', "player/move_sprite_1.png", {
            frameWidth: 32,
            frameHeight: 38,
            spacing: 32
        })
    }

    create() {
        this.scene.start("PlayScene")
    }
}

export default PreloadScene