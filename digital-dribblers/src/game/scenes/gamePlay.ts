import { Footballer } from "../gameObjects/footballler";
import { Stadium } from "../utils/drawStadium";

export class GamePlay extends Phaser.Scene {
  screenWidth!: number;
  screenHeight!: number;

  constructor() {
    super("GamePlay");
  }

  create() {
    this.screenWidth = this.game.canvas.width;
    this.screenHeight = this.game.canvas.height;

    this.drawStadium();

    new Footballer(this, 100, 100, 0xc322e3);
    new Footballer(this, 300, 500, 0xfa4f19);
  }

  drawStadium() {
    new Stadium(this, this.screenWidth / 2, this.screenHeight / 2, 800, 400);
  }
}
