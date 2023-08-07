export class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.setPath(`../../assets/game/`);

    this.load.image("default", "white.png");

    //flags
    this.load.image("georgia-flag", "images/flags/georgia.png");
    this.load.image("france-flag", "images/flags/france.png");

    //gameObjects
    this.load.image("ball", "images/gameObjects/ball.png");
  }

  create() {
    this.scene.start("GamePlay");
  }
}
