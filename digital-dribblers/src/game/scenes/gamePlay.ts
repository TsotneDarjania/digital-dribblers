import { Stadium } from "../gameObjects/stadium";
import { Team } from "../components/team";
import { Match } from "../core/match";
import { gamePlayConig } from "../config/gamePlayConfig";
import { screenSize } from "../config/layoutConfig";

export class GamePlay extends Phaser.Scene {
  stadium!: Stadium;
  match!: Match;

  constructor() {
    super("GamePlay");
  }

  create() {
    console.log(gamePlayConig);

    this.addStadium();

    const yourTeam = new Team(this, this.stadium, true, {
      formation: gamePlayConig.hostTeam.formation,
      key: gamePlayConig.hostTeam.key,
      name: gamePlayConig.hostTeam.name,
      motionDuration: gamePlayConig.hostTeam.motionDuration,
      passDelay: gamePlayConig.hostTeam.passDelay,
      longPassChance: gamePlayConig.hostTeam.longPassChance,
      ballpossession: gamePlayConig.hostTeam.ballPossession,
      passInaccuracy: gamePlayConig.hostTeam.passInaccuracy,
      passSpeed: gamePlayConig.hostTeam.passSpeed,
      goalKeeerSpeed: gamePlayConig.hostTeam.goalKeeperSpeed,
    });

    const oponentTeam = new Team(this, this.stadium, false, {
      formation: gamePlayConig.guestTeam.formation,
      key: gamePlayConig.guestTeam.key,
      name: gamePlayConig.guestTeam.name,
      motionDuration: gamePlayConig.guestTeam.motionDuration,
      passDelay: gamePlayConig.guestTeam.passDelay,
      longPassChance: gamePlayConig.guestTeam.longPassChance,
      ballpossession: gamePlayConig.guestTeam.ballPossession,
      passInaccuracy: gamePlayConig.guestTeam.passInaccuracy,
      passSpeed: gamePlayConig.guestTeam.passSpeed,
      goalKeeerSpeed: gamePlayConig.guestTeam.goalKeeperSpeed,
    });

    this.match = new Match(this, yourTeam, oponentTeam, this.stadium);
  }

  addStadium() {
    this.stadium = new Stadium(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      screenSize().gamePlay.stadium.width,
      screenSize().gamePlay.stadium.height
    );
  }
}
