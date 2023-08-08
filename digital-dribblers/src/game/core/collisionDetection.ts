import { Footballer } from "../characters/footballer";
import { Match } from "./match";

export class CollisionDetection {
  borderSoundEffect!: Phaser.Sound.BaseSound;
  setBallSoundEffect!: Phaser.Sound.BaseSound;

  constructor(public scene: Phaser.Scene, public match: Match) {
    this.init();
  }

  init() {
    this.addDetections();

    this.borderSoundEffect = this.scene.sound.add("border-effect", {
      volume: 0.6,
      loop: false,
    });

    this.setBallSoundEffect = this.scene.sound.add("setBall-effect", {
      volume: 0.1,
      loop: false,
    });
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
        this.setBallSoundEffect.play();
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

    this.scene.physics.add.collider(this.match.ball, stadiumBorders, () => {
      this.borderSoundEffect.play();
    });
  }
}
