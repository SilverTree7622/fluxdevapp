MG.Game = function(game) {};

MG.Game.prototype = {

    // PHASER CREATE
    create: function() {


        ///////////////////////////////////////////////////////////////////////
        // CONFIGS
        par = [3, 4, 4, 5, 3, 5, 4, 5, 4, 3, 4, 5, 3, 4, 5, 3, 4, 5];

        holeCount = 18;
        if (gameType < 3) {
            holeCount = 9;
        }

        // If true, the setup putter will always appear in the same place,
        // otherwise it will always be near the ball.
        putterSetupSamePosition = false;

        // Obstacle Motion Speed Settings
        obRotateSpeed = 15;
        obMoveSpeed = 60;

        // Hole (level) Data
        //  Set hole and ball initial positions
        //  Set construct methods for each level (destruct is handled automatically as long as all
        //  obstacles are included in the "ob" array).
        holes = {
            'h1': {
                'holeX': 320,
                'holeY': 140,
                'ballX': 320,
                'ballY': 780,
                'construct': null
            },
            'h2': {
                'holeX': 320,
                'holeY': 140,
                'ballX': 320,
                'ballY': 780,
                'construct': this.c2
            },
            'h3': {
                'holeX': 320,
                'holeY': 140,
                'ballX': 320,
                'ballY': 780,
                'construct': this.c3
            },
            'h4': {
                'holeX': 320,
                'holeY': 140,
                'ballX': 320,
                'ballY': 780,
                'construct': this.c4
            },
            'h5': {
                'holeX': 514,
                'holeY': 740,
                'ballX': 120,
                'ballY': 740,
                'construct': this.c5
            },
            'h6': {
                'holeX': 320,
                'holeY': 140,
                'ballX': 320,
                'ballY': 780,
                'construct': this.c6
            },
            'h7': {
                'holeX': 320,
                'holeY': 480,
                'ballX': 320,
                'ballY': 780,
                'construct': this.c7
            },
            'h8': {
                'holeX': 320,
                'holeY': 140,
                'ballX': 320,
                'ballY': 780,
                'construct': this.c8
            },
            'h9': {
                'holeX': 500,
                'holeY': 182,
                'ballX': 230,
                'ballY': 780,
                'construct': this.c9
            },
            'h10': {
                'holeX': 500,
                'holeY': 145,
                'ballX': 140,
                'ballY': 815,
                'construct': null
            },
            'h11': {
                'holeX': 320,
                'holeY': 140,
                'ballX': 320,
                'ballY': 780,
                'construct': this.c11
            },
            'h12': {
                'holeX': 320,
                'holeY': 140,
                'ballX': 320,
                'ballY': 780,
                'construct': this.c12
            },
            'h13': {
                'holeX': 320,
                'holeY': 140,
                'ballX': 320,
                'ballY': 780,
                'construct': this.c13
            },
            'h14': {
                'holeX': 384,
                'holeY': 140,
                'ballX': 320,
                'ballY': 780,
                'construct': this.c14
            },
            'h15': {
                'holeX': 320,
                'holeY': 200,
                'ballX': 320,
                'ballY': 780,
                'construct': this.c15
            },
            'h16': {
                'holeX': 320,
                'holeY': 140,
                'ballX': 320,
                'ballY': 780,
                'construct': this.c16
            },
            'h17': {
                'holeX': 320,
                'holeY': 140,
                'ballX': 320,
                'ballY': 780,
                'construct': this.c17
            },
            'h18': {
                'holeX': 275,
                'holeY': 135,
                'ballX': 320,
                'ballY': 820,
                'construct': this.c18
            }
        };

        ///////////////////////////////////////////////////////////////////////


        // PHYSICS
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.setImpactEvents(true); // To enable collision callbacks
        this.physics.p2.gravity = 0;
        this.physics.p2.restitution = .95;
        ballCG = this.physics.p2.createCollisionGroup();
        putterCG = this.physics.p2.createCollisionGroup();
        wallCG = this.physics.p2.createCollisionGroup();
        holeCG = this.physics.p2.createCollisionGroup();
        obCG = this.physics.p2.createCollisionGroup();

        // Runtimes
        f = 0;
        score = 0;
        scoring = false;
        scoreName = '';
        score_text = this.add.text(-9999, -9999, '');
        scoringStart = 0;
        scoringDelay = 60; // frames
        scoringDuration = 240; // frames
        level = 0;
        holesPlayed = -1;
        if (gameType == 2) {
            level = 9;
        }
        swings = 0;
        debugging = false;
        moving = false;
        // Need to wait to make sure the ball was hit before updating swings...
        // Must be less than scoringDelay
        ballHitCheckDelay = 10;
        holeSize = 8;
        ob = [];
        centerX = this.world.centerX;
        centerY = this.world.centerY;

        // UI
        this.add.sprite(0, 0, 'background');

        // Inner Wall
        wall = this.add.sprite(320, 480, 'wall');
        this.physics.p2.enable(wall, debugging);
        wall.body.static = true;
        wall.body.clearShapes();
        wall.body.loadPolygon('poly', 'wall');
        wall.body.setCollisionGroup(wallCG);
        wall.body.collides([obCG]);
        wall.body.collides([ballCG], this.wallHit, this);

        // Hole
        hole = this.add.sprite(0, 0, 'hole');
        hole.anchor.setTo(0.5, 0.5);
        hole.x = 320;
        hole.y = 140;
        this.physics.p2.enable(hole, debugging);
        hole.body.static = true;
        hole.body.setCircle(holeSize);
        hole.body.setCollisionGroup(holeCG);
        hole.body.collides([ballCG]);

        // Ball
        ball = this.add.sprite(0, 0, 'ball');
        ball.anchor.setTo(0.5, 0.5);
        ball.x = 320;
        ball.y = 780;
        this.physics.p2.enable(ball, debugging);
        ball.body.setCircle(10);
        ball.body.setCollisionGroup(ballCG);
        ball.body.collides([wallCG, putterCG, obCG]);
        ball.body.collides([holeCG], this.sink, this);
        ball.body.damping = .45;
        ball.body.fixedRotation = true;
        ball.body.collideWorldBounds = false;
        ball.hit = false;
        ball.sunk = false;
        ball.hitFrame = 0;
        ball.lastHitLoc = [0, 0];

        // Putter (active)
        putter = this.add.sprite(0, 0, 'putter');
        putter.anchor.setTo(0.5, 0.5);
        this.hide(putter);
        this.physics.p2.enable(putter, debugging);
        putter.body.setCollisionGroup(putterCG);
        putter.body.collides([ballCG], this.hit, this);
        putter.body.collideWorldBounds = false;

        // Sounds
        sounds = new Array();
        sounds['bah'] = this.add.audio('bah');
        sounds['bell'] = this.add.audio('bell');
        sounds['bird'] = this.add.audio('bird');
        sounds['cheer'] = this.add.audio('cheer');
        sounds['eagle'] = this.add.audio('eagle');
        sounds['hit'] = this.add.audio('hit');
        sounds['sink'] = this.add.audio('sink');
        sounds['theme'] = this.add.audio('theme');

        // Buttons
        b_swing = this.add.button(510, 828, 'button_swing', this.swing, this);
        b_swing.input.useHandCursor = true;

        // Putter 2 (for swing setup)
        putter2 = this.add.sprite(0, 0, 'putter');
        putter2.anchor.setTo(0.5, 0.5);
        putter2.initX = 320;
        putter2.initY = 820;
        putter2.inputEnabled = true;
        putter2.input.useHandCursor = true;
        putter2.input.enableDrag(true);
        putter2.needsReset = true;
        
        // Add drag event listeners
        putter2.events.onDragStart.add(this.onPutterDragStart, this);
        putter2.events.onDragStop.add(this.onPutterDragEnd, this);

        // Line
        line = new Phaser.Line(ball.x, ball.y, putter.x, putter.y);

        // Text
        t_font = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
        t_hole = this.add.text(32, 900, '', { font: '40px ' + t_font, fill: '#7cd06d' });
        t_hole.setShadow(2, 2, 'rgba(0,0,0,.2)', 0);
        t_swings = this.add.text(400, 24, '', { font: '40px ' + t_font, fill: '#7cd06d' });
        t_swings.setShadow(2, 2, 'rgba(0,0,0,.2)', 0);
        t_score = this.add.text(32, 24, 'Score: 0', { font: '40px ' + t_font, fill: '#7cd06d' });
        t_score.setShadow(2, 2, 'rgba(0,0,0,.2)', 0);

        t_debug_loc = [-9999, -9999];
        if (debugging) {
            t_debug_loc = [12, 100];
        }
        t_debug = this.add.text(t_debug_loc[0], t_debug_loc[1], '', { font: '16px "consolas"', fill: '#ffffff' });

        // Init Starting Hole
        this.nextHole();
    },

    // PHASER UPDATE
    update: function() {

        // Inc frame
        f += 1;

        // Game Over
        // (Handled in nextHole)

        // Ball vel kill
        if (Math.abs(ball.body.velocity.x) < 0.1) {
            ball.body.velocity.x = 0;
        }
        if (Math.abs(ball.body.velocity.y) < 0.1) {
            ball.body.velocity.y = 0;
        }

        // Ball Hit Check
        if (ball.hit) {
            if (f >= ball.hitFrame + ballHitCheckDelay) {
                if (moving || ball.sunk) {
                    swings += 1;
                    t_swings.text = 'Swings: ' + swings.toString();
                }
                ball.sunk = false;
                ball.hit = false;
            }
        }

        // Ball Out of Bounds Handling
        if (this.ballOut()) {
            ball.body.x = ball.lastHitLoc[0];
            ball.body.y = ball.lastHitLoc[1];
        }

        // Obstacle X & Y Movement Handling
        for (var i = 0, l = ob.length; i < l; i++) {
            var rightEdge = 540;
            var leftEdge = 100;
            var topEdge = 100;
            var bottomEdge = 860;
            var o = ob[i];
            var s = obMoveSpeed;
            if (o.motion == 'x') {
                if (o.body.x + o.width / 2 > rightEdge) {
                    o.body.moveLeft(s);
                }
                if (o.body.x - o.width / 2 < leftEdge) {
                    o.body.moveRight(s);
                }
            }
            if (o.motion == 'y') {
                if (o.body.y + o.height / 2 > bottomEdge) {
                    o.body.moveUp(s);
                }
                if (o.body.y - o.height / 2 < topEdge) {
                    o.body.moveDown(s);
                }
            }
        }

        // Scoring
        if (scoring) {
            if (f == scoringStart + scoringDelay) {
                this.scoreLevel();
                this.scoreEffect();
            }
            if (f == scoringStart + scoringDuration) {
                this.nextHole();
            }
        }

        // Setup
        if (!scoring) {
            if (Math.abs(ball.body.velocity.x) < .4 && Math.abs(ball.body.velocity.y) < .4) {
                moving = false;
                if (putter2.needsReset) {
                    if (putterSetupSamePosition) {
                        putter2.x = putter2.initX;
                        putter2.y = putter2.initY;
                    } else {
                        putter2.x = ball.x;
                        putter2.y = ball.y + 64;
                    }
                    putter2.needsReset = false;
                }
                line.fromSprite(ball, putter2, false);
                putter2.rotation = line.angle - Math.PI / 2;
            } else {
                moving = true;
                this.hide(putter2);
                putter2.needsReset = true;
            }
        }

    },

    // PHASER RENDER
    render: function() {
        // Line Handling
        if (!moving) {
            this.game.debug.geom(line, '#ffffff');
        }
        if (scoring) {
            this.hide(line);
            this.game.debug.geom(line, '#ffffff');
        }
        // Debug Text
        if (debugging) {
            this.game.debug.inputInfo(32, 32);
            t_debug.text = '';
            if (moving) {
                t_debug.text += "\nBall: moving";
            } else {
                t_debug.text += "\nBall: still";
            }
            t_debug.text += "\nBall velX: " + ball.body.velocity.x.toString();
            t_debug.text += "\nBall velY: " + ball.body.velocity.y.toString();
            t_debug.text += "\nSwings: " + swings.toString();
            t_debug.text += "\nScore: " + score.toString();
            t_debug.text += "\nHole #: " + level.toString();
            t_debug.text += "\nPar: " + par[level - 1];
        }
    },

    // Ball hit with putter
    hit: function(p, b) {
        sounds['hit'].play();
        ball.lastHitLoc = [ball.body.x, ball.body.y];
        this.stopPutter();
        this.hide(putter);
        ball.hit = true;
        ball.hitFrame = f;
    },

    // Ball hits the wall
    wallHit: function(w, b) {
        sounds['hit'].play();
    },

    // Ball goes in the hole
    sink: function(h, b) {
        // Sink Sound
        sounds['sink'].play();
        // Hide ball
        this.stopBall();
        this.hide(ball);
        // Set scoring mode
        ball.sunk = true;
        scoring = true;
        scoringStart = f;
    },

    scoreLevel: function() {
        // Reset ball sunk status
        ballSunk = false;
        // Score
        var curPar = par[level - 1];
        score += swings - curPar;
        t_score.text = 'Score: ' + score.toString();
        // Determine score type
        var vsPar;
        if (swings == 1) {
            scoreName = 'Hole in One';
        } else {
            vsPar = swings - curPar;
            switch (vsPar) {
                case -1:
                    scoreName = 'Birdie';
                    break;
                case -2:
                    scoreName = 'Eagle';
                    break;
                case -3:
                    scoreName = 'Double Eagle';
                    break
                case 0:
                    scoreName = 'Par';
                    break;
                case 1:
                    scoreName = 'Bogey';
                    break;
                case 2:
                    scoreName = 'Double Bogey';
                    break;
                case 3:
                    scoreName = 'Triple Bogey';
                    break;
                default:
                    scoreName = vsPar.toString() + ' Over';
                    break;
            }
        }
    },

    // Putter swings
    swing: function() {
        if (!moving) {
            window['UtilPlatform'].sendMsg2Parent('HideNavFooterPlay');
            console.log('swing hide footerplay');
            var speed = 1;
            if (line.length > 300) {
                speed = 300;
            } else {
                speed = line.length;
            }
            speed *= 300;
            var angle = Math.atan2(ball.y - putter2.y, ball.x - putter2.x);
            this.stopPutter();
            putter.body.x = putter2.x;
            putter.body.y = putter2.y;
            putter.body.rotation = angle + this.game.math.degToRad(90);
            putter.body.force.x = Math.cos(angle) * speed;
            putter.body.force.y = Math.sin(angle) * speed;
        }
    },

    // Apply score effect (text/sound)
    scoreEffect: function() {
        switch (scoreName) {
            case 'Hole in One':
                score_text = this.add.sprite(0, 0, 'hole_in_one');
                sounds['cheer'].play();
                break;
            case 'Eagle':
                score_text = this.add.sprite(0, 0, 'eagle');
                sounds['eagle'].play();
                break;
            case 'Double Eagle':
                score_text = this.add.sprite(0, 0, 'double_eagle');
                sounds['eagle'].play();
                break
            case 'Birdie':
                score_text = this.add.sprite(0, 0, 'birdie');
                sounds['bird'].play();
                break
            case 'Par':
                score_text = this.add.sprite(0, 0, 'par');
                sounds['bell'].play();
                break;
            case 'Bogey':
                score_text = this.add.sprite(0, 0, 'bogey');
                break;
            case 'Double Bogey':
                score_text = this.add.sprite(0, 0, 'double_bogey');
                break;
            case 'Triple Bogey':
                score_text = this.add.sprite(0, 0, 'triple_bogey');
                break;
            default:
                score_text = this.add.text(0, 400, scoreName, { font: '60px Arial, Helvetica, sans-serif', fill: '#dddddd' });
                score_text.setShadow(3, 3, 'rgba(0,0,0,0.75)', 5);
                this.centerText(score_text);
                sounds['bah'].play();
                break;
        }
    },

    // Advance to next hole (level)
    nextHole: function() {
        // Destruct Previous Level
        this.killObstacles();
        // Vars
        level += 1;
        holesPlayed += 1;
        swings = 0;
        // Game Over?
        if (holesPlayed == holeCount || typeof par[level - 1] == 'undefined') {
            this.state.start('GameOver');
            return;
        }
        // Level key
        var hk = 'h' + level.toString();
        // Stop scoring
        score_text.parent.remove(score_text);
        scoring = false;
        scoreStart = 0;
        // Reset hole physics
        //  Perhaps due to the body type set to "static", the ball->hole collisions would sometimes not work.
        //  This solves it.
        this.physics.p2.enable(hole, debugging);
        hole.body.static = true;
        hole.body.setCircle(holeSize);
        hole.body.setCollisionGroup(holeCG);
        hole.body.collides([ballCG]);
        // Set positions
        this.setPos(hole, holes[hk].holeX, holes[hk].holeY);
        this.setPos(ball, holes[hk].ballX, holes[hk].ballY);
        this.stopBall();
        // Construct New Level
        if (typeof holes[hk].construct == 'function') {
            holes[hk].construct.call(this);
        }
        // Update Text
        t_hole.text = 'Hole #' + level.toString() + ' (Par ' + par[level - 1].toString() + ')';
        t_swings.text = 'Swings: 0';
        // Bring Controls to Top
        b_swing.bringToTop();
        putter2.bringToTop();
    },

    // Add Obstacle handler
    //  motion types: 'static', 'rotateCW', 'rotateCCW', 'rotateFast', 'x', 'y'
    addOb: function(name, x, y, motion, rotation) {
        var o = this.add.sprite(x, y, name);
        this.physics.p2.enable(o, debugging);
        // Set poly/shape data
        switch (name) {
            case 'wedge_red':
            case 'wedge_blue':
            case 'wedge_yellow':
            case 'wedge_purple':
            case 'corner_large':
            case 'corner_small':
            case 'bar_tiny':
            case 'bar_small':
            case 'bar_medium':
            case 'bar_long':
            case 'bar_full':
            case 'maze':
                o.body.clearShapes();
                o.body.loadPolygon('poly', name);
                break;
            case 'circle':
                o.body.setCircle(74);
                break;
        }
        o.body.setCollisionGroup(obCG);
        o.body.collides([ballCG], this.wallHit, this);
        o.body.x = x;
        o.body.y = y;
        if (typeof rotation != 'undefined') {
            o.body.rotation = rotation;
        }
        o.body.collideWorldBounds = false;
        o.body.kinematic = true;
        if (typeof motion == 'undefined') {
            motion = 'static';
        }
        o.motion = motion;
        switch (motion) {
            case 'rotateCW':
                o.body.rotateRight(obRotateSpeed);
                break;
            case 'rotateCCW':
                o.body.rotateLeft(obRotateSpeed);
                break;
            case 'rotateFast':
                o.body.rotateRight(obRotateSpeed * 5);
                break;
            // X & Y movement handling in update
            case 'x':
                o.body.moveRight(obMoveSpeed);
                break;
            case 'y':
                o.body.moveUp(obMoveSpeed);
                break;
        }
        ob.push(o);
        return o;
    },

    // Destroy all obstacles
    killObstacles: function() {
        for (var i = 0, l = ob.length; i < l; i++) {
            ob[i].body.clearShapes();
            ob[i].parent.remove(ob[i]);
        }
        ob = [];
    },

    // Stop putter movement
    stopPutter: function() {
        putter.body.setZeroForce();
        putter.body.setZeroVelocity();
        putter.body.setZeroRotation();
    },

    // Stop ball movement
    stopBall: function() {
        ball.body.setZeroForce();
        ball.body.setZeroVelocity();
        ball.body.setZeroRotation();
        window['UtilPlatform'].sendMsg2Parent('ShowNavFooterPlay');
        console.log('stop ball show footerplay');
    },

    // Is ball out of the screen?
    ballOut: function() {
        if (scoring) {
            return false;
        }
        if (ball.body.x > this.game.width || ball.body.x < 0 || ball.body.y > this.game.height || ball.body.y < 0) {
            return true;
        } else {
            return false;
        }
    },

    // Hide object (sprite or line)
    hide: function(o) {
        var locX = -Math.abs(Math.round(Math.random() * 999999999) + 9999);
        var locY = -Math.abs(Math.round(Math.random() * 999999999) + 9999);
        o.x = locX;
        o.y = locY;
        if (o.body != null) {
            o.body.x = locX;
            o.body.y = locY;
        }
        // Line?
        if (typeof o.end == 'object' && typeof o.start == 'object') {
            o.setTo(locX, locY, locX, locY);
        }
    },

    // Set sprite position
    setPos: function(o, x, y) {
        o.x = x;
        o.y = y;
        if (o.body != null) {
            o.body.x = x;
            o.body.y = y;
        }
    },

    // Center rendered text
    centerText: function(t) {
        t.x = centerX - t.width / 2;
    },


    /////////////////////////////////////////////////////////////////////////
    // LEVEL CONSTRUCT / DESTRUCT METHODS
    /////////////////////////////////////////////////////////////////////////

    c2: function() {
        this.addOb('bar_long', centerX, centerY, 'rotateCW');
    },

    c3: function() {
        this.addOb('circle', 280, 300, 'x');
        var c = this.addOb('circle', 360, 650, 'x');
        c.body.moveLeft(obMoveSpeed);
        this.addOb('bar_tiny', centerX, centerY);
    },

    c4: function() {
        this.addOb('wedge_red', 145, 145, 'static', 4.71);
        this.addOb('wedge_red', 497, 145);
        this.addOb('wedge_red', 145, 819, 'static', 3.14);
        this.addOb('wedge_red', 497, 819, 'static', 1.57);
        this.addOb('bar_medium', centerX, centerY - 120, 'rotateCW');
        this.addOb('bar_medium', centerX, centerY + 120, 'rotateCW');
        this.addOb('bar_long', centerX + 120, centerY);
        this.addOb('bar_long', centerX - 120, centerY);
    },

    c5: function() {
        this.addOb('wedge_red', 145, 145, 'static', 4.71);
        this.addOb('wedge_red', 497, 145);
        this.addOb('wedge_red', 145, 819, 'static', 3.14);
        this.addOb('wedge_red', 497, 819, 'static', 1.57);
        this.addOb('wedge_blue', centerX, centerY + 180, 'static', 3.14);
    },

    c6: function() {
        var sX = 135;
        var sY = 220;
        var x = sX;
        var y = sY;
        var tot = 32;
        var shufX = 80;
        var shufY = 70;
        var c = 0;
        var row = 4;
        for (var i = 0; i < tot; i++) {
            this.addOb('bar_tiny', x, y);
            x += shufX;
            c += 1;
            if (c >= row) {
                y += shufY;
                x = sX + i * 5;
                c = 0;
            }
        }
        this.addOb('wedge_yellow', 140, 735);
        this.addOb('wedge_yellow', 500, 230, 'static', 3.14);
    },

    c7: function() {
        this.addOb('bar_medium', 320, 440, 'static', 1.57);
        this.addOb('bar_medium', 320, 520, 'static', 1.57);

        this.addOb('corner_small', 225, 415, 'static', 4.71);
        this.addOb('corner_small', 415, 415);
        this.addOb('corner_small', 225, 550, 'static', 3.14);
        this.addOb('corner_small', 415, 550, 'static', 1.57);

        this.addOb('corner_small', 170, 350, 'static', 4.71);
        this.addOb('corner_small', 470, 350);
        this.addOb('corner_small', 170, 615, 'static', 3.14);
        this.addOb('corner_small', 470, 615, 'static', 1.57);
    },

    c8: function() {
        // Center
        this.addOb('bar_tiny', centerX, centerY - 120, 'static', 1.57);
        this.addOb('bar_small', centerX, centerY - 60, 'rotateCW', 1.57);
        this.addOb('bar_medium', centerX, centerY, 'static', 1.57);
        this.addOb('bar_small', centerX, centerY + 60, 'rotateCW', 1.57);
        this.addOb('bar_tiny', centerX, centerY + 120, 'static', 1.57);
        // Top Left
        this.addOb('bar_tiny', centerX - 120, centerY - 320, 'static', 1.57);
        this.addOb('bar_small', centerX - 120, centerY - 260, 'rotateCW', 1.57);
        this.addOb('bar_medium', centerX - 120, centerY - 200, 'static', 1.57);
        this.addOb('bar_small', centerX - 120, centerY - 140, 'rotateCW', 1.57);
        this.addOb('bar_tiny', centerX - 120, centerY - 80, 'static', 1.57);
        // Top Right
        this.addOb('bar_tiny', centerX + 120, centerY - 320, 'static', 1.57);
        this.addOb('bar_small', centerX + 120, centerY - 260, 'rotateCW', 1.57);
        this.addOb('bar_medium', centerX + 120, centerY - 200, 'static', 1.57);
        this.addOb('bar_small', centerX + 120, centerY - 140, 'rotateCW', 1.57);
        this.addOb('bar_tiny', centerX + 120, centerY - 80, 'static', 1.57);
        // Bottom Left
        this.addOb('bar_tiny', centerX - 120, centerY + 320, 'static', 1.57);
        this.addOb('bar_small', centerX - 120, centerY + 260, 'rotateCW', 1.57);
        this.addOb('bar_medium', centerX - 120, centerY + 200, 'static', 1.57);
        this.addOb('bar_small', centerX - 120, centerY + 140, 'rotateCW', 1.57);
        this.addOb('bar_tiny', centerX - 120, centerY + 80, 'static', 1.57);
        // Bottom Right
        this.addOb('bar_tiny', centerX + 120, centerY + 320, 'static', 1.57);
        this.addOb('bar_small', centerX + 120, centerY + 260, 'rotateCW', 1.57);
        this.addOb('bar_medium', centerX + 120, centerY + 200, 'static', 1.57);
        this.addOb('bar_small', centerX + 120, centerY + 140, 'rotateCW', 1.57);
        this.addOb('bar_tiny', centerX + 120, centerY + 80, 'static', 1.57);


    },

    c9: function() {
        this.addOb('bar_long', centerX + 70, centerY + 200, 'static', 1.57);
        this.addOb('bar_long', centerX - 70, centerY, 'static', 1.57);
        this.addOb('bar_long', centerX + 70, centerY - 200, 'static', 1.57);

        this.addOb('wedge_red', 153, 786, 'static', 3.14);
        this.addOb('wedge_red', 153, 542, 'static', 4.71);
        this.addOb('wedge_red', 490, 555, 'static', 1.57);
        this.addOb('wedge_red', 490, 342);
        this.addOb('wedge_red', 153, 368, 'static', 3.14);
        this.addOb('wedge_red', 153, 162, 'static', 4.71);
    },

    c11: function() {
        this.addOb('wedge_blue', centerX - 30, 250, 'static', 4.71);
        this.addOb('wedge_blue', centerX + 30, 400, 'static', 1.57);
        this.addOb('wedge_blue', centerX - 30, 550, 'static', 4.71);
        this.addOb('wedge_blue', centerX + 30, 700, 'static', 1.57);
    },

    c12: function() {
        this.addOb('bar_long', centerX - 130, 250, 'x', 1.57);
        this.addOb('bar_long', centerX + 130, 400, 'x', 1.57);
        this.addOb('bar_long', centerX - 130, 550, 'x', 1.57);
        this.addOb('bar_long', centerX + 130, 700, 'x', 1.57);
    },

    c13: function() {
        this.addOb('circle', centerX, 250);

        this.addOb('circle', centerX - 110, 400);
        this.addOb('circle', centerX + 110, 400);

        this.addOb('circle', centerX, 550);

        this.addOb('circle', centerX - 110, 700);
        this.addOb('circle', centerX + 110, 700);

    },

    c14: function() {
        this.addOb('bar_long', centerX + 38, centerY);
        this.addOb('bar_long', centerX + 90, centerY);
        this.addOb('bar_medium', centerX + 36, centerY - 240);
        this.addOb('bar_medium', centerX + 92, centerY - 240);
        this.addOb('bar_small', centerX + 20, centerY - 350);
        this.addOb('bar_small', centerX + 108, centerY - 350);
    },

    c15: function() {
        this.addOb('wedge_red', centerX, 250, 'rotateFast');

        this.addOb('wedge_red', centerX - 110, 400, 'rotateFast');
        this.addOb('wedge_red', centerX + 110, 400, 'rotateFast');

        this.addOb('wedge_red', centerX, 550, 'rotateFast');

        this.addOb('wedge_red', centerX - 110, 700, 'rotateFast');
        this.addOb('wedge_red', centerX + 110, 700, 'rotateFast');
    },

    c16: function() {
        this.addOb('bar_long', centerX, centerY, 'rotateFast');
    },

    c17: function() {
        this.addOb('bar_long', centerX, centerY, 'y');
        this.addOb('bar_long', centerX - 50, centerY - 30, 'y');
        this.addOb('bar_long', centerX - 100, centerY - 60, 'y');
        this.addOb('bar_long', centerX - 150, centerY - 90, 'y');
        this.addOb('bar_long', centerX - 200, centerY - 120, 'y');
        this.addOb('bar_long', centerX + 50, centerY + 30, 'y');
        this.addOb('bar_long', centerX + 100, centerY + 60, 'y');
        this.addOb('bar_long', centerX + 150, centerY + 90, 'y');
        this.addOb('bar_long', centerX + 200, centerY + 120, 'y');
    },

    c18: function() {
        this.addOb('maze', 320, 480);
    },


    //
    // Helpers
    //

    // Simple Hit Test (AABB)
    hitTest: function(a, b) {
        return !(((a.x + a.width - 1) < b.x) ||
                 ((b.x + b.width - 1) < a.x) ||
                 ((a.y + a.height - 1) < b.y) ||
                 ((b.y + b.height - 1) < a.y));
    },

    // Random Integer Helper
    randomInt: function(min, max) {
        var r = Math.random();
        var ri = Math.floor(r * (max - min + 1) + min);
        return ri;
    },

    // Get Unique Array Helper
    arrayUnique: function(a) {
        return a.reduce(function(p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
        }, []);
    },

    // Add drag event listeners
    onPutterDragStart: function (sprite, pointer) {
        // 드래그 시작 시 실행되는 코드
        // console.log('Putter drag started at:', pointer.x, pointer.y);
        
        // // 드래그 시작 시 시각적 피드백 (선택사항)
        // sprite.alpha = 0.8;
        
        // // 드래그 중임을 표시하는 플래그 설정
        // sprite.isDragging = true;

        window['UtilPlatform'].sendMsg2Parent('HideNavFooterPlay');
    },

    onPutterDragEnd: function (sprite, pointer) {
        // 드래그 종료 시 실행되는 코드
        // console.log('Putter drag ended at:', pointer.x, pointer.y);
        
        // // 시각적 피드백 복원
        // sprite.alpha = 1.0;
        
        // // 드래그 종료 플래그 설정
        // sprite.isDragging = false;
        
        // // 드래그 거리 계산 (선택사항)
        // var dragDistance = Math.sqrt(
        //     Math.pow(pointer.x - sprite.initX, 2) + 
        //     Math.pow(pointer.y - sprite.initY, 2)
        // );
        // console.log('Drag distance:', dragDistance);

        window['UtilPlatform'].sendMsg2Parent('ShowNavFooterPlay');
    }
};