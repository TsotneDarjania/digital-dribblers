import { Stadium } from "../components/stadium";

export class GamePlay extends Phaser.Scene {
  stadium!: Stadium;

  constructor() {
    super("GamePlay");
  }

  create() {
    this.addStadium();
  }

  addStadium() {
    this.stadium = new Stadium(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      850,
      500
    );
  }
}
