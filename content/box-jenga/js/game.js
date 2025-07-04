class Game {
	constructor(_scene) {
		this.scene = _scene;
		this.lastUpdate = Date.now();
		game_data['game_root'] = this;
	}

	get_social_api() {
		let socialApi;	
		// example of initializing api of the test net
		if (loading_vars['net_id'] == 'your_net_id') socialApi = new YourNetApi();
		// example of initializing api of the Y net
		else if (loading_vars['net_id'] == 'y') socialApi = new Y();
		// default localhost api
		else socialApi = new DefaultApi();
		return socialApi;
	}

	prepare_game() {
		game_data['socialApi'] = this.get_social_api();
		game_data['utils'] = new GameUtils();
		game_data['audio_manager'] = new AudioManager(game_data['scene']);
		this.bg_holder = new Phaser.GameObjects.Container(game_data['scene'], 0, 0);
		game_data['scene'].add.existing(this.bg_holder);
		this.create_main_game();
	}

	update(time, delta){
		if (this.game_play) this.game_play.update(time, delta);
	}
	create_main_game(){
		game_data['utils'].init(game_data['scene']);	
		game_data['utils'].emitter.on('EVENT', this.handler_event, this);
		
		window.addEventListener("resize", function(){
			game_data['socialApi'].set_game_size();			
		});

		game_data.scene.game.events.addListener(Phaser.Core.Events.PAUSE, this.onPause, this)
		game_data.scene.game.events.addListener(Phaser.Core.Events.RESUME, this.onResume, this)
		game_data['audio_manager'].init();
		
		this.game_play = new GamePlay(game_data['scene']);
		this.shop = new Shop(game_data['scene']);
		game_data['shop_cont'] = this.shop;
		this.game_windows = new GameWindows(game_data['scene']);
		game_data['game_windows'] = this.game_windows;
		this.game_play.visible = false;
		game_data['money_holder'] = new Phaser.GameObjects.Container(game_data['scene'], 0, 0);
		game_data['shop_holder'] = new Phaser.GameObjects.Container(game_data['scene'], 0, 0);
		game_data['options_holder'] = new Phaser.GameObjects.Container(game_data['scene'], 0, 0);
		
		game_data['scene'].add.existing(this.shop);
		game_data['scene'].add.existing(this.game_play);
		game_data['scene'].add.existing(game_data['money_holder']);
		game_data['scene'].add.existing(game_data['shop_holder']);
		game_data['scene'].add.existing(game_data['options_holder']);	

		game_data['scene'].add.existing(this.game_windows);
		let moving_holder = new Phaser.GameObjects.Container(game_data['scene'], 0,0);
		game_data['scene'].add.existing(moving_holder);
		game_data['moving_holder'] = moving_holder;

		game_data['test_ad_manager'] = new TestAdManager(game_data['scene']);
		game_data['scene'].add.existing(game_data['test_ad_manager']);

		this.wnd_overlay = new Phaser.GameObjects.Image(this.scene, 0, 0,'dark_overlay');
		this.wnd_overlay.setOrigin(0,0);
		this.wnd_overlay.alpha = 0.01;
		game_data['scene'].add.existing(this.wnd_overlay);
		this.wnd_overlay.setInteractive();
		this.wnd_overlay.visible = false;
		game_data['utils'].load_xmls_preloaded(() => {
			this.shop.init({});
			this.start_game();
		});

		this.start_music();
	}

	block_interface() {
		if (this.wnd_overlay) this.wnd_overlay.visible = true;
	}

	unblock_interface() {
		if (this.wnd_overlay) this.wnd_overlay.visible = false;
	}

	onFocus(params) {
		console.log('onFocus', params)
	}

	onPause(params) {
		pause();
	}

	onResume() {
		resume();
	}

	onHidden(params) {
		console.log('onHidden', params)
	}

	onVisible(params) {
		console.log('onVisible', params)
	}

	start_music() {
		let id = 1;
		game_data['audio_manager'].sound_event({'play': true, 'loop': true, 'sound_type': 'music', 'sound_name': 'free_main' + id, 'audio_kind': 'music', 'map': true});
	}

	start_game() {
		window['UtilPlatform'].sendMsg2Parent('ShowNavFooterPlay');
		this.shop.emitter.on('EVENT', this.handler_event, this);
        game_data['current_scene'] = 'MAP';
		this.shop.setVisible(false);
		this.game_play.setVisible(true);
		this.game_play.init();
		this.game_play.emitter.on('EVENT', this.handler_event, this);
		setTimeout(() => {
			game_data['socialApi'].set_game_size();	
			setTimeout(() => { game_data['scene'].scale.refresh(); }, 1000);
			this.show_gameplay({'init': true});
		}, 250);
		
		this.game_windows.init({});
		this.game_windows.emitter.on('EVENT', this.handler_event, this);
	}


	handler_event(params) {
	  switch (params['event']) {
		  	case 'show_scene': 
			  this.show_scene(params)
			break;
			case 'show_window': 
				this.show_window(params);
				break;
			case 'window_closed':
				break;
			case 'window_shown': 
				
				break;
			case 'update_language':
				this.game_play.update_language();
				this.shop.update_language();
				game_data['utils'].update_language();
				break;
			case 'update_crates_skin':
				this.game_play.update_crates_skin();
				break;
	  default:
		//console.log('Unknown event=',params['event'])
		break;
		}
	}

	show_window(params) {
		this.game_windows.show_window(params);
	}
	
	show_scene(params) {
		game_data['current_scene'] = params['scene_id'];
		switch (params['scene_id']) {
			case 'GAMEPLAY': 
				this.show_gameplay(params);
				break;
			case 'SHOP':
				this.show_shop(params);
				break;
			default:
				console.log('Unknown scene_id=',params['scene_id'])
				break;
		}
	}

	show_gameplay(params) {
		game_data['is_gameplay'] = true;
		game_data['current_scene'] = 'GAMEPLAY';
		this.game_play.show_gameplay(params);
		this.game_play.resume_timer();
		this.game_play.visible = true;
		this.shop.visible = false;
	}

	show_shop() {
		game_data['current_scene'] = 'SHOP';
		this.shop.visible = true;
		this.game_play.visible = false;
		this.game_play.pause_timer();
		this.shop.show_shop();
	}

	
}