import Tween from './prefabs/tween.js'
import SoundController from './prefabs/SoundController.js';
import { GAMEOPTIONS } from './GameOption.js';
export default class GameMenu extends Phaser.Scene {

    constructor() {
        super({ key: 'game_menu' })
    }

    create()
    {
        window['UtilPlatform'].sendMsg2Parent('ShowNavFooterPlay');
        let bg = this.add.rectangle(360,640,2000,2000,GAMEOPTIONS.BG_COLOR)
        UIDiamond(this);
        this.cameras.main.fadeIn(300, 0, 0, 0)

    }
}

let tw
let soundController

function UIDiamond(scene) {

    tw= new Tween()
    soundController= new SoundController()
    let btnPlay = scene.add.image(0, 640, "btnPlay").setScale(1).setInteractive()
        btnPlay.on('pointerdown', function (pointer) {
            window['UtilPlatform'].sendMsg2Parent('HideNavFooterPlay');
            // Tween.tween(scene,btnPlay,'btnPlay')
            tw.BtnClickAnim(scene,btnPlay,'btnPlay')
            soundController.SoundPlay(scene,'click')
        })
    tw.ObjectMove(scene,btnPlay,360,640)  
    
    
    let title = scene.add.image(360,-1000,'title').setScale(1)
    tw.ObjectMove(scene,title,360,400)

}