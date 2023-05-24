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

    // new Footballer(this, 200, 400, { key: "georgia-flag" });
    new Team(this, 0, 0, { formation: [4, 4, 2], flag: "georgia-flag" }, true);
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
