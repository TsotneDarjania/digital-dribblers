import { calculatePercentage } from "../../../helper/tatukaMath";
import { OptionsBar } from "../optionsBat";

export class TacticsOption extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addBackground();
  }

  addBackground() {
    const background = this.scene.add
      .image(0, 0, "default")
      .setDisplaySize(
        calculatePercentage(40, this.scene.game.canvas.width),
        calculatePercentage(80, this.scene.game.canvas.height)
      );

    this.add(background);

    const passSpeedBar = new OptionsBar(
      this.scene,
      this.x -
        this.getBounds().width / 2 +
        calculatePercentage(10, this.getBounds().width),
      this.y - calculatePercentage(30, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "pass speed"
    );

    const motionDurationBar = new OptionsBar(
      this.scene,
      this.x -
        this.getBounds().width / 2 +
        calculatePercentage(10, this.getBounds().width),
      this.y - calculatePercentage(20, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "footballers speed"
    );

    const passDelay = new OptionsBar(
      this.scene,
      this.x -
        this.getBounds().width / 2 +
        calculatePercentage(10, this.getBounds().width),
      this.y - calculatePercentage(10, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "high temp"
    );

    const longPassChance = new OptionsBar(
      this.scene,
      this.x -
        this.getBounds().width / 2 +
        calculatePercentage(10, this.getBounds().width),
      this.y - calculatePercentage(0, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "long passes"
    );

    const passAccuracy = new OptionsBar(
      this.scene,
      this.x -
        this.getBounds().width / 2 +
        calculatePercentage(10, this.getBounds().width),
      this.y + calculatePercentage(10, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "pass accuracy"
    );

    const goalKeeperSpeed = new OptionsBar(
      this.scene,
      this.x -
        this.getBounds().width / 2 +
        calculatePercentage(10, this.getBounds().width),
      this.y + calculatePercentage(20, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "goalkeeper speed"
    );
  }
}
