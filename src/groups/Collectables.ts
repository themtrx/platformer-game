import { GameScene } from "../Scenes/GameScene"
import Collectable from "../collectables/Collectable"

export default class Collectables extends Phaser.Physics.Arcade.StaticGroup {
    scene: GameScene

    constructor(scene: GameScene, key: string) {
        super(scene.physics.world, scene)

        this.scene = scene

        this.createFromConfig({
            key,
            classType: Collectable
        })
    }

}