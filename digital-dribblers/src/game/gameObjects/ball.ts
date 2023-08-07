import { calculatePercentage } from "../../helper/tatukaMath";

export class Ball extends Phaser.Physics.Arcade.Image {
  goalAnimation!: Phaser.Tweens.Tween;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "ball");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
  }

  init() {
    this.setBounce(1, 1);
    this.setCircle(calculatePercentage(47, this.displayWidth), 1, 1);
  }

  startGoalAnimation() {
    if (this.goalAnimation !== undefined) {
      this.goalAnimation.resume();
    } else {
      this.goalAnimation = this.scene.tweens.add({
        targets: this,
        alpha: 0.2,
        repeat: -1,
        yoyo: true,
        duration: 400,
      });
    }
  }

  stopGoalAnimation() {
    this.goalAnimation.pause();
  }
}
