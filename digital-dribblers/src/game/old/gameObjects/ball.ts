import {
  calculatePercentage,
  getRandomFloat,
} from "../../../helper/tatukaMath";
import { GamePlay } from "../scenes/gamePlay";
import { Footballer } from "./footballler";
import { Stadium } from "./stadium";

export class Ball extends Phaser.Physics.Arcade.Image {
  stadium!: Stadium;
  tween!: Phaser.Tweens.Tween;

  constructor(public scene: GamePlay, x: number, y: number) {
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

  toCrush(direction: string) {
    if (direction === "right") {
      this.setVelocity(200, getRandomFloat(-50, 50));
    }
    if (direction === "left") {
      this.setVelocity(-200, getRandomFloat(-50, 50));
    }
  }

  moveTo(footballer: Footballer, speed: number) {
    this.tween = this.scene.tweens.add({
      targets: this,
      x: footballer.getBounds().centerX,
      y: footballer.getBounds().centerY,
      duration: speed * 1000,
    });
  }

  shoot(direction: string, speed: number) {
    const randomY = getRandomFloat(
      -calculatePercentage(50, this.stadium.stadiumHeight),
      calculatePercentage(50, this.stadium.stadiumHeight)
    );

    let positionX = 0;

    if (direction === "left") {
      positionX = this.stadium.x - this.stadium.stadiumWidth / 2 - 100;
    } else {
      positionX = this.stadium.x + this.stadium.stadiumWidth / 2 + 100;
    }

    this.tween = this.scene.tweens.add({
      targets: this,
      x: positionX,
      y: this.stadium.y + randomY,
      duration: speed * 1000,
      onComplete: () => {
        this.scene.match.ballIReset();
      },
    });
  }

  startBlinkAnimation() {
    this.tween = this.scene.tweens.add({
      targets: this,
      alpha: 0,
      yoyo: true,
      repeat: 8,
      duration: 200,
      onComplete: () => {
        this.scene.match.ballIReset();
      },
    });
  }

  stop() {
    this.tween.remove();
  }
}
