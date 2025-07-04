export default class GameNext extends Phaser.Scene {
    constructor() {
        super({ key: 'game_next_lv' })
    }

    create() {
        
        this.add.rectangle(360,640,720,1280,'0x000000',0.8)
        let light = this.add.image(360,500,'light').setScale(0.9)
            light.alpha = 0.9
        let top = this.add.image(light.x,light.y,'top').setScale(1.6)
        let txt = this.add.bitmapText(top.x,top.y-20,'rafale','LEVEL COMPLETE', 40).setOrigin(0.5)
            txt.tint = '0x00000'
       
        let btnNext = this.add.image(0,0,'block').setScale(0.9,0.4)
            btnNext.tint='0xFFB319'
           

        let txtNext = this.add.bitmapText(btnNext.x,btnNext.y,'rafale','NEXT', 40).setOrigin(0.5)
            txt.tint = '0x00000'

        let btnNextP = this.add.container(360,800)
            btnNextP.add(btnNext)
            btnNextP.add(txtNext)
            btnNextP.setSize(btnNext.width,btnNext.height)
            btnNextP.setInteractive()
            btnNextP.on('pointerdown', function (pointer) {
                tweenAdd(this.scene,btnNextP,'btnNext')
            })
        this.tweens.add({
                targets: btnNextP,
                scaleX: { from : 0, to : 1},
                scaleY: { from : 0, to : 1},
                ease: 'Bounce',
                duration: 800,
            })                   
    }
}

function onComplete(btnType) {
    switch (btnType) {
       
        case 'btnNext':
            // console.log('a')
            this.scene.start('game_play')
            break; 
        default:
            break;
    }
    
 }

function tweenAdd(scene,a,btnType)
{
    scene.tweens.add({
        targets: a,
        scale: { from : a.scale-0.25, to : a.scale},
        ease: 'Bounce',
        duration: 500,
        onComplete: onComplete.bind(scene,btnType),
    })
}
