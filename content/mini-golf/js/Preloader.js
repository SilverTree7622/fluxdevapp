MG.Preloader = function(game) {};

MG.Preloader.prototype = {
    preload: function() {
        this.stage.backgroundColor = '#338b22';
        this.add.sprite(0, 0, 'background');
        this.add.sprite(0, 0, 'loading_text');
        var pl = this.add.sprite(0, 0, 'loading');
        this.load.setPreloadSprite(pl);

        // Screens and Buttons
        this.load.image('main_menu', 'img/main_menu.png');
        this.load.image('game_over', 'img/game_over.png');
        this.load.image('button_swing', 'img/button_swing.png');
        this.load.image('alpha', 'img/alpha.png');

        // Sprites
        this.load.image('ball', 'img/sprites/ball.png');
        this.load.image('putter', 'img/sprites/putter.png');
        this.load.image('wall', 'img/sprites/wall.png');
        this.load.image('hole', 'img/sprites/hole.png');

        // Obstacles
        this.load.image('bar_full', 'img/sprites/bar_full.png');
        this.load.image('bar_long', 'img/sprites/bar_long.png');
        this.load.image('bar_medium', 'img/sprites/bar_medium.png');
        this.load.image('bar_small', 'img/sprites/bar_small.png');
        this.load.image('bar_tiny', 'img/sprites/bar_tiny.png');
        this.load.image('wedge_red', 'img/sprites/wedge_red.png');
        this.load.image('wedge_yellow', 'img/sprites/wedge_yellow.png');
        this.load.image('wedge_purple', 'img/sprites/wedge_purple.png');
        this.load.image('wedge_blue', 'img/sprites/wedge_blue.png');
        this.load.image('corner_large', 'img/sprites/corner_large.png');
        this.load.image('corner_small', 'img/sprites/corner_small.png');
        this.load.image('circle', 'img/sprites/circle.png');
        this.load.image('maze', 'img/sprites/maze.png');

        // Score Text
        this.load.image('hole_in_one', 'img/score_text/hole_in_one.png');
        this.load.image('double_eagle', 'img/score_text/double_eagle.png');
        this.load.image('eagle', 'img/score_text/eagle.png');
        this.load.image('birdie', 'img/score_text/birdie.png');
        this.load.image('par', 'img/score_text/par.png');
        this.load.image('bogey', 'img/score_text/bogey.png');
        this.load.image('double_bogey', 'img/score_text/double_bogey.png');
        this.load.image('triple_bogey', 'img/score_text/triple_bogey.png');

        // P2 Physics Polygon Data
        this.load.physics('poly', 'img/sprites/poly.json');

        // Audio
        this.load.audio('bah', ['audio/bah.mp3', 'audio/bah.ogg']);
        this.load.audio('bell', ['audio/bell.mp3', 'audio/bell.ogg']);
        this.load.audio('bird', ['audio/bird.mp3', 'audio/bird.ogg']);
        this.load.audio('cheer', ['audio/cheer.mp3', 'audio/cheer.ogg']);
        this.load.audio('eagle', ['audio/eagle.mp3', 'audio/eagle.ogg']);
        this.load.audio('hit', ['audio/hit.mp3', 'audio/hit.ogg']);
        this.load.audio('sink', ['audio/sink.mp3', 'audio/sink.ogg']);
        this.load.audio('theme', ['audio/theme.mp3', 'audio/theme.ogg']);

    },
    create: function() {
        this.state.start('MainMenu');
    }
};