import { GameScene } from "../Scenes/GameScene"
import Collectable from "../collectables/Collectable"

interface LayerProperties {
    type?: string;
    score?: number;
  }

export default class Collectables extends Phaser.Physics.Arcade.StaticGroup {
    scene: GameScene

    constructor(scene: GameScene, key: string) {
        super(scene.physics.world, scene)
        this.scene = scene
        this.setOrigin(0, 1)

        this.createFromConfig({
            key: 'diamonds',
            classType: Collectable
        })
    }

    mapProperties(propertiesList: object[]): LayerProperties {
        if(!propertiesList || propertiesList.length == 0) return {}

        return propertiesList.reduce((map: {[key: string] : string}, obj: {[name: string]: string}) => {
            map[obj.name] = obj.value
            return map
        }, {})
    }

    addFromLayer(layer: Phaser.Tilemaps.ObjectLayer){
        const {score: defaultScore, type}: LayerProperties = this.mapProperties(layer.properties as object[])

        layer.objects.forEach((collectableObj) => {
            const collectable = this.get(collectableObj.x, collectableObj.y, type)
            const props = this.mapProperties(collectableObj.properties)

            collectable.score = props && props.score ? props.score : defaultScore
        })
    }
}