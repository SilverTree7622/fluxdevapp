import { GAMEOPTIONS } from "./GameOption.js";

export default class Preload extends Phaser.Scene {

    constructor() {
        super({ key: 'preload',
        pack: {
            files: [
                {
                    type: 'image',
                    key: 'thumb',
                    url: 'thumb_1.png'
                }
            ]
        }
        })
    }

    preload() {
        // this.add.image(100, 150, 'thumb').setOrigin(0);
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        
        var width = 720;
        var height = 1280;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 30,
            text: 'Loading...',
            style: {
                font: '50px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2+25,
            text: '0%',
            style: {
                font: '20px monospace',
                fill: '#000000'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x00FF00, 1);
            progressBar.fillRect(206, 1280/2+8, 300 * value, 30);
        });
        // progressBox.fillStyle(0xffffff, 0.5);
        // progressBox.fillRect(200, 1280/2, 320, 50); 
        
        
        this.load.on('complete', function () {

        })


        //load image
        this.load.image('block','assets/images/block.png')
        this.load.image('tube','assets/images/tube.png')
        this.load.image('top','assets/images/top.png')
        this.load.image('light','assets/images/light.png')
        this.load.image('rule','assets/images/rule.png')

        //load ball 
        this.load.image('ball0','assets/images/ball/ball1.png')
        this.load.image('ball1','assets/images/ball/ball2.png')
        this.load.image('ball2','assets/images/ball/ball3.png')
        this.load.image('ball3','assets/images/ball/ball4.png')
        this.load.image('ball4','assets/images/ball/ball5.png')
        this.load.image('ball5','assets/images/ball/ball6.png')
        this.load.image('ball6','assets/images/ball/ball7.png')
        this.load.image('ball7','assets/images/ball/ball8.png')
        this.load.image('ball8','assets/images/ball/ball9.png')
        this.load.image('ball9','assets/images/ball/ball10.png')
        this.load.image('ball10','assets/images/ball/ball11.png')

        //load data json
        this.load.json('data_game','assets/data/data.json')
        this.load.json('lv1','assets/data/level/1.json')
        this.load.json('lv2','assets/data/level/2.json')
        this.load.json('lv3','assets/data/level/3.json')


        //load bg
        this.load.image('bg1','assets/images/bg/9.png')

        //load button
        this.load.image('btnMenu','assets/images/button/btnMenu.png')
        this.load.image('btnReload','assets/images/button/btnReload.png')
        this.load.image('btnBack','assets/images/button/btnBack.png')
        this.load.image('btnSoundOn','assets/images/button/btnSoundOn.png')
        this.load.image('btnSoundOff','assets/images/button/btnSoundOff.png')
        this.load.image('btnCenter','assets/images/button/NameBack.png')
        this.load.image('btnLv','assets/images/button/lv.png')
        this.load.image('btnLv_lock','assets/images/button/lv_lock.png')


        //load font
        this.load.bitmapFont("popin", "assets/fonts/popin.png", "assets/fonts/popin.xml");
        this.load.bitmapFont("rafale", "assets/fonts/rafale.png", "assets/fonts/rafale.xml");

        //load sound
        this.load.audio("drop","assets/audio/drop.mp3");
        this.load.audio("put","assets/audio/put.mp3");
        this.load.audio("correct","assets/audio/correct.wav");

    }

    create()
    {
        //  localStorage.clear('data_game')
        // localStorage.clear('rule')
        if (localStorage.getItem("rule")==null)
        {
            localStorage.setItem("rule", 0);
            this.scene.start('tutorial')
        }
        else{
            if (localStorage.getItem('data_game')==null) {
                this.data_game = this.cache.json.get('data_game');
                localStorage.setItem('data_game',JSON.stringify(this.data_game))
            } else {
                this.data_game=JSON.parse(localStorage.getItem('data_game'))
            }
            GAMEOPTIONS.level = this.data_game.level
           
            this.scene.start('game_play')
        }
    }
}