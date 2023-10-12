import { GameScene } from "../Scenes/GameScene"
import Projectile from "../attacks/Projectile"
import Enemy from "./Enemy"
import initAnims from "./anims/enemyAnims"


export default class Birdman extends Enemy {
    scene: GameScene

    constructor(scene: GameScene, x: number, y: number){
        super(scene, x, y, 'birdman')
        initAnims(this.scene.anims)
    }

    update(time: number, delta:number){
        super.update(time, delta)
        if(this.isPlayingAnims('birdman-hurt')) return
        
        this.play('birdman-idle', true)
    }

    takesHit(source: Projectile): void {
        super.takesHit(source)
        this.play('birdman-hurt', true)
    }

}