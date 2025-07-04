MG.MainMenu = function(game) {};

MG.MainMenu.prototype = {

    create: function() {
        window['UtilPlatform'].sendMsg2Parent('ShowNavFooterPlay');

        // Game Type
        //  1: Front Nine, 2: Back Nine, 3: 18 Holes
        gameType = 3;

        // Screen
        this.add.sprite(0, 0, 'background');
        this.add.sprite(0, 0, 'main_menu');

        // Buttons
        var buttons = [];
        buttons.push(this.add.button(230, 480, 'alpha', this.playGame1, this));
        buttons.push(this.add.button(230, 620, 'alpha', this.playGame2, this));
        buttons.push(this.add.button(230, 766, 'alpha', this.playGame3, this));
        for (var i = 0, l = buttons.length; i < l; i++) {
            buttons[i].width = 355;
            buttons[i].height = 102;
            buttons[i].input.useHandCursor = true;
        }
        //var s_theme = this.add.audio('theme');
        //s_theme.play();
    },
    playGame1: function(t) {
        gameType = 1;
        this.state.start('Game');
    },
    playGame2: function(t) {
        gameType = 2;
        this.state.start('Game');
    },
    playGame3: function(t) {
        gameType = 3;
        this.state.start('Game');
    }
};