import { GameScene } from "../Scenes/GameScene"
import Enemy from "../entities/Enemy"
import SpriteEffect from "./SpriteEffect"

export default class EffectManager {
    scene: GameScene
    constructor(scene: GameScene){
        this.scene = scene
    }

    playEffectOn(effectName: string, target: Enemy){
        const effect = new SpriteEffect(this.scene, 0, 0, effectName)
        effect.playOn(target)
    }
}