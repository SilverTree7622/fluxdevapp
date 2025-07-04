export default class Preload extends Phaser.Scene {

    constructor() {
        super({ key: 'preload' })
    }

    preload() {

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        // progressBox.fillStyle(0x00f, 0.8);
        // progressBox.fillRect(200, 1280/2, 320, 50);
        
        var width = 720;
        var height = 1280;
        // var loadingText = this.make.text({
        //     x: width / 2,
        //     y: height / 2 - 30,
        //     text: 'Loading...',
        //     style: {
        //         font: '20px monospace',
        //         fill: '#ffffff'
        //     }
        // });
        // loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2+20,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xFF5757, 1);
            progressBar.fillRect(206, 1280/2+8, 300 * value, 25);
        });

        //load font
        this.load.bitmapFont("popin", "assets/fonts/popin.png", "assets/fonts/popin.xml");
        // this.load.font('lovelo', 'assets/fonts/Lovelo_Black.otf');


         //load audio
        this.load.audio('merge',"assets/audio/merge.wav")
        this.load.audio('bg_music',"assets/audio/bg.mp3")
        this.load.audio('click',"assets/audio/button_click.mp3")

        this.load.image('circle','assets/image/circle.png')
        this.load.image('circle_boder','assets/image/circle_boder.png')

        this.load.image('title','assets/image/color_title.png')
        this.load.image('btnSoundOn','assets/image/btnSoundOn.png')
        this.load.image('btnSoundOff','assets/image/btnSoundOff.png')
        this.load.image('btnInfo','assets/image/btnInfo.png')
        this.load.image('btnPlay','assets/image/btnPlay.png')
        this.load.image('btnReload','assets/image/btnReload.png')        
        this.load.image('btnHome','assets/image/btnHome.png')
        this.load.image('crown','assets/image/crown.png')
        this.load.image('boder','assets/image/boder.png')
        this.load.image('light','assets/image/light.png')
        this.load.image('block','assets/image/block.png')
        this.load.image('tutorial','assets/image/tutorial.png')


        //load sprite sheet
        // this.load.atlas('lightning','assets/sprite_sheet/lightning.png','assets/sprite_sheet/lightning.json')


    }

    create()
    {
        this.music_bg=this.sound.add('bg_music')
        this.music_bg.play()
        this.music_bg.setLoop(true);
        this.scene.start('game_menu')
        // this.scene.start('game_play')


    }
}