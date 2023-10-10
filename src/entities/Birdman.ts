import { GameScene } from "../Scenes/GameScene"
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

        this.play('birdman-idle', true)
    }

}