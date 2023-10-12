import { GameScene } from "../Scenes/GameScene";
import Birdman from "../entities/Birdman";
import Snaky from "../entities/Snaky";
import { ENEMY_TYPES } from "../entities/enemyTypes"
import collidable from "../mixins/collidable";

type EnemyInstaces = Birdman | Snaky
export default class Enemies extends Phaser.GameObjects.Group {
    scene: GameScene
    addCollider: (otherGameObject: Phaser.Types.Physics.Arcade.ArcadeColliderType, callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback) => any

    constructor(scene: GameScene) {
        super(scene)

        this.scene = scene
        Object.assign(this, collidable)
    }

    getTypes() {
        return ENEMY_TYPES
    }

    getProjectiles() {
        const projectiles = new Phaser.GameObjects.Group(this.scene)
        this.getChildren().forEach((enemy: EnemyInstaces) => {
            if('projectiles' in enemy){
                enemy.projectiles && projectiles.addMultiple(enemy.projectiles.getChildren())
            }
        })

        return projectiles
    }
}