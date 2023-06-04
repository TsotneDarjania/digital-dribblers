export class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.setPath(`../../assets/game/`);

    //GameObjects
    this.load.image("stadium-ball", "images/gameObjects/stadium-ball.png");

    //load flags
    this.load.image("georgia-flag", "images/flags/georgia.png");
    this.load.image("france-flag", "images/flags/france.png");
  }

  create() {
    this.scene.start("GamePlay");
  }
}
