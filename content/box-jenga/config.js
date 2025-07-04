
let game_data = {
    'clear_storage': false, // if set true the progress resets
    'test_ad': true, // if set false test ad overlay will no appear
    'urls': { // path urls object
		'audio': 'assets/audio/',
	},
    'ads': {'interstitial': { // configuration of ads
        'event_mult': {
            'level_lost': 1,
            'game_start': 0, 'level_start': 0.3
        }
    },
    'rewarded': {}
    },
    'langs': ['en', 'fr', 'de', 'es', 'it'], // languages presented in the game
    'new_lang': 'en', // if user open game for the first time english will be passed as language
    'shop': { // shop config
        'ad': [ // rewarded ad positions
            {'id': 'crate1', 'price': 2}, {'id': 'crate2', 'price': 2},
            {'id': 'crate3', 'price': 2}, {'id': 'crate4', 'price': 2},
            {'id': 'crate5', 'price': 2}, {'id': 'crate6', 'price': 2}
        ]
    },
    // user data object. If saved data exists then here it will be stored.
    // Otherwise, local_user_data will be stored here
    'user_data': {}
}

let local_user_data = {
    'sound': 1, // if 0 sound will be disabled
    'music': 1, // if 0 music will be disabled
    'levels_passed': 0,
    'ad_watched': { // object to remember how many times rewarded ads were watched for proper skin
        // 'crate1': 2,
        // 'crate2': 2,
        // 'crate3': 2,
        // 'crate4': 2,
        // 'crate5': 2,
        // 'crate6': 2,
    },
    'global_score': 0, // best score
    'old_global_score': 0, // best previos score
    'lang': 'en', // select language
    // 'ad_resourses': ['crate1', 'crate2', 'crate3', 'crate4', 'crate5', 'crate6'],
    'ad_resourses': ['crate1'], // crate skins got due to watching rewarded ad
    'current_resourse': 'crate1' // current crate skin
}

const GROUNDHEIGHT = 128; // ground height (px)
const CRATEHEIGHT = 77; // crate height (px)
let gameOptions = {
    timeLimit: 60, // level time
    gravity: 2, // gravity strength
    crateHeight: 700, // crate's y-coord
    crateRange: [-300, 300], // crate's x-coord range
    crateSpeed: 500, // crate's horizontal speed. The lower crateSpeed parameter the higher crate's horizontal speed
    width: loading_vars['W'], // game width
    height: loading_vars['H'] // game height
}