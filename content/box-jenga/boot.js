let phaser_game;
let files_preloaded = false;
let game = null;
let landscape = loading_vars['orientation'] == 'landscape';
let is_localhost = location.hostname == '127.0.0.1' || location.hostname == 'localhost' || loading_vars.net_id == 'localhost';
let allow_rewarded_ads = false;
let allow_intersitial_ads = false;
let temp_user_data = null;
let paused = false;
let allow_resume_timer = true;
let allow_pause_timer = true;
let allow_shop = true;

window.onload = function() {
	initialize(function(){
		let gameConfig = get_game_config();
		game_request = new GameRequest();
		game_request.request({'get_game_info': true}, function(params) {
			if ('user_data' in params) {
				temp_user_data = params['user_data'];
			} 
			gameConfig['scene'] = mainGame;
			phaser_game = new Phaser.Game(gameConfig);
			window.focus();	
		});
								
	});

	let elem = document.getElementById('preload');
	if (elem) elem.style.display = 'none';
}	


class mainGame extends Phaser.Scene{
	constructor(){
		super("MainGame");
	}

	preload(){	
		this.preload_files();
	}

	preload_files(on_complete){
		let preload_sounds = [];
		for (let i = 0; i < preload_sounds.length; i++) {
			this.load.audio(preload_sounds[i], 'assets/audio/' + preload_sounds[i] + '.mp3');
		}

		this.load.atlas("common1", "assets/common1.png", "assets/common1.json");
		this.load.image("back", `./assets/bgs/back1.png`);
		this.load.image("btn_reward", `./assets/btn-reward.png`);
        this.load.spritesheet('loading', 'img/loading.png', { frameWidth: 40, frameHeight: 18 });
        this.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.xml");

		if (loading_vars['js_combined']) { 
			this.load.script('all', "bundle.js");
		}
		else {
			this.load.script('main_game', "js/game.js");
			this.load.script('social_api', "js/game_utilities/social_api.js");
			this.load.script('game_utils', "js/game_utilities/game_utils.js");
			this.load.script('custom_button', "js/game_utilities/custom_button.js");
			this.load.script('audio_manager', "js/game_utilities/audio_manager.js");
			this.load.script('test_ad_manager', "js/game_utilities/test_ad_manager.js");
			this.load.script('game_play', "js/game_play/game_play.js");
			this.load.script('shop', "js/shop/shop.js");
			this.load.script('game_windows', "js/game_windows/game_windows.js");
			this.load.script('select_language', "js/game_windows/select_language.js");
					
		}
		this.load.xml('language_xml', 'assets/xml/language.xml');
		this.load.on('progress', value => {
			if (Math.round(value * 100) == 100)
			this.load.off('progress');	
		});
		this.load.once('complete', () => {						
			files_preloaded = true;
			this.create_game();
		});		
		this.load.start();	
	}

	create_game() {	
		game_data['scene'] = this;
		if (temp_user_data) {
			update_object(game_data['user_data'], temp_user_data);
			temp_user_data = null;
		}

		game = new Game(this);	
		game.prepare_game();				
	}
	
	update(time, delta){
		if (game) game.update(time, delta);
	}
}

function update_object(obj1, obj2) {
	for (let prop in obj2) {
		obj1[prop] = obj2[prop];			  
	}		
}

function initialize(on_complete) {
	if (loading_vars['net_id'] === 'y') {
		YAPI.startGame()
		.then(params => {
			let { id } = params;
			loading_vars['user_id']	= id;
			allow_rewarded_ads = true;
			allow_intersitial_ads = true;
			on_complete();
		})
		.catch(e => {
			console.log(e);
		});
	}
	else { // localhost version
		loading_vars['user_id']	= '0';
		allow_rewarded_ads = true;
		allow_intersitial_ads = true;
		on_complete();
	}
}

function get_game_config() {
	loading_vars['default_W'] = parseInt(loading_vars['W']);
	loading_vars['default_H'] = parseInt(loading_vars['H']);
	loading_vars['extra_W'] = 0;
	loading_vars['extra_H'] = 0;

	let base_ratio = loading_vars['W'] / loading_vars['H'];
	let def_w = parseInt(loading_vars['W']);
	let def_h = parseInt(loading_vars['H']);
	let ratio = window.innerWidth / window.innerHeight;


	if (loading_vars['mobile'] && window.innerWidth < window.innerHeight)
		ratio = window.innerHeight / window.innerWidth;


	if (is_localhost || (loading_vars['mobile'])) {

	}
	else ratio = base_ratio;

	if (is_localhost) ratio = base_ratio;
	//ratio = 2.2
	if (ratio > 2.2) ratio = 2.2;
	if (loading_vars['W'] < loading_vars['H'] * ratio) {
		loading_vars['W'] = parseInt(loading_vars['H'] * ratio);
		loading_vars['extra_W'] = loading_vars['W'] - def_w;
		loading_vars['extra_H'] = loading_vars['H'] - def_h;
	}
	let mobile_device = loading_vars['mobile'];
	let config = {
		type: Phaser.WEBGL,
		
		parent: 'phaser_game',
		width: loading_vars['W'],
		height: loading_vars['H'],
		backgroundColor: 0x000000,
		clearBeforeRender: loading_vars['mobile'] ? false : true,
 		render: {
			powerPreference: 'high-performance'
 		},
		banner: false,
	};
	if (mobile_device) {
		config['scale'] = {
			mode: Phaser.Scale.FIT,
			// autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	}
	else {
		config['scale'] = {
			// autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
		
		config['scale'].mode = Phaser.Scale.FIT;
		config['fullscreenTarget'] = 'phaser_game';
	}

	config['physics'] = {
		default: "matter",
		matter: {
			gravity: {
				y: gameOptions.gravity
			}
		}
	};
	return config;
}

function pause() {
	game_data['unpaused'] = 0;
	if (game_data['audio_manager']) game_data['audio_manager'].update_volume();
	if (game_data['game_root']) game_data['game_root'].block_interface();
	paused = true;
	if (game_data.scene) game_data.scene.game.input.enabled = false;
	if (game_data && game_data['game_play']) {
		game_data['game_play'].pause_timer();
	}
	console.log('pause');
}

function resume() {
	game_data['unpaused'] = 1;
	if (game_data['audio_manager']) game_data['audio_manager'].update_volume();
	if (game_data['game_root']) game_data['game_root'].unblock_interface();
	paused = false;
	if (game_data.scene) game_data.scene.game.input.enabled = true;
	if (game_data && game_data['game_play'] && !(game_data.game_windows && game_data.game_windows.game_window)) {
		game_data['game_play'].resume_timer();
	}
	console.log('resume');
}