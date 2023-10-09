import { GameScene } from "../Scenes/GameScene";
import initAnimations from "../entities/playerAnims"

export class Player extends Phaser.Physics.Arcade.Sprite {

    scene: GameScene
    cursors: Phaser.Types.Input.Keyboard.CursorKeys

    gravity: number = 500
    playerSpeed: number = 200

    jumpCount: number = 0
    consecutiveJumps: number = 1
    
    constructor(scene: GameScene, x: number, y: number){
        super(scene, x, y, 'player')

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.init()
        this.initEvents()
    }

    init(){
        this.cursors = this.scene.input.keyboard.createCursorKeys()

        this.setGravityY(this.gravity)
        this.setCollideWorldBounds(true)

        initAnimations(this.scene.anims)
    }

    initEvents(){
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update() {
        const { left, right, space } = this.cursors
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space)
        const onFloor = (this.body as Phaser.Physics.Arcade.Body).onFloor()
  
        if(left.isDown){
            this.setVelocityX(-this.playerSpeed)
            this.setFlipX(true)
        }else if(right.isDown){
            this.setVelocityX(this.playerSpeed)
            this.setFlipX(false)
        }else {
            this.setVelocityX(0)
        }

        if((isSpaceJustDown) && (onFloor || this.jumpCount < this.consecutiveJumps)){
            this.setVelocityY(-this.playerSpeed * 1.5)
            this.jumpCount++
        }

        if(onFloor) this.jumpCount = 0

        this.body.velocity.x != 0 ?
            this.play('run', true) : this.play('idle', true)
    }
}