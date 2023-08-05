import { calculatePercentage } from "../../../helper/tatukaMath";
import { FootbalerData } from "../data/footballersData";
import { GamePlay } from "../scenes/gamePlay";

const combinations = {
  shortPass: {
    goalKeeper: "defender",
    defender: "center",
    center: "forward",
    forward: "shoot",
  },
  longPass: {
    goalKeeper: "defender",
    defender: "center",
    center: "forward",
    forward: "shoot",
  },
};

export class Footballer extends Phaser.Physics.Arcade.Image {
  playerPosition!: string;

  constructor(
    public scene: GamePlay,
    public x: number,
    public y: number,
    public playerData: FootbalerData
  ) {
    super(scene, x, y, playerData.key);
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
    this.init();
  }

  init() {
    this.playerPosition = this.playerData.playerPosition;
    this.addCircleCollider();
  }

  addCircleCollider() {
    this.setCircle(
      calculatePercentage(40, this.width),
      calculatePercentage(10, this.width),
      calculatePercentage(10, this.width)
    );
    this.setImmovable(true);
  }

  selectNextPlayerPositionForPass() {
    //@ts-ignore
    return combinations.shortPass[this.playerPosition];
  }
}
