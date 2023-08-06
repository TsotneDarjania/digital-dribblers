import { Stadium } from "../components/stadium";
import { Team } from "../components/team";

export class GamePlay extends Phaser.Scene {
  stadium!: Stadium;

  constructor() {
    super("GamePlay");
  }

  create() {
    this.addStadium();

    new Team(this, this.stadium, true, {
      formation: [4, 4, 2],
      key: "georgia-flag",
    });
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
