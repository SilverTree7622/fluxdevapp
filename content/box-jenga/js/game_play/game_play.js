let GamePlay = new Phaser.Class({
 
	Extends: Phaser.GameObjects.Container,   

	initialize:

	function GamePlay (scene)
	{
		this.scene = game_data['scene'];
		Phaser.GameObjects.Container.call(this, this.scene, 0, 0);        
		this.emitter = new Phaser.Events.EventEmitter();
        this.level_started = false;
        this.button_mode = true;
        this.hasUsedReward = false;
	},

	init(params) {
        game_data['game_play'] = this;
        this.score = 0;
        this.scene.matter.world.update30Hz();
        this.canDrop = true;
        this.timer = 0;
        this.level_active = true;
        this.timerEvent = null;
        this.restart_tid = null;
        this.game_play_started = false;
        this.menuGroup = this.scene.add.group();
        this.finalScoreGroup = this.scene.add.group();
        this.addSky();
        this.addGround();
        this.addMovingCrate();
        this.addTap();
        this.createSoundButtons();
        this.createLangButton();
        this.addShop();

        this.timeText = this.scene.add.bitmapText(635, 55, "font", gameOptions.timeLimit.toString(), 72);
        this.timeText.setOrigin(1, 0.5);
        this.add(this.timeText);
        this.crateGroup = this.scene.add.group();
        this.scene.matter.world.on("collisionstart", this.checkCollision, this);
        
        let res = game_data['utils'].generate_string({'scene_id': 'game_play', 'item_id': 'game_play', 'phrase_id': '1', 'values': [], 'base_size': 24});
        let hiScoreText = this.scene.add.bitmapText(gameOptions.width / 2, gameOptions.height - 74 - 20, "font", res['text'], res['size']);
        hiScoreText.setOrigin(0.5);
        this.menuGroup.add(hiScoreText);
        this.hiScoreText = hiScoreText;
        let hiScore = this.scene.add.bitmapText(gameOptions.width / 2, gameOptions.height - 20 - 20, "font", game_data['user_data']['global_score'].toString(), 72);
        hiScore.setOrigin(0.5);
        this.menuGroup.add(hiScore);
        this.hiScore = hiScore;
        
        res = game_data['utils'].generate_string({'scene_id': 'game_play', 'item_id': 'game_play', 'phrase_id': '2', 'values': [], 'base_size': 38});
        let tutTxt = this.scene.add.bitmapText(gameOptions.width / 2, gameOptions.height / 2 - 150, "font", res['text'], res['size'], 1);
        tutTxt.setOrigin(0.5);
        this.tutTxt = tutTxt;
        this.menuGroup.add(tutTxt);

        this.add(hiScoreText);
        this.add(hiScore);
        this.add(tutTxt);
        if (this.button_mode) {
            this.menuGroup.setVisible(false);
            this.button_start = new CustomButton(game_data['scene'], loading_vars['W'] / 2, loading_vars['H'] / 2 + 100, this.handler_start, 'common1'
            , 'btn_play2', 'btn_play2', 'btn_play2', this, null, null, 1);
            this.add(this.button_start);
            this.button_start_txt = this.scene.add.bitmapText(0, 6, "font", "Start", 50);
            this.button_start_txt.setOrigin(0.5);
            this.button_start.add(this.button_start_txt);
        }
        this.setCameras();
        // game_data['utils'].check_ads('game_start');
        
        const animConfig = {
            key: 'loading_anim',
            frames: this.anims.generateFrameNumbers('loading', {}),
            frameRate: 20,
            repeat: -1
        };
        this.anims.create(animConfig);
    },

    createLangButton() {
        this.button_lang = new Phaser.GameObjects.Container(this.scene, 0, 0);
        this.button_lang.scale = 0.8;
        this.add(this.button_lang);

        this.button_lang2 = new CustomButton(this.scene, 50, 60, this.handler_lang, 'common1', 'btn_lang', 'btn_lang', 'btn_lang',  this);
        this.button_lang.add(this.button_lang2);
    },

    handler_lang() {
        this.emitter.emit('EVENT', {'event': 'show_window', 'window_id': 'select_language'});
    },

    createSoundButtons() {
        this.buttonsGroup = this.scene.add.group();

        this.button_music = new Phaser.GameObjects.Container(this.scene, 0, 0);
        this.button_music.scale = 0.8;
        this.add(this.button_music);
        this.button_music_on = new CustomButton(this.scene, 150, 60, this.handler_music, 'common1', 'btn_music_on', 'btn_music_on', 'btn_music_on',  this);
        this.button_music.add(this.button_music_on);
        this.button_music_off = new CustomButton(this.scene, 150, 60, this.handler_music, 'common1', 'btn_music_off', 'btn_music_off', 'btn_music_off', this);
        this.button_music.add(this.button_music_off);
        this.buttonsGroup.add(this.button_music);
         
        this.button_sound = new Phaser.GameObjects.Container(this.scene, 0, 0);
        this.button_sound.scale = 0.8;
        this.add(this.button_sound);
        this.button_sound_on = new CustomButton(this.scene, 250, 60, this.handler_sound, 'common1', 'btn_sound_on', 'btn_sound_on', 'btn_sound_on', this);
        this.button_sound.add(this.button_sound_on);
        this.button_sound_off = new CustomButton(this.scene, 250, 60, this.handler_sound, 'common1', 'btn_sound_off', 'btn_sound_off', 'btn_sound_off', this);
        this.button_sound.add(this.button_sound_off);
        this.buttonsGroup.add(this.button_sound);
        
        this.update_buttons();
    },

    addShop() {
        this.shop_icon = new CustomButton(this.scene, 285, 45, this.handler_shop, 'common1', 'shop_icon', 'shop_icon', 'shop_icon',  this);
        this.add(this.shop_icon);
        if (!allow_shop) this.shop_icon.setVisible(false);
    },

    handler_shop() {
        this.emitter.emit('EVENT', {'event': 'show_scene', 'scene_id': 'SHOP'});
    },

    handler_music(params) { 	
        game_data['user_data']['music'] = 1 - game_data['user_data']['music'];
        this.update_buttons();
        game_request.request({'set_options': true, 'sound': game_data['user_data']['sound'] , 'music': game_data['user_data']['music']}, function(){});
        game_data['audio_manager'].update_volume();
    },
    
    handler_sound(params) {
        game_data['user_data']['sound'] = 1 - game_data['user_data']['sound'];
        this.update_buttons();
        game_request.request({'set_options': true, 'sound': game_data['user_data']['sound'] , 'music': game_data['user_data']['music']}, function(){});
        game_data['audio_manager'].update_volume();
    },

    update_buttons() {
        this.button_music_on.visible = game_data['user_data']['music'] == 1;
        this.button_music_off.visible = game_data['user_data']['music'] == 0;
        
        this.button_sound_on.visible = game_data['user_data']['sound'] == 1;
        this.button_sound_off.visible = game_data['user_data']['sound'] == 0;
    },
    setCameras(){
        this.actionCamera = this.scene.cameras.add(0, 0, gameOptions.width, gameOptions.height);
        
        this.actionCamera.ignore([
            this.sky, this.timeText, this.tap, this.button_sound_on, this.button_sound_off, this.button_music_on, this.button_music_off,
            this.button_lang, this.shop_icon, game_data.shop_cont, game_data.game_windows
        ]);
        if (this.button_mode) {
            this.actionCamera.ignore([this.button_start]);
            
        }
        this.scene.cameras.main.ignore([this.ground, this.ground2, this.movingCrate, game_data.game_windows, this.tutTxt]);
    },

    restartLevel() {
        window['UtilPlatform'].sendMsg2Parent('ShowNavFooterPlay');
        game_data.scene.matter.world.autoUpdate = true;
        this.canDrop = true;
        this.level_active = true;
        this.game_play_started = false;
        this.restart_tid = null;
        this.timer = 0;
        this.score = 0;
        this.timeText.text = gameOptions.timeLimit.toString();
        this.timerEvent.destroy();
        this.timerEvent = null;
        this.menuGroup.setVisible(true);
        this.hiScore.text = game_data['user_data']['global_score'].toString();
        this.crateGroup.clear(true, true);
        this.finalScoreGroup.clear(true, true);
        this.movingCrate.setVisible(true);
        this.zoomCamera();
        if (this.button_mode) {
            this.button_start.setVisible(true);
            this.menuGroup.setVisible(false);
            this.level_started = false;
        }
    },

    show_gameplay() {

    },

    handler_start() {
        this.level_started = true;
        this.menuGroup.setVisible(true);
        this.button_start.setVisible(false);
        // game_data['utils'].check_ads('level_start');
    },

    pre_func(on_complete = () => {}) {
        if (this.level_started) {
            on_complete();
        }
    },

    addTap() {
        this.tap = this.scene.add.sprite(gameOptions.width / 2, gameOptions.height / 2 + 60, "common1", "tap");
        this.add(this.tap);
        this.menuGroup.add(this.tap);
        this.tapTween = this.scene.tweens.add({
            targets: this.tap,
            alpha: 0,
            duration: 150,
            yoyo: true,
            ease: 'Cubic.easeInOut',
            repeat: -1
        })
    },
    addSky(){
        this.sky = this.scene.add.sprite(0, 0, "back");
        this.sky.setOrigin(0, 0);
        this.sky.setInteractive();
        if (this.button_mode) {
            this.sky.on("pointerdown", () => {
                this.pre_func(() => {
                    this.dropCrate();
                });
                
            }, this);
        }
        else {
            this.sky.on("pointerdown", this.dropCrate, this);
        }
        
        this.add(this.sky);
    },
    addGround(){
        this.ground = this.scene.matter.add.sprite(gameOptions.width / 2, gameOptions.height, "common1", "ground");
        this.ground.alpha = 0.01;
        this.ground2 = this.scene.add.sprite(gameOptions.width / 2, gameOptions.height, "common1", "ground2");
        this.ground2.scaleY = 1.1;
        this.ground.setBody({
            type: "rectangle",
                width: this.ground.displayWidth,
                height: this.ground.displayHeight * 2
        });
        this.ground.setOrigin(0.5, 1);
        this.ground2.setOrigin(0.5, 1);
        this.ground.setStatic(true);
        this.add(this.ground);
        this.add(this.ground2);
    },
    addMovingCrate(){
        this.movingCrate = this.scene.add.sprite(gameOptions.width / 2 - gameOptions.crateRange[0], this.ground.getBounds().top - gameOptions.crateHeight, "common1", game_data['user_data']['current_resourse']);
        this.scene.tweens.add({
            targets: this.movingCrate,
            x: gameOptions.width / 2 - gameOptions.crateRange[1],
            duration: gameOptions.crateSpeed,
            yoyo: true,
            repeat: -1
        });
        this.add(this.movingCrate);
    },
    checkCollision(e, b1, b2){
        if(b1.isCrate && !b1.hit){
            b1.hit = true;
            this.play_collision_sound();
            this.nextCrate();
        }
        if(b2.isCrate && !b2.hit){
            b2.hit = true;
            this.play_collision_sound();
            this.nextCrate();
        }
    },
    play_collision_sound() {
        let soundName = Phaser.Utils.Array.GetRandom(['hit01', 'hit02', 'hit03']);
        game_data['audio_manager'].sound_event({'play': true, 'sound_name': soundName});
    },
    dropCrate(){
        if(this.canDrop && this.timer < gameOptions.timeLimit){
            if (!this.game_play_started) {
                game_data['utils'].game_play_start();
                window['UtilPlatform'].sendMsg2Parent('HideNavFooterPlay');
                console.log('window: ', window);
            }
            this.game_play_started = true;
            this.menuGroup.setVisible(false);
            this.addTimer();
            this.canDrop = false;
            this.movingCrate.visible = false;
            this.addFallingCrate();
        }
    },
    update(){
        if (this.crateGroup) {
            this.crateGroup.getChildren().forEach(function(crate){
                if(crate.y > gameOptions.height + crate.displayHeight){
                    if(!crate.body.hit){
                        this.nextCrate();
                    }
                    crate.destroy();
                }
            }, this);
        }

    },
    addTimer(){
        if(this.timerEvent == null){
            this.timerEvent = this.scene.time.addEvent({
                delay: 1000,
                callback: this.tick,
                callbackScope: this,
                loop: true
            });
        }
    },
    addFallingCrate(){
        let fallingCrate = this.scene.matter.add.sprite(
            this.movingCrate.x,
            this.movingCrate.y,
            "common1",
            game_data['user_data']['current_resourse'],
            {
                friction: 1,
                frictionStatic: 1,
                restitution: 0,
            }
        );

        fallingCrate.body.isCrate = true;
        fallingCrate.body.hit = false;
        this.crateGroup.add(fallingCrate);
        this.add(fallingCrate);
        this.scene.cameras.main.ignore(fallingCrate);
    },
    nextCrate(){
        if (this.level_active) {
            this.zoomCamera();
            this.canDrop = true;
            this.movingCrate.visible = true;
        }

    },
    zoomCamera(){
        let maxHeight = 0;
        this.crateGroup.getChildren().forEach(function(crate){
            if(crate.body.hit){
                maxHeight = Math.max(maxHeight, Math.round((this.ground.getBounds().top - crate.getBounds().top) / crate.displayWidth));
            }
        }, this);
        this.movingCrate.y = this.ground.getBounds().top - maxHeight * this.movingCrate.displayWidth - gameOptions.crateHeight;
        let zoomFactor = gameOptions.crateHeight / (this.ground.getBounds().top - this.movingCrate.y);
        this.actionCamera.zoomTo(zoomFactor, 500);
        let newHeight = gameOptions.height / zoomFactor;
        this.actionCamera.pan(gameOptions.width / 2, gameOptions.height / 2 - (newHeight - gameOptions.height) / 2, 500)
    },
    tick(){
        if (this.level_active) {
            this.timer++;
            this.timeText.text = (gameOptions.timeLimit - this.timer).toString()
            if(this.timer >= gameOptions.timeLimit){
                this.level_active = false;
                this.movingCrate.visible = false;
                setTimeout(() => { game_data.scene.matter.world.autoUpdate = false; }, 700);

                this.chckReward();
                // this.scene.time.addEvent({
                //     delay: 1000,
                //     callback: function(){
                //         this.removeEvent = this.scene.time.addEvent({
                //             delay: 180,
                //             callback: this.removeCrate,
                //             callbackScope: this,
                //             loop: true
                //         })
                //     },
                //     callbackScope: this
                // });
            } 
        }

    },
    removeCrate(){
        if(this.crateGroup.getChildren().length > 0){
            let tempCrate = this.crateGroup.getFirstAlive();
            let height = Math.round((gameOptions.height - GROUNDHEIGHT - tempCrate.y - CRATEHEIGHT / 2) / CRATEHEIGHT) + 1;
            this.score += height;
            let crateScoreText = this.scene.add.bitmapText(tempCrate.x, tempCrate.y, "font", height, 36);
            this.add(crateScoreText);
            crateScoreText.setOrigin(0.5);
            this.finalScoreGroup.add(crateScoreText);
            this.scene.cameras.main.ignore(crateScoreText)
            tempCrate.destroy();
            game_data['audio_manager'].sound_event({'play': true, 'sound_name': 'remove'});
        }
        else{
            let res = game_data['utils'].generate_string({'scene_id': 'game_play', 'item_id': 'game_play', 'phrase_id': '3', 'values': [], 'base_size': 72});
            let scoreText = this.scene.add.bitmapText(gameOptions.width / 2, gameOptions.height / 5, "font", res['text'], res['size']);
            scoreText.setOrigin(0.5);
            this.finalScoreGroup.add(scoreText);
            this.add(scoreText);
            let scoreDisplayText = this.scene.add.bitmapText(gameOptions.width / 2, gameOptions.height / 5 + 140, "font", this.score.toString(), 144);
            scoreDisplayText.setOrigin(0.5);
            this.finalScoreGroup.add(scoreDisplayText);
            this.add(scoreDisplayText);
            this.scene.cameras.main.ignore([scoreText, scoreDisplayText]);
            if (!this.restart_tid) {
                game_data['audio_manager'].sound_event({'play': true, 'sound_name': 'gameover'});
                game_data['utils'].game_play_stop();
                game_request.request({'level_failed': true, 'global_score': this.score, 'levels_passed': 0 }, params => {
                    if (params['new_score'] && 'global_score' in params) {
                        game_data['utils'].happy_moment();
                        game_data['utils'].update_score(params['global_score']);
                    }
                    if (params['new_stage'] && 'levels_passed' in params) game_data['utils'].update_level(params['levels_passed']);

                    this.restart_tid = setTimeout(() => {
                        this.removeEvent.remove();
                        game_data['utils'].check_ads('level_lost');
                        this.restartLevel();
                        // this.chckReward();
                    }, 1200);
                });
            }
        }
    },

    chckReward() {
        let goToMainMenuText = this.scene.add.bitmapText(gameOptions.width / 2, gameOptions.height / 2 + 100, "font", "Go to Main Menu", 36);
        goToMainMenuText.setInteractive({ useHandCursor: true });
        goToMainMenuText.on("pointerup", () => {
            // this.restartLevel();
            rewardBtn.destroy();
            goToMainMenuText.destroy();
            this.scene.time.addEvent({
                delay: 1000,
                callback: function(){
                    this.removeEvent = this.scene.time.addEvent({
                        delay: 180,
                        callback: this.removeCrate,
                        callbackScope: this,
                        loop: true
                    })
                },
                callbackScope: this
            });
        });
        goToMainMenuText.setOrigin(0.5);
        goToMainMenuText.setDepth(1000);
        this.add(goToMainMenuText);
        const pendingRewardSprite = this.scene.add.sprite(gameOptions.width / 2, gameOptions.height / 2, 'loading').setVisible(false);
        this.add(pendingRewardSprite);
        // add reward button & go to main menu text
        let rewardBtn = new CustomButton(
            this.scene, gameOptions.width / 2, gameOptions.height / 2,
            () => {
                if (!window['UtilInternet'].isOnline()) {
                    alert('internet is offline');
                    return;
                }
                // add reward pending logic
                // 다른 상호작용되는 것들을 전부 꺼야 방해가 되지 않음
                rewardBtn.first.setTint(0x8c8c8c).setInteractive(false);
                console.log('rewardBtn: ', rewardBtn);
                // 회색으로 상호작용 가능 여부를 알려주고 로딩 애니메이션 재생
                goToMainMenuText.setTint(0x8c8c8c).setInteractive(false);
                pendingRewardSprite.setVisible(true);
                pendingRewardSprite.anims.play('loading_anim');
                window['UtilPlatform'].sendMsg2Parent(
                    'ShowRewardVideo',
                    {
                        reward: () => {},
                        dismiss: (isRewarded) => {
                            rewardBtn.destroy();
                            goToMainMenuText.destroy();
                            pendingRewardSprite.destroy();
                            if (!isRewarded) {
                                this.restartLevel();
                                return;
                            }
                            // 리워드 보상 받았을 때의 처리
                            this.hasUsedReward = true;
                            [ dark, popup, gameOverTxt, barScoreTxt, barBestTxt, scoreTxt, bestTxt, menuBtn, restartBtn, rewardBtn, loading ].forEach(obj => {
                                obj.setVisible(false).destroy();
                            });
                            recreateLevel(true, score);
                            self.target.setDepth(1);
                        },
                        error: () => {
                            this.restartLevel();
                            rewardBtn.destroy();
                            goToMainMenuText.destroy();
                            pendingRewardSprite.destroy();
                        }
                    }
                );
            },
            'btn_reward', '', '', '', this,
        );
        this.add(rewardBtn);
        this.scene.cameras.main.ignore([ goToMainMenuText, rewardBtn, pendingRewardSprite ]);
    },

    pause_timer() {
        if (this.level_active) {
            if (this.timerEvent) this.timerEvent.paused = true;
            game_data.scene.matter.world.autoUpdate = false;
        }
    },

    resume_timer() {
        if (this.level_active) {
            if (this.timerEvent) this.timerEvent.paused = false;
            game_data.scene.matter.world.autoUpdate = true;
        }
    },

    update_crates_skin() {
        this.movingCrate.setFrame(game_data['user_data']['current_resourse']);
        let children = this.crateGroup.getChildren();
        children.forEach(el => el.setFrame(game_data['user_data']['current_resourse']));
    },

    update_language() {
        let res = game_data['utils'].generate_string({'scene_id': 'game_play', 'item_id': 'game_play', 'phrase_id': '1', 'values': [], 'base_size': 24});
        this.hiScoreText.setText(res['text']);
        this.hiScoreText.setFontSize(res['size']);
        res = game_data['utils'].generate_string({'scene_id': 'game_play', 'item_id': 'game_play', 'phrase_id': '2', 'values': [], 'base_size': 38});
        this.tutTxt.setText(res['text']);
        this.tutTxt.setFontSize(res['size']);
        res = game_data['utils'].generate_string({'scene_id': 'game_play', 'item_id': 'game_play', 'phrase_id': '4', 'values': [], 'base_size': 50});
        this.button_start_txt.setText(res['text']);
        this.button_start_txt.setFontSize(res['size']);
    }
});