import { GameScene } from "../Scenes/GameScene";
import collidable from "../mixins/collidable";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

    scene: GameScene

    gravity: number = 500
    speed: number = 50
    timeFromLastTurn: number = 0
    maxPatrolDistance: number = 200
    currentPatrolDistance: number = 0

    rayGraphics: Phaser.GameObjects.Graphics
    setPlatformColliderLayer: Phaser.Tilemaps.TilemapLayer

    addCollider: (otherGameObject: Phaser.Types.Physics.Arcade.ArcadeColliderType, callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback) => any
    raycast: (body: Phaser.Physics.Arcade.Body, layer: Phaser.Tilemaps.TilemapLayer, raylenght?: number, precision?: number) => { ray: Phaser.Geom.Line; hasHit: boolean; }

    constructor(scene: GameScene, x: number, y: number, key: string){
        super(scene, x, y, key)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        Object.assign(this, collidable)

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

        this.currentPatrolDistance += Math.abs(this.body.deltaX())

        const { ray, hasHit } = this.raycast(this.body as Phaser.Physics.Arcade.Body, this.setPlatformColliderLayer, 30, 2)
        
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
        
        this.rayGraphics.clear()
        this.rayGraphics.strokeLineShape(ray)
    }

    setPlatformCollider(platformCollidersLayer: Phaser.Tilemaps.TilemapLayer) {
        this.setPlatformColliderLayer = platformCollidersLayer
    }
}