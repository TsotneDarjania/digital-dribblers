import { Team } from "../components/team";
import { Match } from "../core/match";
import { Stadium } from "../gameObjects/stadium";

export class GamePlay extends Phaser.Scene {
  screenWidth!: number;
  screenHeight!: number;

  stadium!: Stadium;

  match!: Match;

  constructor() {
    super("GamePlay");
  }

  create() {
    this.screenWidth = this.game.canvas.width;
    this.screenHeight = this.game.canvas.height;

    this.drawStadium();

    this.match = new Match(this, [
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
