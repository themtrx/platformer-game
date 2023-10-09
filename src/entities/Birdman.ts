import { GameScene } from "../Scenes/GameScene";
import Enemy from "./Enemy";

export default class Birdman extends Enemy {
    scene: GameScene

    constructor(scene: GameScene, x: number, y: number){
        super(scene, x, y, 'birdman')
    }

}