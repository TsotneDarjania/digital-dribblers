import { calculatePercentage } from "../../helper/tatukaMath";
import { TeamData } from "../data/teamsData";
import { Footballer } from "../gameObjects/footballler";
import { GamePlay } from "../scenes/gamePlay";

export class Team extends Phaser.GameObjects.Container {
  defenceColumn!: Phaser.GameObjects.Container;
  centereColumn!: Phaser.GameObjects.Container;
  offenceColumn!: Phaser.GameObjects.Container;

  constructor(
    public scene: GamePlay,
    x: number,
    y: number,
    public teamData: TeamData,
    public isGuest: boolean
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.defenceColumn = this.scene.add.container(0, 0);
    this.centereColumn = this.scene.add.container(0, 0);
    this.offenceColumn = this.scene.add.container(0, 0);

    this.addFootballers();
  }

  motionColumn(column: Phaser.GameObjects.Container) {
    // this.scene.tweens.add({
    //     targets : column,
    //     y :
    // })
  }

  addFootballers() {
    if (this.isGuest) {
      this.addColumn(this.teamData.formation[0], this.defenceColumn, 85);
      this.addColumn(this.teamData.formation[1], this.centereColumn, 55);
      this.addColumn(this.teamData.formation[2], this.offenceColumn, 25);
    } else {
      this.addColumn(this.teamData.formation[0], this.defenceColumn, 15);
      this.addColumn(this.teamData.formation[1], this.centereColumn, 45);
      this.addColumn(this.teamData.formation[2], this.offenceColumn, 75);
    }
  }

  addColumn(
    footballers: number,
    container: Phaser.GameObjects.Container,
    percentFromLeft: number
  ) {
    const stadiumTop_y =
      this.scene.stadium.y - this.scene.stadium.stadiumHeight / 2;
    const stadiumLeft_x =
      this.scene.stadium.x - this.scene.stadium.stadiumWidth / 2;
    const padding = this.scene.stadium.stadiumHeight / (footballers + 1);
    const position_x =
      stadiumLeft_x +
      calculatePercentage(percentFromLeft, this.scene.stadium.stadiumWidth);

    let position_y = stadiumTop_y + padding;

    for (let i = 0; i < footballers; i++) {
      const footballer = new Footballer(this.scene, position_x, position_y, {
        key: this.teamData.flag,
      });
      position_y += padding;
      container.add(footballer);
    }
  }
}
