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
      formation: [3, 4, 3],
      key: "arsenal-flag",
      name: "Arsenal",
      motionDuration: 600,
      passDelay: 300,
      longPassChance: 20,
      ballpossession: 0,
      passInaccuracy: 10,
      passSpeed: 320,
    });

    const france = new Team(this, this.stadium, false, {
      formation: [4, 4, 2],
      key: "aston-flag",
      name: "Bornmount",
      motionDuration: 500,
      passDelay: 200,
      longPassChance: 80,
      ballpossession: 0,
      passInaccuracy: 60,
      passSpeed: 250,
    });

    const match = new Match(this, georgia, france, this.stadium);
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
