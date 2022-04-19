// console.log("hello world");
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play]
}
let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyN, keyE, keyM;

/* 
    General Info
    - Justin Beedle
    - Rocket Patrol Mods [~10-15 hours]
    - 4/18/22
    - 12 hrs to complete the project

    Modded Point Breakdown
    - 60 Pts Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi)
    - 20 Pts Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and its worth more points
    - 10 Pts Implement parallax scrolling
    - 5  Pts Allow the player to contorl the Rocket after it's fired
    - 5  Pts Implement the 'FIRE' UI text from the original game (changed to BARK to match the theme)


*/
 
