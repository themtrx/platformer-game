import Phaser from "phaser"

class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene")
    }

    preload() {
        this.load.tilemapTiledJSON("map", "crystal_world_map.json")
        this.load.image("tiles-1", "main_lev_build_1.png")
        this.load.image("tiles-2", "main_lev_build_2.png")
        this.load.image('player', "player/movements/idle01.png")
    }

    create() {
        this.scene.start("PlayScene")
    }
}

export default PreloadScene