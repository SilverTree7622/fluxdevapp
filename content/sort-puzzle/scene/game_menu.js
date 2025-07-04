import { GAMEOPTIONS } from "./GameOption.js";

let camera
let display_w

export default class GameMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'game_menu' })
    }

    preload() {
    
        // this.load.scenePlugin({
        //     key: 'rexuiplugin',
        //     url: 'rexuiplugin.min.js',
        //     sceneKey: 'rexUI'
        // },

        // );
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');

    }

    create() {
        window['UtilPlatform'].sendMsg2Parent('ShowNavFooterPlay');
        if (localStorage.getItem('data_game')==null) {
            this.data_game = this.cache.json.get('data_game');
            localStorage.setItem('data_game',JSON.stringify(this.data_game))
        } else {
            this.data_game=JSON.parse(localStorage.getItem('data_game'))
        }
        GAMEOPTIONS.level = this.data_game.level
       
        camera = this.cameras.main;
        display_w=720+ camera.scaleManager.canvasBounds.x;
        // console.log(display_w)
        

       
        TopUI(this)  
        

        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: this.game.config.width/2,
            y: this.game.config.height/2,
            // width:  - camera.scaleManager.canvasBounds.x,
            width:  200,
            height: 1050,

            scrollMode: 0,

            // background: this.add.rectangle(this.game.config.width/2,this.game.config.height/2,520,660, '0x112B3C',1 ).setDepth(-1),

            panel: {
                child: createGrid(this),
                mask: {
                    mask: true,
                    padding: 1,
                }
            },


            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
            }
        })
            .layout()

         scrollablePanel.setChildrenInteractive({
            targets: [
                scrollablePanel.getByName('level', true),
            ]
        })
            .on('child.click', function (child) {
              
                // GAMEOPTIONS.level=99
                if(child.name>GAMEOPTIONS.level){
                }
                else{
                    GAMEOPTIONS.level=child.name
                    tweenAdd(this.scene,child,'selectChild')
                }
                // GAMEOPTIONS.level=child.name
                // tweenAdd(this.scene,child,'selectChild')
                
                // var category = child.getParentSizer().name;
                // print.text += `${category}:${child.text}\n`; 
            })
      
    }
}

function TopUI(scene) {
    let bg = scene.add.image(360,640,'bg1')
    let top = scene.add.rectangle(360,40,720,80,'0x6b5142',0.9)
    // let btnMenu = scene.add.image(-camera.scaleManager.canvasBounds.x + 80,40,'btnMenu').setScale(0.8)

    let txtLevel = scene.add.bitmapText(360, 40, 'rafale', 'SELECT LEVEL').setOrigin(0.5);
        txtLevel.tint = '0xffffff'
        txtLevel.fontSize = 35

    // let btnBack = scene.add.image(-camera.scaleManager.canvasBounds.x + 60,40,'btnBack').setScale(0.6).setInteractive()    
    let btnBack = scene.add.image(60,40,'btnBack').setScale(0.4).setInteractive()

    btnBack.on('pointerdown', function (pointer) {
        window['UtilPlatform'].sendMsg2Parent('HideNavFooterPlay');
        tweenAdd(scene,btnBack,'btnBack')
    })
    // scene.rexAnchor.add(btnBack, {
    //     left: 'left+20',
    //     top: 'top+10'
    // });
} 

function createGrid(scene) {
    var sizer = scene.rexUI.add.gridSizer({
        column: 5,  // col: 0
        row: 3,
        space: { column: 10, row: 10 },  
        name:'level'
       
    }) 
        //.addBackground(scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK))

    for (var i = 1; i < 101; i++) {
      sizer.add(Row(scene,i));
    } 

    return sizer;
}


var Row = function (scene, i) {
    // console.log(i)
    var background = scene.add.image(0, 100, 'btnLv').setScale(1);
    i<=GAMEOPTIONS.level ? background.setTexture('btnLv') : background.setTexture('btnLv_lock')
    // let background = scene.add.rectangle(0, 0, 40, 40, 0x205375);
        // i<=GAMEOPTIONS.level ? background.setFillStyle('0xE26A2C') : background.setFillStyle('0x205375')
        // i<GAMEOPTIONS.level ? background.tint='0xF9CF93' : background.tint='0x205375'
    // var button 
    
    let text_button = scene.add.bitmapText(0,0,'rafale',i,30).setOrigin(0.5)
    i<=GAMEOPTIONS.level ? text_button.setFontSize(30) : text_button.setFontSize(0)
    var sizer = scene.rexUI.add.sizer({
            orientation: 'y',
            width: 100,
            height: 110,
            space: { item: 20 },
            name:i
        })
        .addBackground(background)
        // .add(icon,{
        //     align: 'center',
        //     padding: {left: 0, right: 0, top: 40, bottom: 0},
        // })
        // .add(button,{
        //     align: 'center',
        // })
        .add(text_button,{
            align: 'center',
            padding: {left: 0, right: 0, top: 25, bottom: 0},
        })
        
    
        // button.on('pointerdown', function (pointer) {   
        //     switch (button.type) {
        //         case 'select':
        //             tweenAdd(this.scene,button,'select',index)                      
        //             break;
        //         case 'watch_ads':
        //             tweenAdd(this.scene,button,'watch_ads',index)                     
        //             break;
        //         default:
        //             break;
        //     }
        // });
    return sizer;
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

function onComplete(btnType) {
    switch (btnType) {
        case 'btnBack':
            // loadGridLv(this)
            this.scene.start('game_play')
            break
            
        case 'selectChild':
                // loadGridLv(this)
            // console.log('child')
            this.scene.start('game_play')
            break
            
            default:
            break;
    }
    
}

