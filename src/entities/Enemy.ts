import { GameScene } from "../Scenes/GameScene";
import collidable from "../mixins/collidable";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

    scene: GameScene

    gravity: number = 500
    speed: number = 150

    addCollider: (otherGameObject: Phaser.Types.Physics.Arcade.ArcadeColliderType, callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback) => any
    
    constructor(scene: GameScene, x: number, y: number, key: string){
        super(scene, x, y, key)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        Object.assign(this, collidable)

        this.init()
    }

    init(){

        this.setGravityY(this.gravity)
        this.setSize(20, 45)
        this.setOffset(7, 20)
        this.setCollideWorldBounds(true)
        this.setOrigin(0.5, 1)
        this.setImmovable(true)
    }
}