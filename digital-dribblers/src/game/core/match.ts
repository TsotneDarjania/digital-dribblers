import { getRandomFloat } from "../../helper/tatukaMath";
import { Team } from "../components/team";
import { Ball } from "../gameObjects/ball";
import { Footballer } from "../gameObjects/footballler";
import { GamePlay } from "../scenes/gamePlay";
import { CollisionDetecion } from "./collisionDetection";

export class Match {
  ball!: Ball;

  guestTeam!: Team;
  HostTeam!: Team;

  footballerWithBall!: Footballer;

  teamWithBall = "host";

  constructor(public scene: GamePlay, public teams: Array<Team>) {
    this.init();
  }

  init() {
    this.HostTeam = this.teams[0];
    this.guestTeam = this.teams[1];
    this.footballerWithBall = this.HostTeam.goalKeeper;

    this.addBall();
    this.startGame();

    new CollisionDetecion(this.scene, this);
  }

  addBall() {
    this.ball = new Ball(this.scene, 0, 0);
    this.ball.setToFootbaler(this.HostTeam.goalKeeper, false);
  }

  startGame() {
    this.guestTeam.startMotion();

    this.makePass(this.selectNextFootballer(this.HostTeam));
  }

  makePass(nextPlayer: Footballer) {
    if (nextPlayer === undefined) {
      this.shoot();
    } else {
      this.ball.moveTo(nextPlayer, 1);
    }
  }

  shoot() {
    if (this.teamWithBall === "host") {
      this.ball.shoot(this.guestTeam.goalKeeper, 0.5);
    } else {
      this.ball.shoot(this.HostTeam.goalKeeper, 0.5);
    }
  }

  passRecieveSucces(footballer: Footballer, team: Team) {
    this.footballerWithBall = footballer;
    if (this.teamWithBall === "host") {
      this.ball.setToFootbaler(footballer, false);
    } else {
      this.ball.setToFootbaler(footballer, true);
    }

    this.makePass(this.selectNextFootballer(team));
  }

  passFiled(footballer: Footballer) {
    this.changeTeamwWithBallTeam();
    this.footballerWithBall = footballer;

    if (this.teamWithBall === "host") {
      this.ball.setToFootbaler(footballer, false);
      this.guestTeam.startMotion();
      this.HostTeam.stopMotion();

      this.makePass(this.selectNextFootballer(this.HostTeam));
    } else {
      this.ball.setToFootbaler(footballer, true);
      this.guestTeam.stopMotion();
      this.HostTeam.startMotion();

      this.makePass(this.selectNextFootballer(this.guestTeam));
    }
  }

  changeTeamwWithBallTeam() {
    if (this.teamWithBall === "host") {
      this.teamWithBall = "guest";
      return;
    }
    if (this.teamWithBall === "guest") {
      this.teamWithBall = "host";
    }
  }

  selectNextFootballer(team: Team) {
    const nextPlayerPosition =
      this.footballerWithBall.selectNextPlayerPositionForPass();

    let footballers: Array<Footballer>;
    let footballerIndex: number;
    let nextPlayer: Footballer;

    //choose Next Player
    switch (nextPlayerPosition) {
      case "defender":
        footballers = team.defenceColumn.footballers;
        footballerIndex = Math.floor(getRandomFloat(0, footballers.length));
        nextPlayer = footballers[footballerIndex];
        break;
      case "center":
        footballers = team.centerColumn.footballers;
        footballerIndex = Math.floor(getRandomFloat(0, footballers.length - 1));
        nextPlayer = footballers[footballerIndex];
        break;
      case "forward":
        footballers = team.offenceColumn.footballers;
        footballerIndex = Math.floor(getRandomFloat(0, footballers.length - 1));
        nextPlayer = footballers[footballerIndex];
        break;
      default:
        break;
    }

    return nextPlayer!;
  }
}
