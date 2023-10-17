import BaseScene from "./BaseScene"

class CreditScene extends BaseScene {

    constructor() {
        super('CreditScene')
        this.canGoBack = true

        this.menu = [
            { scene: null, text: 'Thank you for playing' },
            { scene: null, text: 'Author: THEMTRX' },
        ]
    }

    create() {
        super.create()
        this.createMenu(this.menu, () => {})
    }

}

export default CreditScene