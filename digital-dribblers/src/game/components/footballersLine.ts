import { calculatePercentage } from "../../helper/tatukaMath";
import { Footballer } from "../characters/footballer";
import { Stadium } from "./stadium";

export class FootballersLine extends Phaser.GameObjects.Container {
  footballers: Array<Footballer> = [];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public stadium: Stadium,
    public quantity: number,
    public footballerData: FootbalerData
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addFootballers();
  }

  addFootballers() {
    const padding = this.stadium.height / (this.quantity + 1);
    let y = padding;
    for (let i = 0; i < this.quantity; i++) {
      const footballer = new Footballer(
        this.scene,
        0,
        y,
        calculatePercentage(0.11, this.stadium.width),
        this.footballerData
      );
      this.add(footballer);
      this.footballers.push(footballer);
      y += padding;
    }
  }
}
