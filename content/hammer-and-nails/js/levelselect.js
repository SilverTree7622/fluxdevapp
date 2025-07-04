var levelselect = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function levelselect() {
        Phaser.Scene.call(this, {
            key: 'levelselect'
        });
    },
    preload: function () {
        pageNo = 3
    },
    create: function () {
        window['UtilPlatform'].sendMsg2Parent('ShowNavFooterPlay');
        levelselectbackground = this.add.sprite(0, 0, 'levelselectbackground').setOrigin(0, 0)
        level1leveltext = this.add.text(204, 16, 'levels', {
            font: '34px Nunito',
        }).setOrigin(0, 0)
        var levelxarr = [, 58, 208, 361, 58, 208, 361, 58, 208, 361, 58, 208, 361, 58, 208, 361, 58, 208, 361, 58, 208, 361, 58, 208, 361, 58, 208, 361, 58, 208, 361]
        var levelyarr = [, 62, 62, 62, 202, 202, 202, 358, 358, 358, 505, 505, 505, 655, 655, 655, 62, 62, 62, 202, 202, 202, 358, 358, 358, 505, 505, 505, 655, 655, 655]
        for (i = 1; i <= 30; i++) {
            game['levelbtn' + i] = this.add.sprite(levelxarr[i] - 1, levelyarr[i] - 1, 'levelbtn' + i).setOrigin(0.5, 0.5).setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            })
            game['levelbtn' + i].visible = false
            game['levelbtn' + i].x += parseFloat(game['levelbtn' + i].width / 2)
            game['levelbtn' + i].y += parseFloat(game['levelbtn' + i].height / 2)
        }
        for (i = 1; i <= 15; i++) {
            game['levelbtn' + i].visible = true
        }
        var levelnxarr = [, 58, 208, 361, 58, 208, 361, 58, 208, 361, 60, 210, 363, 58, 208, 361, 58, 208, 361, 58, 208, 361, 58, 208, 361, 58, 208, 361, 58, 208, 361]
        var levelnyarr = [, 62, 62, 62, 202, 202, 202, 358, 358, 358, 505, 505, 505, 655, 655, 655, 62, 62, 62, 202, 202, 202, 358, 358, 358, 505, 505, 505, 655, 655, 655]
        for (i = 1; i <= 9; i++) {
            game['levelno' + i] = this.add.sprite(levelnxarr[i] + 40, levelnyarr[i] + 55, 'levelno' + i).setOrigin(0.5, 0.5)
            game['levelno' + i].x += parseFloat(game['levelno' + i].width / 2)
            game['levelno' + i].y += parseFloat(game['levelno' + i].height / 2)
            game['levelno' + i].setFrame(0)
            game['levelno' + i].visible = false
        }
        for (i = 10; i <= 30; i++) {
            game['levelno' + i] = this.add.sprite(levelnxarr[i] + 30, levelnyarr[i] + 55, 'levelno' + i).setOrigin(0.5, 0.5)
            game['levelno' + i].x += parseFloat(game['levelno' + i].width / 2)
            game['levelno' + i].y += parseFloat(game['levelno' + i].height / 2)
            game['levelno' + i].setFrame(0)
            game['levelno' + i].visible = false
        }
        for (i = 1; i <= level; i++) {
            game['levelno' + i].visible = true
            game['levelno' + i].setFrame(i)
            game['levelbtn' + i].setFrame(1)
        }
        arrow1 = this.add.image(126, 790, 'arrow1').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        arrow2 = this.add.image(348, 790, 'arrow2').setOrigin(0, 0).setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        })
        page = this.add.sprite(245, 798, 'page').setOrigin(0, 0)
        arrow1.visible = false
        arrow2.visible = true
        game.scene.scenes[pageNo].tweens.add({
            targets: arrow2,
            x: arrow2.x + 4,
            ease: 'Linear',
            duration: 700,
            repeat: -1,
            yoyo: true,
        });
        game.scene.scenes[pageNo].tweens.add({
            targets: arrow1,
            x: arrow1.x - 4,
            ease: 'Linear',
            duration: 700,
            repeat: -1,
            yoyo: true,
        });
        if (level > 15) {
            page.setFrame(1)
            for (i = 16; i <= 30; i++) {
                game['levelno' + i].visible = true
                game['levelbtn' + i].visible = true
            }
            for (i = 1; i <= 15; i++) {
                game['levelno' + i].visible = false
                game['levelbtn' + i].visible = false
            }
            arrow2.visible = false
            arrow1.visible = true
        }
        transitionOut()
    }
})
function levelselectstart() {
    for (i = 1; i <= level; i++) {
        game['levelbtn' + i].on('pointerover', levelbtnover)
        game['levelbtn' + i].on('pointerout', levelbtnout)
        game['levelbtn' + i].on('pointerdown', levelbtndown)
        game['levelno' + i].on('pointerover', levelbtnover)
        game['levelno' + i].on('pointerout', levelbtnout)
    }
    function levelbtnover() {
        this.setScale(1.05)
    }
    function levelbtnout() {
        this.setScale(1)
    }
    function levelbtndown() {
        window['UtilPlatform'].sendMsg2Parent('HideNavFooterPlay');
        this.setScale(1)
        playsoundeffects('itemclick')
        sno = this.texture.key.substr(8)
        lcount = parseInt(sno)
        //showNextAd()
        hometransitionIn()
    }
    arrow1.on('pointerdown', levelpage1)
    function levelpage1() {
        playsoundeffects('setclick')
        page.setFrame(0)
        for (i = 1; i <= 15; i++) {
            game['levelno' + i].visible = true
            game['levelbtn' + i].visible = true
        }
        for (i = 16; i <= 30; i++) {
            game['levelno' + i].visible = false
            game['levelbtn' + i].visible = false
        }
        arrow1.visible = false
        arrow2.visible = true
    }
    arrow2.on('pointerdown', levelpage2)
    function levelpage2() {
        playsoundeffects('setclick')
        page.setFrame(1)
        for (i = 16; i <= 30; i++) {
            game['levelno' + i].visible = true
            game['levelbtn' + i].visible = true
        }
        for (i = 1; i <= 15; i++) {
            game['levelno' + i].visible = false
            game['levelbtn' + i].visible = false
        }
        arrow2.visible = false
        arrow1.visible = true
    }
}