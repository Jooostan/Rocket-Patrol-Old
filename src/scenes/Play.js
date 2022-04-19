class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // image parameters(string key name, URL where graphic is located)

        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');


        // Custom Assets: Images
        this.load.image('pink_donut', './assets/pink_donut.png');
        this.load.image('long_john', './assets/long_john.png');
        this.load.image('donut_holes', './assets/donut_holes.png');
        this.load.image('gold_donut', './assets/gold_donut.png');
        this.load.image('pug', './assets/dog_butt.png');

        //Custom Assets: Tile Sprites
        this.load.image('donuts', './assets/donut.png');
        this.load.image('dunes_1', './assets/dunes_1.png');
        this.load.image('dunes_2', './assets/dunes_2.png');
        this.load.image('dunes_3', './assets/dunes_3.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});

        // Custom Assets: Poof Spritesheet
        this.load.spritesheet('poof', './assets/yummy_poof.png', {frameWidth: 72, frameHeight: 40, startFrame: 0, endFrame:18 });

        // BGM: Land of 8 Bits - By Stephen Bennett https://www.fesliyanstudios.com/royalty-free-music/download/land-of-8-bits/288
        this.load.audio('bgm', './assets/bgm.mp3');

        // https://freesound.org/people/Breviceps/sounds/445974/
        this.slurp = this.load.audio('slurp', './assets/slurp.wav');
    }

    create() {
        // add.tileSprite(x-position, y-position, width, height, key string)
        // place tile sprite
        // this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        this.donut = this.add.tileSprite(0, -30, 640, 480, 'donuts').setOrigin(0,0);
        this.dunes_3 = this.add.tileSprite(0, -30, 640, 480, 'dunes_3').setOrigin(0,0);
        this.dunes_2 = this.add.tileSprite(0, -30, 640, 480, 'dunes_2').setOrigin(0,0);
        this.dunes_1 = this.add.tileSprite(0, -30, 640, 480, 'dunes_1').setOrigin(0,0);
        
        // rectangle parameters(x-coordinate, y-coordinate, width, height, color [hexidecimal format] ).setOrigin(adjusts rectangle's origin poin from center to upperleft)
        // green UI background
        this.add.rectangle(0, (borderUISize + borderPadding)-20, game.config.width, (borderUISize * 2)+20, 0xD5B69A).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x9E6C42).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x9E6C42).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x9E6C42).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x9E6C42).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding-15, 'pug').setOrigin(0.5, 0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, (game.config.width + borderUISize*6) - 270, borderUISize*4, 'gold_donut', 0, 40, 2.5).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, (game.config.width + borderUISize*3) - 180, borderUISize*5 + borderPadding*2, 'pink_donut', 0, 30, 1.5).setOrigin(0,0);
        this.ship03 = new Spaceship(this, (game.config.width - 90), borderUISize*6 + borderPadding*4, 'long_john', 0, 20, 1).setOrigin(0,0);
        this.ship04 = new Spaceship(this, (game.config.width), (borderUISize*6 + borderPadding*4)+50, 'donut_holes', 0, 10, 0.5).setOrigin(0,0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('poof', { start: 0, end: 18, first: 0}),
            frameRate: 25
        });

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#9E6C42',
            color: '#E0E0E0',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.points = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, 'Score:', scoreConfig); 
        scoreConfig.fixedWidth = 75;
        this.scoreLeft = this.add.text((borderUISize + borderPadding)+100, borderUISize + borderPadding*2, this.p1Score, scoreConfig); 

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or (M) for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            this.music.pause(musicconfig);
        }, null, this);


        // BGM Stuff
        this.music = this.sound.add("bgm");

        let musicconfig = {
          mute: false,
          volume: 0.01,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,
          delay: 0
        }
        this.music.play(musicconfig);

        // FIRE UI
        this.fire = this.add.text((borderUISize + borderPadding) + 250, borderUISize + borderPadding*2, 'BARK', scoreConfig).setVisible(false);
    }

    

    update(){
          // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
        }

        if (!this.gameOver){
            // this.starfield.tilePositionX -= 4;
            // this.donut.tilePositionX -= 0.5;
            this.dunes_1.tilePositionX -= 1.5;
            this.dunes_2.tilePositionX -= 2;
            this.dunes_3.tilePositionX -= 2.5;

            this.p1Rocket.update();
            this.ship01.update();               // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        if(this.p1Rocket.isFiring == true){
            // console.log('hiya');
            this.fire.setVisible(true);
        }else{
            this.fire.setVisible(false);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'poof').setOrigin(0, 0);

        // edit
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });    
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;    
        this.sound.play('slurp');
      }
}