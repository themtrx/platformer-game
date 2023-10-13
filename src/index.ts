
import Phaser from "phaser";
import PreloadScene from "./Scenes/PreloadScene"
import PlayScene from "./Scenes/PlayScene"

const WIDTH = document.body.offsetWidth
const HEIGHT = 600

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  pixelArt: true,
  transparent: false,
  backgroundColor: "#000000",
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [ PreloadScene, PlayScene ]
};

new Phaser.Game(config)