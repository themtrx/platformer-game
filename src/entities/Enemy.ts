import { GameScene } from "../Scenes/GameScene";
import collidable from "../mixins/collidable";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

    scene: GameScene

    gravity: number = 500
    speed: number = 150

    rayGraphics: Phaser.GameObjects.Graphics

    addCollider: (otherGameObject: Phaser.Types.Physics.Arcade.ArcadeColliderType, callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback) => any
    
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
    }

    initEvents(){
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update(time: number, delta: number) {
       this.setVelocityX(30)

       const { ray } = this.raycast(this.body as Phaser.Physics.Arcade.Body)
       this.rayGraphics.clear()

       this.rayGraphics.strokeLineShape(ray)
    }

    raycast(body: Phaser.Physics.Arcade.Body, raylenght = 30) {
        const { x,y, width, halfHeight } = body
        const line = new Phaser.Geom.Line()

        line.x1 = x + width
        line.y1 = y + halfHeight
        line.x2 = line.x1 + raylenght
        line.y2 = line.y1 + raylenght

        return { ray: line }
    }
}