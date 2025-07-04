var PreloadState = {
    preload: function() {
        // show logo and progress bar
        game.preloadLogo = game.add.image(game.world.width/2, game.world.height/2-100, 'preload', 'logo');
        game.preloadLogo.anchor.setTo(0.5);
        
        game.preloadBar = game.add.sprite(game.world.width/2, game.world.height/2+100, 'preload', 'progress');
        game.preloadBar.x -= game.preloadBar.width/2;
        game.load.setPreloadSprite(game.preloadBar);
        
        // load assets 
        game.load.image('mainMenuBackground', 'assets/images/main_menu/background.jpg');
        game.load.spritesheet('character', 'assets/images/game/char_strip_70x93.png', 70, 93)
        game.load.image('block', 'assets/images/game/block.png');
        game.load.image('wall', 'assets/images/game/wall.png');
        //game.load.image('lava', 'assets/images/game/lava.png');
        game.load.spritesheet('lava', 'assets/images/game/lava2.png', 640, 300);
        game.load.image('power', 'assets/images/game/power.png');
        game.load.image('power_background', 'assets/images/game/power_background.png');
        game.load.image('acid', 'assets/images/game/acid1.png');
        game.load.image('acid2', 'assets/images/game/acid2.png');
        game.load.image('acid3', 'assets/images/game/acid3.png');        
        game.load.spritesheet('coin', 'assets/images/game/coin_strip_64x64.png', 64, 64);
        game.load.image('background', 'assets/images/game/background.png');
        game.load.image('gameover', 'assets/images/game/gameover.png');
        
        // load fonts
        game.load.bitmapFont('roundsBlack28', 'assets/fonts/rounds_black_28_0.png', 'assets/fonts/rounds_black_28.xml');
        
        // load sound
        game.load.audio('sndCoin', ['assets/audio/coin.mp3', 'assets/audio/coin.ogg']);
        game.load.audio('sndJump', ['assets/audio/jump.mp3', 'assets/audio/jump.ogg']);
        game.load.audio('sndHit', ['assets/audio/hit.mp3', 'assets/audio/hit.ogg']);
    },
    
    create: function() {
        // start game
        game.state.start('MainMenuState');
    }
};