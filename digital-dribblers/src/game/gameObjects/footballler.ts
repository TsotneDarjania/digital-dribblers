import { GamePlay } from "../scenes/gamePlay";

export class Footballer {
  radius = 20;

  constructor(
    public scene: GamePlay,
    public x: number,
    public y: number,
    public color: number
  ) {
    this.init();
  }

  init() {
    this.createShape();
  }

  createShape() {
    const graphics = this.scene.add.graphics();

    graphics.fillStyle(this.color, 1);
    graphics.fillCircle(this.x, this.y, this.radius);
  }
}
