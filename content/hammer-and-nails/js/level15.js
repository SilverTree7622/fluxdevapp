var startgame18 = false
var clickstart = 0
var timevalue = 1
var timearr = [0, 45, 0, 0, 0, 0, 0, 0]
var time = timevalue * 60
var harr1 = [1, 2, 3, 4]
var nailcount = 0
var nextnail = true
var levelfail = false
var minDistance = 150;
var currentNailx;
var currentNaily;

var randomArrx = [0];
var randomArry = [0];
var a = [0];
var b = [0];

var hammerOn = 0
var level15 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function level15() {
        Phaser.Scene.call(this, {
            key: 'level15'
        });
    },
    preload: function () {
        pageNo = 18
        startgame18 = false
        levelfailed = false
        nextnail = true
        count = 0
        nailcount = 0
        minDistance = 60;
        loadFinish = false
        clickstart = 0
        randomArrx = [0]
        randomArry = [0]
        a = [0];
        b = [0];
        minDistance = 50
        timearr = [0, 45, 0, 0, 0, 0, 0, 0]
        timevalue = 1
        time = timevalue * 60
    },
    create: function () {

        level15background = this.add.image(0, 0, 'level1background').setOrigin(0, 0).setInteractive()
        level15wood = this.add.image(64, 37, 'level1wood').setOrigin(0, 0)
        level15blast = this.add.sprite(150, 209, 'level1blast').setOrigin(0, 0)

        level15blast.visible = false

        bomb = this.add.sprite(300, 200, 'bomb').setOrigin(0, 0).setInteractive();
        explode = this.add.sprite(300, 200, 'explode').setOrigin(0, 0)
        explode.visible = false

        for (var i = 29; i >= 1; i--) {
            var x, y;
            do {
                x = Phaser.Math.Between(100, 455);
                y = Phaser.Math.Between(200, 765);
            } while (checkCollision(x, y, randomArrx, randomArry));

            randomArrx.push(x);
            randomArry.push(y);

            game['level15nail' + i] = this.add.sprite(x + 20, y, 'level1nail' + i).setOrigin(0.5, 0.5).setInteractive();
            game['level15nail' + i].setFrame(1);
            game['level15nail' + i].visible = false



        }

        game['level15nail' + 1].visible = true

        function checkCollision(x, y, arrX, arrY) {
            for (var i = 0; i < arrX.length; i++) {
                var distance = Phaser.Math.Distance.Between(x, y, arrX[i], arrY[i]);
                if (distance < minDistance) {
                    return true; 
                }

            }
            return false; 


        }


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
        levelpop1.add(level15wood)
        levelpop1.add(bomb)
        levelpop1.add(explode)
        for (i = 29; i >= 1; i--) {
            levelpop1.add(game['level15nail' + i])
        }

        levelpop1.add(level15blast)
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
            frameRate: 12,
            yoyo: true,
        });
        level15blast.anims.load('level1blast')
        level15blast.x = 354
        level15blast.y = 422
        anim = game.scene.scenes[pageNo].anims.create({
            key: 'bomb',
            frames: game.scene.scenes[pageNo].anims.generateFrameNumbers('bomb', {
                start: 0,
                end: 1
            }),
            frameRate: 6,
            yoyo: true,
            ease: 'Back.easeOut',
            repeat: -1
        });

        bomb.anims.load('bomb')
        bomb.anims.play('bomb')




        timecheck()

        function timecheck() {

            if (timearr[0] > 0 && timearr[1] >= 0 && nailcount <= 29 && nextnail) {

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

            } else if (timearr[0] == 0 && timearr[1] > 0 && nailcount <= 29 && nextnail) {
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
            if (nailcount == 29 && !nextnail) {
                finalpanel()
                
            } else {
                if (!levelfail) {
                    levelfailed()
                }
                
                t1.remove()
                
            }

        }

        level15lpbg = this.add.image(135, 93, 'level1lpbg').setOrigin(0, 0)
        level15lpbar4 = this.add.image(-148, 93, 'level1lpmask4').setOrigin(0, 0)
        level15lpbar3 = this.add.image(-148, 93, 'level1lpmask3').setOrigin(0, 0)
        level15lpbar2 = this.add.image(-148, 93, 'level1lpmask2').setOrigin(0, 0)
        level15lpbar1 = this.add.image(-148, 93, 'level1lpmask1').setOrigin(0, 0)
        level15lpmask1 = this.add.image(135, 93, 'level1lpmask1').setOrigin(0, 0).setVisible(false);
        mask = level15lpmask1.createBitmapMask();
        mask.alpha = 0
        
        level15lpbar4.setMask(mask);
        level15lpbar3.setMask(mask);
        level15lpbar2.setMask(mask);
        level15lpbar1.setMask(mask);
        emojis = this.add.sprite(122, 85, 'emoji').setOrigin(0, 0).setScale(0.7)

        level15stresstxt = this.add.image(180, 49, 'level1stresstxt').setOrigin(0, 0)



        for (i = 29; i >= 1; i--) {
            game['level15nail' + i].on('pointerdown', hammerFun)
        }


        function hammerFun() {

            sno = this.texture.key.substr(10, 11)
            narr1[0] = sno
            rhammer.visible = false
            shammer.visible = false
            lhammer.visible = false

            currentNailx = game['level15nail' + narr1[0]].x
            currentNaily = game['level15nail' + narr1[0]].y

            if (game['level15nail' + narr1[0]].x >= 75 && game['level15nail' + narr1[0]].x <= 215) {
                lhammer.x = game['level15nail' + narr1[0]].x - 65
                lhammer.y = game['level15nail' + narr1[0]].y - 45
                lhammer.anims.play('lhammer')
                lhammer.visible = true
            } else if (game['level15nail' + narr1[0]].x >= 215 && game['level15nail' + narr1[0]].x <= 354) {
                shammer.x = game['level15nail' + narr1[0]].x - 45
                shammer.y = game['level15nail' + narr1[0]].y - 45
                shammer.anims.play('shammer')
                shammer.visible = true
            } else if (game['level15nail' + narr1[0]].x >= 355 && game['level15nail' + narr1[0]].x <= 495) {
                rhammer.x = game['level15nail' + narr1[0]].x - 45
                rhammer.y = game['level15nail' + narr1[0]].y - 45
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
            if (game['level15nail' + narr1[0]].frame.name == 1) {
                game['level15nail' + narr1[0]].setFrame(harr1[1])
                setTimeout(hiddenHammer, 200)
            } else if (game['level15nail' + narr1[0]].frame.name == 2) {
                game['level15nail' + narr1[0]].setFrame(harr1[2])
                setTimeout(hiddenHammer, 200)
            } else if (game['level15nail' + narr1[0]].frame.name == 3) {
                game['level15nail' + narr1[0]].setFrame(harr1[3])
                game['level15nail' + narr1[0]].disableInteractive()
                game.scene.scenes[pageNo].tweens.add({
                    targets: game['level15nail' + narr1[0]],
                    alpha: 0,
                    ease: 'Back',
                    delay: 300,
                    duration: 300,
                });
                if (narr1[0] <= 29) {
                    nailcount = nailcount + 1
                    setTimeout(newnail, 200)
                    if (nailcount < 29) {

                        game['level15nail' + (nailcount + 1)].visible = true
                    }
                }


            }


        }



        function newnail() {
            hammerOn = Phaser.Math.Between(0, 2)


            rhammer.visible = false
            shammer.visible = false
            lhammer.visible = false
            level15lpbar1.x = level15lpbar1.x + (282 / 29)
            level15lpbar2.x = level15lpbar2.x + (282 / 29)
            level15lpbar3.x = level15lpbar3.x + (282 / 29)
            level15lpbar4.x = level15lpbar4.x + (282 / 29)
            if (nailcount == 29) {
                nextnail = false
                rhammer.disableInteractive()
                shammer.disableInteractive()
                lhammer.disableInteractive()
                bomb.disableInteractive()

            }

        }



        function hiddenHammer() {
            rhammer.visible = false
            shammer.visible = false
            lhammer.visible = false

        }


        bomb.on('pointerdown', bombFun)

        function bombFun() {
            

            playsoundeffects('explode')
            if (bomb.x >= 75 && bomb.x <= 215) {
                lhammer.x = bomb.x
                lhammer.y = bomb.y
                lhammer.anims.play('lhammer')
                lhammer.visible = true
            } else if (bomb.x >= 215 && bomb.x <= 354) {
                shammer.x = bomb.x
                shammer.y = bomb.y
                shammer.anims.play('shammer')
                shammer.visible = true
            } else if (bomb.x >= 355 && bomb.x <= 495) {
                rhammer.x = bomb.x
                rhammer.y = bomb.y
                rhammer.anims.play('rhammer')
                rhammer.visible = true
            }
            bomb.off('pointerdown', bombFun)
            level15blast.visible = true
            bomb.visible = false
            explode.visible = true
            explode.x = bomb.x - 30
            explode.y = bomb.y

            level15blast.x = bomb.x - 30
            level15blast.y = bomb.y - 10
            level15blast.anims.play('level1blast')

            for (i = 29; i >= 1; i--) {
                game['level15nail' + i].disableInteractive()
            }

            setTimeout(timeup, 500)
            setTimeout(hiddenHammer, 100)
            setTimeout(bombexplode, 500)


            t1.remove()

        }
        bomb.alpha = 0
        if (nailcount < 29 && nextnail && timearr[1] != 0) {
            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 1000,
                callback: bombrespawn,
                callbackScope: this
            })
        }


        function bombexplode() {
            t1.remove()
            level15blast.visible = false
        }


        function bombrespawn() {

          
            var collision;
            do {
                x = Phaser.Math.Between(150, 400);
                y = Phaser.Math.Between(200, 705);


                collision = checkCollision(x, y, randomArrx, randomArry);

            } while (collision);

            function checkCollision(x, y, arrX, arrY) {
                var miniDistance = 50
                for (var i = 0; i < arrX.length; i++) {
                    var distance = Phaser.Math.Distance.Between(x, y, arrX[i], arrY[i]);
                    if (distance < miniDistance) {

                        return true;
                    }
                }

                return false;
            }


            bomb.x = x;
            bomb.y = y;
            level15blast.x = x;
            level15blast.y = y;

            game.scene.scenes[pageNo].tweens.add({
                targets: bomb,
                alpha: 1,
                ease: 'Back',
                duration: 300,
            });
            bomb.visible = true;





            t1 = game.scene.scenes[pageNo].time.addEvent({
                delay: 2000,
                callback: bombFun1,
                callbackScope: this,
            });

        }

        function bombFun1() {
            game.scene.scenes[pageNo].tweens.add({
                targets: bomb,
                alpha: 0,
                ease: 'Back',
                duration: 300,
            });
            if (nailcount < 29 && nextnail && timearr[1] != 0) {
                setTimeout(bombrespawn, 1000)
            }

        }

        function finalpanel() {
            failedpanel.visible = false
            playsoundeffects('crowdwin')
            settings.visible = false
            level15home.visible = false
            if (level == 15) {
                level = 16
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
            levelfailed = true
            playsoundeffects('crowdlose')
            finishboard.visible = false
            settings.visible = false
            level15home.visible = false
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

        level15home = this.add.sprite(450, 37, 'level1home').setOrigin(0.5, 0.5).setInteractive()
        level15home.setScale(0.85)
        level15home.on('pointerdown', homeFun)
        level15home.on('pointerover', homeoverFun)
        level15home.on('pointerout', homeoutFun)

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

        if ((Math.round(level15lpbar1.x) <= 134)) {
            if (Math.round(level15lpbar1.x) <= -77.5) {
                emojis.setFrame(0)
                level15lpbar1.setVisible(true);
                level15lpbar2.setVisible(false);
                level15lpbar3.setVisible(false);
                level15lpbar4.setVisible(false);
                emojis.x = Math.round(level15lpbar1.x) + 252
            } else if ((Math.round(level15lpbar1.x) > -77.5) && (Math.round(level15lpbar1.x) <= -7)) {
                emojis.setFrame(1)
                level15lpbar1.setVisible(false);
                level15lpbar2.setVisible(true);
                level15lpbar3.setVisible(false);
                level15lpbar4.setVisible(false);
                emojis.x = Math.round(level15lpbar1.x) + 252
            } else if ((Math.round(level15lpbar1.x) > -7) && (Math.round(level15lpbar1.x) <= 63.5)) {
                emojis.setFrame(2)
                level15lpbar1.setVisible(false);
                level15lpbar2.setVisible(false);
                level15lpbar3.setVisible(true);
                level15lpbar4.setVisible(false);
                emojis.x = Math.round(level15lpbar1.x) + 252
            } else if ((Math.round(level15lpbar1.x) > 63.5) && (Math.round(level15lpbar1.x) <= 134)) {
                emojis.setFrame(3)
                level15lpbar1.setVisible(false);
                level15lpbar2.setVisible(false);
                level15lpbar3.setVisible(false);
                level15lpbar4.setVisible(true);
                emojis.x = Math.round(level15lpbar1.x) + 252
            }
        } else if ((Math.round(level15lpbar1.x) > 134)) {
            level15lpbar1.x = 134
            level15lpbar2.x = 134
            level15lpbar3.x = 134
            level15lpbar4.x = 134
            emojis.setFrame(3)
            level15lpbar1.setVisible(false);
            level15lpbar2.setVisible(false);
            level15lpbar3.setVisible(false);
            level15lpbar4.setVisible(true);
            emojis.x = Math.round(level15lpbar1.x) + 252
        }
    }
});

function level15start() {

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
        if (!startgame18 && loadFinish) {
            startgame18 = true
            playsoundeffects('itemclick')
            if (level == 15) {
                level = 16
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
