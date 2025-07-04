var startgame6 = false
var clickstart = 0
var timevalue = 1
var timearr = [0, 30, 0, 0, 0, 0, 0, 0]
var time = timevalue * 60
var harr1 = [1, 2, 3, 4]
var nailcount = 0
var nextnail = true
var randomArrx = [0];
var randomArry = [0];
var level3 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function level3() {
        Phaser.Scene.call(this, {
            key: 'level3'
        });
    },
    preload: function () {
        pageNo = 6
        startgame6 = false
        nextnail = true
        count = 0
        narr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        nailcount = 0
        loadFinish = false
        clickstart = 0
        randomArrx = [0]
        randomArry = [0]
        timearr = [0, 30, 0, 0, 0, 0, 0, 0]
        timevalue = 1
        time = timevalue * 60
    },
    create: function () {
        level3background = this.add.image(0, 0, 'level1background').setOrigin(0, 0).setInteractive()
        level3wood = this.add.image(64, 37, 'level1wood').setOrigin(0, 0)
        level3blast = this.add.sprite(150, 209, 'level1blast').setOrigin(0, 0)
        level3blast.visible = false
        for (i = 6; i >= 1; i--) {
            randomArrx.push(Phaser.Math.Between(100, 455));
            randomArry.push(Phaser.Math.Between(220, 765));
        }
        for (i = 6; i >= 1; i--) {
            game['level3nail' + i] = this.add.sprite(randomArrx[i], randomArry[i], 'level1nail' + i).setOrigin(0.5, 0.5).setInteractive()
            game['level3nail' + i].setFrame(1)
            game['level3nail' + i].visible = false
        }
        game['level3nail' + 1].visible = true
        rhammer = this.add.sprite(300, 209, 'rhammer').setOrigin(0, 0)
        shammer = this.add.sprite(247, 205, 'shammer').setOrigin(0, 0)
        lhammer = this.add.sprite(75, 205, 'lhammer').setOrigin(0, 0)
        rhammer.visible = false
        shammer.visible = false
        lhammer.visible = false
        timertxt = this.add.text(10, 15.5, 'Timer:', {
            font: '20px Nunito',
        });
        min = this.add.text(75, 15.5, '0' + timearr[0], {
            font: '20px Nunito',
        });
        colon = this.add.text(100.05, 15.5, ':', {
            font: '20px Nunito',
        });
        sec = this.add.text(106.5, 15.5, timearr[1], {
            font: '20px Nunito',
        });
        leveltxt = this.add.text(250, 15.5, 'Level:' + (pageNo - 3), {
            font: '28px Nunito',
        });
        levelpop1 = this.add.container()
        levelpop1.add(level3wood)
        for (i = 6; i >= 1; i--) {
            levelpop1.add(game['level3nail' + i])
        }
        levelpop1.add(level3blast)
        levelpop1.add(rhammer)
        levelpop1.add(lhammer)
        levelpop1.add(shammer)
        levelpop1.add(min)
        levelpop1.add(colon)
        levelpop1.add(sec)
        levelpop1.add(timertxt)
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'rhammer',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('rhammer', {
                start: 1,
                end: 3
            }),
            frameRate: 24,
            yoyo: true
        });
        rhammer.anims.load('rhammer')
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'lhammer',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('lhammer', {
                start: 1,
                end: 3
            }),
            frameRate: 24,
            yoyo: true
        });
        lhammer.anims.load('lhammer')
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'shammer',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('shammer', {
                start: 1,
                end: 3
            }),
            frameRate: 24,
            yoyo: true
        });
        shammer.anims.load('shammer')
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'level1blast',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('level1blast', {
                start: 0,
                end: 3
            }),
            frameRate: 24,
        });
        level3blast.anims.load('level1blast')
        level3blast.x = 354
        level3blast.y = 422
        timecheck()
        function timecheck() {
            if (timearr[0] > 0 && timearr[1] >= 0 && nailcount <= 6 && nextnail) {
                timearr[1] = timearr[1] - 1
                if (timearr[1] > 9) {
                    sec.setText(timearr[1])
                } else {
                    sec.setText('0' + timearr[1])
                }
                if (timearr[1] == -1) {
                    timearr[0] = timearr[0] - 1
                    min.setText('0' + timearr[0])
                    if (timearr[1] == -1) {
                        timearr[1] = 59
                        sec.setText(timearr[1])
                    }
                }
                timer = game.scene.scenes[pageNo].time.addEvent({
                    delay: 1000,
                    callback: timecheck,
                });
            } else if (timearr[0] == 0 && timearr[1] > 0 && nailcount <= 6 && nextnail) {
                timearr[1] = timearr[1] - 1
                if (timearr[1] > 9) {
                    sec.setText(timearr[1])
                } else {
                    sec.setText('0' + timearr[1])
                }
                timer = game.scene.scenes[pageNo].time.addEvent({
                    delay: 1000,
                    callback: timecheck,
                });
            } else {
                timeup()
            }
        }
        function timeup() {
            timer.remove()
            if (nailcount == 6 && !nextnail) {
                finalpanel()
            } else {
                levelfailed()
            }
        }
        level3lpbg = this.add.image(135, 93, 'level1lpbg').setOrigin(0, 0)
        level3lpbar4 = this.add.image(-148, 93, 'level1lpmask4').setOrigin(0, 0)
        level3lpbar3 = this.add.image(-148, 93, 'level1lpmask3').setOrigin(0, 0)
        level3lpbar2 = this.add.image(-148, 93, 'level1lpmask2').setOrigin(0, 0)
        level3lpbar1 = this.add.image(-148, 93, 'level1lpmask1').setOrigin(0, 0)
        level3lpmask1 = this.add.image(135, 93, 'level1lpmask1').setOrigin(0, 0).setVisible(false);
        mask = level3lpmask1.createBitmapMask();
        mask.alpha = 0
        level3lpbar4.setMask(mask);
        level3lpbar3.setMask(mask);
        level3lpbar2.setMask(mask);
        level3lpbar1.setMask(mask);
        emojis = this.add.sprite(122, 85, 'emoji').setOrigin(0, 0).setScale(0.7)
        level3stresstxt = this.add.image(180, 49, 'level1stresstxt').setOrigin(0, 0)
        for (i = 6; i >= 1; i--) {
            game['level3nail' + i].on('pointerdown', hammerFun)
        }
        function hammerFun() {
            sno = this.texture.key.substr(10)
            narr1[0] = sno
            rhammer.visible = false
            shammer.visible = false
            lhammer.visible = false
            if (randomArrx[narr1[0]] >= 75 && randomArrx[narr1[0]] <= 215) {
                lhammer.x = randomArrx[narr1[0]] - 65
                lhammer.y = randomArry[narr1[0]] - 45
                lhammer.anims.play('lhammer')
                lhammer.visible = true
            } else if (randomArrx[narr1[0]] >= 215 && randomArrx[narr1[0]] <= 354) {
                shammer.x = randomArrx[narr1[0]] - 25
                shammer.y = randomArry[narr1[0]] - 45
                shammer.anims.play('shammer')
                shammer.visible = true
            } else if (randomArrx[narr1[0]] >= 355 && randomArrx[narr1[0]] <= 495) {
                rhammer.x = randomArrx[narr1[0]] - 25
                rhammer.y = randomArry[narr1[0]] - 45
                rhammer.anims.play('rhammer')
                rhammer.visible = true
            }
            if (hammerOn == 0) {
                playsoundeffects('hammer')
            } else if (hammerOn == 1) {
                playsoundeffects('hammer2')
            } else if (hammerOn == 2) {
                playsoundeffects('hammer3')
            }
            if (game['level3nail' + narr1[0]].frame.name == 1) {
                game['level3nail' + narr1[0]].setFrame(harr1[1])
                setTimeout(hiddenHammer, 200)
            } else if (game['level3nail' + narr1[0]].frame.name == 2) {
                game['level3nail' + narr1[0]].setFrame(harr1[2])
                setTimeout(hiddenHammer, 200)
            } else if (game['level3nail' + narr1[0]].frame.name == 3) {
                game['level3nail' + narr1[0]].setFrame(harr1[3])
                game['level3nail' + narr1[0]].disableInteractive()
                game.scene.scenes[pageNo].tweens.add({
                    targets: game['level3nail' + narr1[0]],
                    alpha: 0,
                    ease: 'Back',
                    delay: 500,
                    duration: 300,
                });
                if (narr1[0] <= 6) {
                    nailcount = nailcount + 1
                    setTimeout(newnail, 200)
                    if (nailcount < 6) {
                        game['level3nail' + (nailcount + 1)].visible = true
                    }
                }
            }
        }
        function newnail() {
            hammerOn = Phaser.Math.Between(0, 2)
            rhammer.visible = false
            shammer.visible = false
            lhammer.visible = false
            level3lpbar1.x = level3lpbar1.x + (282 / 6)
            level3lpbar2.x = level3lpbar2.x + (282 / 6)
            level3lpbar3.x = level3lpbar3.x + (282 / 6)
            level3lpbar4.x = level3lpbar4.x + (282 / 6)
            if (nailcount == 6) {
                nextnail = false
            }
        }
        function hiddenHammer() {
            rhammer.visible = false
            shammer.visible = false
            lhammer.visible = false
        }
        function finalpanel() {
            playsoundeffects('crowdwin')
            settings.visible = false
            level3home.visible = false
            failedpanel.visible = false
            if (level == 3) {
                level = 4
            }
            saveFile()
            game.scene.scenes[pageNo].tweens.add({
                targets: finishpanel,
                scaleX: 1,
                scaleY: 1,
                ease: 'Back',
                duration: 300,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: finishpanel,
                x: 50,
                y: 0,
                ease: 'Back',
                duration: 300,
            });
            blackscreen.visible = true
            game.scene.scenes[pageNo].tweens.add({
                targets: ball,
                y: ball.y - 850,
                ease: 'Linear',
                duration: 800,
                delay: 800,
                onComplete: emit,
                callbackScope: this
            })
            function emit() {
                ball.visible = false;
                emitter1.emitParticle(250, 387, 50);
                ball.x = 500;
                ball.y = 900;
                ball.tint = 0xffffff;
                game.scene.scenes[pageNo].tweens.add({
                    targets: ball,
                    y: ball.y - 750,
                    ease: 'Linear',
                    duration: 600,
                    onComplete: emit1,
                    callbackScope: this,
                })
            }
            function emit1() {
                ball.visible = false;
                ball.x = 200;
                ball.y = 900;
                ball.tint = 0xffffff;
                game.scene.scenes[pageNo].tweens.add({
                    targets: ball,
                    y: ball.y - 700,
                    ease: 'Linear',
                    duration: 600,
                    delay: 400,
                    onComplete: emit2,
                    callbackScope: this,
                })
                setTimeout(soundstart1, 400)
                function soundstart1() {
                    ball.visible = true;
                }
            }
            function emit2() {
                ball.visible = false;
                emitter1.emitParticle(250, 200, 200)
                ball.x = 300;
                ball.y = 900;
                ball.tint = 0xffffff;
                game.scene.scenes[pageNo].tweens.add({
                    targets: ball,
                    y: ball.y - 750,
                    ease: 'Linear',
                    duration: 600,
                    delay: 800,
                    onComplete: emit3,
                    callbackScope: this,
                })
                setTimeout(soundstart2, 800)
                function soundstart2() {
                    ball.visible = true;
                }
            }
            function emit3() {
                ball.visible = false;
                emitter1.emitParticle(250, 300, 150)
                ball.x = 100;
                ball.y = 900;
                ball.tint = 0xffffff;
                game.scene.scenes[pageNo].tweens.add({
                    targets: ball,
                    y: ball.y - 800,
                    ease: 'Linear',
                    duration: 600,
                    delay: 800,
                    onComplete: emit4,
                    callbackScope: this,
                })
                setTimeout(soundstart3, 800)
                function soundstart3() {
                    ball.visible = true;
                }
            }
            function emit4() {
                ball.visible = false;
                emitter1.emitParticle(250, 100, 100)
                ball.x = 400;
                ball.y = 900;
                ball.tint = 0xffffff;
                game.scene.scenes[pageNo].tweens.add({
                    targets: ball,
                    y: ball.y - 700,
                    ease: 'Linear',
                    duration: 600,
                    delay: 800,
                    onComplete: emit5,
                    callbackScope: this,
                })
                setTimeout(soundstart4, 800)
                function soundstart4() {
                    ball.visible = true;
                }
            }
            function emit5() {
                ball.visible = false;
                emitter1.emitParticle(250, 400, 200)
                ball.x = 10;
                ball.y = 900;
                ball.tint = 0xffffff;
                game.scene.scenes[pageNo].tweens.add({
                    targets: ball,
                    y: ball.y - 650,
                    ease: 'Linear',
                    duration: 600,
                    delay: 800,
                    onComplete: emit6,
                    callbackScope: this
                })
                setTimeout(soundstart6, 800)
                function soundstart6() {
                    ball.visible = true;
                }
            }
            function emit6() {
                ball.visible = false;
                emitter1.emitParticle(250, 10, 250)
                ball.x = 800;
                ball.y = 900;
                ball.tint = 0xffffff;
                game.scene.scenes[pageNo].tweens.add({
                    targets: ball,
                    y: ball.y - 550,
                    ease: 'Linear',
                    duration: 600,
                    delay: 600,
                    onComplete: emit7,
                    callbackScope: this
                })
                setTimeout(soundstart7, 600)
                function soundstart7() {
                    ball.visible = true;
                }
            }
            function emit7() {
                ball.x = 387;
                ball.y = 900;
                ball.setScale(1);
                ball.tint = 0xffffff;
                game.scene.scenes[pageNo].tweens.add({
                    targets: ball,
                    y: ball.y - 850,
                    ease: 'Linear',
                    duration: 800,
                    onComplete: emit,
                    callbackScope: this
                })
                ball.visible = true;
            }
        }
        blackscreen = this.add.image(0, 0, 'blackscreen').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        });
        blackscreen.visible = false
        failedpanel = this.add.image(240, 427, 'failedpanel').setOrigin(0.5, 0.5)
        finishboard = this.add.image(240, 427, 'finishboard').setOrigin(0.5, 0.5)
        replaybtn = this.add.image(164, 517.5, 'replaybtn').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        });
        nextbtn = this.add.image(341.5, 517.5, 'nextbtn').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        });
        homebtn = this.add.sprite(252.5, 517.5, 'homebtn').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        });
        homebtn.setScale(1)
        finishpanel = this.add.container()
        finishpanel.add(finishboard)
        finishpanel.add(failedpanel)
        finishpanel.add(replaybtn)
        finishpanel.add(nextbtn)
        finishpanel.add(homebtn)
        finishpanel.setScale(0)
        finishpanel.x = 300
        finishpanel.y = 350
        ball = this.add.image(387, 289, 'ball');
        ball.x = 387;
        ball.y = 900;
        ball.setScale(1);
        ball.tint = 0xffffff;
        emitter1 = this.add.particles('ball')
        emitter2 = emitter1.createEmitter({
            speed: {
                min: 5,
                max: 150
            },
            angle: {
                min: 0,
                max: 360
            },
            scale: {
                start: 0.3,
                end: 0
            },
            blendMode: 'ADD',
            tint: [0xff00ff, 0xffdc3a],
            lifespan: 1000,
            gravityY: 200,
            on: false,
        });
        function levelfailed() {
            playsoundeffects('crowdlose')
            finishboard.visible = false
            settings.visible = false
            level3home.visible = false
            nextbtn.visible = false
            homebtn.x = homebtn.x + 30
            replaybtn.x = replaybtn.x + 30
            game.scene.scenes[pageNo].tweens.add({
                targets: finishpanel,
                scaleX: 1,
                scaleY: 1,
                ease: 'Back',
                duration: 300,
            });
            game.scene.scenes[pageNo].tweens.add({
                targets: finishpanel,
                x: 50,
                y: 0,
                ease: 'Back',
                duration: 300,
            });
            blackscreen.visible = true
        }
        level3home = this.add.sprite(450, 37, 'level1home').setOrigin(0.5, 0.5).setInteractive()
        level3home.setScale(0.85)
        level3home.on('pointerdown', homeFun)
        level3home.on('pointerover', homeoverFun)
        level3home.on('pointerout', homeoutFun)
        function homeoutFun() {
            this.setScale(0.85)
        }
        function homeoverFun() {
            this.setScale(0.90)
        }
        function homeFun() {
            hometransitionIn()
        }
        logomutefun()
        this.load.on('complete', function () {
            loadFinish = true;
        });
        this.load.start();
        transitionOut()
    },
    update: function () {
        if ((Math.round(level3lpbar1.x) <= 134)) {
            if (Math.round(level3lpbar1.x) <= -77.5) {
                emojis.setFrame(0)
                level3lpbar1.setVisible(true);
                level3lpbar2.setVisible(false);
                level3lpbar3.setVisible(false);
                level3lpbar4.setVisible(false);
                emojis.x = Math.round(level3lpbar1.x) + 252
            } else if ((Math.round(level3lpbar1.x) > -77.5) && (Math.round(level3lpbar1.x) <= -7)) {
                emojis.setFrame(1)
                level3lpbar1.setVisible(false);
                level3lpbar2.setVisible(true);
                level3lpbar3.setVisible(false);
                level3lpbar4.setVisible(false);
                emojis.x = Math.round(level3lpbar1.x) + 252
            } else if ((Math.round(level3lpbar1.x) > -7) && (Math.round(level3lpbar1.x) <= 63.5)) {
                emojis.setFrame(2)
                level3lpbar1.setVisible(false);
                level3lpbar2.setVisible(false);
                level3lpbar3.setVisible(true);
                level3lpbar4.setVisible(false);
                emojis.x = Math.round(level3lpbar1.x) + 252
            } else if ((Math.round(level3lpbar1.x) > 63.5) && (Math.round(level3lpbar1.x) <= 134)) {
                emojis.setFrame(3)
                level3lpbar1.setVisible(false);
                level3lpbar2.setVisible(false);
                level3lpbar3.setVisible(false);
                level3lpbar4.setVisible(true);
                emojis.x = Math.round(level3lpbar1.x) + 252
            }
        } else if ((Math.round(level3lpbar1.x) > 134)) {
            level3lpbar1.x = 134
            level3lpbar2.x = 134
            level3lpbar3.x = 134
            level3lpbar4.x = 134
            emojis.setFrame(3)
            level3lpbar1.setVisible(false);
            level3lpbar2.setVisible(false);
            level3lpbar3.setVisible(false);
            level3lpbar4.setVisible(true);
            emojis.x = Math.round(level3lpbar1.x) + 252
        }
    }
});
function level3start() {
    replaybtn.on('pointerover', replaybtnpopover)
    replaybtn.on('pointerout', replaybtnpopout)
    replaybtn.on('pointerdown', replaybtnpopdown)
    replaybtn.on('pointerup', replaybtnpopup)
    function replaybtnpopdown() {
        playsoundeffects('itemclick')
        count = 0
        levelarr[1] = 1
    }
    function replaybtnpopdown() {
        playsoundeffects('itemclick')
        nailcount = 0
        nextnail = true
    }
    function replaybtnpopup() {
        game.scene.scenes[pageNo].scene.restart();
    }
    nextbtn.on('pointerdown', nextbtnpopdown)
    nextbtn.on('pointerover', replaybtnpopover)
    nextbtn.on('pointerout', replaybtnpopout)
    function nextbtnpopdown() {
        if (!startgame6 && loadFinish) {
            startgame6 = true
            playsoundeffects('itemclick')
            if (level == 3) {
                level = 4
            }
            saveFile()
            //showNextAd()
            setTimeout(nextbtnpopdown1, 200)
        }
    }
    function nextbtnpopdown1() {
        transitionIn()
    }
    homebtn.on('pointerdown', homebtnpopdown)
    homebtn.on('pointerover', homeoverFun)
    homebtn.on('pointerout', homeoutFun)
    function homeoutFun() {
        this.setScale(1)
    }
    function homeoverFun() {
        this.setScale(1.05)
    }
    function homebtnpopdown() {
        hometransitionIn()
    }
    function replaybtnpopover() {
        this.setScale(1.05)
    }
    function replaybtnpopout() {
        this.setScale(1)
    }
}