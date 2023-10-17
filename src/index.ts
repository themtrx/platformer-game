
import Phaser from "phaser";
import PreloadScene from "./Scenes/PreloadScene"
import PlayScene from "./Scenes/PlayScene"
import MenuScene from "./Scenes/MenuScene"
import LevelScene from "./Scenes/LevelScene"

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
  scene: [ PreloadScene, MenuScene, LevelScene, PlayScene ]
};

new Phaser.Game(config)