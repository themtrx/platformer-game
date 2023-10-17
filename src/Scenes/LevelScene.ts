import BaseScene from "./BaseScene"

class LevelScene extends BaseScene {
    constructor() {
        super('LevelScene')
        this.canGoBack = true
    }

    create() {
        super.create()

        const levels = this.registry.get('unlocked-levels')
        
        this.menu = []

        for (let i = 1; i <= levels; i++) {
            this.menu.push({
                scene: 'PlayScene', text: `Level ${i}`, level: i
            })
        }

        this.createMenu(this.menu, this.setUpMenuEvents.bind(this))
    }

    setUpMenuEvents(menuItem: any) {
        const textGO = menuItem.textGO
        textGO.setInteractive()

        textGO.on('pointerover', () => {
            textGO.setStyle({ fill: '#ff0'})
        })

        textGO.on('pointerout', () => {
            textGO.setStyle({ fill: '#713E01' })
        })

        textGO.on('pointerup', () => {
            if(menuItem.scene){
                this.registry.set('level', menuItem.level)
                this.scene.start(menuItem.scene)
            }
            if(menuItem.text == 'Exit'){
                this.game.destroy(true)
            }
        })
    }

}

export default LevelScene