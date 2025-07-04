class Game extends Phaser.Scene {
	constructor() {
		super('game');
		this.target = null;
		this.knife = null;
		this.isKnifeFlying = false;
		this.stuckKnives = null;
		this.targetDiameter = 436;
		// this.targetDiameter = UtilNumber.minMaxNum(config.width * 2/3, 200, 436);
		this.isGameover = false;
		this.targetBreak = false;
		this.rotBefore = 0;
		this.hasUsedReward = false;
		this.savedScore = 0;
	}

	update() {
		if (this.isGameover || this.targetBreak) return;
		let rot = this.target.rotation - this.rotBefore;
		this.rotBefore = this.target.rotation;
		if(this.stuckKnives != null){
			Phaser.Actions.RotateAroundDistance(this.stuckKnives.getChildren(), { x: config.width / 2, y: 300 }, rot, this.targetDiameter / 2);
			let children = this.stuckKnives.getChildren();
			for(let knife of children){
				let rotation = Phaser.Math.Angle.Between(knife.x, knife.y, this.target.x, this.target.y) + (Math.PI * 0.5);
				knife.rotation = rotation;
			}
		}

		if (this.bonusInGame.getLength() > 0) {
			Phaser.Actions.RotateAroundDistance(this.bonusInGame.getChildren(), { x: config.width / 2, y: 300 }, rot, this.targetDiameter * 0.55);
			let children = this.bonusInGame.getChildren();
			for (let bonus of children) {
				let rotation = Phaser.Math.Angle.Between(bonus.x, bonus.y, this.target.x, this.target.y) + (Math.PI * 1.75);
				bonus.rotation = rotation;
			}
		}
	}

	create() {
		playSound('target_shown', this);
		const self = this;
		let isKnifeFlying = false;
		const minSpeed = 0.007;
		const maxSpeed = 0.01;
		this.add.sprite(0, 0, spriteKey(bgTexture)).setOrigin(0);
		// UtilBackground.setBackground(
		// 	`./img/${ bgTexture }.png`,
		// 	'game_content'
		// );
		if (firstLoad) firstLoad = false;

		let defaultTargetKnives = 5;
		let targetKnives = defaultTargetKnives;
		let currentLevel = 0;
		let score = this.savedScore || 0;

		this.isGameover = false;
		this.state = 'wait';
		let isBoss = false;

		let bgKnives = this.add.group();
		let knives = this.add.group();
		this.stuckKnives = this.physics.add.group();
		this.bonusInGame = this.physics.add.group();
		let randompickTarget = Phaser.Math.RND.pick([
			'target_1', 'target_2', 'target_3', 'target_5', 'target_6'
		]);
		let stringKnifeTexture = Phaser.Math.RND.pick([
			'knife_1', 'knife_2', 'knife_3', 'knife_4', 'knife_5', 'knife_6', 'knife_7', 'knife_8', 'knife_9', 'knife_10', 'knife_11'
		]);

		this.target = this.physics.add.sprite(config.width / 2, 300, spriteKey(randompickTarget));
		this.target.setDepth(1);
		this.target.setCircle(this.targetDiameter/2);
		// this.target.setDisplaySize(this.targetDiameter, this.targetDiameter);
		this.target.setScale(0);
		this.target.body.allowGravity = false;
		// this.target.refreshBody();
		console.log('this.target: ', this.target);

		//'Quad.easeIn'
		//let random = Phaser.Math.RND.pick(['Sine', 'Sine.easeIn', 'Sine.easeOut', 'Sine.easeInOut', 'Quad', 'Cubic', 'Linear', 'Quart']);
		// let targetTween = this.tweens.add({
		// 	targets: this.target,
		// 	rotation: Math.PI * 2.5,
		// 	duration: 4000,
		// 	yoyo: true,
		// 	repeat: -1,
		// 	ease: random
		// });
		let targetTween = null;
		let targetRotation = [];

		let emitter = self.add.particles('particle_grey', {
			lifespan: 800,
			speed: { min: 100, max: 220 },
			scale: { start: 0.4, end: 0 },
			gravityY: 600,
			emitting: false,
			frequency: -1,
		});

		//first spawn
		this.tweens.add({
			targets: this.target,
			scale: 1,
			duration: 300,
			ease: 'Sine.easeOut',
			onComplete: () => {
				//tween random
				targetTween = self.tweens.add({
					targets: self.target,
					rotation: Math.PI * 2,
					duration: 2000,
					//yoyo: true,
					repeat: -1,
					ease: 'Linear'//random
				});
				self.state = 'play';
			}
		});

		// UI 스케일 계산
		// const uiScale = UtilDisplay.resizeToFit(config.width, config.height, 50, 50, 0.15);
		const uiScale = 1;
		const fontSize = Math.min(40 * (config.width / 720), 40 * (config.height / 1080));

		// UI 점수 아이콘 및 텍스트
		this.add.sprite(config.width * 0.07, config.height * 0.05, 'icon_score')
			.setScale(uiScale);
		let scoreText = this.add.text(config.width * 0.14, config.height * 0.02, score, 
			{ fontSize: fontSize, align: 'left', fontFamily: 'vanilla' });

		//for testing best rotation theme
		//this.add.text(config.width * 0.5, 600, random, { fontSize: 50, align: 'center', fontFamily: 'vanilla' }).setOrigin(0.5);

		// create knife game obj
		let knife = self.physics.add.sprite(config.width/2, 0, spriteKey(stringKnifeTexture));
			knife.body.setSize(30, 30);
			knife.body.allowGravity = false;
		// knife.setScale(
		// 	UtilDisplay.resizeToFit(config.width, config.height, knife.width, knife.height, 0.1)
		// );
		const KNIFE_POS_Y = config.height - knife.height / 2 - 10;
		knife.y = KNIFE_POS_Y;
		console.log('knife: ', knife);
		
		this.physics.add.overlap(knife, this.target, knifeCollision, null, this);
		this.physics.add.overlap(knife, this.stuckKnives, stuckKnifeCollision, null, this);
		this.physics.add.overlap(knife, this.bonusInGame, bonusCollision, null, this);
		this.input.on('pointerup', throwKnife, this);

		this.input.on('gameobjectdown', (pointer, obj) => {
			if (obj.isButton) {
				//playSound('click', this);
				this.tweens.add({
					targets: obj,
					scaleX: 0.9,
					scaleY: 0.9,
					yoyo: true,
					ease: 'Linear',
					duration: 100,
					onComplete: async () => {
						if (obj.name === 'menu') {
							self.hasUsedReward = false;
							UtilBackground.setDarkLayerAlphaOnlyPartial();
							self.scene.start('menu');
						}
						else if (obj.name === 'restart') {
							bgTexture = Phaser.Math.RND.pick(['bg_cloud', 'bg_rock', 'bg_sky', 'bg_wood']);
							self.hasUsedReward = false;
							UtilBackground.setDarkLayerAlphaOnlyPartial();
							self.scene.restart();
						}
					}
				})
			}
		});

		//changeRotationSpeed();
		spawnKnifeTargets();
		function spawnKnifeTargets() {
			let children = knives.getChildren();
			let childrenBG = bgKnives.getChildren();
			for (let i = 0; i < targetKnives; i++) {
				if (children.length > i) {
					children[i].setPosition(50, 960 - i * 50);
					children[i].setTexture('a_knife');
					children[i].angle = 0;
					childrenBG[i].angle = 0;
				}
				else {
					bgKnives.get(50, 960 - i * 50, spriteKey('c_knife'));
					knives.get(50, 960 - i * 50, spriteKey('a_knife'));
				}
			}
		}
		//after level 1
		function recreateLevel(
			hasUsedReward = false,
			savedScore = 0,
		) { 
			UtilBackground.setDarkLayerAlphaOnlyPartial();
			resetKnife();
			self.tweens.killAll();
			let _randompickTarget = Phaser.Math.RND.pick([
				'target_1', 'target_2', 'target_3', 'target_5', 'target_6'
			]); //remove target_4, for make as boss
			stringKnifeTexture = Phaser.Math.RND.pick([
				'knife_1', 'knife_2', 'knife_3', 'knife_4', 'knife_5',
				'knife_6', 'knife_7', 'knife_8', 'knife_9', 'knife_10', 'knife_11'
			]);
			if(isBoss) _randompickTarget = 'target_4';
			self.target.setTexture(spriteKey(_randompickTarget));
			randompickTarget = _randompickTarget;
			self.target.setScale(1);
			self.target.refreshBody();
			knife.setVisible(true);
			knife.y = KNIFE_POS_Y;
			knife.setTexture(spriteKey(stringKnifeTexture));
			if (hasUsedReward) {
				score = savedScore;
				scoreText.text = score;
			} else {
				currentLevel += 1;
			}
			targetKnives = defaultTargetKnives + currentLevel;
			if(targetKnives > 9) targetKnives = 9;
			//targetKnifes = 6;
			self.targetBreak = false;
			spawnKnifeTargets();

			let pickTween = Phaser.Math.RND.pick(['Sine', 'Linear']);
			let defaultTimeDuration = 2000; //1800 //1300
			let rotationDuration = 0;
			if (pickTween == 'Sine') {
				rotationDuration = defaultTimeDuration;
				targetRotation.push(Math.PI * 2.25);
				targetRotation.push(-Math.PI * 2.5);
			}
			else { //Linear
				rotationDuration = Phaser.Math.RND.between(15, 20) * 100;
				targetRotation.push(Math.PI * 2);
			}

			// LET'S ROTATE THE TARGET
			// let random = Phaser.Math.RND.pick(['Sine', 'Sine.easeIn', 'Sine.easeOut', 'Sine.easeInOut', 'Quad', 'Cubic', 'Linear', 'Quart']);
			// let arrayPick = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
			// let randomInt = Phaser.Math.RND.between(0, arrayPick.length - 1);
			// targetRotation.push(arrayPick[randomInt]);
			// arrayPick.splice(randomInt, 1);
			// randomInt = Phaser.Math.RND.between(0, arrayPick.length - 1);
			// targetRotation.push(arrayPick[randomInt]);
			// targetRotation = randomPick;
			targetTween = self.tweens.add({
				targets: self.target,
				rotation: targetRotation[0],
				duration: rotationDuration,
				//yoyo: true,
				//repeat: -1,
				onComplete: () => {
					retweenTarget(pickTween, rotationDuration, targetRotation[0], targetRotation);
				},
				ease: pickTween//random
			});

			self.stuckKnives.clear(true, true);
			self.bonusInGame.clear(true, true);
			self.physics.world.gravity = { x: 0, y: 0 };

			//random obstacle
			let min = currentLevel - 1 < 0 ? 0 : currentLevel - 1;
			let obstacle = Phaser.Math.RND.between(min, currentLevel + 1);
			let randPick = [0, Math.PI * 0.125, Math.PI * 0.25, Math.PI, Math.PI * 0.5, Math.PI * 0.75, Math.PI * 0.625, Math.PI * 0.875, Math.PI * 1.125, Math.PI * 1.25, Math.PI * 1.5, Math.PI * 1.625, Math.PI * 1.75, Math.PI * 1.875, Math.PI * 2];
			for (let i = 0; i < obstacle; i++) {
				//let radianOnTarget = Phaser.Math.FloatBetween(0, Math.PI * 2);
				let pick = Phaser.Math.RND.between(0, randPick.length - 1);
				let radianOnTarget = randPick[pick];
				randPick.splice(pick, 1);
				let _x = Math.cos(radianOnTarget) * self.targetDiameter * 0.5;
				let _y = Math.sin(radianOnTarget) * self.targetDiameter * 0.5;
				let stuckKnife = self.physics.add.sprite(self.target.x + _x, self.target.y + _y, 'knife_1');
				stuckKnife.body.setSize(30, 30);
				stuckKnife.radianOnTarget = radianOnTarget;
				//console.log(_x, _y, radianOnTarget);
				self.stuckKnives.add(stuckKnife);
			}

			//random bonus
			let possibleFruitShow = Math.random() * 100 > 75 ? true : false;
			if (possibleFruitShow) {
				let pick = Phaser.Math.RND.between(0, randPick.length - 1);
				let radianOnTarget = randPick[pick];
				randPick.splice(pick, 1);
				let _x = Math.cos(radianOnTarget) * self.targetDiameter * 0.5;
				let _y = Math.sin(radianOnTarget) * self.targetDiameter * 0.5;
				let watermelon = self.physics.add.sprite(self.target.x + _x, self.target.y + _y, 'watermelon');
				watermelon.body.setSize(48, 48);
				watermelon.radianOnTarget = radianOnTarget;
				self.bonusInGame.add(watermelon);
			}
		}

		function showBossMode() {
			let txtBoss = self.add.sprite(config.width/2, -180, 'txt_boss');
			self.tweens.add({
				targets: txtBoss,
				y: 220,
				duration: 400,
				onComplete: () => {
					self.tweens.add({
						targets: txtBoss,
						delay: 600,
						alpha: 0,
						onComplete: () => {
							recreateLevel();
						}
					});
				}
			});
			isBoss = true;
		}

		function retweenTarget(_ease, _duration, _currentRotation, _arrayTargetRotation) {
			let tRotation = 0;
			if (_ease != 'Linear') {
				tRotation = _currentRotation == _arrayTargetRotation[0] ? _arrayTargetRotation[1] : _arrayTargetRotation[0];
			}
			else {
				tRotation = _currentRotation;
			}
			targetTween = self.tweens.add({
				targets: self.target,
				rotation: tRotation,
				duration: _duration,
				//yoyo: true,
				//repeat: -1,
				onComplete: () => {
					retweenTarget(_ease, _duration, tRotation, _arrayTargetRotation);
				},
				ease: _ease//random
			});
		}
		function resetKnife(){
			knife.setVelocityY(0);
			knife.setPosition(config.width/2, KNIFE_POS_Y);
			isKnifeFlying = false;
		}
		function spawnStuckKnife(){
			let stuckKnife = self.physics.add.sprite(self.target.x, self.target.y + self.targetDiameter/2, spriteKey(stringKnifeTexture));
			stuckKnife.body.setSize(30, 30);
			stuckKnife.radianOnTarget = self.target.rotation;
			self.stuckKnives.add(stuckKnife);
			//self.target.rotation += 0.15;
			//emitter.particleTint = particleTint
			emitter.emitParticleAt(self.target.x, self.target.y + self.targetDiameter / 2, 8);

		}
		function knifeCollision(knife, target){
			if(self.isGameover) return;
			playSound('hit_target', self);
			spawnStuckKnife();
			resetKnife();
			shakeCamera();
			targetKnives--;
			score++;
			scoreText.text = score;
			// let knivesChildren = knives.getChildren();
			// knivesChildren[targetKnives].setTexture('b_knife');
			checkSaveScore();
			if (targetKnives <= 0) {
				targetTween.stop();
				self.targetBreak = true;
				self.target.setScale(0);
				breakTarget(randompickTarget, 720, 600, 0);
				breakTarget(randompickTarget, 0, 600, 90);
				breakTarget(randompickTarget, 0, 20, 180);
				breakTarget(randompickTarget, 720, 20, 270);
				self.physics.world.gravity = { x: 0, y: 300 };
				for (let sKnife of self.stuckKnives.getChildren()) {
					sKnife.body.velocity.y = 100 + Math.random() * 300;
					self.tweens.add({
						targets: sKnife,
						angle: (Math.random() >= 0.5) ? 360 : -360,
						duration: Phaser.Math.Between(2000, 4000),
						repeat: -1,
						ease: 'Sine.easeIn'
					})
				}
				// for (let sKnife of self.stuckKnives.getChildren()) {
				// 	sKnife.body.velocity.y = 100 + Math.random() * 300;
				// 	self.tweens.add({
				// 		targets: sKnife,
				// 		//rotation: (Math.random() >= 0.5) ? Math.PI * 2 : -Math.PI * 2,
				// 		angle: (Math.random() >= 0.5) ? 360 : -360,
				// 		duration: Phaser.Math.Between(1000, 2000),
				// 		repeat: -1,
				// 		ease: 'Sine.easeIn'
				// 	})
				// }
				knife.y = -1000;

				self.time.addEvent({
					delay: 1500,
					callback: () => {
						if (currentLevel % 2 == 0 && currentLevel > 0) {
							showBossMode();
						}
						else {
							recreateLevel();
							isBoss = false;
							//bossMode()
						}
					}
				})
			}
		}
		function stuckKnifeCollision(knife, stuckKnife){
			if(self.isGameover) return;
			// Gameover
			playSound('hit_knife', self);
			self.isGameover = true;
			self.physics.world.gravity = {x: 0, y: 300};
			for(let sKnife of self.stuckKnives.getChildren()){
				sKnife.body.velocity.y = 100+Math.random()*300;
				self.tweens.add({
					targets: sKnife,
					angle: (Math.random() >= 0.5) ? 360 : -360,
					duration: Phaser.Math.Between(2000, 4000),
					repeat: -1,
					ease: 'Sine.easeIn'
				})
			}
			knife.setVisible(false);

			self.time.delayedCall(500, gameOver);
		}
		function bonusCollision(knife, bonus) {
			bonus.destroy();
			score += 5;
			scoreText.text = score;
			checkSaveScore();
		}
		function throwKnife(){
			if (this.state == 'wait' || this.isGameover) return;
			if (isKnifeFlying) return;
			isKnifeFlying = true;
			knife.setVelocityY(-2200);
			let animsKnives = targetKnives - 1;
			if(animsKnives>=0){
				let childrenBG = bgKnives.getChildren();
				let childrenKnives = knives.getChildren();
				self.tweens.add({
					targets: [childrenBG[animsKnives], childrenKnives[animsKnives]],
					angle: 180,
					duration: 100,
					onComplete: function (tween, objs) {
						let obj = objs[1];
						obj.setTexture('b_knife');
					}
				})
			}
		}
		function shakeCamera(){
			self.cameras.main.shake(100, 0.01);
		}
		function breakTarget(currentKey, targetMoveX, targetMoveY, angle) {
			playSound('hit_last', self);
			let sprite = self.physics.add.sprite(config.width / 2, 300, spriteKey(currentKey));
			let spriteMask = self.physics.add.sprite(config.width / 2, 300, 'half_circle').setOrigin(0).setVisible(false).setAngle(angle);
			let mask = spriteMask.createBitmapMask();
			sprite.setMask(mask);
			self.tweens.add({
				targets: [sprite, spriteMask],
				//x: targetMoveX,
				//y: targetMoveY,
				angle: Math.random() > 0.5 ? 180 : -180,
				duration: 1200,
				alpha: 0,
				onComplete: function (tween, objs) {
					objs.forEach(obj => {
						obj.destroy();
					})
				}
				//repeat: -1
			});
			spriteMask.body.setEnable(true);
			sprite.body.setEnable(true);
			let velX = Phaser.Math.Between(-5, 5) * 100;
			let velY = Phaser.Math.Between(8, 20) * -10;
			spriteMask.setVelocity(velX, velY);
			sprite.setVelocity(velX, velY);
		}
		function checkSaveScore() {
			if (score > bestscore) {
				bestscore = score;
			}
			if (score >= bestscore) {
				saveData(storageKey, bestscore);
			}
		}
		
		const animConfig = {
			key: 'loading_anim',
			frames: this.anims.generateFrameNumbers('loading'),
			frameRate: 20,
			repeat: -1
		};
		this.anims.create(animConfig);
		function gameOver() {
			playSound('level_fail', self);
			self.target.setDepth(0);

			// 배경 다크 레이어
			let dark = self.add.rectangle(0, 0, config.width, config.height, 0x000000).setOrigin(0);
			dark.setInteractive();
			dark.alpha = 0;
			console.log('dark: ', dark);
			dark.setStrokeStyle(0, 0xffffff);
			UtilBackground.setDarkLayerWithExclusion(
				0, [ 0, 0, 0 ], 'game_content'
			);
			self.tweens.addCounter({
				from: 0, to: 0.5,
				duration: 500,
				onUpdate: (tw, data) => {
					const { value } = data;
					UtilBackground.setDarkLayerAlphaOnlyPartial(value);
				},
			});
			self.tweens.add({
				targets: dark,
				alpha: 0.5,
				duration: 500
			});

			// 팝업 및 텍스트 위치 조정
			const popupY = config.height * 0.5 + 20;
			const textSpacing = config.height * 0.09;
			
			const popup = self.add.sprite(config.width * 0.5 + 2, popupY, 'popup')
				.setScale(1.4);
				// .setScale(UtilDisplay.resizeToFit(config.width, config.height, 400, 300, 0.8));
				// .setDisplaySize(
				// 	UtilNumber.minMaxNum(config.width, config.width, 400),
				// 	UtilNumber.minMaxNum(config.height, config.height, 500)
				// );
			
			const gameOverTxt = self.add.sprite(config.width * 0.5, popupY - (textSpacing * 1.5), 'txt_gameover')
				.setScale(UtilDisplay.resizeToFit(config.width, config.height, 200, 50, 0.5));
				
			const barScoreTxt = self.add.sprite(config.width * 0.5, popupY - (textSpacing * 0.5), 'bar_score')
				.setScale(uiScale);
			const barBestTxt = self.add.sprite(config.width * 0.5, popupY + (textSpacing * 0.5), 'bar_best')
				.setScale(uiScale);

			// 점수 텍스트
			const scoreX = config.width * 0.5 + (config.width * 0.15);
			const scoreTxt = self.add.text(scoreX, popupY - (textSpacing * 0.5), score, 
				{ fontFamily: 'vanilla', fontSize: fontSize, align: 'right', color: '#FFFFFF' })
				.setOrigin(1, 0.5).setDepth(1);
			
			const bestTxt = self.add.text(scoreX, popupY + (textSpacing * 0.5), bestscore, 
				{ fontFamily: 'vanilla', fontSize: fontSize, align: 'right', color: '#FFFFFF' })
				.setOrigin(1, 0.5).setDepth(1);

			// 버튼 위치 조정
			const buttonY = popupY + textSpacing * 1.4;
			// const commonBtnW = UtilNumber.minMaxNum(config.width * 0.3, config.width * 0.3, 200);
			const commonBtnW = 188;
			// const commonBtnH = UtilNumber.minMaxNum(config.height * 0.05, config.height * 0.05, 50);
			const commonBtnH = 65;
			const menuBtn = createButton(config.width * 0.5 - (config.width * 0.15), buttonY, 'menu', self)
				// .setScale(uiScale);
				.setDisplaySize(commonBtnW, commonBtnH)
			;
			const restartBtn = createButton(config.width * 0.5 + (config.width * 0.15), buttonY, 'restart', self)
				.setDisplaySize(commonBtnW, commonBtnH);
				// .setScale(uiScale);
			if (!self.hasUsedReward && UtilPlatform.chckIsApp()) {
				const loading = self.add.sprite(0, 0, 'loading').setVisible(false);
				loading.setDepth(1);
				const rewardBtn = createButton(
					config.width * 0.5, buttonY + (textSpacing * 0.7), 'reward', self
				).setDisplaySize(commonBtnW, commonBtnH);
				rewardBtn.on('pointerup', async () => {
					if (UtilInternet.isOffline()) {
						alert('internet is offline');
						return;
					}
					rewardBtn.setTint(0x8c8c8c).setInteractive(false);
					menuBtn.setTint(0x8c8c8c).setInteractive(false);
					restartBtn.setTint(0x8c8c8c).setInteractive(false);
					loading.setVisible(true);
					loading.anims.play('loading_anim');
					UtilPlatform.sendMsg2Parent(
						'ShowRewardVideo',
						{
							reward: () => {},
							dismiss: (isRewarded) => {
								if (!isRewarded) {
									self.hasUsedReward = false;
									self.scene.start('menu');
									return;
								}
								// 리워드 보상 받았을 때의 처리
								self.savedScore = score;
								self.hasUsedReward = true;
								self.isGameover = false;
								self.state = 'play';
								[ dark, popup, gameOverTxt, barScoreTxt, barBestTxt, scoreTxt, bestTxt, menuBtn, restartBtn, rewardBtn, loading ].forEach(obj => {
									obj.setVisible(false).destroy();
								});
								recreateLevel(true, score);
								self.target.setDepth(1);
								return;
							},
							error: () => {
								self.hasUsedReward = false;
								UtilBackground.setDarkLayerAlphaOnlyPartial();
								self.scene.start('menu');
							}
						}
					);
				});
				loading.setPosition(rewardBtn.x, rewardBtn.y - 4);
			}
		}
	}
}

const width = 720;
const height = 1280;

var config = {
	type: Phaser.AUTO,
    transparent: true,
	width,
	height,
	scale: {
		parent: 'game_content',
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
		}
	},
	banner: false,
	backgroundColor: '#000000', // 또는 게임 테마에 맞는 색상
	scene: [Boot, Load, Menu, Game],
}
var game = new Phaser.Game(config);

// UtilDisplay.resizeViaBanner(
// 	width, height,
// 	document.getElementById('game_content'),
// );