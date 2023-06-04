import { Ball } from "../gameObjects/ball";
import { Footballer } from "../gameObjects/footballler";
import { GamePlay } from "../scenes/gamePlay";
import { Match } from "./match";

export class CollisionDetecion {
  guestTeamFootballersCollisions!: Phaser.GameObjects.Group;
  hostTeamFootballersCollisions!: Phaser.GameObjects.Group;

  constructor(public scene: GamePlay, public match: Match) {
    this.init();
  }

  init() {
    this.guestTeamFootballersCollisions = this.scene.add.group();
    this.hostTeamFootballersCollisions = this.scene.add.group();

    this.collectFootballersCollisions();
    this.addDetectionForGuestTeam();
    this.addDetectionForHostTeam();
  }

  collectFootballersCollisions() {
    this.match.guestTeam.allFootbalers.forEach((footbaler) => {
      this.guestTeamFootballersCollisions.add(footbaler);
    });

    this.match.HostTeam.allFootbalers.forEach((footbaler) => {
      this.hostTeamFootballersCollisions.add(footbaler);
    });
  }

  addDetectionForGuestTeam() {
    this.scene.physics.add.collider(
      this.match.ball,
      this.guestTeamFootballersCollisions,
      (a, b) => {
        const ball: Ball = a as Ball;
        const footballer: Footballer = b as Footballer;

        if (this.match.teamWithBall === "guest") {
          ball.stop();
          this.match.passRecieveSucces(footballer, this.match.guestTeam);
        } else {
          ball.stop();
          this.match.passFiled(footballer);
        }
      }
    );
  }

  addDetectionForHostTeam() {
    this.scene.physics.add.collider(
      this.match.ball,
      this.hostTeamFootballersCollisions,
      (a, b) => {
        const ball: Ball = a as Ball;
        const footballer: Footballer = b as Footballer;

        if (this.match.teamWithBall === "host") {
          ball.stop();
          this.match.passRecieveSucces(footballer, this.match.HostTeam);
        } else {
          ball.stop();
          this.match.passFiled(footballer);
        }
      }
    );
  }
}
