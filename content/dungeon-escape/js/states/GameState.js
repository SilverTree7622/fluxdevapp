var background;
var character;
var bounds;
var walls;
var lava;
var power;
var duration;
var acids_right;
var acids_left;
var coins;
var score = 0;
var score_text;

var sndCoin;
var sndJump;
var sndHit;

var GameState = {
    create: function () {
        window['UtilPlatform'].sendMsg2Parent('ShowNavFooterPlay');

        // audio
        sndCoin = game.add.audio('sndCoin');
        sndJump = game.add.audio('sndJump');
        sndHit = game.add.audio('sndHit');
        
        // for fps purposes
        if (debug) game.time.advancedTiming = true;
        
        // start physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 200;

        // add background
        background = game.add.tileSprite(0, 0, 640, 1280, 'background');
        
        // create bounds
        createBounds();   

        // create walls
        createWalls();
        
        // create coins
        coins = game.add.physicsGroup();
        
        // create acid
        createAcid();   

        // create character
        character = createCharacter();        
        
        // create lava
        lava = createLava();
        
        // create power
        power_background = game.add.sprite(game.world.width / 2, 155, 'power_background');
        power_background.anchor.setTo(0.5);
        
        power = game.add.sprite(game.world.width / 2 - 150, 140, 'power');
        power.visible = false;
        
        // register taps and clicks
        game.input.onDown.add(onDown);
        game.input.onUp.add(onUp);
        
        score_text = game.add.bitmapText(game.world.width/2, 100, 'roundsBlack28','Score: ' + String(score), 60);
        score_text.anchor.setTo(0.5);
    },
    
    update: function () {
        // check for character collision against bounds
        game.physics.arcade.collide(character, bounds, onBoundsCollision);
        
        // check for character collision against lava
        if (character.obj.alive) {
            game.physics.arcade.collide(character, lava, onLavaCollision, onLavaCollisionProcess);
        }
        
        // check for character collision againts acid
        if (character.obj.alive) {
            game.physics.arcade.collide(character, acids_right, onAcidCollision);
            game.physics.arcade.collide(character, acids_left, onAcidCollision);
        }
        
        // check for character collision against coins
        if (character.obj.alive) {
            game.physics.arcade.collide(character, coins, onCoinCollision, onCoinCollisionProcess);
        }
        
        // roll character
        if (character.obj.active && character.body.velocity.x != 0) {
            character.angle += Phaser.Math.sign(character.body.velocity.x) * 12;
        }
        
        if (game.input.activePointer.isDown) {
            duration = Phaser.Math.clamp(game.input.activePointer.duration, 0, 600);
            power.scale.x = duration / 600;
            
            if (duration == 600) {
                jump();
            }
        }
        // update score text
        score_text.text = "Score: " + String(score);
        
        if (!character.obj.alive) {
            if (character.y > game.world.height + 200) {
                character.body.velocity = 0;
                character.visible = false;
                showGameOverScreen();
            }
        }
    },
    
    render: function () {
        if (debug) game.debug.text(game.time.fps, 2, 14, "#00ff00");
    }
};

// on tap
function onDown() {
    window['UtilPlatform'].sendMsg2Parent('HideNavFooterPlay');
    if (!character.obj.active && !power.visible && character.obj.alive) {  
        power.visible = true;
    }
}

function onUp() {
    if (power.visible) {
        jump();
    }
}

function jump() {
    if (!character.obj.active && power.visible) {
        var jumpPower = duration / 600 * character.obj.velocityY;
        jumpPower = Phaser.Math.clamp(jumpPower, character.obj.velocityY, -400);
        var velocityDirection = (character.obj.direction == 'right') ? 1 : -1;
        character.obj.active = true;
        character.body.velocity.x = character.obj.velocityX * velocityDirection;
        character.body.velocity.y = jumpPower;
        character.body.allowGravity = true;    

        power.visible = false;
        duration = 0;
        
        sndJump.play();
    }
}

// move everything down
function moveDown() {
    var score_add = Math.ceil((character.obj.baseY - character.y - 238) / 10);
    score += score_add;
    
    var moveToY = character.obj.baseY - character.y;
    
    game.add.tween(background.tilePosition).to({y: String(moveToY/5)}, moveToY, 'Linear', true);
    
    game.add.tween(lava).to({y: String(moveToY)}, moveToY, 'Linear', true);
    
    for (var i = 0; i < walls.children.length; i++) {
        game.add.tween(walls.children[i].tilePosition).to({y: String(moveToY)}, moveToY, 'Linear', true);
    }
    
    for (var i = 0; i < acids_right.children.length; i++) {
        game.add.tween(acids_right.children[i]).to({y: String(moveToY)}, moveToY, 'Linear', true);
    }
    
    for (var i = 0; i < acids_left.children.length; i++) {
        game.add.tween(acids_left.children[i]).to({y: String(moveToY)}, moveToY, 'Linear', true);
    }
    
    for (var i = 0; i < coins.children.length; i++) {
        game.add.tween(coins.children[i]).to({y: String(moveToY)}, moveToY, 'Linear', true);
    }
    
    game.add.tween(character)
        .to({y: String(moveToY)}, moveToY, 'Linear', true)
        .onComplete.add(updateAfterMoveDown);
}

function updateAfterMoveDown() {
    character.obj.active = false;
    lava.y = game.world.height;
    
    processAcid();
    increaseLavaSpeed();
    processCoins();
    
    //console.log(acids_left.total + acids_right.total + coins.total);
}

// check for collision against lava
function onLavaCollision(character, lava) {
    die();
}

function onLavaCollisionProcess(character, lava) {
    if (lava.y < character.y + 20) {
        return true;
    } else {
        return false;
    }
}

function onAcidCollision(character, acid) {
    sndHit.play();
    die();
}

function onCoinCollision(character, coin) {
}


function onCoinCollisionProcess(character, coin) {
    coins.remove(coin);
    coin.kill();
    score += 100;
    sndCoin.play();
    return false;
}

// check for collision against bounds
function onBoundsCollision(char, bound) {
    var boundX = (character.obj.direction == 'right') ? 576 : 0;
    if (bound.x == boundX) {
        character.obj.direction = (character.obj.direction == 'right') ? 'left' : 'right';
        character.body.velocity.x = 0;
        character.body.velocity.y = 0;
        character.scale.x *= -1;
        character.angle = 0;
        character.body.allowGravity = false;
        
        moveDown();
    }
}

// create character 
function createCharacter() {
    var character = game.add.sprite(0, 0, 'character');
    character.anchor.setTo(0.5);
    
    character.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    character.animations.add('death', [8, 9], 10, true);
    character.animations.play('idle');
    
    character.obj = {
        'alive': true,
        'active': false,
        'direction': 'right',
        'velocityX': 600,
        'velocityY': -1200,
        'baseX': 100,
        'baseY': game.world.height - 250,
    }
    
    character.x = character.obj.baseX;
    character.y = character.obj.baseY;

    game.physics.arcade.enable(character);    
    character.body.allowGravity = false;
    character.body.friction = 0;
    
    return character;
}

// create bounds

function createBounds() {
    bounds = game.add.physicsGroup();

    var boundsLeft = game.add.sprite(0, 0, 'block');
    var boundsRight = game.add.sprite(640-64, 0, 'block');
    
    bounds.add(boundsLeft);
    bounds.add(boundsRight);
    
    boundsLeft.visible = false;
    boundsLeft.scale.y = 20;
    boundsLeft.body.allowGravity = false;
    boundsLeft.body.immovable = true;
    
    boundsRight.visible = false;
    boundsRight.scale.y = 20;    
    boundsRight.body.allowGravity = false;
    boundsRight.body.immovable = true;
}

// create walls
function createWalls() {
    walls = game.add.group();
    
    var wallLeft = game.add.tileSprite(0, 0, 216, 1280, 'wall');
    var wallRight = game.add.tileSprite(640, 0, 216, 1280, 'wall');
    wallRight.scale.x = -1;
    
    walls.add(wallLeft);
    walls.add(wallRight);
}

function createLava() {
    var lava = game.add.sprite(0, game.world.height, 'lava');
    lava.animations.add('idle', [0, 1], 3, true);
    lava.animations.play('idle');    
    
    game.physics.arcade.enable(lava);
    lava.body.allowGravity = false;
    lava.body.friction = 0;
    lava.body.velocity.y = -50;

    return lava;
}

function createAcid() {
    acids_right = game.add.physicsGroup();
    for (var i = 0; i < 3; i++) {
        var acid = acids_right.create(640 - 65, 640 - i * 460, 'acid');
        acid.scale.x = -1;
        acid.body.allowGravity = false;
        acid.body.immovable = true;
    }

    acids_left = game.add.physicsGroup();
    for (var i = 0; i < 3; i++) {
        var acid = acids_left.create(64, 640 - i * 460, 'acid');
        acid.body.allowGravity = false;
        acid.body.immovable = true;
    }
    
}

function processAcid() {
    while(true) {
        var lastY = acids_right.children[acids_right.children.length - 1].y
        if (lastY < -1280) break;
        
        var startY = lastY - game.rnd.integerInRange(300, 400);
        var size = game.rnd.integerInRange(1, 3);
        
        if (size == 1) {
            var acid = acids_right.create(640 - 65, startY-size*64, 'acid');            
        } else if (size == 2) {
            var acid = acids_right.create(640 - 65, startY-size*64, 'acid2');            
        } else if (size == 3) {
            var acid = acids_right.create(640 - 65, startY-size*64, 'acid3');                        
        }
        
        acid.anchor.setTo(0.5);
        acid.x -= acid.width / 2;
        acid.y -= acid.height / 2;

        acid.body.width *= 0.5;
        acid.body.height *= 0.7;
        
        acid.scale.x = -1;
        acid.body.allowGravity = false;
        acid.body.immovable = true;
    }
    
    var temp_acids = [];
    for (var i = 0; i < acids_right.children.length; i++) {
        if (acids_right.children[i].worldPosition.y > game.world.height + 64) {
            temp_acids.push(acids_right.children[i]);
        }
    }
    removeFromGroup(temp_acids, acids_right);

    
    while(true) {
        var lastY = acids_left.children[acids_left.children.length - 1].y;
        if (lastY < -1280) break;
        
        var startY = lastY - game.rnd.integerInRange(300, 400);
        var size = game.rnd.integerInRange(1, 3);

        if (size == 1) {
            var acid = acids_left.create(64, startY-size*64, 'acid');            
        } else if (size == 2) {
            var acid = acids_left.create(64, startY-size*64, 'acid2');            
        } else if (size == 3) {
            var acid = acids_left.create(64, startY-size*64, 'acid3');                        
        }
        
        acid.anchor.setTo(0.5);
        acid.x += acid.width / 2;
        acid.y += acid.height / 2;        
        
        acid.body.width *= 0.5;
        acid.body.height *= 0.7;
        
        acid.body.allowGravity = false;
        acid.body.immovable = true;
    }

    var temp_acids = [];
    for (var i = 0; i < acids_left.children.length; i++) {
        if (acids_left.children[i].worldPosition.y > game.world.height + 64) {
            temp_acids.push(acids_left.children[i]);
        }
    }
    removeFromGroup(temp_acids, acids_left);
}

function increaseLavaSpeed() {
    lava.body.velocity.y -= 5;
}

function processCoins() {
    if (coins.children.length > 0) {
        var lastY = coins.children[coins.children.length - 1].y;
    } else {
        var lastY = 0;
    }
    
    while (true) {
        if (lastY < -1280) break;
        
        var coin = coins.create(game.rnd.integerInRange(200, 440), game.rnd.integerInRange(lastY - 256, lastY - 512), 'coin');
        coin.anchor.setTo(0.5);
        coin.animations.add('idle', [0, 1, 2, 3, 4, 5], 10, true);
        coin.animations.play('idle');    

        coin.body.allowGravity = false;
        coin.body.immobile = true;

        coin.scale.setTo(0.75);
        
        var lastY = coins.children[coins.children.length - 1].y;
    }
        
    var temp_coins = [];
    for (var i =0; i < coins.children.length; i++) {
        if (coins.children[i].worldPosition.y > game.world.height + 64) {
            temp_coins.push(coins.children[i]);
        }
    }
    removeFromGroup(temp_coins, coins);
}

function die() {
    character.obj.alive = false;
    character.animations.play('death');
    character.body.velocity.x = 0;
    character.body.velocity.y = 600;
    lava.body.velocity.y = 0;
    
    var highscore = localStorage.getItem("dungeon-escape-highscore");
    if (score > highscore) {
        localStorage.setItem("dungeon-escape-highscore", score);
    }
}

function showGameOverScreen() {
    score_text.visible = false;
    power.visible = false;
    power_background.visible = false;
    
    var gameOverScreen = game.add.image(game.world.width / 2, game.world.height / 2, 'gameover');
    gameOverScreen.anchor.setTo(0.5);    
    
    var style = { font: "50px Arial", fill: "#362315", align: "center" };
    var _score = game.add.text(game.world.centerX, game.world.centerY-80, score, style);
    _score.anchor.x = 0.5;
    
    var hs = localStorage.getItem("dungeon-escape-highscore");
    var styleHS = { font: "30px Arial", fill: "#362315", align: "center" };
    var _scoreHS = game.add.text(game.world.centerX, game.world.centerY+30, hs, styleHS);
    _scoreHS.anchor.x = 0.5;
    
    game.input.onTap.addOnce(function(){
        setTimeout(() => {
            score = 0;
            game.state.restart();
        }, 200);
    });
}