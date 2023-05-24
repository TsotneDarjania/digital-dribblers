import { Team } from "../components/team";
import { Footballer } from "../gameObjects/footballler";
import { Stadium } from "../gameObjects/stadium";

export class GamePlay extends Phaser.Scene {
  screenWidth!: number;
  screenHeight!: number;

  stadium!: Stadium;

  constructor() {
    super("GamePlay");
  }

  create() {
    this.screenWidth = this.game.canvas.width;
    this.screenHeight = this.game.canvas.height;

    this.drawStadium();
    new Team(this, 0, 0, { formation: [5, 4, 2], flag: "georgia-flag" }, false);
  }

  drawStadium() {
    this.stadium = new Stadium(
      this,
      this.screenWidth / 2,
      this.screenHeight / 2,
      800,
      400
    );
  }
}
