import { calculatePercentage } from "../../helper/tatukaMath";
import { GoalPost } from "./goalPost";

export class Stadium extends Phaser.GameObjects.Layer {
  graphics!: Phaser.GameObjects.Graphics;

  //pharametres
  lineWidth = 3;
  lineColor = 0xfcf4ed;

  //borders
  topBorder!: Phaser.GameObjects.Image;
  bottomBorder!: Phaser.GameObjects.Image;
  leftTopBorder!: Phaser.GameObjects.Image;
  leftBottomBorder!: Phaser.GameObjects.Image;
  rightTopBorder!: Phaser.GameObjects.Image;
  rightBottomBorder!: Phaser.GameObjects.Image;

  leftGoalPost!: GoalPost;
  rightGoalPost!: GoalPost;

  constructor(
    scene: Phaser.Scene,
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    super(scene);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.graphics = this.scene.add.graphics();
    this.graphics.fillStyle(this.lineColor, 1);
    this.graphics.lineStyle(this.lineWidth, this.lineColor, 1);
    this.graphics.setAlpha(0.5);

    this.addBorders();
    this.addLeftGoalPost();
    this.addRightGoalPost();

    this.addVisualLines();
  }

  addBorders() {
    //top border
    this.topBorder = this.scene.physics.add
      .image(this.x, this.y - this.height / 2, "default")
      .setDisplaySize(this.width, this.lineWidth);

    //bottom border
    this.bottomBorder = this.scene.physics.add
      .image(this.x, this.y + this.height / 2, "default")
      .setDisplaySize(this.width, this.lineWidth);

    this.leftTopBorder = this.scene.physics.add
      .image(this.x - this.width / 2, this.y - this.height / 2, "default")
      .setDisplaySize(this.lineWidth, calculatePercentage(35, this.height))
      .setOrigin(0.5, 0);

    this.leftBottomBorder = this.scene.physics.add
      .image(this.x - this.width / 2, this.y + this.height / 2, "default")
      .setDisplaySize(this.lineWidth, calculatePercentage(35, this.height))
      .setOrigin(0.5, 1);

    this.rightTopBorder = this.scene.physics.add
      .image(this.x + this.width / 2, this.y - this.height / 2, "default")
      .setDisplaySize(this.lineWidth, calculatePercentage(35, this.height))
      .setOrigin(0.5, 0);

    this.rightBottomBorder = this.scene.physics.add
      .image(this.x + this.width / 2, this.y + this.height / 2, "default")
      .setDisplaySize(this.lineWidth, calculatePercentage(35, this.height))
      .setOrigin(0.5, 1);
  }

  addLeftGoalPost() {
    this.leftGoalPost = new GoalPost(
      this.scene,
      this.x - this.width / 2,
      this.y,
      this,
      "fromLeft"
    );
  }

  addRightGoalPost() {
    this.rightGoalPost = new GoalPost(
      this.scene,
      this.x + this.width / 2,
      this.y,
      this,
      "fromRight"
    );
  }

  addVisualLines() {
    //goal keeper short line left
    this.graphics.strokeRect(
      this.x - this.width / 2,
      this.y - calculatePercentage(18, this.height),
      calculatePercentage(8, this.width),
      calculatePercentage(36, this.height)
    );

    //goal keeper long line left
    this.graphics.strokeRect(
      this.x - this.width / 2,
      this.y - calculatePercentage(25, this.height),
      calculatePercentage(13, this.width),
      calculatePercentage(50, this.height)
    );

    //goal keeper short line right
    this.graphics.strokeRect(
      this.x + this.width / 2 - calculatePercentage(8, this.width),
      this.y - calculatePercentage(18, this.height),
      calculatePercentage(8, this.width),
      calculatePercentage(36, this.height)
    );

    //goal keeper long line right
    this.graphics.strokeRect(
      this.x + this.width / 2 - calculatePercentage(13, this.width),
      this.y - calculatePercentage(25, this.height),
      calculatePercentage(13, this.width),
      calculatePercentage(50, this.height)
    );

    //center Line
    this.graphics.strokeRect(
      this.x,
      this.y - this.height / 2,
      calculatePercentage(10, this.lineWidth),
      this.height
    );

    //center big Circle
    this.graphics.strokeCircle(
      this.x,
      this.y,
      calculatePercentage(13, this.height)
    );

    //center small Circle
    this.graphics.fillCircle(
      this.x,
      this.y,
      calculatePercentage(1.5, this.height)
    );
  }
}
