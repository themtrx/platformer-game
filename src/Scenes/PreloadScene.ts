import Phaser from "phaser"

class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene")
    }

    preload() {
        this.load.tilemapTiledJSON("level-1", "crystal_world_map_level_1.json")
        this.load.tilemapTiledJSON("level-2", "crystal_world_map_level_2.json")

        this.load.image('bg_spikes_dark', 'bg_spikes_dark.png')
        this.load.image('sky_play', 'sky_play.png')
        this.load.image('menu-bg', 'background01.png')
        this.load.image('bg-spikes-tileset', 'bg_spikes_tileset.png')
        this.load.image('back', 'back.png')

        this.load.image("tiles-1", "main_lev_build_1.png")
        this.load.image("tiles-2", "main_lev_build_2.png")
        
        this.load.image('iceball-1', 'weapons/iceball_001.png')
        this.load.image('iceball-2', 'weapons/iceball_002.png')

        this.load.image('fireball-1', 'weapons/improved_fireball_001.png')
        this.load.image('fireball-2', 'weapons/improved_fireball_002.png')
        this.load.image('fireball-3', 'weapons/improved_fireball_003.png')

        this.load.image('diamond', 'collectables/diamond.png')
        
        this.load.image('diamond-1', 'collectables/diamond_big_01.png')
        this.load.image('diamond-2', 'collectables/diamond_big_02.png')
        this.load.image('diamond-3', 'collectables/diamond_big_03.png')
        this.load.image('diamond-4', 'collectables/diamond_big_04.png')
        this.load.image('diamond-5', 'collectables/diamond_big_05.png')
        this.load.image('diamond-6', 'collectables/diamond_big_06.png')

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

        this.load.audio('theme', 'music/theme_music.wav')
        this.load.audio('projectile-launch', 'music/projectile_launch.wav')
        this.load.audio('step', 'music/step_mud.wav')
        this.load.audio('jump', 'music/jump.wav')
        this.load.audio('swipe', 'music/swipe.wav')
        this.load.audio('coin-pickup', 'music/coin_pickup.wav')

        this.load.once('complete', () => {
            this.startGame()
        })
    }

    startGame() {
        this.registry.set('level', 1)
        this.registry.set('unlocked-levels', 1)

        this.scene.start("MenuScene")
    }
}

export default PreloadScene