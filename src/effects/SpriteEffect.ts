import { GameScene } from "../Scenes/GameScene"
import Enemy from "../entities/Enemy"

export default class SpriteEffect extends Phaser.Physics.Arcade.Sprite {
    scene: GameScene

    target: any = null
    effectName: string
    impactPosition: { x: number, y: number }

    constructor(scene: GameScene, x: number, y: number, effectName: string, impactPosition: { x: number, y: number }){
        super(scene, x, y, effectName)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.effectName = effectName
        this.impactPosition = impactPosition

        this.on('animationcomplete', (animation: Phaser.Animations.Animation) => {
            if(animation.key == this.effectName){
                this.destroy()
            }
        }, this)
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta)
        this.placeEffect()
    }

    placeEffect() {
        if(!this.target || !this.body) return

        const center = this.target.getCenter()
        this.body.reset(center.x, this.impactPosition.y)
    }

    playOn(target: Enemy) {
        this.target = target
        this.play(this.effectName, true)
        this.placeEffect()
    }
}