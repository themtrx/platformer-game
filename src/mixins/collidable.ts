import Phaser from "phaser"

export default {
    addCollider(otherGameObject: Phaser.Types.Physics.Arcade.ArcadeColliderType, callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback) {
        this.scene.physics.add.collider(this, otherGameObject, callback, null, this)
        return this
    },
    bodyPoisitionDifferenceX: 0,
    prevRay: null,
    prevHasHit: null,

    raycast(body: Phaser.Physics.Arcade.Body, layer: Phaser.Tilemaps.TilemapLayer, {raylenght = 30, precision = 1, steepnes = 1 }) {
        const { x, y, width, halfHeight } = body

        this.bodyPoisitionDifferenceX += body.x - body.prev.x

        if((Math.abs(this.bodyPoisitionDifferenceX) <= precision) && this.prevHasHit != null){
            return {
                ray: this.prevRay,
                hasHit: this.prevHasHit
            }
        }

        const line = new Phaser.Geom.Line()
        let hasHit = false 

        switch(body.facing) {
           case Phaser.Physics.Arcade.FACING_RIGHT: {
            line.x1 = x + width
            line.y1 = y + halfHeight
            line.x2 = line.x1 + raylenght * steepnes
            line.y2 = line.y1 + raylenght
            break;
           }    
           case Phaser.Physics.Arcade.FACING_LEFT: {
            line.x1 = x
            line.y1 = y + halfHeight
            line.x2 = line.x1 - raylenght * steepnes
            line.y2 = line.y1 + raylenght
            break;
           } 
        }

        

        const hits = layer.getTilesWithinShape(line)

        if(hits.length > 0){
            hasHit = this.prevHasHit = hits.some((hit: Phaser.Tilemaps.Tile) => hit.index != -1)
        }

        this.prevRay = line
        this.bodyPoisitionDifferenceX = 0

        return { ray: line, hasHit }
    }
}