MG.GameOver = function(game) {};

MG.GameOver.prototype = {
    create: function() {

        // Background
        this.add.sprite(0, 0, 'background');
        this.add.sprite(0, 0, 'game_over');

        // Button
        b_main_menu = this.add.button(140, 785, 'alpha', this.mainMenu, this);
        b_main_menu.width = 355;
        b_main_menu.height = 102;
        b_main_menu.input.useHandCursor = true;

        // Theme Music
        s_theme = this.add.audio('theme');
        s_theme.play();

        // Text
        gameTypeName = '';
        switch (gameType) {
            case 1:
                gameTypeName = 'Front Nine';
                break;
            case 2:
                gameTypeName = 'Back Nine';
                break;
            case 3:
                gameTypeName = 'Full Course';
                break;
        }
        t_go_score_label = this.add.text(0, 300, gameTypeName + " Score", { font: '60px ' + t_font, fill: '#7cd06d', align: 'center' });
        t_go_score_label.setShadow(4, 4, 'rgba(0,0,0,.2)', 0);
        t_go_score_label.x = centerX - t_go_score_label.width / 2;
        t_go_score = this.add.text(0, 400, score.toString(), { font: '100px ' + t_font, fill: '#7cd06d', align: 'center' });
        t_go_score.setShadow(6, 6, 'rgba(0,0,0,.2)', 0);
        t_go_score.x = centerX - t_go_score.width / 2;

        // Personal Best
        var personal_best = localStorage.getItem('pb' + gameType.toString());
        if (personal_best == null) {
            personal_best = 9999;
        } else {
            personal_best = parseInt(personal_best);
        }
        var pb_text = "Personal Best\n" + personal_best.toString();
        var pb_size = '50px';
        if (score < personal_best) {
            localStorage.setItem('pb' + gameType.toString(), score.toString());
            pb_text = 'New Personal Best!';
            pb_size = '50px';
        }
        var t_personal_best = this.add.text(0, 600, pb_text, { font: pb_size + ' ' + t_font, fill: '#7cd06d', align: 'center' });
        t_personal_best.setShadow(4, 4, 'rgba(0,0,0,.2)', 0);
        t_personal_best.x = centerX - t_personal_best.width / 2;
    },

    mainMenu: function() {
        s_theme.stop();
        this.state.start('MainMenu');
    }
};