//import Phaser from 'phaser'
import GamePlay from './scene/GamePlay.js'
import Preload from './scene/GamePreload.js'
import GameMenu from './scene/GameMenu.js'
import GameOver from './scene/GameOver.js';
import { GAMEOPTIONS } from './scene/GameOption.js';
// import { FontLoaderPlugin } from './font_loader_plugin.js';

    
let game
window.onload = function() {
let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "game",
        width:720,
        height:1280,
    }, 
    backgroundColor: GAMEOPTIONS.BG_COLOR,
    // transparent: true,
    scene: [Preload,GameMenu,GamePlay,GameOver]
}
game = new Phaser.Game(config);
}
