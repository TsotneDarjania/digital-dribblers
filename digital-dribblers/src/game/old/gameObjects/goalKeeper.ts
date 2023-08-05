import { FootbalerData } from "../data/footballersData";
import { GamePlay } from "../scenes/gamePlay";
import { Footballer } from "./footballler";

export class GoalKeeper extends Footballer {
  constructor(
    public scene: GamePlay,
    public x: number,
    public y: number,
    footballerData: FootbalerData
  ) {
    super(scene, x, y, footballerData);
    this.scene.add.existing(this);
  }
}
