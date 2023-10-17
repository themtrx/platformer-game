import { GameScene } from "./GameScene"
import Player from "../entities/Player"
import Enemies from "../groups/Enemies"
import Enemy from "../entities/Enemy"
import Projectile from "../attacks/Projectile"

import initAnims from "../anims"
import Collectables from "../groups/Collectables"
import Collectable from "../collectables/Collectable"
import Hud from "../hud"
import EventEmitter from "../events/Emitter"

class PlayScene extends GameScene {
   
    map: Phaser.Tilemaps.Tilemap
    platforms: Phaser.Tilemaps.TilemapLayer
    traps: Phaser.Tilemaps.TilemapLayer
    platformCollider: Phaser.Tilemaps.TilemapLayer
    environment: Phaser.Tilemaps.TilemapLayer

    playerZones: Phaser.Tilemaps.ObjectLayer
    startZone: Phaser.Types.Tilemaps.TiledObject
    endZone: Phaser.Types.Tilemaps.TiledObject
    collectables: Phaser.Tilemaps.ObjectLayer
    collectablesGroup: Phaser.Physics.Arcade.StaticGroup

    player: Player
    enemies: Enemies

    enemySpawns: Phaser.Tilemaps.ObjectLayer

    graphics: Phaser.GameObjects.Graphics
    line: Phaser.Geom.Line
    tileHits: Phaser.Tilemaps.Tile[]

    hud: Hud
    score: number = 0

    constructor() {
        super("PlayScene")
    }

    create(data: any) {
        this.hud = new Hud(this, 0, 0)

        this.createMap()
        initAnims(this.anims)
        this.createLayers()
        this.getPlayerZones()
        this.createPlayer()
        this.createEnemies()
        this.createCollectables()
        this.createPlayerColliders()
        this.createEnemiesColliders()
        this.createEndOfLevel()
        this.setUpFollowupCameraOn()
        this.createBG()

        if(data.gameStatus == 'PLAYER_LOOSE') return
        this.createGameEvents()
    } 


    finishDrawing(pointer: Phaser.Input.Pointer) {
        this.line.x2 = pointer.worldX
        this.line.y2 = pointer.worldY
        
        this.graphics.clear()
        this.graphics.strokeLineShape(this.line)

        this.tileHits = this.platforms.getTilesWithinShape(this.line)

        if(this.tileHits.length > 0){
            this.tileHits.forEach(tile => {
                tile.index != -1 &&
                    tile.setCollision(true)
            })
        }
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
        this.environment = this.map.createLayer("environment", tileset1).setDepth(-2)
        this.platforms = this.map.createLayer("platforms", tileset1)
        this.playerZones = this.map.getObjectLayer("player_zones")
        this.enemySpawns = this.map.getObjectLayer("enemy_spawns")
        this.collectables = this.map.getObjectLayer("collectables")
        this.traps = this.platforms = this.map.createLayer("traps", tileset1)

        this.platformCollider.setCollisionByProperty({ collides: true })
        this.traps.setCollisionByExclusion([-1])
    }

    createBG() {
        const bgObject = this.map.getObjectLayer("distance_bg").objects[0]
        
        this.add.tileSprite(bgObject.x, bgObject.y, this.gameWidth, bgObject.height, 'bg_spikes_dark')
            .setOrigin(0, 1)
            .setDepth(-1)
            .setScrollFactor(0, 1)
    }

    getPlayerZones() {
      this.startZone = this.playerZones.objects.find(object => object.name == "startZone")
      this.endZone = this.playerZones.objects.find(object => object.name == "endZone")

    }

    createPlayer() {
        this.player = new Player(this, this.startZone.x, this.startZone.y)
    }
    
    createGameEvents() {
        EventEmitter.on('PLAYER_LOOSE', () => {
            this.scene.restart({gameStatus: 'PLAYER_LOOSE'})
        })
    }

    createPlayerColliders() {
        this.player
            .addCollider(this.platformCollider)
            .addCollider(this.enemies.getProjectiles(), this.onHit)
            .addOverlap(this.collectablesGroup, this.onCollect, this)
            .addCollider(this.traps, this.onHit)
    }

    onCollect(entity: Enemy | Player, collectable: Phaser.Physics.Arcade.Sprite) {
        if (!collectable.visible) return

        this.score += (collectable as Collectable).score
        this.hud.updateScoreBoard(this.score)
        //@param hideGameObject - this will hide the object, default is false
        collectable.disableBody(true, true)
    }

    createEnemies() {

        this.enemies = new Enemies(this)
        const enemyTypes = this.enemies.getTypes()

        this.enemySpawns.objects.map(spawnPoint => {
            // Get custom propery "type" from Tiled
            const typeProperty = spawnPoint.properties.find((property: any) => property.name == "type")

            // Create an instance of the enemy
            // Typescript returns error, so I have to use typePropery.value as keyof typeof enemyTypes
            // To tell typescript that the typeProperty.value is type of enemyTypes
            const enemy = new enemyTypes[typeProperty.value as keyof typeof enemyTypes](this, spawnPoint.x, spawnPoint.y)
            enemy.setPlatformCollider(this.platformCollider)
            this.enemies.add(enemy)
        })
    }

    onPlayerCollision(enemy: Enemy, player: Player) {
        player.takesHit(enemy)
    }

    onHit(entity: Enemy, source: Projectile) {
        entity.takesHit(source)
    }

    createEnemiesColliders() {
        this.enemies
                .addCollider(this.platformCollider)
                .addCollider(this.player, this.onPlayerCollision)
                .addCollider(this.player.projectiles, this.onHit)
                .addOverlap(this.player.meleWeapon, this.onHit)
    }

    setUpFollowupCameraOn() {
        this.cameras.main.startFollow(this.player)
        this.physics.world.setBounds(0, 0, this.mapWidth + this.mapOffset, this.gameHeight + 200)
        this.cameras.main.setBounds(0, 0, this.gameWidth + this.mapOffset, this.gameHeight).setZoom(this.zoomFactor)
    }

    createEndOfLevel() {
        const endOfLevel = this.physics.add.sprite(this.endZone.x, this.endZone.y, 'end')
            .setAlpha(0)
            .setSize(5, this.gameHeight * 2)
            .setOrigin(0.5, 1)

        const endOverlap = this.physics.add.overlap(this.player, endOfLevel, () => {
            endOverlap.active = false
            console.log("You won!")
        })
    }

    createCollectables () {
        this.collectablesGroup = new Collectables(this, 'diamond').setDepth(-1);
       
        (this.collectablesGroup as Collectables).addFromLayer(this.collectables)

        this.collectablesGroup.playAnimation('diamond-shine')
    }

}

export default PlayScene