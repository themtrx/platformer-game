import { GameScene } from "../Scenes/GameScene"
import Projectile from "../attacks/Projectile"
import Enemy from "./Enemy"
import initAnims from "./anims/snakyAnims"
import Projectiles from "../attacks/Projectiles"


export default class Snaky extends Enemy {
    scene: GameScene

    projectiles: Projectiles
    timeFromLastAttack: number = 0
    attackDelay: number
    lastDirection: number = null

    constructor(scene: GameScene, x: number, y: number){
        super(scene, x, y, 'snaky')
        initAnims(this.scene.anims)

    }

    init(){
        super.init()

        this.health = 60
        this.projectiles = new Projectiles(this.scene, 'fireball-1')
        this.attackDelay = this.getAttackDelay()
        this.setSize(12, 45)
        this.setOffset(10, 15)
    }

    update(time: number, delta:number){
        super.update(time, delta)

        if(this.body.velocity.x > 0) {
            this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT
        }else {
            this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT
        }
        
        if(this.timeFromLastAttack + this.attackDelay <= time){
            this.projectiles.fireProjectile(this)
            this.timeFromLastAttack = time
            this.attackDelay = this.getAttackDelay()
        }

        if(!this.active) return
        if(this.isPlayingAnims('snaky-hurt')) return

        this.play('snaky-walk', true)
    }

    takesHit(source: Projectile): void {
        super.takesHit(source)
        this.play('snaky-hurt', true)
    }

    getAttackDelay() {
        return Phaser.Math.Between(1000, 4000)
    }

}