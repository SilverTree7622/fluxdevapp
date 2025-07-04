class Menu extends Phaser.Scene {
	constructor(){
		super('menu');
	}
	create(){
		UtilPlatform.sendMsg2Parent('ShowNavFooterPlay');
		var self = this;
		if (firstLoad) {
			bgTexture = 'bg_sky';
		}
		else {
			bgTexture = Phaser.Math.RND.pick(['bg_cloud', 'bg_rock', 'bg_sky', 'bg_wood']);
		}
		const bg = this.add.sprite(config.width / 2, config.height / 2, spriteKey(bgTexture));
		UtilBackground.setBackground(`./img/${ bgTexture }.png`);
		let title = this.add.sprite(config.width/2, config.height * 0.24, 'game_title');
		title.setScale(
			UtilDisplay.resizeToFit(config.width, config.height, title.width, title.height, 0.8)
		);
		this.tweens.add({
			targets: title,
			y: title.y + (30 * (config.height / 1080)),
			duration: 1300,
			ease: 'Sine.easeInOut',
			yoyo: true,
			repeat: -1,
		});
		const highscoreIcon = this.add.sprite(config.width * 0.4, config.height * 0.51, 'icon_highscore');
		highscoreIcon.setScale(
			UtilDisplay.resizeToFit(config.width, config.height, highscoreIcon.width, highscoreIcon.height, 0.15)
		);
		const fontSize = Math.min(40 * (config.width / 720), 40 * (config.height / 1080));
		this.add.text(config.width * 0.53, config.height * 0.51, bestscore, { fontFamily: 'vanilla', fontSize: fontSize, align: 'center', color: '#ffffff' }).setOrigin(0.5, 0.5);
		let btnPlay = createButton(config.width * 0.5, config.height * 0.74, 'play', self);
		let btnSound = createButton(80, 100, 'sound_on', self);
		btnPlay.setScale(
			UtilDisplay.resizeToFit(config.width, config.height, btnPlay.width, btnPlay.height, 0.3)
		);
		btnSound.setScale(
			UtilDisplay.resizeToFit(config.width, config.height, btnSound.width, btnSound.height, 0.15)
		);
		setSoundButton(btnSound);
		this.input.on('gameobjectdown', (pointer, obj)=>{
			if (!UtilInternet.isOnline()) {
				// alert('internet is offline');
				return;
			}
			if (obj.isButton) {
				this.tweens.add({
					targets: obj,
					scaleX: obj.scale * 0.9,
					scaleY: obj.scale * 0.9,
					yoyo: true,
					ease: 'Linear',
					duration: 100,
					onComplete: function () {
						if (obj.name === 'sound') {
							toggleSound(obj);
						}
						else if (obj.name === 'play') {
							playSound('start', self);
							UtilPlatform.sendMsg2Parent('HideNavFooterPlay');
							self.scene.start('game');
						}
					}
				}, this);
			}
		}, this);
	}
}