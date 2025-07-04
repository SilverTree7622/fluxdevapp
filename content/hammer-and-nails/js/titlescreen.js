var startgame2 = false
var startgame2 = false
var soundstart = 0
var x = [];
var y = [];
var t1;
var animate = 0
var count = 0
var completelevel = false
var levelarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var narr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
        soundcheck = true
        animate = 0
        narr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        count = 0
        completelevel = false
    },
    create: function () {
        window['UtilPlatform'].sendMsg2Parent('ShowNavFooterPlay');
        titlebackground = this.add.sprite(0, 0, 'titlebackground').setOrigin(0, 0)
        wood = this.add.sprite(74, 74, 'wood').setOrigin(0.5, 0.5)
        wood.x += parseFloat(wood.width / 2);
        wood.y += parseFloat(wood.height / 2);
        glitter = this.add.sprite(121, 170, 'glitter').setOrigin(0.5, 0.5)
        glitter.x += parseFloat(glitter.width / 2);
        glitter.y += parseFloat(glitter.height / 2);
        shadow2 = this.add.sprite(70, 70, 'shadow2').setOrigin(0.5, 0.5)
        shadow2.x += parseFloat(shadow2.width / 2);
        shadow2.y += parseFloat(shadow2.height / 2);
        title1 = this.add.sprite(86, 86, 'title1').setOrigin(0.5, 0.5)
        title1.x += parseFloat(title1.width / 2);
        title1.y += parseFloat(title1.height / 2);
        title2 = this.add.sprite(229, 165, 'title2').setOrigin(0.5, 0.5)
        title2.x += parseFloat(title2.width / 2);
        title2.y += parseFloat(title2.height / 2);
        title3 = this.add.sprite(162, 210, 'title3').setOrigin(0.5, 0.5)
        title3.x += parseFloat(title3.width / 2);
        title3.y += parseFloat(title3.height / 2);
        obj1 = this.add.sprite(369, 189, 'obj1').setOrigin(0.5, 0.5)
        obj1.x += parseFloat(obj1.width / 2);
        obj1.y += parseFloat(obj1.height / 2);
        obj2 = this.add.sprite(101, 177, 'obj2').setOrigin(0.5, 0.5)
        obj3 = this.add.sprite(124, 182, 'obj3').setOrigin(0.5, 0.5)
        obj2.x += parseFloat(obj2.width / 2);
        obj2.y += parseFloat(obj2.height / 2);
        obj3.x += parseFloat(obj3.width / 2);
        obj3.y += parseFloat(obj3.height / 2);
        titlegrp = this.add.container()
        titlegrp.add(shadow2)
        titlegrp.add(wood)
        titlegrp.add(title2)
        titlegrp.add(title1)
        titlegrp.add(obj1)
        titlegrp.add(obj2)
        titlegrp.add(obj3)
        titlegrp.add(title3)
        titlegrp.add(glitter)
        obj1.alpha = 0
        glitter.alpha = 0
        shadow2.setScale(0)
        title1.alpha = 0
        title2.alpha = 0
        title3.alpha = 0
        wood.setScale(0)
        obj2.setScale(0)
        obj3.setScale(0)
        obj1.y = obj1.y + 100
        title1.x = title1.x - 100
        title2.x = title2.x + 100
        title3.y = title3.y + 100
        game.scene.scenes[pageNo].tweens.add({
            targets: wood,
            scale: 1,
            ease: 'Linear',
            duration: 300,
            onComplete: titletransition1,
            callbackScope: this
        });
        function titletransition1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: title1,
                x: title1.x + 100,
                alpha: 1,
                ease: 'Linear',
                duration: 300,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: title2,
                x: title2.x - 100,
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
                targets: obj2,
                scale: 1,
                ease: 'Back',
                duration: 300,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: obj3,
                scale: 1,
                ease: 'Back',
                duration: 300,
                delay: 100,
                onComplete: titletransition4,
                callbackScope: this
            });
        }
        function titletransition4() {
            game.scene.scenes[pageNo].tweens.add({
                targets: obj1,
                y: obj1.y - 100,
                ease: 'Linear',
                duration: 300,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: obj1,
                alpha: 1,
                ease: 'Linear',
                duration: 300,
                onComplete: shadowtransition,
                callbackScope: this
            });
            function shadowtransition() {
                game.scene.scenes[pageNo].tweens.add({
                    targets: glitter,
                    alpha: 1,
                    ease: 'Back',
                    yoyo: true,
                    repeat: -1,
                    duration: 300,
                });
                game.scene.scenes[pageNo].tweens.add({
                    targets: shadow2,
                    scale: 0.95,
                    ease: 'Linear',
                    duration: 300,
                    onComplete: titletransition5,
                    callbackScope: this
                });
            }
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
                scale: 0.95,
                ease: 'Linear',
                duration: 300,
                yoyo: true,
                repeat: -1
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: obj1,
                angle: 25,
                ease: 'Linear',
                duration: 300,
                yoyo: true,
                repeat: -1
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: obj3,
                scale: 1.05,
                ease: 'Linear',
                duration: 300,
                yoyo: true,
                repeat: -1,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: play,
                scale: 1,
                ease: 'Back',
                duration: 300,
                delay: 400,
                onComplete: titletransition6,
                callbackScope: this
            });
            titleanimation()
        }
        function titletransition6() {
            game.scene.scenes[pageNo].tweens.add({
                targets: play,
                scale: 1.05,
                ease: 'Linear',
                duration: 300,
                yoyo: true,
                repeat: -1
            });
        }
        play = this.add.sprite(280, 670, 'play').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        play.setScale(0)
        mwood = this.add.sprite(52, 338, 'mwood').setOrigin(0.5, 0.5)
        mbomb = this.add.sprite(342, 429, 'mbomb').setOrigin(0, 0)
        mnail = this.add.sprite(161, 378, 'mnail').setOrigin(0, 0)
        smhammer = this.add.sprite(238, 428, 'smhammer').setOrigin(0, 0)
        lmhammer = this.add.sprite(178, 430, 'lmhammer').setOrigin(0, 0)
        rmhammer = this.add.sprite(290, 430, 'rmhammer').setOrigin(0, 0)
        blast = this.add.sprite(150, 209, 'level1blast').setOrigin(0, 0)
        explode = this.add.sprite(200, 343, 'explode').setOrigin(0, 0)
        explode.alpha = 0
        mwood.x += parseFloat(mwood.width / 2);
        mwood.y += parseFloat(mwood.height / 2);
        mwood.setScale(0)
        mwood.angle = -90
        blast.visible = false
        smhammer.alpha = 0
        lmhammer.alpha = 0
        rmhammer.alpha = 0
        mnail.setAlpha(0)
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'rmhammer',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('rmhammer', {
                start: 1,
                end: 3
            }),
            frameRate: 24,
            yoyo: true
        });
        rmhammer.anims.load('rmhammer')
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'lmhammer',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('lmhammer', {
                start: 1,
                end: 3
            }),
            frameRate: 24,
            yoyo: true
        });
        lmhammer.anims.load('lmhammer')
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'smhammer',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('smhammer', {
                start: 1,
                end: 3
            }),
            frameRate: 24,
            yoyo: true
        });
        smhammer.anims.load('smhammer')
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'level1blast',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('level1blast', {
                start: 0,
                end: 3
            }),
            frameRate: 12,
            yoyo: true,
        });
        blast.anims.load('level1blast')
        blast.x = 354
        blast.y = 422
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'mbomb',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('mbomb', {
                start: 0,
                end: 1
            }),
            frameRate: 6,
            yoyo: true,
            ease: 'Back.easeOut',
            repeat: -1
        });
        mbomb.anims.load('mbomb')
        mbomb.visible = false
        function titleanimation() {
            mbomb.anims.play('mbomb')
            mbomb.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: mwood,
                scale: 1,
                angle: 0,
                ease: 'Linear',
                duration: 300,
            });
            mnail.setFrame(1)
            mnail.x = 161
            mnail.y = 373
            game.scene.scenes[pageNo].tweens.add({
                targets: mnail,
                alpha: 1,
                ease: 'Linear',
                duration: 300,
                delay: 600,
                onComplete: titleanimation1,
                callbackScope: this
            });
        }
        function titleanimation1() {
            lmhammer.alpha = 1
            game.scene.scenes[pageNo].tweens.add({
                targets: lmhammer,
                x: 130,
                y: 373,
                ease: 'Linear',
                duration: 300,
                onComplete: titleanimation2,
                callbackScope: this
            });
        }
        function titleanimation2() {
            lmhammer.anims.play('lmhammer')
            mnail.setFrame(2)
            t1 = setTimeout(titleanimation3, 200)
        }
        function titleanimation3() {
            clearTimeout(t1)
            lmhammer.anims.play('lmhammer')
            t1 = setTimeout(titleanimation4, 200)
        }
        function titleanimation4() {
            clearTimeout(t1)
            lmhammer.anims.play('lmhammer')
            mnail.setFrame(4)
            game.scene.scenes[pageNo].tweens.add({
                targets: lmhammer,
                alpha: 0,
                ease: 'Linear',
                duration: 300,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: mnail,
                alpha: 0,
                ease: 'Linear',
                delay: 500,
                duration: 300,
                onComplete: titleanimation5,
                callbackScope: this
            });
        }
        function titleanimation5() {
            smhammer.alpha = 1
            game.scene.scenes[pageNo].tweens.add({
                targets: mnail,
                alpha: 1,
                ease: 'Linear',
                duration: 300,
            });
            mnail.x = 384
            mnail.y = 393
            mnail.setFrame(1)
            game.scene.scenes[pageNo].tweens.add({
                targets: smhammer,
                x: 384,
                y: 393,
                ease: 'Linear',
                duration: 300,
            });
            t1 = setTimeout(titleanimation6, 200)
        }
        function titleanimation6() {
            clearTimeout(t1)
            smhammer.anims.play('smhammer')
            mnail.setFrame(2)
            t1 = setTimeout(titleanimation7, 200)
        }
        function titleanimation7() {
            clearTimeout(t1)
            smhammer.anims.play('smhammer')
            mnail.setFrame(3)
            t1 = setTimeout(titleanimation8, 200)
        }
        function titleanimation8() {
            clearTimeout(t1)
            smhammer.anims.play('smhammer')
            mnail.setFrame(4)
            game.scene.scenes[pageNo].tweens.add({
                targets: smhammer,
                alpha: 0,
                ease: 'Linear',
                delay: 500,
                duration: 300,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: mnail,
                alpha: 0,
                ease: 'Linear',
                delay: 500,
                duration: 300,
                onComplete: titleanimation9,
                callbackScope: this
            });
        }
        function titleanimation9() {
            rmhammer.alpha = 1
            game.scene.scenes[pageNo].tweens.add({
                targets: mnail,
                alpha: 1,
                ease: 'Linear',
                duration: 300,
            });
            mnail.x = 180
            mnail.y = 450
            mnail.setFrame(1)
            game.scene.scenes[pageNo].tweens.add({
                targets: rmhammer,
                x: 180,
                y: 450,
                ease: 'Linear',
                duration: 300,
            });
            t1 = setTimeout(titleanimation10, 200)
        }
        function titleanimation10() {
            rmhammer.anims.play('rmhammer')
            mnail.setFrame(2)
            t1 = setTimeout(titleanimation11, 200)
        }
        function titleanimation11() {
            rmhammer.anims.play('rmhammer')
            mnail.setFrame(3)
            t1 = setTimeout(titleanimation12, 200)
        }
        function titleanimation12() {
            rmhammer.anims.play('rmhammer')
            mnail.setFrame(4)
            game.scene.scenes[pageNo].tweens.add({
                targets: rmhammer,
                alpha: 0,
                ease: 'Linear',
                delay: 500,
                duration: 300,
            });
            mbomb.x = 260
            mbomb.y = 393
            mbomb.visible = true
            game.scene.scenes[pageNo].tweens.add({
                targets: mbomb,
                alpha: 1,
                ease: 'Linear',
                duration: 300,
            });
            mbomb.anims.play('mbomb')
            game.scene.scenes[pageNo].tweens.add({
                targets: mnail,
                alpha: 0,
                ease: 'Linear',
                delay: 500,
                duration: 300,
                onComplete: titleanimation13,
                callbackScope: this
            });
        }
        function titleanimation13() {
            rmhammer.alpha = 1
            game.scene.scenes[pageNo].tweens.add({
                targets: rmhammer,
                x: 260,
                y: 393,
                ease: 'Linear',
                duration: 300,
                onComplete: titleanimation14,
                callbackScope: this
            });
        }
        function titleanimation14() {
            game.scene.scenes[pageNo].tweens.add({
                targets: mbomb,
                alpha: 0,
                ease: 'Linear',
                duration: 300,
            });
            rmhammer.anims.play('rmhammer')
            rmhammer.alpha = 0
            mbomb.visible = false
            blast.x = 200
            blast.y = 333
            blast.visible = true
            blast.anims.play('level1blast')
            t1 = setTimeout(titleanimation15, 200)
        }
        function titleanimation15() {
            explode.alpha = 1
            blast.visible = false
            game.scene.scenes[pageNo].tweens.add({
                targets: explode,
                alpha: 0,
                ease: 'Linear',
                duration: 800,
                onComplete: titleanimation,
                callbackScope: this
            });
        }
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
            music.setVolume(0.3)
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
    },
    update: function () {}
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
            clearTimeout(t1)
            startgame2 = true
            playsoundeffects('itemclick')
            this.setScale(1)
            game.scene.scenes[pageNo].time.addEvent({
                delay: 200,
                callback: gamecomplete,
            });
            function gamecomplete() {
                transitionIn()
            }
        }
    }
    function playupstart() {
    }
}
function logomutefun() {
   
    settings = game.scene.scenes[pageNo].add.image(519, 40, 'settings').setOrigin(0.5, 0.5).setInteractive({
        pixelPerfect: true,
        useHandCursor: true
    })
    settings.setScale(0.8)
    settings.on('pointerover', settingsoverstart)
    settings.on('pointerout', settingsoutstart)
    settings.on('pointerdown', settingsdownstart)
    settings.on('pointerup', settingsupstart)
    function settingsoverstart() {
        this.setScale(0.85)
    }
    function settingsoutstart() {
        this.setScale(0.8)
    }
    function settingsdownstart() {
        closebtn.setInteractive()
        playsoundeffects('setclick')
        this.setScale(0.8)
        btnclick1.visible = true
        btnclick2.visible = true
        clickmute.visible = true
        soundmute.visible = true
        settinggrp.setScale(0)
        settinggrp.x = 250
        settinggrp.y = 380
        settingbackground.visible = true
        settingbackground.alpha = 0
        game.scene.scenes[pageNo].tweens.add({
            targets: settingbackground,
            alpha: 1,
            ease: 'Linear',
            duration: 300,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: settinggrp,
            scaleX: 1,
            scaleY: 1,
            x: 0,
            y: 0,
            ease: 'Back',
            duration: 300,
        });
    }
    function settingsupstart() {
        this.setScale(0.85)
    }
   
    function logo2overstart() {
        this.setScale(this.scaleX + 0.05)
    }
    function logo2outstart() {
        this.setScale(this.scaleX - 0.05)
    }
   
    function logo2upstart() {
        this.setScale(this.scaleX + 0.05)
        window.open(logoUrl, target = "_blank")
    }
    settingbackground = game.scene.scenes[pageNo].add.image(0, 0, 'settingbackground').setOrigin(0, 0).setInteractive({
        pixelPerfect: true,
        useHandCursor: true
    })
    settingbackground.visible = false
    btnclick1 = game.scene.scenes[pageNo].add.image(256, 268, 'btnclick1').setOrigin(0.5, 0.5).setInteractive({
        pixelPerfect: true,
        useHandCursor: true
    })
    btnclick1.x += parseFloat(btnclick1.width / 2)
    btnclick1.y += parseFloat(btnclick1.height / 2)
    btnclick2 = game.scene.scenes[pageNo].add.image(256, 342, 'btnclick2').setOrigin(0.5, 0.5).setInteractive({
        pixelPerfect: true,
        useHandCursor: true
    })
    btnclick2.x += parseFloat(btnclick2.width / 2)
    btnclick2.y += parseFloat(btnclick2.height / 2)
    settingpanel = game.scene.scenes[pageNo].add.image(67, 156, 'settingpanel').setOrigin(0, 0)
    clickmute = game.scene.scenes[pageNo].add.image(260 + 80, 269, 'clickmute').setOrigin(0.5, 0.5).setInteractive({
        pixelPerfect: true,
        useHandCursor: true
    })
    clickmute.x += parseFloat(clickmute.width / 2)
    clickmute.y += parseFloat(clickmute.height / 2)
    soundmute = game.scene.scenes[pageNo].add.image(260 + 80, 342, 'soundmute').setOrigin(0.5, 0.5).setInteractive({
        pixelPerfect: true,
        useHandCursor: true
    })
    soundmute.x += parseFloat(soundmute.width / 2)
    soundmute.y += parseFloat(soundmute.height / 2)
    clickmute.setFrame(1)
    soundmute.setFrame(1)
    if (isMuted) {
        soundmute.setFrame(1)
        soundmute.x = 305
    }
    if (isMuted1) {
        clickmute.setFrame(1)
        clickmute.x = 305
    }
    closebtn = game.scene.scenes[pageNo].add.image(399, 176, 'closebtn').setOrigin(0.5, 0.5).setInteractive({
        pixelPerfect: true,
        useHandCursor: true
    })
    closebtn.x += parseFloat(closebtn.width / 2)
    closebtn.y += parseFloat(closebtn.height / 2)
    closebtn.on('pointerover', logo2overstart)
    closebtn.on('pointerout', logo2outstart)
    closebtn.on('pointerdown', closebtndownstart)
    closebtn.on('pointerup', logo2upstart)
    function closebtndownstart() {
        closebtn.disableInteractive()
        playsoundeffects('setclick')
        this.setScale(1)
        if (game.device.os.desktop) {
            game.scene.scenes[pageNo].tweens.add({
                targets: settinggrp,
                scaleX: 0,
                scaleY: 0,
                x: 400,
                y: 300,
                ease: 'Back.easeIn',
                duration: 300,
            });
        } else {
            game.scene.scenes[pageNo].tweens.add({
                targets: settinggrp,
                scaleX: 0,
                scaleY: 0,
                x: 250,
                y: 380,
                ease: 'Back.easeIn',
                duration: 300,
            });
        }
        game.scene.scenes[pageNo].tweens.add({
            targets: settingbackground,
            alpha: 0,
            ease: 'Linear',
            duration: 300,
        });
    }
    settinggrp = game.scene.scenes[pageNo].add.container()
    settinggrp.add(settingpanel)
    settinggrp.add(btnclick1)
    settinggrp.add(btnclick2)
    settinggrp.add(clickmute)
    settinggrp.add(soundmute)
    settinggrp.add(closebtn)
    settinggrp.setScale(0)
    settinggrp.x = 250
    settinggrp.y = 380
    soundmute.on('pointerover', logo2overstart)
    soundmute.on('pointerout', logo2outstart)
    soundmute.on('pointerdown', soundmutedownstart)
    soundmute.on('pointerup', soundmuteupstart)
    function soundmutedownstart() {
        playsoundeffects('itemclick')
        this.setScale(1)
        if (!isMuted) {
            isMuted = true;
            soundmute.setFrame(0)
            music.pause();
            game.scene.scenes[pageNo].tweens.add({
                targets: soundmute,
                x: soundmute.x - 80,
                ease: 'Back',
                duration: 200,
                onComplete: soundmutetransition1,
                callbackScope: this
            });
        } else {
            isMuted = false;
            soundmute.setFrame(1)
            music.resume();
            game.scene.scenes[pageNo].tweens.add({
                targets: soundmute,
                x: soundmute.x + 80,
                ease: 'Back',
                duration: 200,
                onComplete: soundmutetransition1,
                callbackScope: this
            });
        }
        soundmute.disableInteractive()
    }
    function soundmutetransition1() {
        soundmute.setInteractive()
    }
    function soundmuteupstart(ev) {
        if (isMuted) {
            soundmute.setFrame(0)
        } else {
            soundmute.setFrame(1)
        }
    }
    clickmute.on('pointerover', logo2overstart)
    clickmute.on('pointerout', logo2outstart)
    clickmute.on('pointerdown', clickmutedownstart)
    clickmute.on('pointerup', clickmuteupstart)
    function clickmutedownstart() {
        clickmute.disableInteractive()
        playsoundeffects('itemclick')
        this.setScale(1)
        if (!isMuted1) {
            isMuted1 = true;
            clickmute.setFrame(0)
            game.scene.scenes[pageNo].tweens.add({
                targets: clickmute,
                x: clickmute.x - 80,
                ease: 'Back',
                duration: 200,
                onComplete: clickmutetransition1,
                callbackScope: this
            });
        } else {
            isMuted1 = false;
            clickmute.setFrame(1)
            game.scene.scenes[pageNo].tweens.add({
                targets: clickmute,
                x: clickmute.x + 80,
                ease: 'Back',
                duration: 200,
                onComplete: clickmutetransition1,
                callbackScope: this
            });
        }
    }
    function clickmutetransition1() {
        clickmute.setInteractive()
    }
    function clickmuteupstart(ev) {}
    if (isMuted) {
        soundmute.x = soundmute.x
        soundmute.setFrame(0)
    }
    if (isMuted1) {
        clickmute.x = clickmute.x
        clickmute.setFrame(0)
    }
}
function playsoundeffects(clkssed) {
    if (soundstart == 0) {
        if (!isMuted1) {
            clicksound = game.scene.scenes[pageNo].sound.add(clkssed);
            clicksound.play();
            if (clkssed == 'camerasound') {
                clicksound.setVolume(0.6);
            }
        }
    }
}
function hometransitionIn() {
    transbackground = game.scene.scenes[pageNo].add.sprite(0, 0, 'transbackground').setOrigin(0, 0).setInteractive({
        pixelPerfect: true,
        useHandCursor: true
    })
    game.scene.scenes[pageNo].tweens.add({
        targets: transbackground,
        alpha: 1,
        ease: 'Linear',
        duration: 100,
        onComplete: transbackgroundInstart
    });
    function transbackgroundInstart() {
        if (pageNo == 3 && lcount == 1) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level1');
        } else if (pageNo == 4) {
            game.scene.scenes[pageNo].scene.stop('level1')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 2) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level2');
        } else if (pageNo == 5) {
            game.scene.scenes[pageNo].scene.stop('level2')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 3) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level3');
        } else if (pageNo == 6) {
            game.scene.scenes[pageNo].scene.stop('level3')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 4) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level4');
        } else if (pageNo == 7) {
            game.scene.scenes[pageNo].scene.stop('level4')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 5) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level5');
        } else if (pageNo == 8) {
            game.scene.scenes[pageNo].scene.stop('level5')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 6) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level6');
        } else if (pageNo == 9) {
            game.scene.scenes[pageNo].scene.stop('level6')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 7) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level7');
        } else if (pageNo == 10) {
            game.scene.scenes[pageNo].scene.stop('level7')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 8) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level8');
        } else if (pageNo == 11) {
            game.scene.scenes[pageNo].scene.stop('level8')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 9) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level9');
        } else if (pageNo == 12) {
            game.scene.scenes[pageNo].scene.stop('level9')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 10) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level10');
        } else if (pageNo == 13) {
            game.scene.scenes[pageNo].scene.stop('level10')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 11) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level11');
        } else if (pageNo == 14) {
            game.scene.scenes[pageNo].scene.stop('level11')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 12) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level12');
        } else if (pageNo == 15) {
            game.scene.scenes[pageNo].scene.stop('level12')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 13) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level13');
        } else if (pageNo == 16) {
            game.scene.scenes[pageNo].scene.stop('level13')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 14) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level14');
        } else if (pageNo == 17) {
            game.scene.scenes[pageNo].scene.stop('level14')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 15) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level15');
        } else if (pageNo == 18) {
            game.scene.scenes[pageNo].scene.stop('level15')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 16) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level16');
        } else if (pageNo == 19) {
            game.scene.scenes[pageNo].scene.stop('level16')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 17) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level17');
        } else if (pageNo == 20) {
            game.scene.scenes[pageNo].scene.stop('level17')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 18) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level18');
        } else if (pageNo == 21) {
            game.scene.scenes[pageNo].scene.stop('level18')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 19) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level19');
        } else if (pageNo == 22) {
            game.scene.scenes[pageNo].scene.stop('level19')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 20) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level20');
        } else if (pageNo == 23) {
            game.scene.scenes[pageNo].scene.stop('level20')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 21) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level21');
        } else if (pageNo == 24) {
            game.scene.scenes[pageNo].scene.stop('level21')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 22) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level22');
        } else if (pageNo == 25) {
            game.scene.scenes[pageNo].scene.stop('level22')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 23) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level23');
        } else if (pageNo == 26) {
            game.scene.scenes[pageNo].scene.stop('level23')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 24) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level24');
        } else if (pageNo == 27) {
            game.scene.scenes[pageNo].scene.stop('level24')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 25) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level25');
        } else if (pageNo == 28) {
            game.scene.scenes[pageNo].scene.stop('level25')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 26) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level26');
        } else if (pageNo == 29) {
            game.scene.scenes[pageNo].scene.stop('level26')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 27) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level27');
        } else if (pageNo == 30) {
            game.scene.scenes[pageNo].scene.stop('level27')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 28) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level28');
        } else if (pageNo == 31) {
            game.scene.scenes[pageNo].scene.stop('level28')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 29) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level29');
        } else if (pageNo == 32) {
            game.scene.scenes[pageNo].scene.stop('level29')
            game.scene.run('levelselect');
        } else if (pageNo == 3 && lcount == 30) {
            game.scene.scenes[pageNo].scene.stop('levelselect')
            game.scene.run('level30');
        }
    }
}
function transitionIn() {
    if (pageNo == 2) {
        game.scene.scenes[pageNo].scene.stop('titlescreen')
        game.scene.run('levelselect');
    } else if (pageNo == 3) {
        game.scene.scenes[pageNo].scene.stop('levelselect')
        game.scene.run('level1');
    } else if (pageNo == 4) {
        game.scene.scenes[pageNo].scene.stop('level1')
        game.scene.run('level2');
    } else if (pageNo == 5) {
        game.scene.scenes[pageNo].scene.stop('level2')
        game.scene.run('level3');
    } else if (pageNo == 6) {
        game.scene.scenes[pageNo].scene.stop('level3')
        game.scene.run('level4');
    } else if (pageNo == 7) {
        game.scene.scenes[pageNo].scene.stop('level4')
        game.scene.run('level5');
    } else if (pageNo == 8) {
        game.scene.scenes[pageNo].scene.stop('level5')
        game.scene.run('level6');
    } else if (pageNo == 9) {
        game.scene.scenes[pageNo].scene.stop('level6')
        game.scene.run('level7');
    } else if (pageNo == 10) {
        game.scene.scenes[pageNo].scene.stop('level7')
        game.scene.run('level8');
    } else if (pageNo == 11) {
        game.scene.scenes[pageNo].scene.stop('level8')
        game.scene.run('level9');
    } else if (pageNo == 12) {
        game.scene.scenes[pageNo].scene.stop('level9')
        game.scene.run('level10');
    } else if (pageNo == 13) {
        game.scene.scenes[pageNo].scene.stop('level10')
        game.scene.run('level11');
    } else if (pageNo == 14) {
        game.scene.scenes[pageNo].scene.stop('level11')
        game.scene.run('level12');
    } else if (pageNo == 15) {
        game.scene.scenes[pageNo].scene.stop('level12')
        game.scene.run('level13');
    } else if (pageNo == 16) {
        game.scene.scenes[pageNo].scene.stop('level13')
        game.scene.run('level14');
    } else if (pageNo == 17) {
        game.scene.scenes[pageNo].scene.stop('level14')
        game.scene.run('level15');
    } else if (pageNo == 18) {
        game.scene.scenes[pageNo].scene.stop('level15')
        game.scene.run('level16');
    } else if (pageNo == 19) {
        game.scene.scenes[pageNo].scene.stop('level16')
        game.scene.run('level17');
    } else if (pageNo == 20) {
        game.scene.scenes[pageNo].scene.stop('level17')
        game.scene.run('level18');
    } else if (pageNo == 21) {
        game.scene.scenes[pageNo].scene.stop('level18')
        game.scene.run('level19');
    } else if (pageNo == 22) {
        game.scene.scenes[pageNo].scene.stop('level19')
        game.scene.run('level20');
    } else if (pageNo == 23) {
        game.scene.scenes[pageNo].scene.stop('level20')
        game.scene.run('level21');
    } else if (pageNo == 24) {
        game.scene.scenes[pageNo].scene.stop('level21')
        game.scene.run('level22');
    } else if (pageNo == 25) {
        game.scene.scenes[pageNo].scene.stop('level22')
        game.scene.run('level23');
    } else if (pageNo == 26) {
        game.scene.scenes[pageNo].scene.stop('level23')
        game.scene.run('level24');
    } else if (pageNo == 27) {
        game.scene.scenes[pageNo].scene.stop('level24')
        game.scene.run('level25');
    } else if (pageNo == 28) {
        game.scene.scenes[pageNo].scene.stop('level25')
        game.scene.run('level26');
    } else if (pageNo == 29) {
        game.scene.scenes[pageNo].scene.stop('level26')
        game.scene.run('level27');
    } else if (pageNo == 30) {
        game.scene.scenes[pageNo].scene.stop('level27')
        game.scene.run('level28');
    } else if (pageNo == 31) {
        game.scene.scenes[pageNo].scene.stop('level28')
        game.scene.run('level29');
    } else if (pageNo == 32) {
        game.scene.scenes[pageNo].scene.stop('level29')
        game.scene.run('level30');
    } else if (pageNo == 33) {
        game.scene.scenes[pageNo].scene.stop('level30')
        game.scene.run('level1');
    }
}
function transitionOut() {
    if (pageNo == 3) {
        levelselectstart()
    } else if (pageNo == 4) {
        level1start()
    } else if (pageNo == 5) {
        level2start()
    } else if (pageNo == 6) {
        level3start()
    } else if (pageNo == 7) {
        level4start()
    } else if (pageNo == 8) {
        level5start()
    } else if (pageNo == 9) {
        level6start()
    } else if (pageNo == 10) {
        level7start()
    } else if (pageNo == 11) {
        level8start()
    } else if (pageNo == 12) {
        level9start()
    } else if (pageNo == 13) {
        level10start()
    } else if (pageNo == 14) {
        level11start()
    } else if (pageNo == 15) {
        level12start()
    } else if (pageNo == 16) {
        level13start()
    } else if (pageNo == 17) {
        level14start()
    } else if (pageNo == 18) {
        level15start()
    } else if (pageNo == 19) {
        level16start()
    } else if (pageNo == 20) {
        level17start()
    } else if (pageNo == 21) {
        level18start()
    } else if (pageNo == 22) {
        level19start()
    } else if (pageNo == 23) {
        level20start()
    } else if (pageNo == 24) {
        level21start()
    } else if (pageNo == 25) {
        level22start()
    } else if (pageNo == 26) {
        level23start()
    } else if (pageNo == 27) {
        level24start()
    } else if (pageNo == 28) {
        level25start()
    } else if (pageNo == 29) {
        level26start()
    } else if (pageNo == 30) {
        level27start()
    } else if (pageNo == 31) {
        level28start()
    } else if (pageNo == 32) {
        level29start()
    } else if (pageNo == 33) {
        level30start()
    }
}