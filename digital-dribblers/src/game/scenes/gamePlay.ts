import { Team } from "../components/team";
import { Match } from "../core/match";
import { Ball } from "../gameObjects/ball";
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

    // new Ball(this, 200, 200);

    new Match(this, [
      new Team(this, { formation: [4, 4, 2], flag: "georgia-flag" }, false),
      new Team(this, { formation: [4, 3, 3], flag: "france-flag" }, true),
    ]);
  }

  drawStadium() {
    this.stadium = new Stadium(
      this,
      this.screenWidth / 2,
      this.screenHeight / 2,
      1100,
      600
    );
  }
}
