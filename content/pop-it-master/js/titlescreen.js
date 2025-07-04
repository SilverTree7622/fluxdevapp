var startgame2 = false
var soundstart = 0
var level = 1
var animate = 0
var count = 0
var completelevel = false
var titlescreen = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function titlescreen() {
        Phaser.Scene.call(this, {
            key: 'titlescreen'
        });
    },
    preload: function () {
        pageNo = 2
        loadFinish = false
        startgame2 = false
        level = 1
        animate = 0
        count = 0
        completelevel = false
        soundstart = 0
    },
    create: function () {
        window['UtilPlatform'].sendMsg2Parent('ShowNavFooterPlay');
        titlebackground = this.add.sprite(0, 0, 'titlebackground').setOrigin(0, 0)
        shadow1 = this.add.sprite(245, 264.5, 'shadow1').setOrigin(0.5, 0.5)
        titlebg = this.add.sprite(245, 250, 'titlebg').setOrigin(0.5, 0.5)
        shadow2 = this.add.sprite(245, 260, 'shadow2').setOrigin(0.5, 0.5)
        title1 = this.add.sprite(230.5, 121, 'title1').setOrigin(0.5, 0.5)
        title2 = this.add.sprite(216, 270, 'title2').setOrigin(0.5, 0.5)
        title3 = this.add.sprite(245.5, 403.5, 'title3').setOrigin(0.5, 0.5)
        titlegrp = this.add.container()
        titlegrp.add(shadow1)
        titlegrp.add(titlebg)
        titlegrp.add(shadow2)
        titlegrp.add(title1)
        titlegrp.add(title3)
        titlegrp.add(title2)
        titlegrp.y = 60
        shadow1.alpha = 0
        shadow2.alpha = 0
        title1.alpha = 0
        title3.alpha = 0
        titlebg.setScale(0)
        title2.setScale(0)
        game.scene.scenes[pageNo].tweens.add({
            targets: titlebg,
            scale: 1,
            ease: 'Linear',
            duration: 300,
            onComplete: titletransition1,
            callbackScope: this
        });

        function titletransition1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: title1,
                y: title1.y + 100,
                alpha: 1,
                ease: 'Linear',
                duration: 300,
                onComplete: titletransition2,
                callbackScope: this
            });
        }

        function titletransition2() {
            game.scene.scenes[pageNo].tweens.add({
                targets: title3,
                y: title3.y - 100,
                alpha: 1,
                ease: 'Linear',
                duration: 300,
                onComplete: titletransition3,
                callbackScope: this
            });
        }

        function titletransition3() {
            game.scene.scenes[pageNo].tweens.add({
                targets: title2,
                scale: 1,
                ease: 'Linear',
                duration: 300,
                onComplete: titletransition4,
                callbackScope: this
            });
        }

        function titletransition4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: shadow1,
                alpha: 1,
                ease: 'Linear',
                duration: 300,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: shadow2,
                alpha: 1,
                ease: 'Linear',
                duration: 300,
                onComplete: titletransition5,
                callbackScope: this
            });
        }

        function titletransition5() {
            game.scene.scenes[pageNo].tweens.add({
                targets: title1,
                scale: 0.95,
                ease: 'Linear',
                duration: 300,
                yoyo: true,
                repeat: -1
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: title2,
                angle: 7,
                ease: 'Linear',
                duration: 300,
                yoyo: true,
                repeat: -1
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: title3,
                scale: 1.05,
                ease: 'Linear',
                duration: 300,
                yoyo: true,
                repeat: -1
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: moregames2,
                y: moregames2.y - 300,
                ease: 'Back',
                duration: 300,
                onComplete: titletransition6,
                callbackScope: this
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: play,
                y: play.y - 300,
                ease: 'Back',
                duration: 300,
                delay: 400
            });
        }

        function titletransition6() {
            game.scene.scenes[pageNo].tweens.add({
                targets: moregames2,
                scale: 1.05,
                ease: 'Linear',
                duration: 300,
                yoyo: true,
                repeat: -1
            });
        }
        play = this.add.sprite(336, 953.5, 'play').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        moregames2 = this.add.sprite(141, 953.5, 'moregames2').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        this.load.on('complete', function () {
            loadFinish = true;
        });
        logomutefun()
        this.load.start();
        if (firstTime) {
            firstTime = false;
            music = this.sound.add('boden');
            music.play({
                loop: true
            });
            titlescreenstart()
        } else {
            soundmute.setFrame(0)
            clickmute.setFrame(0)
            if (isMuted) {
                isMuted = false;
                music.resume();
            }
            if (isMuted1) {
                isMuted1 = false;
            }
            transitionOut()
        }
    }
});

function titlescreenstart() {
    play.on('pointerover', playoverstart)
    play.on('pointerout', playoutstart)
    play.on('pointerdown', playdownstart)
    play.on('pointerup', playupstart)

    function playoverstart() {
        this.setScale(1.05)
    }

    function playoutstart() {
        this.setScale(1)
    }

    function playdownstart() {
        if (!startgame2 && loadFinish) {
            window['UtilPlatform'].sendMsg2Parent('HideNavFooterPlay');
            startgame2 = true
            playsoundeffects('itemclick')
            this.setScale(1)
            game.scene.scenes[pageNo].scene.stop('titlescreen')
            game.scene.run('level1');
        }
    }

    function playupstart() {}
    moregames2.on('pointerover', moregames2overstart)
    moregames2.on('pointerout', moregames2outstart)
    moregames2.on('pointerdown', moregames2downstart)
    moregames2.on('pointerup', moregames2upstart)
}

function moregames2overstart() {
    this.setScale(1.05)
}

function moregames2outstart() {
    this.setScale(1)
}

function moregames2downstart() {
    playsoundeffects('itemclick')
    this.setScale(1)
}

function moregames2upstart() {}

function logomutefun() {
    clickmute = game.scene.scenes[pageNo].add.image(game.context.drawingBufferWidth - 122.25, 9.9, 'clickmute').setOrigin(0.5, 0.5).setInteractive({
        pixelPerfect: true,
        useHandCursor: true
    })
    clickmute.x += parseFloat(clickmute.width / 2)
    clickmute.y += parseFloat(clickmute.height / 2)
    soundmute = game.scene.scenes[pageNo].add.image(game.context.drawingBufferWidth - 62.25, 9.9, 'soundmute').setOrigin(0.5, 0.5).setInteractive({
        pixelPerfect: true,
        useHandCursor: true
    })
    soundmute.x += parseFloat(soundmute.width / 2)
    soundmute.y += parseFloat(soundmute.height / 2)
    clickmute.x = game.context.drawingBufferWidth - 102.25
    soundmute.x = game.context.drawingBufferWidth - 42.25

    function logo2overstart() {
        this.setScale(1.05)
    }

    function logo2outstart() {
        this.setScale(1)
    }
    soundmute.on('pointerover', logo2overstart)
    soundmute.on('pointerout', logo2outstart)
    soundmute.on('pointerdown', soundmutedownstart)
    soundmute.on('pointerup', soundmuteupstart)

    function soundmutedownstart() {
        playsoundeffects('itemclick')
        this.setScale(1)
        if (!isMuted) {
            isMuted = true;
            soundmute.setFrame(1)
            music.pause();
        } else {
            isMuted = false;
            soundmute.setFrame(0)
            music.resume();
        }
    }

    function soundmuteupstart(ev) {
        if (isMuted) {
            soundmute.setFrame(1)
        } else {
            soundmute.setFrame(0)
        }
    }
    clickmute.on('pointerover', logo2overstart)
    clickmute.on('pointerout', logo2outstart)
    clickmute.on('pointerdown', clickmutedownstart)
    clickmute.on('pointerup', clickmuteupstart)

    function clickmutedownstart() {
        playsoundeffects('itemclick')
        this.setScale(1)
        if (!isMuted1) {
            isMuted1 = true;
            clickmute.setFrame(1)
        } else {
            isMuted1 = false;
            clickmute.setFrame(0)
        }
    }

    function clickmuteupstart(ev) {
        if (isMuted1) {
            clickmute.setFrame(1)
        } else {
            clickmute.setFrame(0)
        }
    }
    if (isMuted) {
        soundmute.setFrame(1)
    }
    if (isMuted1) {
        clickmute.setFrame(1)
    }
}

function playsoundeffects(clkssed) {
    if (soundstart == 0) {
        if (!isMuted1) {
            clicksound = game.scene.scenes[pageNo].sound.add(clkssed);
            clicksound.play();
        }
    }
}
