// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speed) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.speed = speed;
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed + this.speed;

        // wrap around from left edge to right edge
        if(this.x <= 0 - (this.width - 95)) {
            this.x = game.config.width-85;
        }
        // console.log(this.x);
        // console.log(game.config.width);
    }

    reset() {
        this.x = game.config.width-85
        // console.log(this.x);
    }
}