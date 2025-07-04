import {GAMEOPTIONS} from '../js/GameOptions.js'
import SquareText from '../js/SquareText.js'
// import * as adMob from '../../js/index.js'

let item
const Random = Phaser.Math.Between
export default class PopupNextLevel extends Phaser.Scene {


    constructor() {
        super({ key: 'popup_nextlevel' })
    }
    
    create() {

        let rec = this.add.rectangle(this.game.config.width/2, this.game.config.height/2, 720 ,1280  , 0x000000,0.6)
        let popup= this.add.image(this.game.config.width/2,this.game.config.height/2,'popup')
        this.level_text = new SquareText(this, this.game.config.width/2 , 360, "font", 'CLEAR ', 80).setOrigin(0.5);
        this.add.existing(this.level_text);

        let btnNextLevel = this.add.image(this.game.config.width/2,900,'btnPlay').setScale(1.5).setInteractive();
        this.textNextLevel = new SquareText(this, btnNextLevel.x , btnNextLevel.y, "font", 'Next Level', 45 * GAMEOPTIONS.dpi).setOrigin(0.5);
        this.add.existing(this.textNextLevel)
            btnNextLevel.on('pointerdown', function (pointer) {
                tweenAdd(this.scene,btnNextLevel,'btnNextLevel')
        });


        let i = Random(0,100)
        if(i>=0 && i <=40) item = 'item1'
        if(i>40 && i <=80) item = 'item2'
        if(i>80 && i <=100) item = 'item3'
        this.borderItem=this.add.rectangle(360,630,300,300).setStrokeStyle(2, '0xffffff');
        let light = this.add.image(360,580,'light')
            light.alpha = 0.8
        let item_icon= this.add.image(360,580,item).setScale(0.3)
        let btnFreeItem = this.add.image(this.game.config.width/2,725,'btnVideo').setScale(1.3).setInteractive();
            btnFreeItem.tint='0xF66B0E'
        let video_icon = this.add.image(btnFreeItem.x-70,btnFreeItem.y-2,'video_icon').setScale(0.04)
        let btnText = new SquareText(this,btnFreeItem.x+30,btnFreeItem.y+2,'font','Free Item',35)
            this.add.existing(btnText);

        btnFreeItem.on('pointerdown', function (pointer) {
            tweenAdd(this.scene,btnFreeItem,'btnFreeItem')
        });
    } 
}

function onComplete(btnType) {
    switch (btnType) {
        case 'btnNextLevel':
            this.scene.start('PlayGame')
            break;
        case 'btnFreeItem':
            if(GAMEOPTIONS.ads.isAds){
                GAMEOPTIONS.reward.type=item
                //adMob.showInterstitialAd1(this)  
                // adMob.showReward1(this)  
            }  
            break;
    
        default:
            break;
    }
    
}

function tweenAdd(scene,a,btnType)
{
    scene.tweens.add({
        targets: a,
        scale: { from : a.scale-0.15, to : a.scale},
        ease: 'Bounce',
        duration: 500,
        onComplete: onComplete.bind(scene,btnType),
    })
}
 