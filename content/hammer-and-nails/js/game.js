var Phaser;
var level;
var pageNo = 0;
var firstTime = true;
var bgmusic;
var isMuted = false;
var isMuted1 = false;
var i = 0;
var sno = 0;
var level;
var loadFinish = false
var soundMuted = false
var gameName = 'hammer-and-nail';

var soundcheck = false
var soundstart = 0
var soundcheck1 = true
function pauseGame() {
    soundstart = 1
    game.scene.scenes[pageNo].scene.pause()
    if (soundcheck) {
        soundstart = 1
        if (!isMuted) {
            music.pause()
        }
        if (!isMuted1) {
            soundcheck1 = isMuted1
            isMuted1 = true
            clicksound.pause()
        }
    }
}
function resumeGame() {
    soundstart = 0
    game.scene.scenes[pageNo].scene.resume()
    if (soundcheck) {
        soundstart = 0
        if (!isMuted) {
            music.resume()
        } else {
            music.pause()
        }
        if (!soundcheck1) {
            soundcheck1 = true
            isMuted1 = false
            if (!isMuted1) {
                clicksound.resume()
            } else {
                clicksound.pause()
            }
        }
    }
}


WebFontConfig = {
    google: {
        families: ["Nunito:ExtraBold"]
    }
};
(function () {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

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
        loadFile()
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
var baseScale = 1;
var speed = 0.01;
var magnitude = 0.05;
var barvalue = [0]
function saveFile() {
    var file = {
        level: level,
    };
    localStorage.setItem('hammer-and-nail', JSON.stringify(file));
};
var file;
var level;
function loadFile() {
    file = JSON.parse(localStorage.getItem('hammer-and-nail'));
    if (file == null) {
        level = 1;
    } else {
        level = parseInt(file.level);
    }
};
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
        loaderbarbg = this.add.image(281, 488.5, 'loaderbarbg').setOrigin(0.5, 0.5)
        Logo_animation = this.add.image(279.5, 356, 'loadlogo');
        lpbar1 = this.add.sprite(-55, 488.5, 'lpbar').setOrigin(0.5, 0.5)
        loadermask = this.add.sprite(281.5, 488.5, 'loadermask').setOrigin(0.5, 0.5).setVisible(false);
        mask = loadermask.createBitmapMask();
        mask.alpha = 1
        lpbar1.setMask(mask);

        loadtext = this.add.sprite(281.5, 562, 'loadtext').setOrigin(0.5, 0.5)
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
            lpbar1.x = -100 + parseInt(parseFloat(value / 1) * 380);
        });
        loaderplay = this.add.image(280, 509, 'loaderplay').setOrigin(0.5, 0.5).setInteractive({
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
        this.load.audio('setclick', ['assets/audio/setclick.mp3', 'assets/audio/setclick.ogg']);
        this.load.audio('hammer', ['assets/audio/hammer.mp3', 'assets/audio/hammer.ogg']);
        this.load.audio('hammer2', ['assets/audio/hammer2.mp3', 'assets/audio/hammer2.ogg']);
        this.load.audio('hammer3', ['assets/audio/hammer3.mp3', 'assets/audio/hammer3.ogg']);
        this.load.audio('crowdwin', ['assets/audio/crowdwin.mp3', 'assets/audio/crowdwin.ogg']);
        this.load.audio('crowdlose', ['assets/audio/crowdlose.mp3', 'assets/audio/crowdlose.ogg']);
        this.load.audio('explode', ['assets/audio/explode.mp3', 'assets/audio/explode.ogg']);
        //button
        this.load.image('play', 'assets/buttons/play.png');
        this.load.image('moregames2', 'assets/buttons/moregames.png');
        this.load.image('settings', 'assets/buttons/settings.png');
        this.load.image('settingpanel', 'assets/setting/settingpanel.png')
        this.load.image('settingbackground', 'assets/setting/background.png')
        this.load.spritesheet('clickmute', 'assets/setting/clickmute.png', {
            frameWidth: 90,
            frameHeight: 51
        });
        this.load.spritesheet('soundmute', 'assets/setting/soundmute.png', {
            frameWidth: 90,
            frameHeight: 51
        });
        this.load.image('btnclick1', 'assets/setting/btnclick1.png')
        this.load.image('btnclick2', 'assets/setting/btnclick2.png')
        this.load.image('closebtn', 'assets/setting/closebtn.png')
        //titlescreen
        this.load.image('titlebackground', 'assets/titlescreen/background.png')
        this.load.image('transbackground', 'assets/titlescreen/transbackground.png')
        this.load.image('glitter', 'assets/titlescreen/glitter.png')
        this.load.image('wood', 'assets/titlescreen/wood.png')
        this.load.image('shadow2', 'assets/titlescreen/shadow2.png')
        this.load.image('title1', 'assets/titlescreen/title1.png')
        this.load.image('title2', 'assets/titlescreen/title2.png')
        this.load.image('title3', 'assets/titlescreen/title3.png')
        this.load.image('obj1', 'assets/titlescreen/obj1.png')
        this.load.image('obj2', 'assets/titlescreen/obj2.png')
        this.load.image('obj3', 'assets/titlescreen/obj3.png')
        this.load.image('mwood', 'assets/titlescreen/mwood.png')
        this.load.spritesheet('rmhammer', 'assets/titlescreen/rmhammer.png', {
            frameWidth: 56,
            frameHeight: 203
        });
        this.load.spritesheet('lmhammer', 'assets/titlescreen/lmhammer.png', {
            frameWidth: 64,
            frameHeight: 205
        });
        this.load.spritesheet('smhammer', 'assets/titlescreen/smhammer.png', {
            frameWidth: 54,
            frameHeight: 210
        });
        this.load.spritesheet('mbomb', 'assets/titlescreen/mbomb.png', {
            frameWidth: 63,
            frameHeight: 63
        });
        this.load.spritesheet('mnail', 'assets/titlescreen/mnail.png', {
            frameWidth: 37,
            frameHeight: 54
        });
        this.load.image('levelselectbackground', 'assets/levelselect/background.png')
        this.load.image('arrow1', 'assets/levelselect/arrow1.png')
        this.load.image('arrow2', 'assets/levelselect/arrow2.png')
        this.load.spritesheet('page', 'assets/levelselect/page.png', {
            frameWidth: 55,
            frameHeight: 30
        });
        for (i = 1; i <= 30; i++) {
            this.load.spritesheet('levelbtn' + i, 'assets/levelselect/levelbtn.png', {
                frameWidth: 130,
                frameHeight: 136
            });
            this.load.spritesheet('levelno' + i, 'assets/levelselect/levelno.png', {
                frameWidth: 59,
                frameHeight: 60
            });
        }
        //level1
        this.load.image('level1background', 'assets/level1/background.png')
        this.load.image('level1wood', 'assets/level1/wood.png')
        this.load.image('level1home', 'assets/buttons/home.png')
        this.load.image('level1arrow', 'assets/level1/arrow.png')
        this.load.image('level1lpbg', 'assets/level1/lpbg.png')
        this.load.image('level1lpmask1', 'assets/level1/lpmask1.png')
        this.load.image('level1lpmask2', 'assets/level1/lpmask2.png')
        this.load.image('level1lpmask3', 'assets/level1/lpmask3.png')
        this.load.image('level1lpmask4', 'assets/level1/lpmask4.png')
        this.load.image('level1stresstxt', 'assets/level1/stresstxt.png')
        this.load.spritesheet('locks', 'assets/level1/locks.png', {
            frameWidth: 128,
            frameHeight: 136
        });
        this.load.spritesheet('emoji', 'assets/level1/emojis.png', {
            frameWidth: 84,
            frameHeight: 82
        });
        this.load.image('ball', 'assets/level1/snow.png')
        this.load.image('finishboard', 'assets/level1/finishboard.png')
        this.load.image('failedpanel', 'assets/level1/failedbd.png')
        this.load.image('homebtn', 'assets/level1/homebtn.png')
        this.load.image('replaybtn', 'assets/level1/replaybtn.png')
        this.load.image('nextbtn', 'assets/level1/nextbtn.png')
        this.load.image('blackscreen', 'assets/level1/blackscreen.png')
        this.load.spritesheet('level1blast', 'assets/level1/blast.png', {
            frameWidth: 189,
            frameHeight: 193
        });
        for (i = 50; i >= 1; i--) {
            this.load.spritesheet('level1nail' + i, 'assets/level1/nail.png', {
                frameWidth: 83,
                frameHeight: 120
            });
        }
        this.load.spritesheet('bomb', 'assets/level1/bomb.png', {
            frameWidth: 105,
            frameHeight: 110
        });
        this.load.image('explode', 'assets/level1/explode.png')
        this.load.spritesheet('rhammer', 'assets/level1/rhammer.png', {
            frameWidth: 144,
            frameHeight: 520
        });
        this.load.spritesheet('lhammer', 'assets/level1/lhammer.png', {
            frameWidth: 137,
            frameHeight: 522
        });
        this.load.spritesheet('shammer', 'assets/level1/shammer.png', {
            frameWidth: 101,
            frameHeight: 520
        });
        this.load.start();
    },
    update: function () {
        loaderplay.setScale(
            baseScale + magnitude * Math.sin(this.time.now * speed),
            baseScale + magnitude * Math.cos(this.time.now * speed)
        );
    }
});
var config = {
    type: Phaser.AUTO,
    width: 560,
    height: 854,
    backgroundColor: '#000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 560,
        height: 854,
    },
    parent: 'theGame',
    scene: [bootstate, initialloader, titlescreen, levelselect, level1, level2, level3, level4, level5, level6, level7, level8, level9, level10, level11, level12, level13, level14, level15, level16, level17, level18, level19, level20, level21, level22, level23, level24, level25, level26, level27, level28, level29, level30],
}
var game = new Phaser.Game(config)