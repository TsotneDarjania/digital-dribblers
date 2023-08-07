import { Stadium } from "../gameObjects/stadium";
import { Team } from "../components/team";
import { Match } from "../core/match";

export class GamePlay extends Phaser.Scene {
  stadium!: Stadium;

  constructor() {
    super("GamePlay");
  }

  create() {
    this.addStadium();

    const georgia = new Team(this, this.stadium, true, {
      formation: [4, 4, 2],
      key: "georgia-flag",
      motionDuration: 1500,
      passDelay: 1000,
      longPassChance: 40,
      ballpossession: 70,
      passInaccuracy: 70,
      passSpeed: 200,
    });

    const france = new Team(this, this.stadium, false, {
      formation: [4, 4, 2],
      key: "france-flag",
      motionDuration: 700,
      passDelay: 500,
      longPassChance: 20,
      ballpossession: 70,
      passInaccuracy: 20,
      passSpeed: 300,
    });

    const match = new Match(this, georgia, france, this.stadium);
    match.start();
  }

  addStadium() {
    this.stadium = new Stadium(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      870,
      500
    );
  }
}
