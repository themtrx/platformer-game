import { GameScene } from "./GameScene"
import Player from "../entities/Player"
import Enemies from "../groups/Enemies"
import Enemy from "../entities/Enemy"
import Projectile from "../attacks/Projectile"

import initAnims from "../anims"

class PlayScene extends GameScene {
   
    map: Phaser.Tilemaps.Tilemap
    platforms: Phaser.Tilemaps.TilemapLayer
    platformCollider: Phaser.Tilemaps.TilemapLayer
    environment: Phaser.Tilemaps.TilemapLayer

    playerZones: Phaser.Tilemaps.ObjectLayer
    startZone: Phaser.Types.Tilemaps.TiledObject
    endZone: Phaser.Types.Tilemaps.TiledObject

    player: Player
    enemies: Enemies

    enemySpawns: Phaser.Tilemaps.ObjectLayer

    graphics: Phaser.GameObjects.Graphics
    line: Phaser.Geom.Line
    tileHits: Phaser.Tilemaps.Tile[]

    constructor() {
        super("PlayScene")
    }

    create() {
        this.createMap()
        this.createLayers()
        this.getPlayerZones()
        this.createPlayer()
        this.createPlayerColliders()
        this.createEnemies()
        this.createEnemiesColliders()
        this.createEndOfLevel()
        this.setUpFollowupCameraOn()
        initAnims(this.anims)
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
        this.environment = this.map.createLayer("environment", tileset1)
        this.platforms = this.map.createLayer("platforms", tileset1)
        this.playerZones = this.map.getObjectLayer("player_zones")
        this.enemySpawns = this.map.getObjectLayer("enemy_spawns")

        this.platformCollider.setCollisionByProperty({ collides: true })
    }

    getPlayerZones() {
      this.startZone = this.playerZones.objects.find(object => object.name == "startZone")
      this.endZone = this.playerZones.objects.find(object => object.name == "endZone")

    }

    createPlayer() {
        this.player = new Player(this, this.startZone.x, this.startZone.y)
    }

    createPlayerColliders() {
        this.player.addCollider(this.platformCollider)
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

    onWeaponHit(entity: Enemy, source: Projectile) {
        entity.takesHit(source)
    }

    createEnemiesColliders() {
        this.enemies
                .addCollider(this.platformCollider)
                .addCollider(this.player, this.onPlayerCollision)
                .addCollider(this.player.projectiles, this.onWeaponHit)
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

}

export default PlayScene