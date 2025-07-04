import Tween from './prefabs/tween.js'
export default class GameMenu extends Phaser.Scene {

    constructor() {
        super({ key: 'game_menu' })
    }

    create()
    {
        window['UtilPlatform'].sendMsg2Parent('ShowNavFooterPlay');
        let bg = this.add.rectangle(360,640,2000,2000,'0x2f0045')
        UIDiamond(this);
        this.cameras.main.fadeIn(300, 0, 0, 0)
    }
}

let tw

function UIDiamond(scene) {

    tw= new Tween()
    let btnPlay = scene.add.image(0, 640, "btnPlay").setScale(1,0.9).setInteractive()
        btnPlay.on('pointerdown', function (pointer) {
            // Tween.tween(scene,btnPlay,'btnPlay')
            tw.BtnClickAnim(scene,btnPlay,'btnPlay')
            window['UtilPlatform'].sendMsg2Parent('HideNavFooterPlay');
        })
    tw.ObjectMove(scene,btnPlay,360,640)  
    
    
    let title = scene.add.image(360,-1000,'title').setScale(1.7)
    tw.ObjectMove(scene,title,360,400)

}