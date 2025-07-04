
var startgame27 = false

var count = 0

var level25 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function level25() {
        Phaser.Scene.call(this, {
            key: 'level25'
        });
    },
    preload: function () {
        pageNo = 27

        startgame27 = false
        loadFinish = false
        count = 0

    },
    create: function () {
        level1background = this.add.image(0, 0, 'level1background').setOrigin(0, 0)
        level1lpbg = this.add.image(102, 82, 'level1lpbg').setOrigin(0, 0)
        level1lpbar = this.add.image(-168, 85, 'level1lpmask').setOrigin(0, 0)
        level1lpmask = this.add.image(103, 85, 'level1lpmask').setOrigin(0, 0).setVisible(false);
        level1lpmaskbg = this.add.image(61, 50, 'level1lpmaskbg').setOrigin(0, 0)
        mask = level1lpmask.createBitmapMask();
        mask.alpha = 0
        level1lpbar.setMask(mask);



        level25popbase = this.add.image(20, 168, 'level25popbase').setOrigin(0, 0)
        var l2popxrr = [, 129, 193, 262, 64, 129, 194, 259, 321, 38, 352, 38, 97, 295, 357, 63, 131, 197, 259, 323, 63, 127, 193, 257, 320, 109, 193, 279]
        var l2popyrr = [, 184, 184, 184, 248, 248, 248, 248, 248, 312, 315, 376, 376, 376, 376, 439, 439, 439, 442, 442, 507, 507, 507, 507, 507, 573, 573, 573]
        for (i = 27; i >= 1; i--) {
            game['level25pop' + i] = this.add.sprite(l2popxrr[i], l2popyrr[i], 'level25pop' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });
            game['level25pop' + i].x += parseFloat(game['level25pop' + i].width / 2);
            game['level25pop' + i].y += parseFloat(game['level25pop' + i].height / 2);
        }

        level25popupper = this.add.image(20, 168, 'level25popupper').setOrigin(0, 0)

        levelpop1 = this.add.container()
        levelpop1.add(level25popbase)
        for (i = 1; i <= 27; i++) {
            levelpop1.add(game['level25pop' + i])
        }
        levelpop1.add(level25popupper)


        level1numberpad = this.add.image(155, 720, 'level1numberpad').setOrigin(0, 0)
        level1number1 = this.add.image(181, 758, 'level1number1').setOrigin(0, 0)
        level1number2 = this.add.image(248, 756, 'level1number2').setOrigin(0, 0)

        level1number1.setFrame(pageNo - 2)
        level1number2.setFrame(level)
        level1arrow1 = this.add.image(338, 738, 'level1arrow').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        });
        level1arrow2 = this.add.image(148, 738, 'level1arrow').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        });
        level1arrow2.setScale(-1, 1)





        blackscreen = this.add.image(0, 0, 'blackscreen').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        });

        blackscreen.visible = false








        game.scene.scenes[pageNo].tweens.add({
            targets: level1arrow1,
            x: level1arrow1.x + 5,
            ease: 'Linear',
            duration: 300,
            repeat: -1,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: level1arrow2,
            x: level1arrow2.x - 5,
            ease: 'Linear',
            duration: 300,
            repeat: -1,
            yoyo: true,
        });

        level1arrow1.visible = false
        level1arrow2.visible = false
        if (level > 25) {
            level1arrow1.visible = true
        }
        if (level >= 25) {
            level1arrow2.visible = true
        }




        finishboard = this.add.image(240, 427, 'finishboard').setOrigin(0.5, 0.5)
        replaybtn = this.add.image(189, 517.5, 'replaybtn').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        });
        nextbtn = this.add.image(292.5, 517.5, 'nextbtn').setOrigin(0.5, 0.5).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        });


        finishpanel = this.add.container()
        finishpanel.add(finishboard)
        finishpanel.add(replaybtn)
        finishpanel.add(nextbtn)
        finishpanel.setScale(0)
        finishpanel.x = 250
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








        logomutefun()

        this.load.on('complete', function () {
            loadFinish = true;
        });
        
        this.load.start();
        level25start()

    }
});

function level25start() {
    if (animate == 1) {
        animate = 0
        levelpop1.x = 500
        game.scene.scenes[pageNo].tweens.add({
            targets: levelpop1,
            x: 0,
            ease: 'Linear',
            duration: 200,
        });
    } else if (animate == 2) {
        animate = 0
        levelpop1.x = -500
        game.scene.scenes[pageNo].tweens.add({
            targets: levelpop1,
            x: 0,
            ease: 'Linear',
            duration: 200,
        });
    }
    level1arrow1.on('pointerdown', level1arrow1popdown)

    function level1arrow1popdown() {
        animate = 1
        playsoundeffects('itemclick')
        game.scene.scenes[pageNo].tweens.add({
            targets: levelpop1,
            x: -500,
            ease: 'Linear',
            duration: 300,
            onComplete: level1transition1,
            callbackScope: this

        });

        function level1transition1() {
            
            game.scene.scenes[pageNo].scene.stop('level25')
            game.scene.run('level26');

        }


    }
    level1arrow2.on('pointerdown', level1arrow2popdown)

    function level1arrow2popdown() {
        animate = 2
        playsoundeffects('itemclick')
        game.scene.scenes[pageNo].tweens.add({
            targets: levelpop1,
            x: 500,
            ease: 'Linear',
            duration: 300,
            onComplete: level1transition1,
            callbackScope: this

        });

        function level1transition1() {
            
            game.scene.scenes[pageNo].scene.stop('level25')
            game.scene.run('level24');
        }


    }



    replaybtn.on('pointerover', replaybtnpopover)
    replaybtn.on('pointerout', replaybtnpopout)
    nextbtn.on('pointerover', replaybtnpopover)
    nextbtn.on('pointerout', replaybtnpopout)
    replaybtn.on('pointerdown', replaybtnpopdown)

    function replaybtnpopdown() {
        playsoundeffects('itemclick')
        game.scene.scenes[pageNo].scene.restart();
    }

    nextbtn.on('pointerdown', nextbtnpopdown)

    function nextbtnpopdown() {
        if (!startgame27 && loadFinish) {
            startgame27 = true
            playsoundeffects('itemclick')
            if (level == 25) {
                level = 26
            }
            setTimeout(nextbtnpopdown1, 200)
        }
    }


    function nextbtnpopdown1() {

        game.scene.scenes[pageNo].scene.stop('level25')
        game.scene.run('level26');
    }

    for (i = 27; i >= 1; i--) {
        game['level25pop' + i].on('pointerdown', level1popdown)
        game['level25pop' + i].on('pointermove', level1popdown)
    }



    function level1popdown(pointer) {
        if (pointer.isDown) {
            sno = this.texture.key.substr(10)
            if (game['level25pop' + parseInt(sno)].frame.name == 0) {
                playsoundeffects('clickss')
                game['level25pop' + parseInt(sno)].setFrame(1)
                count = count + 1

                level1lpbar.x = level1lpbar.x + (271 / 27)
                overlayscreen()
            }



        }

    }

    function overlayscreen() {
        if (count == 27) {
            playsoundeffects('complete')

            game.scene.scenes[pageNo].tweens.add({
                targets: finishpanel,
                scaleX: 1,
                scaleY: 1,
                ease: 'Back',
                duration: 300,


            });
            game.scene.scenes[pageNo].tweens.add({
                targets: finishpanel,
                x: 0,
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


            setTimeout(soundstart11, 800)

            function soundstart11() {

            }

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
                    //                
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

    }

}