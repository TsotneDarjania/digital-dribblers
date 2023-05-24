export class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.setPath(`../../assets/game/`);

    //load flags
    this.load.image("georgia-flag", "images/flags/georgia.png");
  }

  create() {
    this.scene.start("GamePlay");
  }
}
