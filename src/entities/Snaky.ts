import { GameScene } from "../Scenes/GameScene"
import Projectile from "../attacks/Projectile"
import Enemy from "./Enemy"
import initAnims from "./anims/snakyAnims"


export default class Snaky extends Enemy {
    scene: GameScene

    constructor(scene: GameScene, x: number, y: number){
        super(scene, x, y, 'snaky')
        initAnims(this.scene.anims)
    }

    init(){
        super.init()

        this.health = 60
    }

    update(time: number, delta:number){
        super.update(time, delta)
        
        if(!this.active) return
        if(this.isPlayingAnims('snaky-hurt')) return

        this.play('snaky-walk', true)
    }

    takesHit(source: Projectile): void {
        super.takesHit(source)
        this.play('snaky-hurt', true)
    }

}