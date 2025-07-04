var Phaser;
var level = 1;
var pageNo = 0;
var firstTime = true;
var bgmusic;
var isMuted = false;
var isMuted1 = false;
var i = 0;
var sno = 0;
var loadFinish = false
var soundMuted = false
var gameName = 'pop-it-master';

function pausegameaudio() {
    music.pause();
    soundstart = 1
}

function resumegameaudio() {
    music.resume()
    soundstart = 0
}


var bootstate = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function bootstate() {
        Phaser.Scene.call(this, {
            key: 'bootstate'
        });
    },
    preload: function () {
        pageNo = 0
        this.cameras.main.setBackgroundColor('#FFFFFF')
        this.load.image('bgloader', 'assets/loader/loaderbackground.png');
    },
    create: function () {
        loade = this.add.image(0, 0, 'bgloader').setOrigin(0, 0)
        loade.alpha = 0
        game.scene.scenes[pageNo].tweens.add({
            targets: loade,
            alpha: 1,
            ease: 'Linear',
            duration: 300,
        });
        this.load.on('complete', function () {
            this.scene.scene.stop('bootstate')
            game.scene.start('initialloader');
        });
        pageNo = 0
        this.cameras.main.setBackgroundColor('#FFFFFF')
        this.load.image('lpbar', 'assets/loader/loaderprogress.png');
        this.load.image('bgloader', 'assets/loader/loaderbackground.png');
        this.load.image('loaderbarbg', 'assets/loader/loaderbarbg.png');
        this.load.image('loaderplay', 'assets/loader/play.png');
        this.load.image('loadermask', 'assets/loader/loadermask.png');
        this.load.image('loadlogo', 'assets/loader/loadlogo.png');
        this.load.spritesheet('loadtext', 'assets/loader/loadtext.png', {
            frameWidth: 135,
            frameHeight: 34
        });
        this.load.start();
    }
});
var initialloader = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function initialloader() {
        Phaser.Scene.call(this, {
            key: 'initialloader'
        });
    },
    preload: function () {
        pageNo = 1
    },
    create: function () {
        this.cameras.main.setBackgroundColor('#FFFFFF')
        loade = this.add.image(0, 0, 'bgloader').setOrigin(0, 0)
        loaderbarbg = this.add.image(241, 488.5, 'loaderbarbg').setOrigin(0.5, 0.5)
        Logo_animation = this.add.image(241, 358.5, 'loadlogo');
        lpbar1 = this.add.sprite(-95, 488.5, 'lpbar').setOrigin(0.5, 0.5)
        loadermask = this.add.sprite(241.5, 488.5, 'loadermask').setOrigin(0.5, 0.5).setVisible(false);
        mask = loadermask.createBitmapMask();
        mask.alpha = 1
        lpbar1.setMask(mask);

        loadtext = this.add.sprite(241.5, 562, 'loadtext').setOrigin(0.5, 0.5)
        anim = this.anims.create({
            key: 'loadtext',
            frames: this.anims.generateFrameNumbers('loadtext', {
                start: 0,
                end: 3
            }),
            frameRate: 6,
            repeat: -1
        });
        loadtext.anims.load('loadtext')
        loadtext.anims.play('loadtext')
        this.load.on('progress', function (value) {
            lpbar1.x = -140 + parseInt(parseFloat(value / 1) * 380);
        });
        loaderplay = this.add.image(240, 509, 'loaderplay').setOrigin(0.5, 0.5).setInteractive({
            useHandCursor: true,
            pixelPerfect: true
        })
        loaderplay.visible = false
        this.load.on('complete', function () {
            loaderbarbg.visible = false
            lpbar1.visible = false
            loadtext.visible = false
            if (pageNo == 1) {
                loaderplay.visible = true
                loaderplay.on('pointerover', function () {
                    loaderplay.setScale(1.05)
                }, this);
                loaderplay.on('pointerout', function () {
                    loaderplay.setScale(1)
                }, this);
                loaderplay.once('pointerdown', function () {
                    this.scene.scene.stop('initialloader')
                    game.scene.start('titlescreen')

                }, this);
            } else {
                loadFinish = true;
            }
        });
        //audio
        this.load.audio('boden', ['assets/audio/bmusic.mp3', 'assets/audio/bmusic.ogg']);
        this.load.audio('itemclick', ['assets/audio/itemclick.mp3', 'assets/audio/itemclick.ogg']);
        this.load.audio('clickss', ['assets/audio/click.mp3', 'assets/audio/click.ogg']);
        this.load.audio('complete', ['assets/audio/complete.mp3', 'assets/audio/complete.ogg']);
        //button
        this.load.image('play', 'assets/buttons/play.png');
        this.load.image('moregames2', 'assets/buttons/moregames.png');
        this.load.image('settings', 'assets/buttons/settings.png');

        //settings
        this.load.spritesheet('clickmute', 'assets/buttons/clickmute.png', {
            frameWidth: 70,
            frameHeight: 66
        });
        this.load.spritesheet('soundmute', 'assets/buttons/soundmute.png', {
            frameWidth: 69,
            frameHeight: 68
        });


        //titlescreen
        this.load.image('titlebackground', 'assets/titlescreen/background.png')
        this.load.image('shadow1', 'assets/titlescreen/shadow1.png')
        this.load.image('titlebg', 'assets/titlescreen/titlebg.png')
        this.load.image('shadow2', 'assets/titlescreen/shadow2.png')
        this.load.image('title1', 'assets/titlescreen/title1.png')
        this.load.image('title2', 'assets/titlescreen/title2.png')
        this.load.image('title3', 'assets/titlescreen/title3.png')
        //level1
        this.load.image('level1background', 'assets/level1/background.png')
        this.load.image('level1numberpad', 'assets/level1/numberpad.png')
        this.load.image('level1popbase', 'assets/level1/popbase.png')
        this.load.image('level1popupper', 'assets/level1/popupper.png')
        this.load.image('level1arrow', 'assets/level1/arrow.png')
        this.load.image('level1lpbg', 'assets/level1/lpbg.png')
        this.load.image('level1lpbar', 'assets/level1/lpbar.png')
        this.load.image('level1lpmaskbg', 'assets/level1/lpmaskbg.png')
        this.load.image('level1lpmask', 'assets/level1/lpmask.png')
        this.load.image('ball', 'assets/level1/snow.png')
        this.load.image('finishboard', 'assets/level1/finishboard.png')
        this.load.image('replaybtn', 'assets/level1/replaybtn.png')
        this.load.image('nextbtn', 'assets/level1/nextbtn.png')
        this.load.image('blackscreen', 'assets/level1/blackscreen.png')
        this.load.spritesheet('level1number1', 'assets/level1/number1.png', {
            frameWidth: 51,
            frameHeight: 38
        });
        this.load.spritesheet('level1number2', 'assets/level1/number2.png', {
            frameWidth: 57,
            frameHeight: 43
        });
        for (i = 1; i <= 6; i++) {
            this.load.spritesheet('level1pop' + i, 'assets/level1/pop1.png', {
                frameWidth: 69,
                frameHeight: 67
            });
        }
        for (i = 11; i >= 7; i--) {
            this.load.spritesheet('level1pop' + i, 'assets/level1/pop2.png', {
                frameWidth: 69,
                frameHeight: 67
            });
        }
        for (i = 16; i >= 12; i--) {
            this.load.spritesheet('level1pop' + i, 'assets/level1/pop3.png', {
                frameWidth: 69,
                frameHeight: 67
            });
        }
        for (i = 21; i >= 17; i--) {
            this.load.spritesheet('level1pop' + i, 'assets/level1/pop4.png', {
                frameWidth: 69,
                frameHeight: 67
            });
        }
        for (i = 26; i >= 22; i--) {
            this.load.spritesheet('level1pop' + i, 'assets/level1/pop5.png', {
                frameWidth: 69,
                frameHeight: 67
            });
        }
        for (i = 32; i >= 27; i--) {
            this.load.spritesheet('level1pop' + i, 'assets/level1/pop6.png', {
                frameWidth: 69,
                frameHeight: 67
            });
        }

        //level2
        this.load.image('level2popbase', 'assets/level2/popbase.png')
        this.load.image('level2popupper', 'assets/level2/popupper.png')

        for (i = 1; i <= 10; i++) {
            this.load.spritesheet('level2pop' + i, 'assets/level2/pop1.png', {
                frameWidth: 64,
                frameHeight: 64
            });
        }
        for (i = 15; i >= 11; i--) {
            this.load.spritesheet('level2pop' + i, 'assets/level2/pop2.png', {
                frameWidth: 64,
                frameHeight: 64
            });
        }
        for (i = 20; i >= 16; i--) {
            this.load.spritesheet('level2pop' + i, 'assets/level2/pop3.png', {
                frameWidth: 64,
                frameHeight: 64
            });
        }
        for (i = 24; i >= 21; i--) {
            this.load.spritesheet('level2pop' + i, 'assets/level2/pop4.png', {
                frameWidth: 64,
                frameHeight: 64
            });
        }
        for (i = 28; i >= 25; i--) {
            this.load.spritesheet('level2pop' + i, 'assets/level2/pop5.png', {
                frameWidth: 64,
                frameHeight: 64
            });
        }
        for (i = 31; i >= 29; i--) {
            this.load.spritesheet('level2pop' + i, 'assets/level2/pop6.png', {
                frameWidth: 64,
                frameHeight: 64
            });
        }
        //level3
        //level3
        this.load.image('level3popbase', 'assets/level3/popbase.png')
        this.load.image('level3popupper', 'assets/level3/popupper.png')

        for (i = 1; i <= 1; i++) {
            this.load.spritesheet('level3pop' + i, 'assets/level3/pop1.png', {
                frameWidth: 75,
                frameHeight: 73
            });
        }
        for (i = 4; i >= 2; i--) {
            this.load.spritesheet('level3pop' + i, 'assets/level3/pop2.png', {
                frameWidth: 75,
                frameHeight: 73
            });
        }
        for (i = 9; i >= 5; i--) {
            this.load.spritesheet('level3pop' + i, 'assets/level3/pop3.png', {
                frameWidth: 75,
                frameHeight: 73
            });
        }
        for (i = 15; i >= 10; i--) {
            this.load.spritesheet('level3pop' + i, 'assets/level3/pop4.png', {
                frameWidth: 75,
                frameHeight: 73
            });
        }
        for (i = 27; i >= 16; i--) {
            this.load.spritesheet('level3pop' + i, 'assets/level3/pop5.png', {
                frameWidth: 75,
                frameHeight: 73
            });
        }
        //level4
        this.load.image('level4popbase', 'assets/level4/popbase.png')
        this.load.image('level4popupper', 'assets/level4/popupper.png')

        for (i = 3; i >= 1; i--) {
            this.load.spritesheet('level4pop' + i, 'assets/level4/pop1.png', {
                frameWidth: 71,
                frameHeight: 71
            });
        }
        for (i = 9; i >= 4; i--) {
            this.load.spritesheet('level4pop' + i, 'assets/level4/pop2.png', {
                frameWidth: 71,
                frameHeight: 71
            });
        }
        for (i = 13; i >= 10; i--) {
            this.load.spritesheet('level4pop' + i, 'assets/level4/pop3.png', {
                frameWidth: 71,
                frameHeight: 71
            });
        }
        for (i = 17; i >= 14; i--) {
            this.load.spritesheet('level4pop' + i, 'assets/level4/pop4.png', {
                frameWidth: 71,
                frameHeight: 71
            });
        }
        for (i = 22; i >= 18; i--) {
            this.load.spritesheet('level4pop' + i, 'assets/level4/pop5.png', {
                frameWidth: 71,
                frameHeight: 71
            });
        }
        for (i = 25; i >= 23; i--) {
            this.load.spritesheet('level4pop' + i, 'assets/level4/pop6.png', {
                frameWidth: 71,
                frameHeight: 71
            });
        }

        //level5
        this.load.image('level5popbase', 'assets/level5/popbase.png')
        this.load.image('level5popupper', 'assets/level5/popupper.png')

        for (i = 21; i >= 1; i--) {
            this.load.spritesheet('level5pop' + i, 'assets/level5/pop1.png', {
                frameWidth: 63,
                frameHeight: 65
            });
        }
        for (i = 46; i >= 22; i--) {
            this.load.spritesheet('level5pop' + i, 'assets/level5/pop2.png', {
                frameWidth: 63,
                frameHeight: 65
            });
        }
        //level6
        this.load.image('level6popbase', 'assets/level6/popbase.png')
        this.load.image('level6popupper', 'assets/level6/popupper.png')

        for (i = 3; i >= 1; i--) {
            this.load.spritesheet('level6pop' + i, 'assets/level6/pop1.png', {
                frameWidth: 88,
                frameHeight: 87
            });
        }
        for (i = 7; i >= 4; i--) {
            this.load.spritesheet('level6pop' + i, 'assets/level6/pop2.png', {
                frameWidth: 88,
                frameHeight: 87
            });
        }
        for (i = 12; i >= 8; i--) {
            this.load.spritesheet('level6pop' + i, 'assets/level6/pop3.png', {
                frameWidth: 88,
                frameHeight: 87
            });
        }
        for (i = 17; i >= 13; i--) {
            this.load.spritesheet('level6pop' + i, 'assets/level6/pop4.png', {
                frameWidth: 88,
                frameHeight: 87
            });
        }
        for (i = 21; i >= 18; i--) {
            this.load.spritesheet('level6pop' + i, 'assets/level6/pop5.png', {
                frameWidth: 88,
                frameHeight: 87
            });
        }
        for (i = 24; i >= 22; i--) {
            this.load.spritesheet('level6pop' + i, 'assets/level6/pop6.png', {
                frameWidth: 88,
                frameHeight: 87
            });
        }

        //level7
        this.load.image('level7popbase', 'assets/level7/popbase.png')
        this.load.image('level7popupper', 'assets/level7/popupper.png')


        this.load.spritesheet('level7pop1', 'assets/level7/pop1.png', {
            frameWidth: 67,
            frameHeight: 65
        });
        this.load.spritesheet('level7pop2', 'assets/level7/pop2.png', {
            frameWidth: 77,
            frameHeight: 78
        });
        this.load.spritesheet('level7pop3', 'assets/level7/pop3.png', {
            frameWidth: 77,
            frameHeight: 78
        });
        this.load.spritesheet('level7pop4', 'assets/level7/pop4.png', {
            frameWidth: 77,
            frameHeight: 78
        });
        this.load.spritesheet('level7pop5', 'assets/level7/pop5.png', {
            frameWidth: 74,
            frameHeight: 69
        });
        this.load.spritesheet('level7pop6', 'assets/level7/pop6.png', {
            frameWidth: 65,
            frameHeight: 63
        });

        this.load.spritesheet('level7pop7', 'assets/level7/pop7.png', {
            frameWidth: 74,
            frameHeight: 71
        });
        this.load.spritesheet('level7pop8', 'assets/level7/pop8.png', {
            frameWidth: 81,
            frameHeight: 78
        });
        this.load.spritesheet('level7pop9', 'assets/level7/pop9.png', {
            frameWidth: 81,
            frameHeight: 78
        });
        this.load.spritesheet('level7pop10', 'assets/level7/pop10.png', {
            frameWidth: 81,
            frameHeight: 78
        });
        this.load.spritesheet('level7pop11', 'assets/level7/pop11.png', {
            frameWidth: 81,
            frameHeight: 78
        });
        this.load.spritesheet('level7pop12', 'assets/level7/pop12.png', {
            frameWidth: 81,
            frameHeight: 78
        });
        this.load.spritesheet('level7pop13', 'assets/level7/pop13.png', {
            frameWidth: 55,
            frameHeight: 56
        });
        this.load.spritesheet('level7pop14', 'assets/level7/pop14.png', {
            frameWidth: 69,
            frameHeight: 69
        });

        this.load.spritesheet('level7pop15', 'assets/level7/pop15.png', {
            frameWidth: 82,
            frameHeight: 78
        });
        this.load.spritesheet('level7pop16', 'assets/level7/pop16.png', {
            frameWidth: 82,
            frameHeight: 78
        });
        this.load.spritesheet('level7pop17', 'assets/level7/pop17.png', {
            frameWidth: 82,
            frameHeight: 78
        });
        this.load.spritesheet('level7pop18', 'assets/level7/pop18.png', {
            frameWidth: 77,
            frameHeight: 74
        });
        this.load.spritesheet('level7pop19', 'assets/level7/pop19.png', {
            frameWidth: 77,
            frameHeight: 74
        });
        this.load.spritesheet('level7pop20', 'assets/level7/pop20.png', {
            frameWidth: 77,
            frameHeight: 74
        });
        this.load.spritesheet('level7pop21', 'assets/level7/pop21.png', {
            frameWidth: 77,
            frameHeight: 74
        });
        this.load.spritesheet('level7pop22', 'assets/level7/pop22.png', {
            frameWidth: 77,
            frameHeight: 74
        });
        this.load.spritesheet('level7pop23', 'assets/level7/pop23.png', {
            frameWidth: 76,
            frameHeight: 73
        });
        this.load.spritesheet('level7pop24', 'assets/level7/pop24.png', {
            frameWidth: 76,
            frameHeight: 73
        });
        this.load.spritesheet('level7pop25', 'assets/level7/pop25.png', {
            frameWidth: 76,
            frameHeight: 73
        });
        this.load.spritesheet('level7pop26', 'assets/level7/pop26.png', {
            frameWidth: 76,
            frameHeight: 73
        });
        this.load.spritesheet('level7pop27', 'assets/level7/pop27.png', {
            frameWidth: 76,
            frameHeight: 73
        });
        this.load.spritesheet('level7pop28', 'assets/level7/pop28.png', {
            frameWidth: 76,
            frameHeight: 73
        });
        this.load.spritesheet('level7pop29', 'assets/level7/pop29.png', {
            frameWidth: 86,
            frameHeight: 85
        });

        this.load.spritesheet('level7pop30', 'assets/level7/pop30.png', {
            frameWidth: 86,
            frameHeight: 85
        });
        this.load.spritesheet('level7pop31', 'assets/level7/pop31.png', {
            frameWidth: 75,
            frameHeight: 79
        });
        this.load.spritesheet('level7pop32', 'assets/level7/pop32.png', {
            frameWidth: 67,
            frameHeight: 69
        });
        //level8
        this.load.image('level8popbase', 'assets/level8/popbase.png')
        this.load.image('level8popupper', 'assets/level8/popupper.png')

        for (i = 17; i >= 1; i--) {
            this.load.spritesheet('level8pop' + i, 'assets/level8/pop1.png', {
                frameWidth: 58,
                frameHeight: 58
            });
        }
        for (i = 28; i >= 18; i--) {
            this.load.spritesheet('level8pop' + i, 'assets/level8/pop2.png', {
                frameWidth: 58,
                frameHeight: 58
            });
        }
        //level9
        this.load.image('level9popbase', 'assets/level9/popbase.png')
        this.load.image('level9popupper', 'assets/level9/popupper.png')

        for (i = 2; i >= 1; i--) {
            this.load.spritesheet('level9pop' + i, 'assets/level9/pop1.png', {
                frameWidth: 92,
                frameHeight: 98
            });
        }
        for (i = 5; i >= 3; i--) {
            this.load.spritesheet('level9pop' + i, 'assets/level9/pop2.png', {
                frameWidth: 92,
                frameHeight: 98
            });
        }
        for (i = 9; i >= 6; i--) {
            this.load.spritesheet('level9pop' + i, 'assets/level9/pop3.png', {
                frameWidth: 92,
                frameHeight: 98
            });
        }
        for (i = 13; i >= 10; i--) {
            this.load.spritesheet('level9pop' + i, 'assets/level9/pop4.png', {
                frameWidth: 92,
                frameHeight: 98
            });
        }
        for (i = 16; i >= 14; i--) {
            this.load.spritesheet('level9pop' + i, 'assets/level9/pop5.png', {
                frameWidth: 92,
                frameHeight: 98
            });
        }
        for (i = 18; i >= 17; i--) {
            this.load.spritesheet('level9pop' + i, 'assets/level9/pop6.png', {
                frameWidth: 92,
                frameHeight: 98
            });
        }
        //level10
        this.load.image('level10popbase', 'assets/level10/popbase.png')
        this.load.image('level10popupper', 'assets/level10/popupper.png')

        for (i = 1; i >= 1; i--) {
            this.load.spritesheet('level10pop' + i, 'assets/level10/pop1.png', {
                frameWidth: 76,
                frameHeight: 80
            });
        }
        for (i = 6; i >= 2; i--) {
            this.load.spritesheet('level10pop' + i, 'assets/level10/pop2.png', {
                frameWidth: 76,
                frameHeight: 80
            });
        }
        for (i = 12; i >= 7; i--) {
            this.load.spritesheet('level10pop' + i, 'assets/level10/pop3.png', {
                frameWidth: 76,
                frameHeight: 80
            });
        }
        for (i = 17; i >= 13; i--) {
            this.load.spritesheet('level10pop' + i, 'assets/level10/pop4.png', {
                frameWidth: 76,
                frameHeight: 80
            });
        }
        for (i = 21; i >= 18; i--) {
            this.load.spritesheet('level10pop' + i, 'assets/level10/pop5.png', {
                frameWidth: 76,
                frameHeight: 80
            });
        }
        for (i = 24; i >= 22; i--) {
            this.load.spritesheet('level10pop' + i, 'assets/level10/pop6.png', {
                frameWidth: 76,
                frameHeight: 80
            });
        }
        for (i = 26; i >= 25; i--) {
            this.load.spritesheet('level10pop' + i, 'assets/level10/pop7.png', {
                frameWidth: 76,
                frameHeight: 80
            });
        }
        //level11
        this.load.image('level11popbase', 'assets/level11/popbase.png')
        this.load.image('level11popupper', 'assets/level11/popupper.png')

        for (i = 5; i >= 1; i--) {
            this.load.spritesheet('level11pop' + i, 'assets/level11/pop1.png', {
                frameWidth: 82,
                frameHeight: 83
            });
        }
        for (i = 11; i >= 6; i--) {
            this.load.spritesheet('level11pop' + i, 'assets/level11/pop2.png', {
                frameWidth: 82,
                frameHeight: 83
            });
        }
        for (i = 17; i >= 12; i--) {
            this.load.spritesheet('level11pop' + i, 'assets/level11/pop3.png', {
                frameWidth: 82,
                frameHeight: 83
            });
        }
        for (i = 22; i >= 18; i--) {
            this.load.spritesheet('level11pop' + i, 'assets/level11/pop4.png', {
                frameWidth: 82,
                frameHeight: 83
            });
        }
        for (i = 26; i >= 23; i--) {
            this.load.spritesheet('level11pop' + i, 'assets/level11/pop5.png', {
                frameWidth: 82,
                frameHeight: 83
            });
        }

        //level12
        this.load.image('level12popbase', 'assets/level12/popbase.png')
        this.load.image('level12popupper', 'assets/level12/popupper.png')

        for (i = 5; i >= 1; i--) {
            this.load.spritesheet('level12pop' + i, 'assets/level12/pop1.png', {
                frameWidth: 68,
                frameHeight: 68
            });
        }
        for (i = 12; i >= 6; i--) {
            this.load.spritesheet('level12pop' + i, 'assets/level12/pop2.png', {
                frameWidth: 68,
                frameHeight: 68
            });
        }
        for (i = 19; i >= 13; i--) {
            this.load.spritesheet('level12pop' + i, 'assets/level12/pop3.png', {
                frameWidth: 68,
                frameHeight: 68
            });
        }
        for (i = 25; i >= 20; i--) {
            this.load.spritesheet('level12pop' + i, 'assets/level12/pop4.png', {
                frameWidth: 68,
                frameHeight: 68
            });
        }
        for (i = 30; i >= 26; i--) {
            this.load.spritesheet('level12pop' + i, 'assets/level12/pop5.png', {
                frameWidth: 68,
                frameHeight: 68
            });
        }
        for (i = 33; i >= 31; i--) {
            this.load.spritesheet('level12pop' + i, 'assets/level12/pop6.png', {
                frameWidth: 68,
                frameHeight: 68
            });
        }
        //level13
        this.load.image('level13popbase', 'assets/level13/popbase.png')
        this.load.image('level13popupper', 'assets/level13/popupper.png')

        for (i = 1; i >= 1; i--) {
            this.load.spritesheet('level13pop' + i, 'assets/level13/pop1.png', {
                frameWidth: 59,
                frameHeight: 56
            });
        }
        for (i = 5; i >= 2; i--) {
            this.load.spritesheet('level13pop' + i, 'assets/level13/pop2.png', {
                frameWidth: 59,
                frameHeight: 56
            });
        }
        for (i = 10; i >= 6; i--) {
            this.load.spritesheet('level13pop' + i, 'assets/level13/pop3.png', {
                frameWidth: 59,
                frameHeight: 56
            });
        }
        for (i = 16; i >= 11; i--) {
            this.load.spritesheet('level13pop' + i, 'assets/level13/pop4.png', {
                frameWidth: 59,
                frameHeight: 56
            });
        }
        for (i = 24; i >= 17; i--) {
            this.load.spritesheet('level13pop' + i, 'assets/level13/pop5.png', {
                frameWidth: 59,
                frameHeight: 56
            });
        }
        for (i = 26; i >= 25; i--) {
            this.load.spritesheet('level13pop' + i, 'assets/level13/pop6.png', {
                frameWidth: 59,
                frameHeight: 56
            });
        }

        //level14
        this.load.image('level14popbase', 'assets/level14/popbase.png')
        this.load.image('level14popupper', 'assets/level14/popupper.png')

        for (i = 6; i >= 1; i--) {
            this.load.spritesheet('level14pop' + i, 'assets/level14/pop1.png', {
                frameWidth: 66,
                frameHeight: 69
            });
        }
        for (i = 12; i >= 7; i--) {
            this.load.spritesheet('level14pop' + i, 'assets/level14/pop2.png', {
                frameWidth: 66,
                frameHeight: 69
            });
        }
        for (i = 20; i >= 13; i--) {
            this.load.spritesheet('level14pop' + i, 'assets/level14/pop3.png', {
                frameWidth: 66,
                frameHeight: 69
            });
        }
        for (i = 28; i >= 21; i--) {
            this.load.spritesheet('level14pop' + i, 'assets/level14/pop4.png', {
                frameWidth: 66,
                frameHeight: 69
            });
        }
        //level15
        this.load.image('level15popbase', 'assets/level15/popbase.png')
        this.load.image('level15popupper', 'assets/level15/popupper.png')

        for (i = 9; i >= 1; i--) {
            this.load.spritesheet('level15pop' + i, 'assets/level15/pop1.png', {
                frameWidth: 70,
                frameHeight: 71
            });
        }
        for (i = 18; i >= 10; i--) {
            this.load.spritesheet('level15pop' + i, 'assets/level15/pop2.png', {
                frameWidth: 70,
                frameHeight: 71
            });
        }
        for (i = 25; i >= 19; i--) {
            this.load.spritesheet('level15pop' + i, 'assets/level15/pop3.png', {
                frameWidth: 70,
                frameHeight: 71
            });
        }
        for (i = 32; i >= 26; i--) {
            this.load.spritesheet('level15pop' + i, 'assets/level15/pop4.png', {
                frameWidth: 70,
                frameHeight: 71
            });
        }

        //level16
        this.load.image('level16popbase', 'assets/level16/popbase.png')
        this.load.image('level16popupper', 'assets/level16/popupper.png')

        for (i = 4; i >= 1; i--) {
            this.load.spritesheet('level16pop' + i, 'assets/level16/pop1.png', {
                frameWidth: 72,
                frameHeight: 75
            });
        }
        for (i = 12; i >= 5; i--) {
            this.load.spritesheet('level16pop' + i, 'assets/level16/pop2.png', {
                frameWidth: 72,
                frameHeight: 75
            });
        }
        for (i = 23; i >= 13; i--) {
            this.load.spritesheet('level16pop' + i, 'assets/level16/pop3.png', {
                frameWidth: 72,
                frameHeight: 75
            });
        }
        for (i = 25; i >= 24; i--) {
            this.load.spritesheet('level16pop' + i, 'assets/level16/pop4.png', {
                frameWidth: 72,
                frameHeight: 75
            });
        }
        //level17
        this.load.image('level17popbase', 'assets/level17/popbase.png')
        this.load.image('level17popupper', 'assets/level17/popupper.png')

        for (i = 7; i >= 1; i--) {
            this.load.spritesheet('level17pop' + i, 'assets/level17/pop1.png', {
                frameWidth: 83,
                frameHeight: 81
            });
        }
        for (i = 13; i >= 8; i--) {
            this.load.spritesheet('level17pop' + i, 'assets/level17/pop2.png', {
                frameWidth: 83,
                frameHeight: 81
            });
        }
        for (i = 19; i >= 14; i--) {
            this.load.spritesheet('level17pop' + i, 'assets/level17/pop3.png', {
                frameWidth: 83,
                frameHeight: 81
            });
        }
        for (i = 25; i >= 20; i--) {
            this.load.spritesheet('level17pop' + i, 'assets/level17/pop4.png', {
                frameWidth: 83,
                frameHeight: 81
            });
        }
        for (i = 29; i >= 26; i--) {
            this.load.spritesheet('level17pop' + i, 'assets/level17/pop5.png', {
                frameWidth: 83,
                frameHeight: 81
            });
        }

        //level18
        this.load.image('level18popbase', 'assets/level18/popbase.png')
        this.load.image('level18popupper', 'assets/level18/popupper.png')

        for (i = 8; i >= 1; i--) {
            this.load.spritesheet('level18pop' + i, 'assets/level18/pop1.png', {
                frameWidth: 64,
                frameHeight: 62
            });
        }
        for (i = 16; i >= 9; i--) {
            this.load.spritesheet('level18pop' + i, 'assets/level18/pop2.png', {
                frameWidth: 64,
                frameHeight: 62
            });
        }
        for (i = 23; i >= 17; i--) {
            this.load.spritesheet('level18pop' + i, 'assets/level18/pop3.png', {
                frameWidth: 64,
                frameHeight: 62
            });
        }
        for (i = 30; i >= 24; i--) {
            this.load.spritesheet('level18pop' + i, 'assets/level18/pop4.png', {
                frameWidth: 64,
                frameHeight: 62
            });
        }

        //level19
        this.load.image('level19popbase', 'assets/level19/popbase.png')
        this.load.image('level19popupper', 'assets/level19/popupper.png')

        for (i = 27; i >= 1; i--) {
            this.load.spritesheet('level19pop' + i, 'assets/level19/pop1.png', {
                frameWidth: 78,
                frameHeight: 81
            });
        }
        //level20
        this.load.image('level20popbase', 'assets/level20/popbase.png')
        this.load.image('level20popupper', 'assets/level20/popupper.png')

        for (i = 12; i >= 1; i--) {
            this.load.spritesheet('level20pop' + i, 'assets/level20/pop1.png', {
                frameWidth: 69,
                frameHeight: 67
            });
        }
        for (i = 21; i >= 13; i--) {
            this.load.spritesheet('level20pop' + i, 'assets/level20/pop2.png', {
                frameWidth: 69,
                frameHeight: 67
            });
        }
        for (i = 26; i >= 22; i--) {
            this.load.spritesheet('level20pop' + i, 'assets/level20/pop3.png', {
                frameWidth: 69,
                frameHeight: 67
            });
        }
        for (i = 29; i >= 27; i--) {
            this.load.spritesheet('level20pop' + i, 'assets/level20/pop4.png', {
                frameWidth: 69,
                frameHeight: 67
            });
        }
        for (i = 47; i >= 30; i--) {
            this.load.spritesheet('level20pop' + i, 'assets/level20/pop5.png', {
                frameWidth: 47,
                frameHeight: 49
            });
        }
        //level21
        this.load.image('level21popbase', 'assets/level21/popbase.png')
        this.load.image('level21popupper', 'assets/level21/popupper.png')

        for (i = 13; i >= 1; i--) {
            this.load.spritesheet('level21pop' + i, 'assets/level21/pop1.png', {
                frameWidth: 74,
                frameHeight: 73
            });
        }
        for (i = 17; i >= 14; i--) {
            this.load.spritesheet('level21pop' + i, 'assets/level21/pop2.png', {
                frameWidth: 74,
                frameHeight: 73
            });
        }
        for (i = 21; i >= 18; i--) {
            this.load.spritesheet('level21pop' + i, 'assets/level21/pop3.png', {
                frameWidth: 74,
                frameHeight: 73
            });
        }
        for (i = 25; i >= 22; i--) {
            this.load.spritesheet('level21pop' + i, 'assets/level21/pop4.png', {
                frameWidth: 74,
                frameHeight: 73
            });
        }
        for (i = 29; i >= 26; i--) {
            this.load.spritesheet('level21pop' + i, 'assets/level21/pop5.png', {
                frameWidth: 74,
                frameHeight: 73
            });
        }
        //level22
        this.load.image('level22popbase', 'assets/level22/popbase.png')
        this.load.image('level22popupper', 'assets/level22/popupper.png')

        for (i = 5; i >= 1; i--) {
            this.load.spritesheet('level22pop' + i, 'assets/level22/pop1.png', {
                frameWidth: 68,
                frameHeight: 69
            });
        }
        for (i = 10; i >= 6; i--) {
            this.load.spritesheet('level22pop' + i, 'assets/level22/pop2.png', {
                frameWidth: 68,
                frameHeight: 69
            });
        }
        for (i = 17; i >= 11; i--) {
            this.load.spritesheet('level22pop' + i, 'assets/level22/pop3.png', {
                frameWidth: 68,
                frameHeight: 69
            });
        }
        for (i = 20; i >= 18; i--) {
            this.load.spritesheet('level22pop' + i, 'assets/level22/pop4.png', {
                frameWidth: 68,
                frameHeight: 69
            });
        }
        for (i = 24; i >= 21; i--) {
            this.load.spritesheet('level22pop' + i, 'assets/level22/pop5.png', {
                frameWidth: 68,
                frameHeight: 69
            });
        }
        for (i = 29; i >= 25; i--) {
            this.load.spritesheet('level22pop' + i, 'assets/level22/pop6.png', {
                frameWidth: 68,
                frameHeight: 69
            });
        }
        //level23
        this.load.image('level23popbase', 'assets/level23/popbase.png')
        this.load.image('level23popupper', 'assets/level23/popupper.png')

        for (i = 18; i >= 1; i--) {
            this.load.spritesheet('level23pop' + i, 'assets/level23/pop1.png', {
                frameWidth: 73,
                frameHeight: 73
            });
        }
        for (i = 24; i >= 19; i--) {
            this.load.spritesheet('level23pop' + i, 'assets/level23/pop2.png', {
                frameWidth: 73,
                frameHeight: 73
            });
        }

        //level24
        this.load.image('level24popbase', 'assets/level24/popbase.png')
        this.load.image('level24popupper', 'assets/level24/popupper.png')

        for (i = 4; i >= 1; i--) {
            this.load.spritesheet('level24pop' + i, 'assets/level24/pop1.png', {
                frameWidth: 93,
                frameHeight: 92
            });
        }
        for (i = 8; i >= 5; i--) {
            this.load.spritesheet('level24pop' + i, 'assets/level24/pop2.png', {
                frameWidth: 93,
                frameHeight: 92
            });
        }
        for (i = 12; i >= 9; i--) {
            this.load.spritesheet('level24pop' + i, 'assets/level24/pop3.png', {
                frameWidth: 93,
                frameHeight: 92
            });
        }
        for (i = 15; i >= 13; i--) {
            this.load.spritesheet('level24pop' + i, 'assets/level24/pop4.png', {
                frameWidth: 93,
                frameHeight: 92
            });
        }
        for (i = 20; i >= 16; i--) {
            this.load.spritesheet('level24pop' + i, 'assets/level24/pop5.png', {
                frameWidth: 93,
                frameHeight: 92
            });
        }
        for (i = 23; i >= 21; i--) {
            this.load.spritesheet('level24pop' + i, 'assets/level24/pop6.png', {
                frameWidth: 93,
                frameHeight: 92
            });
        }
        //level25
        this.load.image('level25popbase', 'assets/level25/popbase.png')
        this.load.image('level25popupper', 'assets/level25/popupper.png')

        for (i = 27; i >= 1; i--) {
            this.load.spritesheet('level25pop' + i, 'assets/level25/pop1.png', {
                frameWidth: 81,
                frameHeight: 81
            });
        }
        //level26
        this.load.image('level26popbase', 'assets/level26/popbase.png')
        this.load.image('level26popupper', 'assets/level26/popupper.png')

        for (i = 4; i >= 1; i--) {
            this.load.spritesheet('level26pop' + i, 'assets/level26/pop1.png', {
                frameWidth: 53,
                frameHeight: 54
            });
        }
        for (i = 10; i >= 5; i--) {
            this.load.spritesheet('level26pop' + i, 'assets/level26/pop2.png', {
                frameWidth: 53,
                frameHeight: 54
            });
        }
        for (i = 18; i >= 11; i--) {
            this.load.spritesheet('level26pop' + i, 'assets/level26/pop3.png', {
                frameWidth: 53,
                frameHeight: 54
            });
        }
        for (i = 24; i >= 19; i--) {
            this.load.spritesheet('level26pop' + i, 'assets/level26/pop4.png', {
                frameWidth: 53,
                frameHeight: 54
            });
        }
        for (i = 30; i >= 25; i--) {
            this.load.spritesheet('level26pop' + i, 'assets/level26/pop5.png', {
                frameWidth: 53,
                frameHeight: 54
            });
        }
        for (i = 34; i >= 31; i--) {
            this.load.spritesheet('level26pop' + i, 'assets/level26/pop6.png', {
                frameWidth: 53,
                frameHeight: 54
            });
        }
        //level27
        this.load.image('level27popbase', 'assets/level27/popbase.png')
        this.load.image('level27popupper', 'assets/level27/popupper.png')

        for (i = 4; i >= 1; i--) {
            this.load.spritesheet('level27pop' + i, 'assets/level27/pop1.png', {
                frameWidth: 65,
                frameHeight: 64
            });
        }
        for (i = 10; i >= 5; i--) {
            this.load.spritesheet('level27pop' + i, 'assets/level27/pop2.png', {
                frameWidth: 65,
                frameHeight: 64
            });
        }
        for (i = 14; i >= 11; i--) {
            this.load.spritesheet('level27pop' + i, 'assets/level27/pop3.png', {
                frameWidth: 65,
                frameHeight: 64
            });
        }
        for (i = 18; i >= 15; i--) {
            this.load.spritesheet('level27pop' + i, 'assets/level27/pop4.png', {
                frameWidth: 65,
                frameHeight: 64
            });
        }
        for (i = 21; i >= 19; i--) {
            this.load.spritesheet('level27pop' + i, 'assets/level27/pop5.png', {
                frameWidth: 65,
                frameHeight: 64
            });
        }
        for (i = 23; i >= 22; i--) {
            this.load.spritesheet('level27pop' + i, 'assets/level27/pop6.png', {
                frameWidth: 65,
                frameHeight: 64
            });
        }

        //level28
        this.load.image('level28popbase', 'assets/level28/popbase.png')
        this.load.image('level28popupper', 'assets/level28/popupper.png')

        for (i = 4; i >= 1; i--) {
            this.load.spritesheet('level28pop' + i, 'assets/level28/pop1.png', {
                frameWidth: 76,
                frameHeight: 80
            });
        }
        for (i = 6; i >= 5; i--) {
            this.load.spritesheet('level28pop' + i, 'assets/level28/pop2.png', {
                frameWidth: 76,
                frameHeight: 80
            });
        }
        for (i = 8; i >= 7; i--) {
            this.load.spritesheet('level28pop' + i, 'assets/level28/pop3.png', {
                frameWidth: 76,
                frameHeight: 80
            });
        }
        for (i = 10; i >= 9; i--) {
            this.load.spritesheet('level28pop' + i, 'assets/level28/pop4.png', {
                frameWidth: 76,
                frameHeight: 80
            });
        }
        for (i = 16; i >= 11; i--) {
            this.load.spritesheet('level28pop' + i, 'assets/level28/pop5.png', {
                frameWidth: 76,
                frameHeight: 80
            });
        }

        //level29
        this.load.image('level29popbase', 'assets/level29/popbase.png')
        this.load.image('level29popupper', 'assets/level29/popupper.png')

        for (i = 2; i >= 1; i--) {
            this.load.spritesheet('level29pop' + i, 'assets/level29/pop1.png', {
                frameWidth: 73,
                frameHeight: 73
            });
        }
        for (i = 8; i >= 3; i--) {
            this.load.spritesheet('level29pop' + i, 'assets/level29/pop2.png', {
                frameWidth: 73,
                frameHeight: 73
            });
        }
        for (i = 14; i >= 9; i--) {
            this.load.spritesheet('level29pop' + i, 'assets/level29/pop3.png', {
                frameWidth: 73,
                frameHeight: 73
            });
        }
        for (i = 22; i >= 15; i--) {
            this.load.spritesheet('level29pop' + i, 'assets/level29/pop4.png', {
                frameWidth: 73,
                frameHeight: 73
            });
        }
        for (i = 29; i >= 23; i--) {
            this.load.spritesheet('level29pop' + i, 'assets/level29/pop5.png', {
                frameWidth: 73,
                frameHeight: 73
            });
        }
        for (i = 34; i >= 30; i--) {
            this.load.spritesheet('level29pop' + i, 'assets/level29/pop6.png', {
                frameWidth: 73,
                frameHeight: 73
            });
        }
        //level30
        this.load.image('level30popbase', 'assets/level30/popbase.png')
        this.load.image('level30popupper', 'assets/level30/popupper.png')

        for (i = 2; i >= 1; i--) {
            this.load.spritesheet('level30pop' + i, 'assets/level30/pop1.png', {
                frameWidth: 71,
                frameHeight: 75
            });
        }
        for (i = 5; i >= 3; i--) {
            this.load.spritesheet('level30pop' + i, 'assets/level30/pop2.png', {
                frameWidth: 71,
                frameHeight: 75
            });
        }
        for (i = 10; i >= 6; i--) {
            this.load.spritesheet('level30pop' + i, 'assets/level30/pop3.png', {
                frameWidth: 71,
                frameHeight: 75
            });
        }
        for (i = 16; i >= 11; i--) {
            this.load.spritesheet('level30pop' + i, 'assets/level30/pop4.png', {
                frameWidth: 80,
                frameHeight: 82
            });
        }
        for (i = 19; i >= 17; i--) {
            this.load.spritesheet('level30pop' + i, 'assets/level30/pop5.png', {
                frameWidth: 80,
                frameHeight: 82
            });
        }
        for (i = 21; i >= 20; i--) {
            this.load.spritesheet('level30pop' + i, 'assets/level30/pop6.png', {
                frameWidth: 80,
                frameHeight: 82
            });
        }


        this.load.start();
    }
});









var config = {
    type: Phaser.AUTO,
    width: 480,
    height: 854,
    backgroundColor: '#000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 480,
        height: 854,
    },
    parent: 'theGame',
    scene: [bootstate, initialloader, titlescreen, level1, level2, level3, level4, level5, level6, level7, level8, level9, level10, level11, level12, level13, level14, level15, level16, level17, level18, level19, level20, level21, level22, level23, level24, level25, level26, level27, level28, level29, level30],
}
var game = new Phaser.Game(config)
