class GameUtils {
	constructor() {		        
	}
	
	init(scene) {
		this.Timelines = {};
		this.scene = game_data['scene'];
		this.emitter = new Phaser.Events.EventEmitter();
		this.create_overlay();
	}
	
	create_overlay() {
		let rect = new Phaser.Geom.Rectangle(0, 0, loading_vars['W'], loading_vars['H']);
		let graphics = this.scene.add.graphics({ fillStyle: { color: 0x000000, alpha: 1 } })
		graphics.fillRectShape(rect);
		graphics.generateTexture('dark_overlay', loading_vars['W'], loading_vars['H']);
		graphics.destroy();
	}
	
	create_missclick() {
		let config = {
			key: 'mistake_anim',
			frames: this.scene.anims.generateFrameNames('common1', { prefix: 'mistake_anim', end: 28, zeroPad: 4 }),
			repeat: 0,   
			showOnStart: true,
			hideOnComplete: true
		};
		this.scene.anims.create(config);
		this.mistake_anim = this.scene.add.sprite(-20,-20, 'mistake_anim');
		this.mistake_anim.setOrigin(0.5, 0.8);
		this.global_missclick_down = null
		this.global_missclick_up = null;
		this.global_missclick_holder = new Phaser.GameObjects.Container(this.scene, 0, 0);
		this.scene.add.existing(this.global_missclick_holder);

	}
	
	assign_to_global_missclick(obj) {
		obj.on('pointerdown', pointer => {  
			let _id = parseInt(Math.random() * 1000000);
			this.global_missclick_down = _id;
			if (this.global_missclick_up == null) this.global_missclick_up = _id;
		});
		obj.on('pointerup', _pointer => { 
			if (_pointer && this.mistake_anim && this.global_missclick_up == this.global_missclick_down) {
				this.make_global_missclick(_pointer);
			}
			_ththisis.global_missclick_up = null;
		});
	}
	make_global_missclick(pointer = null) {
		if (pointer == null) pointer = this.scene.input.activePointer;
		let pt = new Phaser.Geom.Point(pointer['worldX'], pointer['worldY']);
		this.mistake_anim.x = pt.x;
		this.mistake_anim.y = pt.y;
		this.global_missclick_holder.add(this.mistake_anim);
		this.mistake_anim.play('mistake_anim');
		game_data['audio_manager'].sound_event({'event': 'sound_event', 'play': true, 'sound_name': 'wrong_click'});
	}


	load_xmls_preloaded(on_complete) {
		setTimeout(() => {
			this.read_language();
			on_complete();	
		}, 20);
	}
	
	is_map() {
		return game_data['current_scene'] === 'MAP'
	}

	is_gameplay() {
		return game_data['current_scene'] === 'GAMEPLAY'
	}
	
  	read_language() {
		let i;
		let j;
		let game_text = {};
		let langs = game_data['langs'];
		let scene_id;
		let phrase_id;
		let item_id;	
		let lang_id;
		let _lang;
		let language_xml = phaser_game.cache.xml.get('language_xml'); 

		let phrases = language_xml.getElementsByTagName("DYNAMIC_PHRASE");
		for(i = 0; i < phrases.length; i++){			
			scene_id = phrases[i].getAttributeNode("scene_id").textContent;
			item_id = phrases[i].getAttributeNode("item_id").textContent;
			phrase_id = phrases[i].getAttributeNode("phrase_id").textContent;	

			if (!(scene_id in game_text))
				game_text[scene_id] = {};
			if (!(item_id in game_text[scene_id]))
				game_text[scene_id][item_id] = {};
			if (!(phrase_id in game_text[scene_id][item_id]))
				game_text[scene_id][item_id][phrase_id] = {};
			
			
			for (j = 0; j < langs.length; j++) {
				lang_id = langs[j].toUpperCase();		
				if (phrases[i].getElementsByTagName(lang_id)[0]) _lang = lang_id;
				else _lang = 'EN';
				game_text[scene_id][item_id][phrase_id][lang_id] = {
					'text':  phrases[i].getElementsByTagName(_lang)[0].getElementsByTagName("TEXT")[0].textContent,
					'size':  parseInt(phrases[i].getElementsByTagName(_lang)[0].getElementsByTagName("SIZE")[0].textContent)
				};				
			}																
		}	
	 
		game_data['language'] = game_text;							
}

	zeros(num) {
		let arr = [];
		for (let i = 0; i < num; i++) arr.push(0);
		return arr;
	}
	
	int_array(arr) {
		let res = [];
		for (let i = 0; i < arr.length; i++)
			if (arr[i] == '-')
				res.push(-1);
			else	
				res.push(parseInt(arr[i]));
		return res;
	}    

	empty_line(len) {
		let res = []
		for (let i = 0; i < len; i++)
			res.push('-');
		return res;
	} 
	
	fill_line(arr,val) {
		let res = []
		for (let i = 0; i < arr.length; i++)
			res.push(arr[i] == '-' ? '-' : val);
		return res;
	} 


	toLocal(container, pt) {
		let containers = [];
		let parent_contaiter = container;
		let holder;
		let new_pt;
		if (pt) new_pt = new Phaser.Geom.Point(pt.x, pt.y);
		else new_pt = new Phaser.Geom.Point(0,0);
		
		
		while (parent_contaiter && parent_contaiter != this.scene) {
			containers.push(parent_contaiter);
			parent_contaiter = parent_contaiter.parentContainer;
		}
		
		while(containers.length > 0) {
			holder = containers.pop();
			new_pt.x = (new_pt.x - holder.x) / holder.scaleX;
			new_pt.y = (new_pt.y - holder.y) / holder.scaleY;			
		}
		
		 return new_pt;
		}
		
	toGlobal(container, pt) {
		let new_pt;
			if (pt) new_pt = new Phaser.Geom.Point(pt.x, pt.y);
			else new_pt = new Phaser.Geom.Point(0,0);

			let parent_contaiter = container;
			while (parent_contaiter && parent_contaiter != this.scene) {
					new_pt.x = new_pt.x * parent_contaiter.scaleX + parent_contaiter.x;
					new_pt.y = new_pt.y * parent_contaiter.scaleY + parent_contaiter.y;
					parent_contaiter = parent_contaiter.parentContainer;
			}
			return new_pt;		
	}

	fly_items(params, on_complete) {
		game_data['allow_fly'] = true;
		let i;
		let amount = params['amount'];
		let delay = 50;			
		let func;

		for (i = 0; i < amount; i++) {
				func = (i == amount - 1) ? on_complete : function(){};
				this.show_moving_item(params, delay * i, func);
		}
	}

	show_moving_item(params, delay, on_complete) {
		let item_atlas = params['item_atlas'];
		let item_name = params['item_name'];
		let holder = params['holder'];
		let pt_start = this.toLocal(holder, params['pt_start']);
		let pt_end = this.toLocal(holder, params['pt_end']);

		let item = new Phaser.GameObjects.Image(this.scene, 0, 0, item_atlas, item_name);
		item.x = pt_start.x;
		item.y = pt_start.y;
		if (holder && holder.scene) {
			holder.add(item);
			let temp_pt = this.toGlobal(holder, pt_start);
			let _x = loading_vars['W'] / 2;
			let _y = loading_vars['H'] / 2;
			if (temp_pt.y  > _y) _y = loading_vars['H'] * 0.2;
			if (temp_pt.x > _x) _x = temp_pt.x;
			let pt_mid = new Phaser.Geom.Point(_x, _y);
			pt_mid = this.toLocal(holder, pt_mid);
			setTimeout(() => {
				game_data['utils'].bezier(pt_start, pt_mid, pt_end, item, 500, 'Sine.easeOut', this, () => {
					this.add_light_stars(params['pt_end'], holder, on_complete);
					item.destroy();
				});   


			}, delay);
		}		
	}

	add_light_stars(_pt, holder, on_complete) {
		if (!('allow_fly' in game_data)) game_data['allow_fly'] = true;
		if (game_data['allow_fly']) {
			let star_light;
			let diff_x;
			let diff_y;
			let radius = 30;
			let light_stars_number = 15;	
			let pt = this.toLocal(holder, _pt);
			let func;
			
			for (let i = 0; i < light_stars_number; i++) {
					star_light = new Phaser.GameObjects.Image(this.scene, 0, 0, 'common1', 'light_star');
					star_light.x = pt.x - (Math.random() - 0.5) * 20;
					star_light.y = pt.y - (Math.random() - 0.5) * 20;
					diff_x = 2 * radius * Math.random() - radius;
					diff_y = Math.sqrt(radius * radius - diff_x * diff_x) * (2 * Math.floor(2 * Math.random()) - 1);
					func = (i == light_stars_number - 1) ? on_complete : null;
					this.move_light_star(star_light, new Phaser.Geom.Point(star_light.x + diff_x, star_light.y + diff_y), holder, func);
			}
		}
	}

	move_light_star(star_light, pt, holder, on_complete = null) {
			if (holder && holder.scene) holder.add(star_light);
			game_data['scene'].tweens.add({targets: star_light, x: pt.x, y: pt.y, duration: 100 + 150 * Math.random(), onComplete: function(){
					game_data['scene'].tweens.add({targets: star_light, alpha: 0, duration: 100, onComplete: function(){
							star_light.destroy();
							if (on_complete) {
								on_complete();
							}
					}});
			}});					
	}
	bezier(start_pt, mid_pt, end_pt, item, _duration, _ease, scope, on_complete = null, extra_mid_pt = null, delay = 0, emitter = null, emitter_pos_mod = {x: 0, y: 0}) {
		let curve;
		let allow_stop_emitter = false;
		let stop_emitter_level = 0.9;
		if (emitter) {
			emitter.stop();
			allow_stop_emitter = true;
		}
		if (extra_mid_pt != null) curve = new Phaser.Curves.CubicBezier(start_pt, extra_mid_pt, mid_pt, end_pt);
		else curve = new Phaser.Curves.QuadraticBezier(start_pt, mid_pt, end_pt);
		item.bezier_val = 0;
		
		game_data['scene'].tweens.add({
			targets: item, bezier_val: 1,
			duration: _duration,
			delay: delay,
			ease: _ease,
			callbackScope: scope,
			onUpdate: function(tween, target){
				let position = curve.getPoint(item.bezier_val);
				item.x = position.x;
				item.y = position.y;
				if (allow_stop_emitter && item.bezier_val > stop_emitter_level) {
					emitter.stop();
					allow_stop_emitter = false;
				}
				else if (emitter) {
					emitter.setPosition(item.x + emitter_pos_mod.x, item.y + emitter_pos_mod.y);
				}
			},
			onComplete: function(){
				item.x = end_pt.x;
				item.y = end_pt.y;
				
				if (allow_stop_emitter) emitter.stop();
				
				
				if (on_complete) on_complete();
			}
		});
		if (emitter) emitter.start();
	}

	generate_string(params) {
		let i;
		let lang_id = game_data['user_data']['lang'].toUpperCase();
		if (game_data['langs'].indexOf(game_data['user_data']['lang']) < 0) lang_id = 'EN';
		let scene_id = params['scene_id'];
		let item_id = params['item_id'];
		let phrase_id = String(params['phrase_id']);
		let base_size = params['base_size']
		let res = {};
		let text_obj = {};
		try {
			text_obj = game_data['language'][scene_id][item_id][phrase_id][lang_id];
		}
		catch (e) {
			text_obj = {'text': 'missed_text', 'size' : 0};
			let msg = 'no_text';
			let error = {'stack': scene_id + ' ' + item_id + ' ' + phrase_id + ' ' + lang_id}
			if (!is_localhost) report_error(msg, '', 0, 0, error);
			// console.log(msg, error, error.stack);
		}
		res['size'] = base_size + text_obj['size'];


		let txt = text_obj['text'];
		if ('values' in params) {
			let values = params['values'];
			let output = txt;
			let pattern = /%val/;
			for (i = 0; i < values.length; i++) {
				output = output.replace(pattern, values[i]);
				if (output.indexOf("[") >= 0) {
					output = this.replace_correct_word(output, values[i], lang_id);
				}
			}
			txt = output;
		}
		let myPattern = /\\n/gi;
		txt = txt.replace(myPattern,'\n');
		res['text'] = txt;
		return res;

	}
	
	replace_correct_word(txt, val, lang_id) {
		let start_index;
		let ind;
		let ind1;
		let ind2;
		let str;
		let str_all;
		let correct_word; 
		let arr;
		
		start_index = 0;
		ind = 0;
		ind1 = txt.indexOf("[", start_index);
		ind2 = txt.indexOf("]", start_index);
		if (ind1 >= 0 && ind2 >= 0 && ind2 > ind1) {
			str_all = txt.substr(ind1, ind2 - ind1 + 1);
			str = txt.substr(ind1 + 1, ind2 - ind1 - 1);
			arr = str.split(',');
		}
		
		correct_word = '';
		if (lang_id == 'RU' && arr.length == 3) {
			if (val % 100 > 10 && val % 100 < 20) {
				correct_word = arr[2];
			}
			else {
				switch (val % 10) {
					case 0: correct_word = arr[2]; break;
					case 1: correct_word = arr[0]; break;
					case 2: correct_word = arr[1]; break;
					case 3: correct_word = arr[1]; break;
					case 4: correct_word = arr[1]; break;
					case 5: correct_word = arr[2]; break;
					case 6: correct_word = arr[2]; break;
					case 7: correct_word = arr[2]; break;
					case 8: correct_word = arr[2]; break;
					case 9: correct_word = arr[2]; break;
				}
			}				
		}	
		else if (arr.length == 2) {
			correct_word = (val == 1 ? arr[0] : arr[1]);
		}			
		
		if (correct_word.length > 0)
			txt = txt.replace(str_all, correct_word);
		
		return txt;
	}		
		
	get_time() {
		return new Date().getTime();
	}

	get_passed_amount() {
		if (game_data['user_data'] && game_data['user_data']['levels_passed'])
			return game_data['user_data']['levels_passed'];
		else return 0;
	}

	check_ads(event_type) {
		if (game_data['ads'] && game_data['ads']['interstitial']) {
			let mults = game_data['ads']['interstitial']['event_mult']
			if (mults) {
				let prob = 100;
				if (event_type in mults) prob *= mults[event_type];
				let rand = Math.random() * 100;
				if (rand < prob) this.show_interstitial_ad();
			}
		}
	}

check_matrix_empty(arr) {
	for (let i = 0; i < arr.length; i++)
		for (let j = 0; j < arr[i].length; j++)
			if (arr[i][j] != '-' && arr[i][j] != '0')
				return false;
				
	return true;			
}

getNumbers(n) {
	let numbers = [];
	
	for (let i = 1; i <= n; i++) {
	  numbers.push(i);
	}
	
	return numbers;
  }

get_random_from_2d(arr, w, h) {
	if (!Array.isArray(arr)) return null
	let pos_y, pos_x
	do {
		pos_y = parseInt(Math.random() * w);
		pos_x = parseInt(Math.random() * h);
		
		
	} while (!(arr[pos_y] && arr[pos_y][pos_x] && arr[pos_y][pos_x] !== '-'))
	
	return [pos_y, pos_x]
}
	
	show_interstitial_ad() {
		if (navigator.onLine) {
			game_data['socialApi'].show_interstitial_ad();
		}
	} 
	
	show_rewarded_ad(on_complete) {
		if (navigator.onLine && allow_rewarded_ads) {
			game_data['socialApi'].show_rewarded_ad(on_complete);	
		}
		else on_complete({'success': false});
	}

	update_language() {
		game_request.update_language();
	}

	deep_copy(inObject) {
		let outObject;
		let value;
		let key;

		if (typeof inObject !== 'object' || inObject === null)
		{
			//  inObject is not an object
			return inObject;
		}

		//  Create an array or object to hold the values
		outObject = Array.isArray(inObject) ? [] : {};

		for (key in inObject)
		{
			value = inObject[key];

			//  Recursively (deep) copy for nested objects, including arrays
			outObject[key] = this.deep_copy(value);
		}

		return outObject;
	}

	average(values) {
		let sum = 0;
		for (let i = 0; i < values.length; i++) {
			sum += values[i];
		}
		return Math.floor(sum / values.length);
	}

	linspace(startValue, stopValue, cardinality) {
		let arr = [];
		let step = (stopValue - startValue) / (cardinality - 1);
		for (let i = 0; i < cardinality; i++) {
		  arr.push(startValue + (step * i));
		}
		return arr;
	}

	createRangeWithStep(start, end, step) {
		if (typeof start !== 'number' || typeof end !== 'number' || typeof step !== 'number') {
			throw new Error('Start, end, and step values must be numbers.');
		}
	
		if (start > end && step > 0) {
			throw new Error('Invalid range: start is greater than end, but step is positive.');
		}
	
		if (start < end && step < 0) {
			throw new Error('Invalid range: start is less than end, but step is negative.');
		}
	
		const range = [];
		for (let i = start; (step > 0) ? i <= end : i >= end; i += step) {
			if (start !== i && end !== i) range.push(i);
		}
	
		return range;
	}

	vector(p1, p2) {
		return {
				x: (p2.x - p1.x),
				y: (p2.y - p1.y)
		};
	}

	dot(u, v) {
		return (u.x * v.x + u.y * v.y);
	}

	happy_moment() {
		game_data['socialApi'].happy_moment();
	}
	
	game_play_start() {
		game_data['socialApi'].game_play_start();
	}

	
	game_play_stop() {
		game_data['socialApi'].game_play_stop();
	}

	update_level(value) {
		game_data['socialApi'].update_level(value);
	}

	update_score(value) {
		game_data['socialApi'].update_score(value);
		// game_data['game_map'].new_score();
	}

	show_banner(value) {
		game_data['socialApi'].show_banner(value);
	}
}