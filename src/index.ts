
import Phaser from "phaser";
import PreloadScene from "./Scenes/PreloadScene"
import PlayScene from "./Scenes/PlayScene"

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 480,
  pixelArt: true,
  transparent: false,
  backgroundColor: "#000000",
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: [ PreloadScene, PlayScene ]
};

new Phaser.Game(config)