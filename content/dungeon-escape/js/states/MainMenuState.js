var MainMenuState = {
    create: function () {
        game.add.image(0, 0, 'mainMenuBackground');
        
        // 터치 이벤트로 GameState 시작
        game.input.onTap.addOnce(function(){
            game.state.start("GameState");
        });
        
        // init highscore record
        if (localStorage.getItem("dungeon-escape-highscore") == null) {
            localStorage.setItem("dungeon-escape-highscore", 0);
        }
        
        // game.state.start("GameState");
    },
};