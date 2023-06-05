import { calculatePercentage } from "../../helper/tatukaMath";
import { GamePlay } from "../scenes/gamePlay";

export class Stadium extends Phaser.GameObjects.Layer {
  lineColor = 0xf0fcf8;
  lineWidth = 3;

  screenWidth!: number;
  screenHeight!: number;

  leftGoalCollider!: Phaser.GameObjects.Rectangle;
  rightGoalCollider!: Phaser.GameObjects.Rectangle;

  leftPoles!: Phaser.GameObjects.Group;
  rightPoles!: Phaser.GameObjects.Group;

  constructor(
    public scene: GamePlay,
    public x: number,
    public y: number,
    public stadiumWidth: number,
    public stadiumHeight: number
  ) {
    super(scene);

    this.init();
  }

  init() {
    this.screenWidth = this.scene.game.canvas.width;
    this.screenHeight = this.scene.game.canvas.height;

    this.leftPoles = this.scene.add.group();
    this.rightPoles = this.scene.add.group();

    this.addMiddleLine();
    this.addCenterCircle();
    this.addOutLines();

    this.addLeftGoalLine();
    this.addRightGoalLine();

    this.addRightPenaltyArea();
    this.addLeftPenaltyArea();

    this.addCenterInsideCircle();
  }

  addCenterInsideCircle() {
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(this.lineColor, 1);
    graphics.fillCircle(
      this.x,
      this.y,
      calculatePercentage(0.7, this.stadiumWidth)
    );
  }

  addLeftPenaltyArea() {
    const width = calculatePercentage(7, this.stadiumWidth);
    const height = calculatePercentage(40, this.stadiumHeight);

    const graphics = this.scene.add.graphics();
    graphics.lineStyle(this.lineWidth, this.lineColor, 0.4);
    graphics.strokeRect(
      this.x - this.stadiumWidth / 2,
      this.y - height / 2,
      width,
      height
    );

    graphics.fillStyle(this.lineColor, 1);
    graphics.fillCircle(
      this.x -
        this.stadiumWidth / 2 +
        width +
        calculatePercentage(3.5, this.stadiumWidth),
      this.y,
      5
    );

    graphics.strokeRect(
      this.x - this.stadiumWidth / 2,
      this.y - calculatePercentage(150, height) / 2,
      calculatePercentage(200, width),
      calculatePercentage(150, height)
    );
  }

  addRightPenaltyArea() {
    const width = calculatePercentage(7, this.stadiumWidth);
    const height = calculatePercentage(40, this.stadiumHeight);

    const graphics = this.scene.add.graphics();
    graphics.lineStyle(this.lineWidth, this.lineColor, 0.4);
    graphics.strokeRect(
      this.x + this.stadiumWidth / 2 - width,
      this.y - height / 2,
      width,
      height
    );

    graphics.fillStyle(this.lineColor, 1);
    graphics.fillCircle(
      this.x +
        this.stadiumWidth / 2 -
        width -
        calculatePercentage(3.5, this.stadiumWidth),
      this.y,
      5
    );

    graphics.strokeRect(
      this.x + this.stadiumWidth / 2 - calculatePercentage(200, width),
      this.y - calculatePercentage(150, height) / 2,
      calculatePercentage(200, width),
      calculatePercentage(150, height)
    );
  }

  addLeftGoalLine() {
    const width = calculatePercentage(5, this.stadiumWidth);
    const height = calculatePercentage(30, this.stadiumHeight);

    const graphics = this.scene.add.graphics();
    graphics.lineStyle(this.lineWidth, this.lineColor, 1);
    graphics.strokeRect(
      this.x - this.stadiumWidth / 2 - width,
      this.y - height / 2,
      width,
      height
    );

    const leftPole = this.scene.add.rectangle(
      this.x - this.stadiumWidth / 2 - width / 2,
      this.y - height / 2,
      width,
      10
    );
    this.scene.physics.add.existing(leftPole, true);

    const rightPole = this.scene.add.rectangle(
      this.x - this.stadiumWidth / 2 - width / 2,
      this.y + height / 2,
      width,
      10
    );

    this.scene.physics.add.existing(rightPole, true);

    this.leftPoles.add(rightPole);
    this.leftPoles.add(leftPole);

    this.leftGoalCollider = this.scene.add.rectangle(
      this.x - this.stadiumWidth / 2 - width - calculatePercentage(55, width),
      this.y,
      100,
      height
    );
    this.scene.physics.add.existing(this.leftGoalCollider, true);
  }

  addRightGoalLine() {
    const width = calculatePercentage(5, this.stadiumWidth);
    const height = calculatePercentage(30, this.stadiumHeight);

    const graphics = this.scene.add.graphics();
    graphics.lineStyle(this.lineWidth, this.lineColor, 1);
    graphics.strokeRect(
      this.x + this.stadiumWidth / 2,
      this.y - height / 2,
      width,
      height
    );

    const leftPole = this.scene.add.rectangle(
      this.x + this.stadiumWidth / 2 + width / 2,
      this.y - height / 2,
      width,
      10
    );
    this.scene.physics.add.existing(leftPole, true);

    const rightPole = this.scene.add.rectangle(
      this.x + this.stadiumWidth / 2 + width / 2,
      this.y + height / 2,
      width,
      10
    );

    this.scene.physics.add.existing(rightPole, true);

    this.rightPoles.add(rightPole);
    this.rightPoles.add(leftPole);

    this.rightGoalCollider = this.scene.add.rectangle(
      this.x + this.stadiumWidth / 2 + width + calculatePercentage(55, width),
      this.y,
      100,
      height
    );
    this.scene.physics.add.existing(this.rightGoalCollider, true);
  }

  addCenterCircle() {
    const graphics = this.scene.add.graphics();

    graphics.lineStyle(this.lineWidth, this.lineColor, 1);
    graphics.strokeCircle(
      this.x,
      this.y,
      calculatePercentage(6, this.stadiumWidth)
    );
  }

  addOutLines() {
    const graphics = this.scene.add.graphics();
    graphics.lineStyle(this.lineWidth, this.lineColor, 1);

    graphics.strokeRect(
      this.x - this.stadiumWidth / 2,
      this.y - this.stadiumHeight / 2,
      this.stadiumWidth,
      this.stadiumHeight
    );
  }

  addMiddleLine() {
    const graphics = this.scene.add.graphics();

    graphics.lineStyle(this.lineWidth, this.lineColor, 1);
    graphics.moveTo(this.x, this.y - this.stadiumHeight / 2);
    graphics.lineTo(this.x, this.y + this.stadiumHeight / 2);
    graphics.strokePath();
  }
}
