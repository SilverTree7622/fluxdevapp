
import Tween from './prefabs/tween.js'
export default class GameOver extends Phaser.Scene {

    constructor() {
        super({ key: 'game_over' })
    }

    create()
    {

        UI(this);
    }


}



let tw

function UI(scene) {
    let hscore = localStorage.getItem('hscore')
    if (hscore==null) hscore = 0
    let bg = scene.add.rectangle(360,640,600,1000,'0xEFE230')
    let crown = scene.add.image(260,-1000,'crown').setScale(0.8)
    let txtHightScore = scene.add.text(300, -1000, hscore, { fontFamily: 'lovelo', fontSize: '102px', color: '#FF3131'});
        txtHightScore.setAlign('left');


    tw= new Tween()
    let btnReload = scene.add.image(260, 2000, "btnReload").setScale(0.8).setInteractive()
        btnReload.on('pointerdown', function (pointer) {
            tw.BtnClickAnim(scene,btnReload,'btnReload')
        })
    let btnHome = scene.add.image(460, 2000, "btnHome").setScale(0.8).setInteractive()
    btnHome.on('pointerdown', function (pointer) {
        tw.BtnClickAnim(scene,btnHome,'btnHome')
    })
    tw.ObjectMove(scene,btnReload,260,940)  
    tw.ObjectMove(scene,btnHome,460,940)  
    tw.ObjectMove(scene,crown,260,640)  
    tw.ObjectMove(scene,txtHightScore,360,580)  
    
    
    let title = scene.add.image(360,-1000,'title').setScale(2)
    tw.ObjectMove(scene,title,360,400)


}