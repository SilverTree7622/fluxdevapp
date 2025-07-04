let Shop = new Phaser.Class({
 
	Extends: Phaser.GameObjects.Container,   

	initialize:

	function Shop(scene)
	{
		this.scene = game_data['scene'];
		Phaser.GameObjects.Container.call(this, scene, 0, 0);        
		this.emitter = new Phaser.Events.EventEmitter();
	},

    init(params) {
		this.ad_items = JSON.parse(JSON.stringify(game_data['shop']['ad']));
		this.ad_pages = Math.ceil(this.ad_items.length / 9);
		this.total_pages = this.ad_pages;
		this.pages = [];
		this.items = [];
		this.current_page = 0;
		this.btn_allow_click = true;
		this.current_id = game_data['user_data']['current_resourse'];
		this.create_assets();
    },

    create_assets(params) {
		this.sky = this.scene.add.sprite(0, 0, "back");
        this.sky.setOrigin(0, 0);
		this.add(this.sky);
		this.cont_current_knife = new Phaser.GameObjects.Container(this.scene, loading_vars.W / 2, 250);
		this.add(this.cont_current_knife);
		this.cont_current_knife.visible = false;
		this.current_knife = new Phaser.GameObjects.Image(this.scene, 0, 0, 'common1', this.current_id);
		this.cont_current_knife.add(this.current_knife);
		this.current_knife.angle = 45;
		this.current_knife_scale = 0.8;
		this.current_knife.scale = this.current_knife_scale;
		
		this.cont_knives = new Phaser.GameObjects.Container(this.scene, 0, 370);
		this.add(this.cont_knives);

		this.create_pages();
		this.pages[this.current_page].setVisible(true);

		
		this.btn_left = new CustomButton(this.scene, -15 + loading_vars.W * 0.25, this.cont_knives.y + 185, this.handler_left, 'common1', 'btn_play1', 'btn_play1', 'btn_play1', this, null, null, 1);
		this.add(this.btn_left);
		this.btn_left.setScale(-0.7, 0.7);

		this.btn_right = new CustomButton(this.scene, 15 + loading_vars.W * 0.75, this.cont_knives.y + 185, this.handler_right, 'common1', 'btn_play1', 'btn_play1', 'btn_play1', this, null, null, 1);
		this.add(this.btn_right);
		this.btn_right.setScale(0.7, 0.7);

		this.btn_back = new CustomButton(this.scene, 50, loading_vars.H * 0.95, this.handler_back, 'common1', 'btn_arrow', 'btn_arrow', 'btn_arrow', this, null, null, 1);
		this.add(this.btn_back);

		this.btn_ad = new CustomButton(this.scene, loading_vars.W / 2, loading_vars.H * 0.9, this.handler_buy_ad_item, 'common1', 'btn_purple', 'btn_purple', 'btn_purple', this, null, null, 1);
		this.add(this.btn_ad);

		txt = this.scene.add.bitmapText(-12, 2, "font", '1', 24);
		this.btn_ad.add(txt);
		txt.setOrigin(0.5);
		this.btn_ad.txt = txt;
		this.btn_ad.ico = new Phaser.GameObjects.Image(this.scene, 0, -2, 'common1', 'rewarded_ad');
		this.btn_ad.ico.setOrigin(0, 0.5);
		this.btn_ad.ico.x = this.btn_ad.txt.x + this.btn_ad.txt.displayWidth / 2 + 7;
		this.btn_ad.ico.setScale(1);
		this.btn_ad.add(this.btn_ad.ico);

		this.update_buttons({});
    },

	handler_buy_ad_item() {
		game_data['utils'].show_rewarded_ad(res => {
			if (res['success']) {
				game_request.request({'buy_item': true, 'type': 'ad', 'id': this.active_item.id}, res => {
					if (res['success']) {
						this.update_btn_text(this.active_item);
						if (res['ad_resourses'].includes(res['id'])) {
							game_data['utils'].happy_moment();
							this.current_id = res['id'];
							this.set_active(this.active_item);
							this.emitter.emit('EVENT', {'event': 'update_crates_skin'});
							if (this.btn_ad) this.btn_ad.setVisible(false);
							this.update_current_knife();
							if (game_data['user_data']['ad_resourses'].includes(this.current_id)) {
								this.active_item.back.setFrame('back1');
								this.active_item.active_panel.setFrame('round1');
							}
							else {
								this.active_item.back.setFrame('back2');
								this.active_item.active_panel.setFrame('round2');
							}
						}
						
						this.emitter.emit('EVENT', {'event': 'update_money'});
					}
					else {
						// show_tip
						let pt = game_data['utils'].toGlobal(this.btn_ad, new Phaser.Geom.Point(0, 0));
						game_data['utils'].show_tip({'pt': pt, 'scene_id': 'game_tip', 'item_id': 'shop', 'phrase_id': '2', 'values': []});
					}
				});
			}
			else {
				let pt = game_data['utils'].toGlobal(this.btn_ad, new Phaser.Geom.Point(0, 0));
				game_data['utils'].show_tip({'pt': pt, 'scene_id': 'game_tip', 'item_id': 'shop', 'phrase_id': '2', 'values': []});
			}
		});
		
	},

	create_pages() {
		let money_iter = 0;
		let ad_iter = 0;

		for (let i = 0; i < this.ad_pages; i++) {
			let page = this.create_page({ type: 'ad' });
			page.setVisible(false);
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					if (ad_iter < this.ad_items.length) {
						this.create_item({ i, j, page, info: this.ad_items[ad_iter] });
						ad_iter++;
					}
					
				}
			}

		}
	},

	create_page({ type }) {
		let cont = new Phaser.GameObjects.Container(this.scene, 0, 0);
		cont.type = type;
		
		this.cont_knives.add(cont);
		this.pages.push(cont);

		return cont;
	},

	create_item(params) {
		let temp;
		let { i, j, page, info } = params;
		let { id, price } = info;
		let item = new Phaser.GameObjects.Container(this.scene, j * 176, i * 176);
		item.x += loading_vars.W / 5 + 20;
		page.add(item);
		item.id = id;
		item.price = price;

		item.active_panel = new Phaser.GameObjects.Image(this.scene, 0, 0, 'common1', 'round2');
		item.active_panel.scale = 0.7;
		item.add(item.active_panel);
		item.active_panel.alpha = 0;

		let back = new Phaser.GameObjects.Image(this.scene, 0, 0, 'common1', 'back2');
		back.scale = 0.7;
		item.add(back);
		back.setInteractive({useHandCursor: true});
		back.on('pointerup', () => {
			if (this.current_id !== id) {
				this.current_id = id;
				this.update_current_knife();
				this.set_active(item);
				if (game_data['user_data']['ad_resourses'].includes(item.id)) {
					game_request.request({'update_current_resourse': true, 'current_resourse': this.current_id}, res => {
						if (res['success']) {
							this.emitter.emit('EVENT', {'event': 'update_crates_skin'});
						}
					});
				}
				game_data['audio_manager'].sound_event({'play': true,  'sound_name': 'select_option'});
			}
		});
		item.back = back;

		if (game_data['user_data']['ad_resourses'].includes(id)) {
			back.setFrame('back1');
			item.active_panel.setFrame('round1');
		}

		let icon = new Phaser.GameObjects.Image(this.scene, 0, 0, 'common1', id);
		item.add(icon);

		if (game_data['user_data']['current_resourse'] === id) {
			let page_ind = this.pages.indexOf(page);
			page_ind = page_ind !== -1 ? page_ind : 0;
			this.current_page = page_ind;
			this.set_active(item);
		}
		item.bringToTop(item.active_panel)
		item.page = page;
		this.items.push(item);
		return item;

	},

	set_active(item) {
		if (this.active_item && this.active_item.active_panel) this.active_item.active_panel.setVisible(false);
		if ( game_data['user_data']['ad_resourses'].includes(item.id)) {
		}
		
		this.active_item = item;
		if (this.active_item && this.active_item.active_panel) this.active_item.active_panel.setVisible(true);
		item.active_panel.alpha = 1;

		this.update_btn_text(item);
		this.update_buttons({});
	},

	update_btn_text(item) {
		if (this.btn_ad && this.btn_ad.txt) {
			let remaider = item.id in game_data['user_data']['ad_watched'] ? game_data['user_data']['ad_watched'][item.id] : 0;
			let price_remained = item.price - remaider;
			
			let res = game_data['utils'].generate_string({'scene_id': 'shop', 'item_id': 'shop', 'phrase_id': '2', 'values': [price_remained], 'base_size': 24});
			this.btn_ad.txt.text = res['text'];
			this.btn_ad.txt.setFontSize(res['size']);
			if (this.btn_ad.ico) {
				this.btn_ad.ico.x = this.btn_ad.txt.x + this.btn_ad.txt.displayWidth / 2 + 7;
			}
			
		}
	},

	update_current_knife() {
		this.current_knife.setFrame(this.current_id);
		if (game_data['user_data']['ad_resourses'].includes(this.current_id)) {
		}
		this.current_knife.scale = 0;
		
		game_data['scene'].tweens.add({targets:[this.current_knife],  scale: 250/this.current_knife.height, duration: 200, ease: 'Sine.easeInOut', onComplete: () => {
		}});
	},

	show_page(page) {
		this.btn_allow_click = false;
		page.alpha = 0;
		game_data['scene'].tweens.add({targets:[page],  alpha: 1, duration: 500, ease: 'Sine.easeInOut', onComplete: () => {
			this.btn_allow_click = true;
		}});
	},

	handler_left() {
		if (this.btn_allow_click) {
			this.pages[this.current_page].setVisible(false);
			this.current_page--;
			this.pages[this.current_page].setVisible(true);
			this.show_page(this.pages[this.current_page]);
			
			this.update_buttons({ only_switch: true });
		}
		
	},

	handler_right() {
		if (this.btn_allow_click) {
			this.pages[this.current_page].setVisible(false);
			this.current_page++;
			this.pages[this.current_page].setVisible(true);
			this.show_page(this.pages[this.current_page]);
	
			this.update_buttons({ only_switch: true });
		}
		
	},

	update_buttons({ only_switch = false }) {
		if (this.btn_left) {
			if (this.current_page === 0) this.btn_left.setVisible(false);
			else this.btn_left.setVisible(true);
		}

		if (this.btn_right) {
			if (this.current_page === this.total_pages - 1) this.btn_right.setVisible(false);
			else this.btn_right.setVisible(true);
		}
		
		if (!only_switch) {
			if (game_data['user_data']['ad_resourses'].includes(this.active_item.id)) {
				if (this.btn_ad) this.btn_ad.setVisible(false);
			}
			else {
				if (this.pages[this.current_page].type === 'money') {
					if (this.btn_ad) this.btn_ad.setVisible(false);
					
				}
				else if (this.pages[this.current_page].type === 'ad') {
					if (this.btn_ad) this.btn_ad.setVisible(true);
				}
			}
		}
	},

	handler_back() {
		this.emitter.emit('EVENT', {'event': 'show_scene', 'scene_id': 'GAMEPLAY'});
	},

    show_shop(params) {
		this.items.forEach(item => {
			if (item.id === game_data['user_data']['current_resourse']) {
				let page_ind = this.pages.indexOf(item.page);
				page_ind = page_ind !== -1 ? page_ind : 0;
				this.current_page = page_ind;
				this.set_active(item);
			}
		});
		this.pages.forEach(page => page.setVisible(false));
		this.pages[this.current_page].setVisible(true);
		this.update_buttons({});
    },

	update_language() {
	}

});