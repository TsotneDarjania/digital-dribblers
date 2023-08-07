import { Footballer } from "../characters/footballer";
import { Match } from "./match";

export class CollisionDetection {
  constructor(public scene: Phaser.Scene, public match: Match) {
    this.init();
  }

  init() {
    this.addDetections();
  }

  addDetections() {
    //ball and footballes
    const allFootballers: Array<Footballer> = [];
    [
      this.match.hotsTeam.allFootballers,
      this.match.guestTeam.allFootballers,
    ].forEach((footballers) => {
      allFootballers.push(...footballers);
    });

    this.scene.physics.add.overlap(this.match.ball, allFootballers, (a, b) => {
      const footballer = b as Footballer;
      this.match.ballTouchFootballer(footballer);
    });

    //goalKeepers and ball
    this.match.hotsTeam.goalKeeper.setImmovable(true);
    this.match.guestTeam.goalKeeper.setImmovable(true);
    this.scene.physics.add.collider(
      this.match.ball,
      [this.match.hotsTeam.goalKeeper, this.match.guestTeam.goalKeeper],
      () => {
        console.log("goalkeeer touch the ball");
      }
    );

    //stadium borders and ball
    const stadiumBorders: Array<Phaser.GameObjects.Image> = [];
    [
      this.match.stadium.topBorder,
      this.match.stadium.bottomBorder,
      this.match.stadium.leftBottomBorder,
      this.match.stadium.leftTopBorder,
      this.match.stadium.rightBottomBorder,
      this.match.stadium.rightTopBorder,
      this.match.stadium.leftGoalPost.leftLine,
      this.match.stadium.leftGoalPost.rightLine,
      this.match.stadium.rightGoalPost.leftLine,
      this.match.stadium.rightGoalPost.rightLine,
    ].forEach((obj) => {
      stadiumBorders.push(obj);
    });

    this.scene.physics.add.collider(this.match.ball, stadiumBorders, () => {});
  }
}
