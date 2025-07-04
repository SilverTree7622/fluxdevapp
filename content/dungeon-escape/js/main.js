var Phaser = Phaser || {};
var gameWidth = 640;
var gameHeight = 1280;

var debug = false;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS);    

game.state.add('BootState', BootState);
game.state.add('PreloadState', PreloadState);
game.state.add('MainMenuState', MainMenuState);
game.state.add('GameState', GameState);

game.state.start('BootState'); 