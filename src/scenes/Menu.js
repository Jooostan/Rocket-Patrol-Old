class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');

        // Modded Audio
        // https://freesound.org/people/AntumDeluge/sounds/583142
        this.load.audio('bark', './assets/bark.mp3');

        this.load.image('title', './assets/Title.png');


    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Tahoma',
            fontSize: '30px',
            backgroundColor: '#9E6C42',
            color: '#E0E0E0',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.title = this.add.tileSprite(0, 0, 640, 480, 'title').setOrigin(0,0);
        // show menu text
        this.add.text(game.config.width/2, (game.config.height/2)+174, 'Use ← → arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, (game.config.height/2 + borderUISize + borderPadding)+175, 'Press (N) for Novice or (E) for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyN)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 60000
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');  
        }
        if (Phaser.Input.Keyboard.JustDown(keyE)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 5,
            gameTimer: 45000 
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
}