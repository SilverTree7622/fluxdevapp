var BootState = {
    init: function() {
        // Responsive scaling
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        // Center the game
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    
    preload: function() {
        game.load.atlasJSONHash(
            'preload',
            'assets/images/preload/preload_atlas.png',
            'assets/images/preload/preload_atlas.json'
        )
    },
    
    create: function () {
        game.stage.backgroundColor = '#fff';
        game.state.start('PreloadState');
    }
};