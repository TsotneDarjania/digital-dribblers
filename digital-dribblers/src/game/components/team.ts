import { TeamData } from "../data/teamsData";
import { GamePlay } from "../scenes/gamePlay";
import { FootbollersColumn } from "./footballersColumn";

export class Team extends Phaser.GameObjects.Container {
  defenceColumn!: FootbollersColumn;
  centerColumn!: FootbollersColumn;
  offenceColumn!: FootbollersColumn;

  columnMotionDistance!: number;

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
    this.addFootballers();
    this.calculateColumnMotionDistance();

    this.startPlay();
  }

  startPlay() {
    this.defenceColumn.startMove(
      1,
      this.defenceColumn.y - this.columnMotionDistance,
      this.defenceColumn.y + this.columnMotionDistance
    );
    this.centerColumn.startMove(
      1,
      this.centerColumn.y - this.columnMotionDistance,
      this.centerColumn.y + this.columnMotionDistance
    );
    this.offenceColumn.startMove(
      1,
      this.offenceColumn.y - this.columnMotionDistance,
      this.offenceColumn.y + this.columnMotionDistance
    );
  }

  calculateColumnMotionDistance() {
    let maxColumn = this.defenceColumn;
    const allColumns = [
      this.defenceColumn,
      this.centerColumn,
      this.offenceColumn,
    ];

    for (let i = 0; i < allColumns.length; i++) {
      if (allColumns[i].getAll().length >= maxColumn.getAll().length) {
        maxColumn = allColumns[i];
        const padding =
          this.scene.stadium.stadiumHeight /
          (allColumns[i].footballersNumber + 1);
        this.columnMotionDistance =
          padding - allColumns[i].footballers[0].getBounds().height / 2;
      }
    }
  }

  addFootballers() {
    if (this.isGuest) {
      this.defenceColumn = new FootbollersColumn(
        this.scene,
        this.teamData.formation[0],
        85,
        this.teamData.flag
      );
      this.centerColumn = new FootbollersColumn(
        this.scene,
        this.teamData.formation[1],
        55,
        this.teamData.flag
      );
      this.offenceColumn = new FootbollersColumn(
        this.scene,
        this.teamData.formation[2],
        25,
        this.teamData.flag
      );
    } else {
      this.defenceColumn = new FootbollersColumn(
        this.scene,
        this.teamData.formation[0],
        15,
        this.teamData.flag
      );
      this.centerColumn = new FootbollersColumn(
        this.scene,
        this.teamData.formation[1],
        45,
        this.teamData.flag
      );
      this.offenceColumn = new FootbollersColumn(
        this.scene,
        this.teamData.formation[2],
        75,
        this.teamData.flag
      );
    }
  }
}
