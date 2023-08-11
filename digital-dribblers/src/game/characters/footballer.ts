import { calculatePercentage, getRandomFloat } from "../../helper/tatukaMath";
import { Ball } from "../gameObjects/ball";

export class Footballer extends Phaser.Physics.Arcade.Image {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public scale: number,
    public footballerData: FootbalerData
  ) {
    super(scene, x, y, footballerData.key);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
  }

  init() {
    this.setCircle(calculatePercentage(55, this.displayWidth), 4, 4);
    this.setScale(this.scale);
    this.setImmovable(true);
  }

  setBall(ball: Ball, side: string) {
    ball.setVelocity(0, 0);

    const x =
      side === "fromRight"
        ? this.getBounds().centerX +
          this.getBounds().width / 2 +
          ball.getBounds().width / 2
        : this.getBounds().centerX -
          this.getBounds().width / 2 -
          ball.getBounds().width / 2;

    setTimeout(() => {
      ball.setPosition(x, this.getBounds().centerY);
    }, 40);
  }

  makePass(
    ball: Ball,
    nextFootballer: Footballer,
    passInaccuracy: number,
    speed: number
  ) {
    const random = getRandomFloat(-passInaccuracy, passInaccuracy);

    this.scene.physics.moveTo(
      ball,
      nextFootballer.getBounds().centerX + random,
      nextFootballer.getBounds().centerY + random,
      speed
    );
  }
}
