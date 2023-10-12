import { GameScene } from "../Scenes/GameScene"
import Player from "../entities/Player"

export default class MeleWeapon extends Phaser.Physics.Arcade.Sprite {
    scene: GameScene

    damage: number = 15
    attackSpeed: number = 1000
    weaponName: string
    wielder: Player

    constructor(scene: GameScene, x: number, y: number, weaponName: string){
        super(scene, x, y, weaponName)
        this.scene = scene

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.weaponName = weaponName
        this.activateWeapon(false)
    }

    swing(wielder: Player) {
        this.wielder = wielder
        this.activateWeapon(true)
        this.body.reset(wielder.x, wielder.y)
    }

    activateWeapon(isActivate: boolean) {
        this.setActive(isActivate)
        this.setVisible(isActivate)
    }
    
}