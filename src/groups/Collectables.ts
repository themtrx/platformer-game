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

        this.createFromConfig({
            key,
            classType: Collectable
        })
    }

    mapProperties(propertiesList: object[]): LayerProperties {
        if(propertiesList && propertiesList.length == 0) return

        return propertiesList.reduce((map: {[key: string] : string}, obj: {[name: string]: string}) => {
            map[obj.name] = obj.value
            return map
        }, {})
    }

    addFromLayer(layer: Phaser.Tilemaps.ObjectLayer){
        const properties: LayerProperties = this.mapProperties(layer.properties as object[])

        layer.objects.forEach((collectable) => {
            this.get(collectable.x, collectable.y, properties.type)
        })
    }
}