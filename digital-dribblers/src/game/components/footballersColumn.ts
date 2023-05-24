import { calculatePercentage } from "../../helper/tatukaMath";
import { Footballer } from "../gameObjects/footballler";
import { GamePlay } from "../scenes/gamePlay";

export class FootbollersColumn extends Phaser.GameObjects.Container {
  padding!: number;
  footballers: Array<Footballer> = [];

  animation!: Phaser.Tweens.Tween;

  constructor(
    public scene: GamePlay,
    public footballersNumber: number,
    public percentFromLeft: number,
    public key: string
  ) {
    super(scene);
    scene.add.existing(this);

    this.init();
  }

  init() {
    const stadiumTop_y =
      this.scene.stadium.y - this.scene.stadium.stadiumHeight / 2;
    const stadiumLeft_x =
      this.scene.stadium.x - this.scene.stadium.stadiumWidth / 2;
    this.padding =
      this.scene.stadium.stadiumHeight / (this.footballersNumber + 1);
    let position_y = stadiumTop_y + this.padding;

    const position_x =
      stadiumLeft_x +
      calculatePercentage(
        this.percentFromLeft,
        this.scene.stadium.stadiumWidth
      );

    for (let i = 0; i < this.footballersNumber; i++) {
      const footballer = new Footballer(this.scene, position_x, position_y, {
        key: this.key,
      });
      this.footballers.push(footballer);
      position_y += this.padding;
      this.add(footballer);
    }
  }

  startMove(speed: number, from: number, to: number) {
    this.animation = this.scene.add.tween({
      targets: this,
      y: {
        from: from,
        //   this.y - (this.padding - this.footballers[0].getBounds().height / 2),
        to: to,
        //   this.y + (this.padding - this.footballers[0].getBounds().height / 2),
      },
      duration: speed * 1000,
      repeat: -1,
      yoyo: true,
    });
  }

  stopMove() {
    this.animation.remove();
  }
}
