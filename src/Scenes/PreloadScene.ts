import Phaser from "phaser"

class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene")
    }

    preload() {
        this.load.tilemapTiledJSON("map", "crystal_world_map.json")
        this.load.image("tiles-1", "main_lev_build_1.png")
        this.load.image("tiles-2", "main_lev_build_2.png")
        
        this.load.image('iceball-1', 'weapons/iceball_001.png')
        this.load.image('iceball-2', 'weapons/iceball_002.png')

        this.load.image('fireball-1', 'weapons/improved_fireball_001.png')
        this.load.image('fireball-2', 'weapons/improved_fireball_002.png')
        this.load.image('fireball-3', 'weapons/improved_fireball_003.png')

        this.load.image('diamond', 'collectables/diamond.png')

        this.load.spritesheet('player', "player/move_sprite_1.png", {
            frameWidth: 32, frameHeight: 38, spacing: 32
        })

        this.load.spritesheet('player-slide-sheet', "player/slide_sheet_2.png", {
            frameWidth: 32, frameHeight: 38, spacing: 32
        })

        this.load.spritesheet('birdman', "enemy/enemy_sheet.png", {
            frameWidth: 32, frameHeight: 64, spacing: 32
        })

        this.load.spritesheet('snaky', "enemy/enemy_sheet_2.png", {
            frameWidth: 32, frameHeight: 64, spacing: 32
        })

        this.load.spritesheet('player-throw', "player/throw_attack_sheet_1.png", {
            frameWidth: 32, frameHeight: 38, spacing: 32
        })

        this.load.spritesheet('hit-sheet', "weapons/hit_effect_sheet.png", {
            frameWidth: 32, frameHeight: 32
        })

        this.load.spritesheet('sword-default', "weapons/sword_sheet_1.png", {
            frameWidth: 52, frameHeight: 32, spacing: 15
        })
    }

    create() {
        this.scene.start("PlayScene")
    }
}

export default PreloadScene