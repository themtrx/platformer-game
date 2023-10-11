import { GameScene } from "../Scenes/GameScene"
import Healthbar from "../hud/Healthbar"
import initAnimations from "../entities/anims/playerAnims"
import collidable from "../mixins/collidable"
import anims from "../mixins/anims"
import Enemy from "./Enemy"
import Projectiles from "../attacks/Projectiles"

export default class Player extends Phaser.Physics.Arcade.Sprite {

    scene: GameScene
    cursors: Phaser.Types.Input.Keyboard.CursorKeys

    gravity: number = 500
    playerSpeed: number = 150

    health: number = 100
    hp: Healthbar

    jumpCount: number = 0
    consecutiveJumps: number = 1

    hasBeenHit: boolean = false
    bounceVelocity: number = 200

    projectiles : Projectiles

    lastDirection: number = Phaser.Physics.Arcade.FACING_RIGHT

    isPlayingAnims: (animsKey: string) => boolean
    addCollider: (otherGameObject: Phaser.Types.Physics.Arcade.ArcadeColliderType, callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback) => any
    
    constructor(scene: GameScene, x: number, y: number){
        super(scene, x, y, 'player')

        scene.add.existing(this)
        scene.physics.add.existing(this)

        Object.assign(this, anims)
        Object.assign(this, collidable)

        this.init()
        this.initEvents()
    }

    init(){
        this.cursors = this.scene.input.keyboard.createCursorKeys()

        this.hp = new Healthbar(this.scene, this.scene.leftTopCorner.x + 10, this.scene.leftTopCorner.y + 10, 2, this.health)

        this.setGravityY(this.gravity)
        this.setCollideWorldBounds(true)
        this.setOrigin(0.5, 1)
        this.setSize(20, 36)

        initAnimations(this.scene.anims)

        this.projectiles = new Projectiles(this.scene)

        this.scene.input.keyboard.on('keydown-Q', () => {
            this.play('throw', true)
            this.projectiles.fireProjectile(this)
        })

    }

    initEvents(){
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update() {
        if(this.hasBeenHit) return

        const { left, right, space } = this.cursors
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space)
        const onFloor = (this.body as Phaser.Physics.Arcade.Body).onFloor()
  
        if(left.isDown){
            this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT
            this.setVelocityX(-this.playerSpeed)
            this.setFlipX(true)
        }else if(right.isDown){
            this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT
            this.setVelocityX(this.playerSpeed)
            this.setFlipX(false)
        }else {
            this.setVelocityX(0)
        }

        if((isSpaceJustDown) && (onFloor || this.jumpCount < this.consecutiveJumps)){
            this.setVelocityY(-this.playerSpeed * 2)
            this.jumpCount++
        }

        if(onFloor) {
            this.jumpCount = 0
        }

        if(this.isPlayingAnims('throw')) return

        onFloor ?
            this.body.velocity.x != 0 ?
                this.play('run', true) : this.play('idle', true) :
            this.play('jump', true)
    }

    playDamageTween() {
        return this.scene.tweens.add({
            targets: this,
            duration: 100,
            repeat: -1,
            tint: 0xffffff
        })
    }

    bounceOff() {
        this.body.touching.right ?
            this.setVelocityX(-this.bounceVelocity) :
            this.setVelocityX(this.bounceVelocity)

        setTimeout(() => this.setVelocityY(-this.bounceVelocity), 0)
    }

    takesHit(initiator: Enemy) {
        if(this.hasBeenHit) return

        this.hasBeenHit = true
        this.bounceOff()
        const hitAnim = this.playDamageTween()

        this.health -= initiator.damage
        this.hp.decrease(this.health)

        this.scene.time.delayedCall(1000, () => {
            this.hasBeenHit = false
            hitAnim.stop()
            this.clearTint()
        })
    }
    
}