var gameProperties = {
    screenWidth: 1024, //Valor Variable Modificable
    screenHeight: 768, //Valor Variable Modificable
	
    delayToStartLevel: 3, //Valor Variable Modificable
    padding: 60, //Valor Variable Modificable
};

var states = {
    main: "main",
    game: "game",
};

var graphicAssets = {
    ship:{URL:'assets/ships/ship4.png', name:'ship'}, //Valors Variables Modificables
    bullet:{URL:'assets/bullets/bullet.png', name:'bullet'}, //Valors Variables Modificables    
    
    asteroidLarge:{URL:'assets/Large_Asteroids/asteroidLarge5.png', name:'asteroidLarge'}, //Valors Variables Modificables
    asteroidMedium:{URL:'assets/Medium_Asteroids/asteroidMedium5.png', name:'asteroidMedium'}, //Valors Variables Modificables
    asteroidSmall:{URL:'assets/Small_Asteroids/asteroidSmall5.png', name:'asteroidSmall'}, //Valors Variables Modificables
	
    background:{URL:'assets/backgrounds/background5.jpg', name:'background'},
    explosionLarge:{URL:'assets/Explosions/explosionLarge4.png', name:'explosionLarge', width:64, height:64, frames:16}, //Valors Variables Modificables
    explosionMedium:{URL:'assets/Explosions/explosionMedium4.png', name:'explosionMedium', width:32, height:32, frames:16}, //Valors Variables Modificables
    explosionSmall:{URL:'assets/Explosions/explosionSmall4.png', name:'explosionSmall', width:16, height:16, frames:16}, //Valors Variables Modificables
};

var soundAssets = {
    fire:{URL:['assets/sounds/fire5.m4a', 'assets/sounds/fire5.ogg'], name:'fire'}, //Valors Variables Modificables
    destroyed:{URL:['assets/sounds/destroyed3.m4a', 'assets/sounds/destroyed3.ogg'], name:'destroyed'}, //Valors Variables Modificables
};

var shipProperties = {
    startX: gameProperties.screenWidth * 0.5, //Valor Variable Modificable
    startY: gameProperties.screenHeight * 0.5, //Valor Variable Modificable
    acceleration: 300, //Valor Variable Modificable
    drag: 100, //Valor Variable Modificable
    maxVelocity: 300, //Valor Variable Modificable
    angularVelocity: 200, //Valor Variable Modificable
    startingLives: 5, //Valor Variable Modificable
    timeToReset: 3, //Valor Variable Modificable
    blinkDelay: 0.15, //Valor Variable Modificable
};

var bulletProperties = {
    speed: 400, //Valor Variable Modificable
    interval: 250, //Valor Variable Modificable
    lifespan: 2000, //Valor Variable Modificable
    maxCount: 30, //Valor Variable Modificable
};

var asteroidProperties = {
    startingAsteroids: 8, //Valor Variable Modificable
    maxAsteroids: 40, //Valor Variable Modificable
    incrementAsteroids: 4, //Valor Variable Modificable
    
    asteroidLarge: { minVelocity: 50, maxVelocity: 150, minAngularVelocity: 0, maxAngularVelocity: 200, score: 20, nextSize: graphicAssets.asteroidMedium.name, pieces: 2, explosion:'explosionLarge' }, //Valors Variables Modificables
    asteroidMedium: { minVelocity: 50, maxVelocity: 200, minAngularVelocity: 0, maxAngularVelocity: 200, score: 50, nextSize: graphicAssets.asteroidSmall.name, pieces: 2, explosion:'explosionMedium' }, //Valors Variables Modificables
    asteroidSmall: { minVelocity: 50, maxVelocity: 300, minAngularVelocity: 0, maxAngularVelocity: 200, score: 100, explosion:'explosionSmall' }, //Valors Variables Modificables
};

var fontAssets = {
    counterFontStyle:{font: '20px Arial', fill: '#FFFFFF', align: 'center'}, //Valors Variables Modificables
};

var gameState = function(game){
    this.shipSprite;
    this.shipIsInvulnerable;
	
    this.key_left;
    this.key_right;
    this.key_thrust;
    this.key_fire;
    
    this.bulletGroup;
    this.asteroidGroup;
    
    this.tf_lives;
    this.tf_score;
	
    this.sndDestroyed;
    this.sndFire;
	
    this.backgroundSprite;
    
    this.explosionLargeGroup;
    this.explosionMediumGroup;
    this.explosionSmallGroup;
};

gameState.prototype = {
	
    preload: function () {
		game.load.image(graphicAssets.asteroidLarge.name, graphicAssets.asteroidLarge.URL);
        game.load.image(graphicAssets.asteroidMedium.name, graphicAssets.asteroidMedium.URL);
        game.load.image(graphicAssets.asteroidSmall.name, graphicAssets.asteroidSmall.URL);
        
	    game.load.image(graphicAssets.ship.name, graphicAssets.ship.URL);
	    game.load.image(graphicAssets.bullet.name, graphicAssets.bullet.URL);
		
	    game.load.audio(soundAssets.destroyed.name, soundAssets.destroyed.URL);
        game.load.audio(soundAssets.fire.name, soundAssets.fire.URL);
        
        game.load.image(graphicAssets.background.name, graphicAssets.background.URL);
        game.load.spritesheet(graphicAssets.explosionLarge.name, graphicAssets.explosionLarge.URL, graphicAssets.explosionLarge.width, graphicAssets.explosionLarge.height, graphicAssets.explosionLarge.frames);
        game.load.spritesheet(graphicAssets.explosionMedium.name, graphicAssets.explosionMedium.URL, graphicAssets.explosionMedium.width, graphicAssets.explosionMedium.height, graphicAssets.explosionMedium.frames);
        game.load.spritesheet(graphicAssets.explosionSmall.name, graphicAssets.explosionSmall.URL, graphicAssets.explosionSmall.width, graphicAssets.explosionSmall.height, graphicAssets.explosionSmall.frames);
    },
	
    init: function () {
        this.bulletInterval = 0;
        this.asteroidsCount = asteroidProperties.startingAsteroids;
        this.shipLives = shipProperties.startingLives;
        this.score = 0;
    },
    
    create: function () {
        this.initGraphics();
	    this.initSounds();
	    this.initPhysics();        
	    this.initKeyboard();
	    this.resetAsteroids();
    },

    update: function () {
        this.checkPlayerInput();
	    this.checkBoundaries(this.shipSprite);
	    this.bulletGroup.forEachExists(this.checkBoundaries, this); // Línia que més endavant podria borrar.
	    this.asteroidGroup.forEachExists(this.checkBoundaries, this); // Línia que més endavant podria borrar.
		
	    game.physics.arcade.overlap(this.bulletGroup, this.asteroidGroup, this.asteroidCollision, null, this);
		
	    if (!this.shipIsInvulnerable) {
                game.physics.arcade.overlap(this.shipSprite, this.asteroidGroup, this.asteroidCollision, null, this);
            }
    },
	
    initGraphics: function () {
	    this.backgroundSprite = game.add.sprite(0, 0, graphicAssets.background.name); //Valors coordenades Modificables
        this.shipSprite = game.add.sprite(shipProperties.startX, shipProperties.startY, graphicAssets.ship.name);
        this.shipSprite.angle = -90; //Valor Variable Modificable
        this.shipSprite.anchor.set(0.5, 0.5); //Valors Variables Modificables
		
	    this.bulletGroup = game.add.group();
	    this.asteroidGroup = game.add.group();
		
	    this.tf_lives = game.add.text(20, 10, shipProperties.startingLives, fontAssets.counterFontStyle); //Valors Variables Modificables
		
	    this.tf_score = game.add.text(gameProperties.screenWidth - 20, 10, "0", fontAssets.counterFontStyle); //Valors Variables Modificables
        this.tf_score.align = 'right'; //Valors Variables Modificables
        this.tf_score.anchor.set(1, 0); //Valors Variables Modificables
		
	    this.explosionLargeGroup = game.add.group();
        this.explosionLargeGroup.createMultiple(20, graphicAssets.explosionLarge.name, 0); //Valors Variables Modificables
        this.explosionLargeGroup.setAll('anchor.x', 0.5); //Valors Variables Modificables
        this.explosionLargeGroup.setAll('anchor.y', 0.5); //Valors Variables Modificables
        this.explosionLargeGroup.callAll('animations.add', 'animations', 'explode', null, 30); //Valors Variables Modificables
        
        this.explosionMediumGroup = game.add.group();
        this.explosionMediumGroup.createMultiple(20, graphicAssets.explosionMedium.name, 0); //Valors Variables Modificables
        this.explosionMediumGroup.setAll('anchor.x', 0.5); //Valors Variables Modificables
        this.explosionMediumGroup.setAll('anchor.y', 0.5); //Valors Variables Modificables
        this.explosionMediumGroup.callAll('animations.add', 'animations', 'explode', null, 30); //Valors Variables Modificables
        
        this.explosionSmallGroup = game.add.group();
        this.explosionSmallGroup.createMultiple(20, graphicAssets.explosionSmall.name, 0); //Valors Variables Modificables
        this.explosionSmallGroup.setAll('anchor.x', 0.5); //Valors Variables Modificables
        this.explosionSmallGroup.setAll('anchor.y', 0.5); //Valors Variables Modificables
        this.explosionSmallGroup.callAll('animations.add', 'animations', 'explode', null, 30); //Valors Variables Modificables
    },
	
    initSounds: function () {
        this.sndDestroyed = game.add.audio(soundAssets.destroyed.name);
        this.sndFire = game.add.audio(soundAssets.fire.name);
    },
	
    initPhysics: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.physics.enable(this.shipSprite, Phaser.Physics.ARCADE);
        this.shipSprite.body.drag.set(shipProperties.drag);
        this.shipSprite.body.maxVelocity.set(shipProperties.maxVelocity);
		
	    this.bulletGroup.enableBody = true;
        this.bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.bulletGroup.createMultiple(bulletProperties.maxCount, graphicAssets.bullet.name);
        this.bulletGroup.setAll('anchor.x', 0.5); //Valors Variables Modificables
        this.bulletGroup.setAll('anchor.y', 0.5); //Valors Variables Modificables
        this.bulletGroup.setAll('lifespan', bulletProperties.lifespan);
		
	    this.asteroidGroup.enableBody = true;
        this.asteroidGroup.physicsBodyType = Phaser.Physics.ARCADE;
    },
	
    initKeyboard: function () {
        this.key_left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT); //Valor Variable Modificable
        this.key_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT); //Valor Variable Modificable
        this.key_thrust = game.input.keyboard.addKey(Phaser.Keyboard.UP); //Valor Variable Modificable
        this.key_fire = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //Valor Variable Modificable
    },
	
    checkPlayerInput: function () {
        if (this.key_left.isDown) {
            this.shipSprite.body.angularVelocity = -shipProperties.angularVelocity; //Valor Variable Modificable
        } else if (this.key_right.isDown) {
            this.shipSprite.body.angularVelocity = shipProperties.angularVelocity; //Valor Variable Modificable
        } else {
            this.shipSprite.body.angularVelocity = 0; //Valor Variable Modificable
        }
        
        if (this.key_thrust.isDown) {
            game.physics.arcade.accelerationFromRotation(this.shipSprite.rotation, shipProperties.acceleration, this.shipSprite.body.acceleration);
        } else {
            this.shipSprite.body.acceleration.set(0); //Valor Variable Modificable
        }
		
	    if (this.key_fire.isDown) {
            this.fire();
            }
    },
	
    checkBoundaries: function (sprite) {
        if (sprite.x + gameProperties.padding < 0) {
            sprite.x = game.width + gameProperties.padding; //Valor Variable Modificable
        } else if (sprite.x - gameProperties.padding> game.width) {
            sprite.x = -gameProperties.padding; //Valor Variable Modificable
        } 
 
        if (sprite.y + gameProperties.padding < 0) {
            sprite.y = game.height + gameProperties.padding; //Valos Variable Modificable
        } else if (sprite.y - gameProperties.padding> game.height) {
            sprite.y = -gameProperties.padding; //Valor Variable Modificable
        }
    },
	
    fire: function () {
	if (!this.shipSprite.alive) {
            return;
        }
        if (game.time.now > this.bulletInterval) {           
            this.sndFire.play();		
			
            var bullet = this.bulletGroup.getFirstExists(false);
            
            if (bullet) {
                var length = this.shipSprite.width * 0.5; //Valor Variable Modificable
                var x = this.shipSprite.x + (Math.cos(this.shipSprite.rotation) * length); //Valor Variable Modificable
                var y = this.shipSprite.y + (Math.sin(this.shipSprite.rotation) * length); //Valor Variable Modificable
                
                bullet.reset(x, y); //Valor Variable Modificable
                bullet.lifespan = bulletProperties.lifespan;
                bullet.rotation = this.shipSprite.rotation;
                
                game.physics.arcade.velocityFromRotation(this.shipSprite.rotation, bulletProperties.speed, bullet.body.velocity);
                this.bulletInterval = game.time.now + bulletProperties.interval; //Valor Variable Modificable
            }
        }
    },

    createAsteroid: function (x, y, size, pieces) {
        if (pieces === undefined) { pieces = 1; } //Valor Variable Modificable
        
        for (var i=0; i<pieces; i++) {
            var asteroid = this.asteroidGroup.create(x, y, size);
            asteroid.anchor.set(0.5, 0.5); //Valors Variables Modificables
            asteroid.body.angularVelocity = game.rnd.integerInRange(asteroidProperties[size].minAngularVelocity, asteroidProperties[size].maxAngularVelocity);
 
            var randomAngle = game.math.degToRad(game.rnd.angle()); //Valor Variable Modificable
            var randomVelocity = game.rnd.integerInRange(asteroidProperties[size].minVelocity, asteroidProperties[size].maxVelocity);
 
            game.physics.arcade.velocityFromRotation(randomAngle, randomVelocity, asteroid.body.velocity);
		}
    },
	
    resetAsteroids: function () {
        for (var i=0; i < this.asteroidsCount; i++ ) {
            var side = Math.round(Math.random());
            var x;
            var y;
            
            if (side) {
                x = Math.round(Math.random()) * gameProperties.screenWidth; //Valor Variable Modificable
                y = Math.random() * gameProperties.screenHeight; //Valor Variable Modificable
            } else {
                x = Math.random() * gameProperties.screenWidth; //Valor Variable Modificable
                y = Math.round(Math.random()) * gameProperties.screenHeight; //Valor Variable Modificable
            }
            
            this.createAsteroid(x, y, graphicAssets.asteroidLarge.name); //Valor Variable Modificable
        }
    },
	
    asteroidCollision: function (target, asteroid) {
	    this.sndDestroyed.play();
		
        target.kill();
        asteroid.kill();
		
	    if (target.key == graphicAssets.ship.name) {
            this.destroyShip();
            }
		
	    this.splitAsteroid(asteroid);
	    this.updateScore(asteroidProperties[asteroid.key].score);
		
	    if (!this.asteroidGroup.countLiving()) {
                game.time.events.add(Phaser.Timer.SECOND * gameProperties.delayToStartLevel, this.nextLevel, this); //Valors Variables Modificables
            }
		
	    var explosionGroup = asteroidProperties[asteroid.key].explosion + "Group";
        var explosion = this[explosionGroup].getFirstExists(false);
        explosion.reset(asteroid.x, asteroid.y);
        explosion.animations.play('explode', null, false, true); //Valors Variables Modificables
    },
	
    destroyShip: function () {
        this.shipLives --; //Valors Variables Modificables
        this.tf_lives.text = this.shipLives; //Valor Variable Modificable
		
	    if (this.shipLives) {
            game.time.events.add(Phaser.Timer.SECOND * shipProperties.timeToReset, this.resetShip, this); //Valors Variables Modificables
	    } else {
            game.time.events.add(Phaser.Timer.SECOND * shipProperties.timeToReset, this.endGame, this); //Valors Variables Modificables
        }
		
	    var explosion = this.explosionLargeGroup.getFirstExists(false);
        explosion.reset(this.shipSprite.x, this.shipSprite.y);
        explosion.animations.play('explode', 30, false, true); //Valors Variables Modificables
    },
	
    resetShip: function () {
	    this.shipIsInvulnerable = true;
        this.shipSprite.reset(shipProperties.startX, shipProperties.startY);
        this.shipSprite.angle = -90; //Valor Variable Modificable
		
	    game.time.events.add(Phaser.Timer.SECOND * shipProperties.timeToReset, this.shipReady, this);
	    game.time.events.repeat(Phaser.Timer.SECOND * shipProperties.blinkDelay, shipProperties.timeToReset / shipProperties.blinkDelay, this.shipBlink, this);
    },
	
    shipReady: function () {
        this.shipIsInvulnerable = false; //Valor Variable Modificable
	    this.shipSprite.visible = true; //Valor Variable Modificable
    },
	
    shipBlink: function () {
        this.shipSprite.visible = !this.shipSprite.visible; //Valor Variable Modificable
    },
	
    splitAsteroid: function (asteroid) {
        if (asteroidProperties[asteroid.key].nextSize) {
            this.createAsteroid(asteroid.x, asteroid.y, asteroidProperties[asteroid.key].nextSize, asteroidProperties[asteroid.key].pieces);
        }
    },
	
    updateScore: function (score) {
        this.score += score; //Valor Variable Modificable
        this.tf_score.text = this.score;
    },
	
    nextLevel: function () {
        this.asteroidGroup.removeAll(true);
        
        if (this.asteroidsCount < asteroidProperties.maxAsteroids) {
            this.asteroidsCount += asteroidProperties.incrementAsteroids; //Valor Variable Modificable
        }
        
        this.resetAsteroids();
    },

    endGame: function () {
        game.state.start(states.main);
    },  
};

var mainState = function(game){
    this.tf_start;
};
	
mainState.prototype = {
    create: function () {
	    var startInstructions = 'ASTEROIDS GAME!\n\nClick to Start -\n\nUP arrow key for thrust.\n\nLEFT and RIGHT arrow keys to turn.\n\nSPACE key to fire.';
        
        this.tf_start = game.add.text(game.world.centerX, game.world.centerY, startInstructions, fontAssets.counterFontStyle);
        this.tf_start.align = 'center'; //Valors Variables Modificables
        this.tf_start.anchor.set(0.5, 0.5); //Valors Variables Modificables
		
	    game.input.onDown.addOnce(this.startGame, this);
    },
    
    startGame: function () {
        game.state.start(states.game);
    },
};

var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');
game.state.add(states.main, mainState);
game.state.add(states.game, gameState);
game.state.start(states.main);