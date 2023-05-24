import { calculatePercentage } from "../../helper/tatukaMath";
import { FootbalerData } from "../data/footballersData";
import { GamePlay } from "../scenes/gamePlay";

export class Footballer extends Phaser.GameObjects.Container {
  constructor(
    public scene: GamePlay,
    public x: number,
    public y: number,
    public playerData: FootbalerData
  ) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.init();
  }

  init() {
    this.addImage();
  }

  addImage() {
    const image = this.scene.add
      .image(0, 0, this.playerData.key)
      .setDisplaySize(
        calculatePercentage(4, this.scene.stadium.stadiumWidth),
        calculatePercentage(4, this.scene.stadium.stadiumWidth)
      );
    this.add(image);
  }
}
