import { GameScene } from "./GameScene"

export default class BaseScene extends GameScene {
    fontSize: number = 45
    lineHeight: number = 52

    fontOptions: {
        fontSize: string,
        fill: string
    }

    constructor(key: string){
        super(key)

        this.fontOptions = {
            fontSize: `${this.fontSize}px`,
            fill: '#713E01'
        }
    }

    create() {
        this.add.image(0, 0, 'menu-bg')
            .setOrigin(0)
            .setScale(2.7)

        if(this.canGoBack) {
            const backButton = this.add.image(this.gameWidth - 10, this.gameHeight - 10, 'back')
                                    .setOrigin(1)
                                    .setScale(2)
                                    .setInteractive()
                                    
            backButton.on('pointerup', () => {
                this.scene.start('MenuScene')
            })
        }
    }

    createMenu(menu: any, setupMenuEvents: any) {
        let lastMenuPositionY = 0

        menu.forEach((menuItem: any) => {
            const menuPosition: [number, number] = [ this.gameWidth / 2, this.gameHeight / 2 + lastMenuPositionY ]
            menuItem.textGO = this.add.text(...menuPosition, menuItem.text, this.fontOptions).setOrigin(0.5, 1)
            lastMenuPositionY += this.lineHeight
            setupMenuEvents(menuItem)
        })
    }
}