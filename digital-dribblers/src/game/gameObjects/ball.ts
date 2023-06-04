import { calculatePercentage, getRandomFloat } from "../../helper/tatukaMath";
import { GamePlay } from "../scenes/gamePlay";
import { Footballer } from "./footballler";
import { Stadium } from "./stadium";

export class Ball extends Phaser.Physics.Arcade.Image {
  stadium!: Stadium;
  tween!: Phaser.Tweens.Tween;

  constructor(scene: GamePlay, x: number, y: number) {
    super(scene, x, y, "stadium-ball");
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.stadium = scene.stadium;
    this.init();
  }

  init() {
    this.setCircle(calculatePercentage(50, this.width));
    this.setDisplaySize(
      calculatePercentage(2.4, this.stadium.stadiumWidth),
      calculatePercentage(2.4, this.stadium.stadiumWidth)
    );
  }

  setToFootbaler(footballer: Footballer, fromLeft: boolean) {
    const posX = fromLeft
      ? -footballer.getBounds().width / 2 - this.displayWidth / 2
      : footballer.getBounds().width / 2 + this.displayWidth / 2;
    this.setPosition(footballer.x + posX, footballer.getBounds().centerY);
  }

  moveTo(footballer: Footballer, speed: number) {
    this.tween = this.scene.tweens.add({
      targets: this,
      x: footballer.getBounds().centerX,
      y: footballer.getBounds().centerY,
      duration: speed * 1000,
    });
  }

  shoot(footballer: Footballer, speed: number) {
    const randomY = getRandomFloat(
      -calculatePercentage(20, this.stadium.stadiumHeight),
      calculatePercentage(20, this.stadium.stadiumHeight)
    );

    this.tween = this.scene.tweens.add({
      targets: this,
      x: footballer.getBounds().centerX,
      y: footballer.getBounds().centerY + randomY,
      duration: speed * 1000,
    });
  }

  stop() {
    this.tween.remove();
  }
}
