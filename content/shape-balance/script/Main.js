let game;
let GAME_WIDTH = 720;
let GAME_HEIGHT = 1280;
var currentLevel = 1;
var sfxactive = true;
var levelReached = null;
var bestScores = null;
var dataExist = null;
var soundBgVolume;
	
window.addEventListener("load", eventWindowLoaded, false);		
function eventWindowLoaded() {
	// our phaser game configuration
	let gameConfig = {
		type: Phaser.AUTO,
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
			parent: "thegame",
			width: GAME_WIDTH,
			height: GAME_HEIGHT
		},
		physics: {
			// using matter.js engine
			default: 'matter',
			matter: {
				debug: false
			}
		},
		// we use multiple scene for this game, boot, preloader, home/main menu, level scene, and gameplay scene
		// to switch between scenes, you can use "this.scene.start(...)"
		scene: [Boot, Preloader, MainMenu, Level, Gameplay]
	}
	game = new Phaser.Game(gameConfig);
}

// BOOT SCENE //////////////////////////////////////////////////////////////////////////////////// 
class Boot extends Phaser.Scene {
  constructor() {
    super("boot");
  }
  preload() {
	this.load.image('back', 'assets/background.png');
	this.load.image('loaderShp','assets/preloader.png');
	this.load.image('loaderBack', 'assets/preloader_back.png');
}
  create() {
	this.input.maxPointers = 1;
	this.scene.start("loader");
  }
}

// PRELOADER SCENE ////////////////////////////////////////////////////////////////////////////////////
class Preloader extends Phaser.Scene {
    constructor() {
        super("loader");
    }
    
    preload() {
		// preloader UI
		this.background = this.add.sprite(0,0,'back').setOrigin(0, 0);
		this.loaderBackSprite = this.add.sprite(GAME_WIDTH/2,GAME_HEIGHT/2,'loaderBack');
		this.loaderSprite = this.add.sprite(162,GAME_HEIGHT/2-1, 'loaderShp').setOrigin(0, 0.5).setScale(0,1);
		
		// load all assets
		this.load.image('backGameplay', 'assets/background_gameplay.png');
		this.load.image('backBottom', 'assets/background_shapepanel.png');
		this.load.image('box', 'assets/box.png' );
		this.load.image('box_shadow', 'assets/box_shadow.png' );
		this.load.image("endscreen", 'assets/endscreen.png');
		this.load.image('tutorial','assets/tutorial.png');
		this.load.image('shape_1', 'assets/shape_1.png' );
		this.load.image('shape_2', 'assets/shape_2.png' );
		this.load.image('shape_3', 'assets/shape_3.png' );
		this.load.image('shape_4', 'assets/shape_4.png' );
		this.load.image('shape_5', 'assets/shape_5.png' );
		this.load.image('shape_6', 'assets/shape_6.png' );
		this.load.image('shape_7', 'assets/shape_7.png' );
		this.load.image('shape_8', 'assets/shape_8.png' );
		this.load.image('shape_9', 'assets/shape_9.png' );
		this.load.image('shape_10', 'assets/shape_10.png' );
		this.load.image('shape_11', 'assets/shape_11.png' );
		this.load.image('shape_12', 'assets/shape_12.png' );
		this.load.image('shape_13', 'assets/shape_13.png' );
		this.load.image('shape_14', 'assets/shape_14.png' );
		this.load.image('shape_15', 'assets/shape_15.png' );
		this.load.image('shape_16', 'assets/shape_16.png' );
		this.load.image('shape_17', 'assets/shape_17.png' );
		this.load.image('shape_18', 'assets/shape_18.png' );
		this.load.image('shape_19', 'assets/shape_19.png' );
		this.load.image('shape_20', 'assets/shape_20.png' );
		this.load.image('shape_21', 'assets/shape_21.png' );
		this.load.image('title', 'assets/title.png' );
		
		this.load.spritesheet('btn_start', 'assets/button_start.png', {frameWidth:206,frameHeight: 218});
		this.load.spritesheet('btn_nextlevel', 'assets/button_nextlevel.png', {frameWidth:100,frameHeight: 105});
		this.load.spritesheet('btn_levelmenu', 'assets/button_levelmenu.png',	{frameWidth:100,frameHeight: 105});
		this.load.spritesheet('btn_retry', 'assets/button_retry.png', {frameWidth:100,frameHeight: 105});
		this.load.spritesheet('btn_Level', 'assets/button_level.png', {frameWidth:151,frameHeight: 151});
		this.load.spritesheet('btn_mainmenu', 'assets/button_mainmenu.png', {frameWidth:100,frameHeight: 105});
		this.load.spritesheet('btn_sfx', 'assets/button_sfx.png', {frameWidth:100,frameHeight: 105});
		
		
		this.load.spritesheet('star', 'assets/star.png', {frameWidth:60,frameHeight:60});
		this.load.spritesheet('timers', 'assets/timers.png', {frameWidth:92,frameHeight:166});
		this.load.json('myJsonObj', 'script/levels.json');
		
		this.load.bitmapFont('thisfont', 'assets/thefont.png', 'assets/thefont.fnt');
		
		this.load.audio('button_sound','assets/audio/button_sound.mp3');
		this.load.audio('win_sound','assets/audio/win_sound.mp3');
		this.load.audio('woosh_sound','assets/audio/woosh_sound.mp3');
		this.load.audio('drum','assets/audio/rolldrum.mp3');
		this.load.audio('backsound','assets/audio/backsound.mp3');
		this.load.audio('pick','assets/audio/pick.mp3');
		this.load.audio('drop','assets/audio/drop.mp3');
		
		this.load.audio('button_sound_1','assets/audio/button_sound.ogg');
		this.load.audio('win_sound_1','assets/audio/win_sound.ogg');
		this.load.audio('woosh_sound_1','assets/audio/woosh_sound.ogg');
		this.load.audio('drum_1','assets/audio/rolldrum.ogg');
		this.load.audio('backsound_1','assets/audio/backsound.ogg');
		this.load.audio('pick_1','assets/audio/pick.ogg');
		this.load.audio('drop_1','assets/audio/drop.ogg');
		
		this.load.on('progress', this.onProgress, this);
		this.load.on('complete', this.onCompleteLoad,this);
    }
	// triggered when you tap/click the screen
	onTapToContinue(){
		soundBgVolume = 1;
		volumeLoop = soundBgVolume;
		SoundLoop(soundBgVolume);
		this.scene.start('mainmenu');	
	}
	onProgress(){
		var loaderObj = this.load;
		var total = loaderObj.totalToLoad;
		var remainder = loaderObj.list.size + loaderObj.inflight.size;
		var progress = 1 - (remainder / total);
		this.loaderSprite.setScale(progress,1);
	}
	onCompleteLoad(){
		this.loaderBackSprite.destroy();
		this.loaderSprite.destroy();
		
		var continueTxt = this.add.bitmapText(GAME_WIDTH/2, GAME_HEIGHT/2, 'thisfont',"", 50).setOrigin(0.5,0.5);
		continueTxt.setText("Tap to continue");
		this.input.on("pointerup", this.onTapToContinue, this);
	}
}

// HOME SCENE / MAIN MENU CLASS ////////////////////////////////////////////////////////////////////////////////////
class MainMenu extends Phaser.Scene {
	constructor() {
		super("mainmenu");
	}
	create() {
		window['UtilPlatform'].sendMsg2Parent('ShowNavFooterPlay');
		soundBgVolume = 1;
		volumeLoop = soundBgVolume;
		if (windoW.listSound["backsound"]) {
			windoW.listSound["backsound"].volume = soundBgVolume;
		}
		// Add background and game logo
		this.background=this.add.sprite(0,0, 'back');
		this.background.setOrigin(0,0);
		this.title=this.add.sprite((GAME_WIDTH/2)+20,-200,'title');
		
		//Game logo animation
		var title = this.title;
		var _t = this;
		var intv;
		function logoAnimation(){
			_t.tweens.add({targets: title, angle: -3, ease: 'Back.Out', duration: 300});
			setTimeout(function(){
				_t.tweens.add({targets: title, angle: 0, ease: 'Back.In', duration: 300});
			},300)
			setTimeout(function(){
				_t.tweens.add({targets: title, angle: 3, ease: 'Back.Out', duration: 300});
			},600)
			setTimeout(function(){
				_t.tweens.add({targets: title, angle: 0, ease: 'Back.In', duration: 300});
			},900)
		}
		setTimeout(function(){
			logoAnimation();
			intv = setInterval(logoAnimation,1200);
		},1000)
		
		// add play button
		this.playBtn = this.add.sprite(-200, GAME_HEIGHT/2+100, 'btn_start')
			.setInteractive({ useHandCursor: true })
			.on("pointerover", 	() =>	this.playBtn.setFrame(1))
			.on("pointerdown", 	() =>	this.playBtn.setFrame(2))
			.on("pointerout", 	() =>	this.playBtn.setFrame(0))
			.on("pointerup",function(){	this.playBtn.setFrame(0); this.clickPlayBtn(); },this);
		
		// In-frame animation for game logo and play button 
		this.tweens.add({
			targets: this.title,
			y: GAME_HEIGHT/2-250,
			ease: 'Bounce',
			duration: 1000
		});
		this.tweens.add({
			targets: this.playBtn,
			x: GAME_WIDTH/2,
			ease: 'Bounce',
			duration: 1500
		});

		// add sound button
		this.soundBtn = this.add.sprite(20, 20, 'btn_sfx')
			.setOrigin(0,0)
			.setInteractive({ useHandCursor: true })
			.on("pointerup", this.onSound,this);
		if (!sfxactive) {this.soundBtn.setFrame(1);}
		
		// Get game data from local storage (level progress and best scores)
		if (typeof(Storage) !== "undefined") {
			dataExist = localStorage.getItem("dataIsExist");
			if (dataExist) {
				levelReached = localStorage.getItem('savedLevelReached');
				bestScores = JSON.parse(localStorage.getItem("savedBestScore"));
				console.log('data exist');
			} else {
				levelReached = 1;//1
				bestScores = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
				dataExist = true;
				console.log('data not exist');
				localStorage.setItem("dataIsExist", dataExist);
				localStorage.setItem("savedLevelReached", levelReached);
				localStorage.setItem("savedBestScore", JSON.stringify(bestScores));
			}
		} else {
			levelReached = 1;//1
			bestScores = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			console.log('localStorage not exist')
		}
	}
	// Triggered when sound button is clicked
	onSound() {
		if (this.soundBtn.frame.name==1) {
			this.soundBtn.setFrame(0);
			SoundLoop(soundBgVolume);
			sfxactive=true;
		} else {
			this.soundBtn.setFrame(1);
			StopSound();
			sfxactive=false;
		}
	} 
	// Triggered when play button is clicked
	clickPlayBtn() {
		
			Sound("button_sound");
		
		// out of frame animation for game logo and play button 
		this.tweens.add({
			targets: this.title,
			y: -200,
			ease: 'Back.In',
			duration: 800
		});
		this.tweens.add({
			targets: this.playBtn,
			x: GAME_WIDTH+200,
			ease: 'Back.In',
			duration: 1000,
			onComplete: this.startGame.bind(this)
		});
	}
	// Triggered when play button animation is completed
	startGame() {
		this.soundBtn.destroy();
		window['UtilPlatform'].sendMsg2Parent('HideNavFooterPlay');
		//this.scene.start("gameplay");
		this.scene.start('level');
		
	}
}

//  LEVEL SCENE CLASS ////////////////////////////////////////////////////////////////////////////////////
class Level extends Phaser.Scene {
	constructor() {
		super("level");
	}
	init(){
		
	}
	create(){
		soundBgVolume = 1;
		volumeLoop = soundBgVolume;
		if (windoW.listSound["backsound"]) {
			windoW.listSound["backsound"].volume = soundBgVolume;
		}
		this.background=this.add.sprite(0,0, 'back').setOrigin(0,0);
		
		this.clickEnabled=true;
	
		this.selectLevelText = this.add.bitmapText(-200,200,'thisfont','Select Level',60).setOrigin(0.5,0.5);
		
		// Add level buttons
		this._levelGroup = null;
		this._levelGroup = this.add.group();
		this.createBtn();
		
		// add home button
		this.menuBtn = this.add.sprite(20+120,  -200, 'btn_mainmenu')
			.setOrigin(0,0)
			.setInteractive({ useHandCursor: true })
			.on("pointerover", 	() =>	this.menuBtn.setFrame(1))
			.on("pointerdown", 	() =>	this.menuBtn.setFrame(2))
			.on("pointerout", 	() =>	this.menuBtn.setFrame(0))
			.on("pointerup",function(){	this.menuBtn.setFrame(0); this.onMenu(); },this);
		
		// In-frame animation 
		this.tweens.add({targets: this.menuBtn, y: 20, ease: 'Bounce.Out', duration: 1000 });
		this.tweens.add({targets: this.selectLevelText, x: GAME_WIDTH/2, ease: 'Bounce.Out', duration: 1200 });
		
		// add sound button
		this.soundBtn = this.add.sprite(20, 20, 'btn_sfx')
			.setOrigin(0,0)
			.setInteractive({ useHandCursor: true })
			.on("pointerup", this.onSound,this);
		if (!sfxactive) {this.soundBtn.setFrame(1);}
	}
	
	// Triggered when sound button is clicked
	onSound() {
		if (this.soundBtn.frame.name==1) {
			this.soundBtn.setFrame(0);
			SoundLoop(soundBgVolume);
			sfxactive=true;
		} else {
			this.soundBtn.setFrame(1);
			StopSound();
			sfxactive=false;
		}
	}
	
	// Create 24 level buttons
	createBtn(){
		var no = 0;
		for (var i=1;i<25;i++) {
			no++;
			var levelBtn;
			if (no <= levelReached){
				levelBtn= this.add.sprite(0,0,'btn_Level',no);
				levelBtn.no=no;
				levelBtn.setInteractive({ useHandCursor: true });
				levelBtn.on("pointerup",this.clickLevelBtn,this);
				this._levelGroup.add(levelBtn);
			} else {
				levelBtn= this.add.sprite(0,0,'btn_Level',0);
				levelBtn.no=no;
				this._levelGroup.add(levelBtn);
			}
			levelBtn.setOrigin(0,0);
			
		};
		this.posXY = [];
		
		var xx = 60;
		var yy = 260;
		for (var j=1;j<7;j++){
			for (var k=1; k<5; k++) {
				var arr = [];
				arr.push(xx+ (150*(k-1)));
				arr.push(yy+ (150*(j-1)));
				this.posXY.push(arr);
			}
		}
		
		this._levelGroup.children.iterate(function(item){
			item.initX = this.posXY[item.no-1][0];
			item.initY = this.posXY[item.no-1][1];
			item.y = item.initY 
		}, this);
		
		this._levelGroup.children.iterate(function(item){
			item.x = item.initX-700;
			this.tweens.add({targets: item, x: item.initX, ease: 'Back.Out', duration: 1000 });
		}, this);
	}
	
	//Triggered when one of level buttons is clicked
	clickLevelBtn(pointer) {
		if (this.clickEnabled) {
			Sound("button_sound");
			
			this._levelGroup.children.iterate(function(item){
				var boundingBox = item.getBounds();
				if(Phaser.Geom.Rectangle.Contains(boundingBox, pointer.x, pointer.y)){
					currentLevel=item.no;
				}
			}, this);
			
			// out of frame animation 
			this.tweens.add({targets: this.menuBtn, y: -200, ease: 'Back.In', duration: 1000, onComplete: this.playGame.bind(this) });
			this.tweens.add({targets: this.selectLevelText, x: -700, ease: 'Back.In', duration: 700 });
			
			this._levelGroup.children.iterate(function(item){
				this.tweens.add({targets: item, x: item.initX+700, ease: 'Back.In', duration: 1000 });
			}, this);
			
			this.clickEnabled = false;
		}
	}
	
	// Once the level button is pressed, the game starts.
	playGame() {
		this.selectLevelText.destroy();
		this._levelGroup.destroy();
		this.menuBtn.destroy();
		this.soundBtn.destroy();
		this.scene.start("gameplay");
	}
	
	// Triggered when home button is clicked
	onMenu() {
		if (this.clickEnabled) {
			Sound("button_sound");
			this.tweens.add({targets: this.menuBtn, y: -200, ease: 'Back.In', duration: 1000, onComplete: this.backToMenu.bind(this)  });
			this.tweens.add({targets: this.selectLevelText, x: -300, ease: 'Back.In', duration: 700 });
			this._levelGroup.children.iterate(function(item){
				this.tweens.add({targets: item, x: item.initX+700, ease: 'Back.In', duration: 800 });
			}, this);
			
			this.clickEnabled = false;
		}
	}
	
	// Once home button animation is completed, the scene back to home menu.
	backToMenu() {
		this.selectLevelText.destroy();
		this._levelGroup.destroy();
		this.menuBtn.destroy();
		this.soundBtn.destroy();
		this.scene.start("mainmenu");
	}
}

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
/////////////////// GAMEPLAY CLASS ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////
 
var	clickEnabled;
var	init_x;
var	init_y;
var isOverDetonator = false;
var isOverBtnSound = false;
var isOverBtnReset = false;
var showHint = true;//true;

const shapeFriction = 5;
const shapeDensity = 1;
			
var canRotate;

var scoreTxt,levelTxt, bottomBackground,bestTxt, maxTime;
		
class Gameplay extends Phaser.Scene {
	constructor() {
		super("gameplay");
	}
	init(){
	}
	create() {
		var _t = this;
		// Define the physics world
		this.matter.world.setBounds(-1600, -300, 3200, 2000);//1200);
		
		this.onNewGame();
		
		// Set game input and collision events for the stars
		this.matter.world.on("collisionstart", event => {
		  event.pairs.forEach(pair => {
			const { bodyA, bodyB } = pair;
			if (bodyA.label == "star") {
				if (bodyA.gameObject!=null)	bodyA.gameObject.setFrame(0);
			}
			if (bodyB.label == "star") {
				if (bodyB.gameObject!=null) bodyB.gameObject.setFrame(0);
			}
		  });
		});
		this.matter.world.on("collisionactive", event => {
		  event.pairs.forEach(pair => {
			const { bodyA, bodyB } = pair;
			if (bodyA.label == "star") {
				if (bodyA.gameObject!=null)	bodyA.gameObject.setFrame(0);
			}
			if (bodyB.label == "star") {
				if (bodyB.gameObject!=null) bodyB.gameObject.setFrame(0);
			}
		  });
		});
		this.matter.world.on("collisionend", event => {
		  event.pairs.forEach(pair => {
			const { bodyA, bodyB } = pair;
			if (bodyA.label == "star") {
				if (bodyA.gameObject!=null)	bodyA.gameObject.setFrame(1);
			}
			if (bodyB.label == "star") {
				if (bodyB.gameObject!=null) bodyB.gameObject.setFrame(1);
			}
		  });
		});
		
		this.input.on('dragstart', function (pointer, gameObject) {
			gameObject.x = pointer.x;
			gameObject.y = pointer.y-100;
			Sound("pick");
			_t.children.bringToTop(gameObject);
			for (var i=0; i<_t.stars.length ;i++) {
				_t.children.bringToTop(_t.stars[i]);
			}
		});

		this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
			gameObject.x = dragX;
			gameObject.y = dragY-100;
			var g = gameObject;
			if (dragX>90-60 && dragX<90+60 && dragY>260-60 && dragY<260+60) {
				if (canRotate) { g.angle+=15; canRotate=false;}
			} else if (dragX>630-60 && dragX<630+60 && dragY>260-60 && dragY<260+60)  {
				if (canRotate) { g.angle-=15; canRotate=false;}
			} else {
				canRotate=true;
			}
		});
		this.input.on('dragend', function (pointer, gameObject) {
			if (gameObject.y<900) {
				gameObject.input.enable = false;
				gameObject.visible = false;
				Sound("drop");
				this.scene.onCreateShapeBody(gameObject.no, gameObject.angle, gameObject.x, gameObject.y+gameObject.dY);
				for (var i=0; i<_t.stars.length ;i++) {
					_t.children.bringToTop(_t.stars[i]);
				}
			} else {
				gameObject.angle = 0;
				this.scene.tweens.add({targets: gameObject, props:{ x:gameObject.initX, y:gameObject.initY }, ease: 'Linear.None', duration: 100});
			}
			canRotate=false;
		});
	}
	
	onNewGame(){
		soundBgVolume = 0.5;
		volumeLoop = soundBgVolume;
		if (windoW.listSound["backsound"]) {
			windoW.listSound["backsound"].volume = soundBgVolume;
		}
		
		clickEnabled = true;
		this.end = false;
		this.endstep = 0;
		this.shapePlaced = 0;
		this.score = 0;
		
		this.background=this.add.sprite(0,0, 'backGameplay').setOrigin(0,0);
		bottomBackground=this.add.sprite(0,930, 'backBottom').setOrigin(0,0);
		
		// array container
		this.shapes = [];
		this.theShapes = [];
		this.staticPlatforms = [];
		this.platform_shadows = [];
		this.stars = [];
		
		// Retrieve json data
		var JsonData = this.cache.json.get('myJsonObj');
		
		// add static platform
		var platformsData = JsonData['level_'+currentLevel].platforms;
		for (var p=0; p<platformsData.length; p++){
			var platformProperty =  platformsData[p];
			var plat_shadow = this.add.image(platformProperty[0], platformProperty[1]+10, 'box_shadow');
				plat_shadow.setScale(platformProperty[3],platformProperty[4]);
				plat_shadow.setAngle(platformProperty[2]);
			this.platform_shadows.push(plat_shadow);
			
			var platform = this.matter.add.sprite(platformProperty[0], platformProperty[1], 'box').setStatic(true);
				platform.setScale(platformProperty[3],platformProperty[4]);
				platform.setAngle(platformProperty[2]);
				platform.setFriction(shapeFriction);
			this.staticPlatforms.push(platform);
		}
		
		// add stars
		var starpolygon = '-21 -4 0 -20 21 -4 13 19 -13 19';
		var starData = JsonData['level_'+currentLevel].stars;
		for (var s=0; s<starData.length ;s++) {
			var starProp = starData[s];
			var star = this.matter.add.sprite(starProp[0],starProp[1], 'star',null,{ shape: { type: 'fromVerts', verts: starpolygon } }).setStatic(true).setSensor(true);
			star.setFrame(1);
			star.setOrigin(star.centerOfMass.x, star.centerOfMass.y)
			star.body.label = 'star';
			this.stars.push(star);
		}
		
		// add shapes in shape panel
		var shapeData = JsonData['level_'+currentLevel].shapes;
		for (var m=0; m<shapeData.length ;m++) {
			var shapeProp =  shapeData[m];
			var no = shapeProp[0];
			var str = 'shape_'+no;
			var shp = this.add.sprite(shapeProp[1],shapeProp[2], str).setInteractive();
			shp.initX = shapeProp[1];
			shp.initY = shapeProp[2];
			shp.no = no;
			this.input.setDraggable(shp);
			this.shapes.push(shp);
			if (no==5) shp.dY = 0//20;
			else shp.dY = 0;
		}
		// add tutorial texts
		if (currentLevel==1) this.hint1 = this.add.sprite(GAME_WIDTH/2,180,'tutorial').setOrigin(0.5,0);
		
		// add reset button
		this.resetBtn = this.add.sprite(20+120,  20, 'btn_retry')
			.setOrigin(0,0)
			.setInteractive({ useHandCursor: true })
			.on("pointerover"	,function(){this.resetBtn.setFrame(1); isOverBtnReset = true;}, this)
			.on("pointerout"	,function(){this.resetBtn.setFrame(0); isOverBtnReset = false;}, this)
			.on("pointerdown", 	function(){this.resetBtn.setFrame(2); isOverBtnReset = true;}, this)
			.on("pointerup",function(){	this.resetBtn.setFrame(0); isOverBtnReset = false; this.onResetGameplay(); },this);
		
		// add sound button
		this.soundBtn = this.add.sprite(20, 20, 'btn_sfx')
			.setOrigin(0,0)
			.setInteractive({ useHandCursor: true })
			.on("pointerover", function(){isOverBtnSound = true;})
			.on("pointerout", function(){isOverBtnSound = false;})
			.on("pointerdown", function(){isOverBtnSound = true;})
			.on("pointerup", function(){isOverBtnSound = false; this.onSound()}, this);
		if (!sfxactive) {this.soundBtn.setFrame(1);}
		
		// Add score text and current level text
		//scoreTxt = this.add.bitmapText(GAME_WIDTH-200, 30, 'thisfont',"", 40);
		levelTxt = this.add.bitmapText(GAME_WIDTH-50, 50, 'thisfont',"", 45).setOrigin(1,0);
		levelTxt.setText('Level '+currentLevel.toString());
	
		this.matter.world.resume();
	}
	
	// Triggered when shape is placed
	onCreateShapeBody(no, angle, xx, yy){
		var vertice4 = '-80 -20 -20 -20 -20 -80 20 -80 20 -20 80 -20 80 20 20 20 20 80 -20 80 -20 20 -80 20';
		var vertice5 = '-59 0 0 -97 59 0';
		var vertice8 = '-60 -60 60 -60 60 -20 20 -20 20 60 -20 60 -20 -20 -60 -20';
		var vertice9 = '-60 -60 60 -60 60 -20 20 -20 20 20 60 20 60 60 -60 60 -60 20 -20 20 -20 -20 -60 -20';
		var vertice10 = '-60 -60 60 -60 60 60 20 60 20 -20 -20 -20 -20 60 -60 60';
		var vertice11 = '-20 -40 80 -40 80 0 20 0 20 40 -80 40 -80 0 -20 0';
		var vertice12 = '-80 -40 20 -40 20 0 80 0 80 40 -20 40 -20 0 -80 0';
		var vertice13 ='0 52 30 0 90 0 119 52 90 103 30 103';
		var vertice14 ='100 -40 100 40 60 40 60 0 20 0 20 40 -20 40 -20 0 -100 0 -100 -40';
		var vertice15 ='100 -40 100 40 60 40 60 0 -100 0 -100 -40';
		var vertice16 = '-100 0 60 0 60 -40 100 -40 100 40 -100 40';
		var vertice17 = '-150 -60 -110 -60 -110 -20 150 -20 150 60 110 60 110 20 -150 20';
		var vertice18 = '-40 -40 40 -40 40 0 80 0 80 40 -80 40 -80 0 -40 0';
		var vertice19 = '-82 -40 82 -40 82 40 42 40 42 0 -42 0 -42 40 -82 40';
		var vertice20 = '0 0 120 0 120 40 40 40 40 120 0 120';
		var vertice21 = '0 80 40 80 40 0 80 0 80 80 120 80 120 200 80 200 80 120 40 120 40 200 0 200';
		var str = 'shape_'+no;
		var shp;
		
		if (no==2) shp = this.matter.add.sprite(xx,yy, str, null).setBody({type: 'circle', radius: 52});
		else if (no==6) shp = this.matter.add.sprite(xx,yy, str, null).setBody({type: 'circle', radius: 31});
		else if (no==4) shp = this.matter.add.sprite(xx,yy, str, null,{ shape: { type: 'fromVerts', verts: vertice4 } });
		else if (no==5) shp = this.matter.add.sprite(xx,yy, str, null,{ shape: { type: 'fromVerts', verts: vertice5 } });
		else if (no==8) shp = this.matter.add.sprite(xx,yy, str, null,{ shape: { type: 'fromVerts', verts: vertice8 } });
		else if (no==9) shp = this.matter.add.sprite(xx,yy, str, null,{ shape: { type: 'fromVerts', verts: vertice9 } });
		else if (no==10) shp = this.matter.add.sprite(xx,yy, str, null,{ shape: { type: 'fromVerts', verts: vertice10 } });
		else if (no==11) shp = this.matter.add.sprite(xx,yy, str, null,{ shape: { type: 'fromVerts', verts: vertice11 } });
		else if (no==12) shp = this.matter.add.sprite(xx,yy, str, null,{ shape: { type: 'fromVerts', verts: vertice12 } });
		else if (no==13) shp = this.matter.add.sprite(xx,yy, str, null,{ shape: { type: 'fromVerts', verts: vertice13 } });
		else if (no==14) shp = this.matter.add.sprite(xx,yy, str, null,{ shape: { type: 'fromVerts', verts: vertice14 } });
		else if (no==15) shp = this.matter.add.sprite(xx,yy, str, null,{ shape: { type: 'fromVerts', verts: vertice15 } });
		else if (no==16) shp = this.matter.add.sprite(xx,yy, str, null,{ shape: { type: 'fromVerts', verts: vertice16 } });
		else if (no==17) shp = this.matter.add.sprite(xx,yy, str, null,{ shape: { type: 'fromVerts', verts: vertice17 } });
		else if (no==18) shp = this.matter.add.sprite(xx,yy, str, null,{ shape: { type: 'fromVerts', verts: vertice18 } });
		else if (no==19) shp = this.matter.add.sprite(xx,yy, str, null,{ shape: { type: 'fromVerts', verts: vertice19 } });
		else if (no==20) shp = this.matter.add.sprite(xx,yy, str, null,{ shape: { type: 'fromVerts', verts: vertice20 } });
		else if (no==21) shp = this.matter.add.sprite(xx,yy, str, null,{ shape: { type: 'fromVerts', verts: vertice21 } });
		else shp = this.matter.add.sprite(xx,yy, str, null);
		
		shp.setFriction(shapeFriction);
		shp.setDensity(shapeDensity);
		shp.setOrigin(shp.centerOfMass.x, shp.centerOfMass.y)
		shp.setAngle(angle);
		shp.body.label = "Shape";
	
		this.theShapes.push(shp);
		this.shapePlaced++;
		
		this.children.bringToTop(bottomBackground);
		this.children.bringToTop(levelTxt);
		//this.children.bringToTop(scoreTxt);
		for (var j=0; j<this.shapes.length ;j++) {
			this.children.bringToTop(this.shapes[j]);
		}
	}
	
	// Triggered when sound button is clicked
	onSound(){
		if (this.soundBtn.frame.name==1) {
			this.soundBtn.setFrame(0);
			SoundLoop(soundBgVolume);
			sfxactive=true;
		} else {
			this.soundBtn.setFrame(1);
			StopSound();
			sfxactive=false;
		}
	}
	
	// Triggered when reset button is clicked
	onResetGameplay(){
		if (this.endstep==0) {
			Sound("button_sound");
			
			for (var i=0; i<this.shapes.length ;i++) {
				this.shapes[i].destroy();
			}
			for (i=0; i<this.stars.length ;i++) {
				this.stars[i].destroy();
			}
			for (i=0; i<this.theShapes.length ;i++) {
				this.theShapes[i].destroy();
			}
			for (i=0; i<this.staticPlatforms.length ;i++) {
				this.staticPlatforms[i].destroy();
				this.platform_shadows[i].destroy();
			}
			//scoreTxt.destroy();
			levelTxt.destroy();
			bottomBackground.destroy();
			this.background.destroy();
			this.soundBtn.destroy();
			this.resetBtn.input.enable = false;
			this.resetBtn.destroy();
			
			this.onNewGame();
		}
	}
	// Looping condition
	update() {
		if (this.endstep==0){
			
			if (this.theShapes.length>0){
				for (var i in this.theShapes){
					if (this.theShapes[i].y>1280-350){
						for (var j=0; j<this.shapes.length ;j++) {
							this.shapes[j].enabled = false;
						}
						this.end = true;
						this.resetBtn.input.enable = false;
						this.tweens.add({targets: this.resetBtn, y:-200, ease: 'Linear.None', duration: 300});
						maxTime = 100;
						break;
					}
				}				
			}
			if (this.shapePlaced==this.shapes.length){
				this.end = true;
				this.resetBtn.input.enable = false;
				this.tweens.add({targets: this.resetBtn, y:-200, ease: 'Linear.None', duration: 300});
				maxTime = 400;
				this.anims.create({
					key: "timerstart",
					frameRate: 5,
					frames: this.anims.generateFrameNumbers("timers", { start: 0, end: 28 }),
					repeat: 0
				});
				this.endtimer = this.add.sprite(GAME_WIDTH+100,GAME_HEIGHT/2, 'timers');
				this.tweens.add({targets: this.endtimer, x: GAME_WIDTH-80, ease: 'Back.Out', duration: 500});
				this.endtimer.play("timerstart");
				Sound("rolldrum");
			}
			this.score = 0;
			for (i=0; i<this.stars.length; i++){
					if (this.stars[i].frame.name==0) this.score += 10;
			}
			//scoreTxt.setText('Score '+this.score);			
		}
		if (this.end) {
			this.endstep++;	
			this.score = 0;
			for (i=0; i<this.stars.length; i++){
				if (this.stars[i].frame.name==0) this.score += 10;
			}
			//scoreTxt.setText('Score '+this.score);
		
			if (this.endstep==maxTime-50) {
				this.matter.world.pause();
			}
			// Show game over scene
			if (this.endstep==maxTime) {
				//scoreTxt.setText(''+this.score);
				this.showEndScreen();
				this.end=false;
				this.endstep=maxTime+10;
			}
		}
		
	}
	
	//Triggered when retry button in game over scene is clicked
	onRetryBtn_GameOver(){
		if (clickEnabled) {
			
			Sound("button_sound");
			Sound("woosh_sound");
			
			this.gameoverOutFrame();
			var _t = this;
			setTimeout(function(){_t.retryLevel_fromGameOver();},1200);
			clickEnabled=false;
		}
	}
	
	//Triggered when home button in game over scene is clicked
	onMenuBtn_GameOver(){
		if (clickEnabled) {
			
				Sound("button_sound");
				Sound("woosh_sound");
			
			this.gameoverOutFrame();
			var _t = this;
			setTimeout(function(){_t.backToLevelMenu_fromGameOver();},1200);
			clickEnabled=false;
		}
	}
	
	//Triggered when next level button in game over scene is clicked
	onNextBtn_GameOver(){
		if (clickEnabled) {
			
				Sound("button_sound");
				Sound("woosh_sound");
			
			this.gameoverOutFrame();
			var _t = this;
			setTimeout(function(){_t.nextLevel_fromGameOver();},1200);
			clickEnabled=false;
		}
	}
	
	// out of frame animation for gameover scene items
	gameoverOutFrame(){
		this.tweens.add({targets: this.retryBtn, y:-200, ease: 'Back.In', duration: 850});
		this.tweens.add({targets: this.levelMenuBtn, y:-200, ease: 'Back.In', duration: 900});
		this.tweens.add({targets: this.nextLevelBtn, y:-200, ease: 'Back.In', duration: 1000});
		this.tweens.add({targets: this.endScreen, y:-200, ease: 'Back.In', duration: 800});
		this.tweens.add({targets: this.winTxt, y:-430, ease: 'Bounce.Out', duration: 800});
		this.tweens.add({targets: scoreTxt, y:-200, ease: 'Back.In', duration: 800});
		this.tweens.add({targets: bestTxt, y:-150, ease: 'Back.In', duration: 800});
		// disable retry button, level menu button, and next level button
		this.retryBtn.input.enable = false;
		this.levelMenuBtn.input.enable = false;
		this.nextLevelBtn.input.enable = false;
	}
	
	// replay the gameplay
	retryLevel_fromGameOver() {
		this.cleartherest();
		this.onNewGame();
	}
	// back to level scene from gameover scene
	backToLevelMenu_fromGameOver() {
		this.cleartherest();
		this.scene.start('level');
	}
	// go to the next level
	nextLevel_fromGameOver() {
		if (currentLevel<24){
			currentLevel++;
			this.cleartherest();
			this.onNewGame();
		}
	}
	// remove all items in gameplay and gameover screen
	cleartherest(){
		levelTxt.destroy();
		scoreTxt.destroy();
		bestTxt.destroy();	
		bottomBackground.destroy();
		this.background.destroy();
		this.endScreen.destroy();
		this.retryBtn.destroy();
		this.soundBtn.destroy();
		this.levelMenuBtn.destroy();
		this.nextLevelBtn.destroy();
		this.winTxt.destroy();
	}
	
	// show the gameover scene
	showEndScreen(){
		
			Sound("win_sound");
			Sound("woosh_sound");
		if (sfxactive) {	
			soundBgVolume = 1;
			volumeLoop = soundBgVolume;
			if (windoW.listSound["backsound"]) {
				windoW.listSound["backsound"].volume = soundBgVolume;
			}
		}
		//check winning status
		var win = true;
		for (var i in this.theShapes){
			if (this.theShapes[i].y>930){
				win = false;
				break;
			}
		}
		
		if (currentLevel==1) {
			this.hint1.destroy();
		}
		
		this.resetBtn.destroy();
		if (this.endtimer!=null) {
			this.tweens.add({targets: this.endtimer, x: GAME_WIDTH+100, ease: 'Linear.None', duration: 300});
			var _t = this;
			setTimeout(function(){_t.endtimer.destroy();},500);
		}
		
		this.tweens.add({targets: levelTxt, alpha: 0, ease: 'Linear.None', duration: 200});
		for (var i=0; i<this.shapes.length ;i++) {
			this.shapes[i].destroy();
		}
		for (i=0; i<this.stars.length ;i++) {
			this.stars[i].destroy();
		}
		for (i=0; i<this.theShapes.length ;i++) {
			this.theShapes[i].destroy();
		}
		for (i=0; i<this.staticPlatforms.length ;i++) {
			this.staticPlatforms[i].destroy();
			this.platform_shadows[i].destroy();
		}
		
		// add gameover background ang gameover text
		this.endScreen= this.add.sprite(GAME_WIDTH/2, -200,'endscreen');
		this.winTxt = this.add.bitmapText(GAME_WIDTH/2, -430, 'thisfont','',60).setOrigin(0.5,0.5);
		
		// add buttons
		this.retryBtn = this.add.sprite(GAME_WIDTH/2-50-160, -200, 'btn_retry')
			.setOrigin(0,0)
			.setScale(1.3,1.3)
			.setInteractive({ useHandCursor: true })
			.on("pointerover", 	() =>	this.retryBtn.setFrame(1))
			.on("pointerdown", 	() =>	this.retryBtn.setFrame(2))
			.on("pointerout", 	() =>	this.retryBtn.setFrame(0))
			.on("pointerup",function(){	this.retryBtn.setFrame(0); this.onRetryBtn_GameOver(); },this);
			
		this.levelMenuBtn = this.add.sprite(GAME_WIDTH/2-50, -200, 'btn_levelmenu')
			.setOrigin(0,0)
			.setScale(1.3,1.3)
			.setInteractive({ useHandCursor: true })
			.on("pointerover", 	() =>	this.levelMenuBtn.setFrame(1))
			.on("pointerdown", 	() =>	this.levelMenuBtn.setFrame(2))
			.on("pointerout", 	() =>	this.levelMenuBtn.setFrame(0))
			.on("pointerup",function(){	this.levelMenuBtn.setFrame(0); this.onMenuBtn_GameOver(); },this);
		this.nextLevelBtn = this.add.sprite(GAME_WIDTH/2-50+160, -200, 'btn_nextlevel')
			.setOrigin(0,0)
			.setScale(1.3,1.3)
			.setInteractive({ useHandCursor: true })
			.on("pointerover", 	() =>	this.nextLevelBtn.setFrame(1))
			.on("pointerdown", 	() =>	this.nextLevelBtn.setFrame(2))
			.on("pointerout", 	() =>	this.nextLevelBtn.setFrame(0))
			.on("pointerup",function(){	this.nextLevelBtn.setFrame(0); this.onNextBtn_GameOver(); },this);
		
		if (win && currentLevel<24 && currentLevel==levelReached) {
			levelReached++;
		}
		
		if (win) {
			this.winTxt.setText("Level Cleared");
		} else {
			this.winTxt.setText("  You Failed");
			this.nextLevelBtn.visible = false;
			this.levelMenuBtn.x = GAME_WIDTH/2-50+160;
		}
		if (win &&currentLevel==24) {
			this.winTxt.setText("Game Cleared");
			this.nextLevelBtn.visible = false;
			this.levelMenuBtn.x = GAME_WIDTH/2-50+160;
		}
		// set best score for this level
		if (bestScores[currentLevel-1] < this.score) {
			bestScores[currentLevel-1] = this.score;
		}
		
		// set local storage for best score and level reached		
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem("savedLevelReached", levelReached);
			localStorage.setItem("savedBestScore", JSON.stringify(bestScores));
		}
		
		// score text
		scoreTxt = this.add.bitmapText(470, -100, 'thisfont',"", 50);
		scoreTxt.setText(''+this.score);
		scoreTxt.setOrigin(0,0);
		
		// get best score from local storage and show the best score text
		var bestScore = JSON.parse(localStorage.getItem("savedBestScore"));
		bestTxt = this.add.bitmapText(470, -100, 'thisfont',"", 50).setOrigin(0,0);
		bestTxt.setText(''+bestScore[currentLevel-1].toString());
		bestTxt.setOrigin(0,0);
		
		// in frame animation
		this.tweens.add({targets: this.retryBtn, y: GAME_HEIGHT/2+200-30, ease: 'Bounce.Out', duration: 1100});
		this.tweens.add({targets: this.levelMenuBtn, y: GAME_HEIGHT/2+200-30, ease: 'Bounce.Out', duration: 1200});
		this.tweens.add({targets: this.nextLevelBtn, y: GAME_HEIGHT/2+200-30, ease: 'Bounce.Out', duration: 1300});
		this.tweens.add({targets: this.endScreen, y: (GAME_HEIGHT/2-30), ease: 'Bounce.Out', duration: 1000});
		this.tweens.add({targets: this.winTxt, y: (GAME_HEIGHT/2)-230-30, ease: 'Bounce.Out', duration: 1000});
		
		this.children.bringToTop(scoreTxt);
		
		this.tweens.add({targets: scoreTxt, y: (GAME_HEIGHT/2)-70-32, ease: 'Bounce.Out', duration: 1000});
		this.tweens.add({targets: bestTxt, y: (GAME_HEIGHT/2)+20-30, ease: 'Bounce.Out', duration: 1000});
		
	}
}