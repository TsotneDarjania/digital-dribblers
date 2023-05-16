import { calculatePercentage } from "../../helper/tatukaMath";
import { GamePlay } from "../scenes/gamePlay";

export class Stadium extends Phaser.GameObjects.Layer {
  lineColor = 0xf0fcf8;
  lineWidth = 3;

  screenWidth!: number;
  screenHeight!: number;

  constructor(
    scene: GamePlay,
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
