import { GameScene } from "../Scenes/GameScene";
import Projectile from "../attacks/Projectile";
import collidable from "../mixins/collidable";
import anims from "../mixins/anims"

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

    scene: GameScene

    gravity: number = 500
    speed: number = 50
    timeFromLastTurn: number = 0
    maxPatrolDistance: number = 250
    currentPatrolDistance: number = 0
    damage: number = 10
    health: number = 40
    lastDirection: number = Phaser.Physics.Arcade.FACING_RIGHT

    rayGraphics: Phaser.GameObjects.Graphics
    setPlatformColliderLayer: Phaser.Tilemaps.TilemapLayer

    addCollider: (otherGameObject: Phaser.Types.Physics.Arcade.ArcadeColliderType, callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback) => any
    raycast: (body: Phaser.Physics.Arcade.Body, layer: Phaser.Tilemaps.TilemapLayer, 
                options?:{ raylenght?: number, precision?: number, steepnes?: number }) => {
                        ray: Phaser.Geom.Line; hasHit: boolean; 
                    }
    isPlayingAnims: (key: string) => boolean

    constructor(scene: GameScene, x: number, y: number, key: string){
        super(scene, x, y, key)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        Object.assign(this, collidable)
        Object.assign(this, anims)

        this.init()
        this.initEvents()
    }

    init(){
        this.rayGraphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa } })

        this.setGravityY(this.gravity)
        this.setSize(20, 45)
        this.setOffset(7, 20)
        this.setCollideWorldBounds(true)
        this.setOrigin(0.5, 1)
        this.setImmovable(true)
        this.setVelocityX(this.speed)
    }

    initEvents(){
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update(time: number, delta: number) {

        if(this.getBounds().bottom > 600){
            this.scene.events.removeListener(Phaser.Scenes.Events.UPDATE, this.update, this)
            this.setActive(false)
            this.rayGraphics.clear()
            this.destroy()
            return
        }

        this.patrol(time)
    }

    patrol(time: number) {

        if(!this.body || !(this.body as  Phaser.Physics.Arcade.Body).onFloor())

        this.currentPatrolDistance += Math.abs(this.body.deltaX())

        const { ray, hasHit } = this.raycast(this.body as Phaser.Physics.Arcade.Body, this.setPlatformColliderLayer, { raylenght: 30, precision: 1, steepnes: 0.3 })
        
        // Check if the ray has hit platform
        // and wait for 100ms before turning
        // to avoid turning too quickly
        if((!hasHit || this.currentPatrolDistance >= this.maxPatrolDistance) &&
            this.timeFromLastTurn + 100 < time){

            this.setFlipX(!this.flipX)
            this.setVelocityX(this.speed = -this.speed)
            this.timeFromLastTurn = time
            this.currentPatrolDistance = 0
        }

        if(this.scene.debugMode && ray){
            this.rayGraphics.clear()
            this.rayGraphics.strokeLineShape(ray)
        }
        
    }

    setPlatformCollider(platformCollidersLayer: Phaser.Tilemaps.TilemapLayer) {
        this.setPlatformColliderLayer = platformCollidersLayer
    }

    takesHit(source: Projectile){
        this.health -= source.damage

        source.deliversHit(this)
        source.setActive(false)
        source.setVisible(false)

        if(this.health <= 0){
            this.setTint(0xff0000)
            this.setVelocity(0, -200)
            this.body.checkCollision.none = true
            this.setCollideWorldBounds(false)
        }
    }
}