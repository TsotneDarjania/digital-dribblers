import { calculatePercentage } from "../../helper/tatukaMath";
import { Stadium } from "./stadium";

export class GoalPost extends Phaser.GameObjects.Layer {
  width!: number;
  height!: number;

  leftLine!: Phaser.Physics.Arcade.Image;
  rightLine!: Phaser.Physics.Arcade.Image;

  goalLine!: Phaser.GameObjects.Image;

  constructor(
    scene: Phaser.Scene,
    public x: number,
    public y: number,
    public stadaium: Stadium,
    public side: string
  ) {
    super(scene);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.width = calculatePercentage(7, this.stadaium.width);
    this.height = calculatePercentage(30, this.stadaium.height);

    this.addBottomLine();
    this.addLeftLine();
    this.addRightLine();

    this.addGoalLine();
  }

  addBottomLine() {
    const x =
      this.side === "fromLeft" ? this.x - this.width : this.x + this.width;

    this.scene.add
      .image(x, this.y, "default")
      .setDisplaySize(this.stadaium.lineWidth, this.height);
  }

  addLeftLine() {
    const x =
      this.side === "fromLeft"
        ? this.x - this.width / 2
        : this.x + this.width / 2;

    this.leftLine = this.scene.physics.add
      .image(x, this.y - this.height / 2, "default")
      .setDisplaySize(this.width, this.stadaium.lineWidth);
  }

  addRightLine() {
    const x =
      this.side === "fromLeft"
        ? this.x - this.width / 2
        : this.x + this.width / 2;

    this.rightLine = this.scene.physics.add
      .image(x, this.y + this.height / 2, "default")
      .setDisplaySize(this.width, this.stadaium.lineWidth);
  }

  addGoalLine() {
    this.goalLine = this.scene.add
      .image(this.x, this.y, "default")
      .setDisplaySize(this.stadaium.lineWidth, this.height)
      .setAlpha(0.5);
  }
}
