import { TeamData } from "../data/teamsData";
import { Footballer } from "../gameObjects/footballler";
import { GoalKeeper } from "../gameObjects/goalKeeper";
import { GamePlay } from "../scenes/gamePlay";
import { FootbollersColumn } from "./footballersColumn";

export class Team extends Phaser.GameObjects.Container {
  defenceColumn!: FootbollersColumn;
  centerColumn!: FootbollersColumn;
  offenceColumn!: FootbollersColumn;

  allFootbalers: Array<Footballer> = [];

  goalKeeper!: GoalKeeper;

  columnMotionDistance!: number;

  constructor(
    public scene: GamePlay,
    public teamData: TeamData,
    public isGuest: boolean
  ) {
    super(scene);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addGoalKeeper();
    this.addFootballers();
    this.calculateColumnMotionDistance();
  }

  addGoalKeeper() {
    const stadiumLeft_x =
      this.scene.stadium.x - this.scene.stadium.stadiumWidth / 2;
    let posY;
    this.isGuest
      ? (posY = stadiumLeft_x + this.scene.stadium.stadiumWidth)
      : (posY = stadiumLeft_x);

    this.goalKeeper = new GoalKeeper(this.scene, posY, this.scene.stadium.y, {
      key: this.teamData.flag,
      playerPosition: "goalKeeper",
    });

    this.add(this.goalKeeper);
    this.allFootbalers.push(this.goalKeeper);
  }

  stopMotion() {
    this.defenceColumn.stopMove();
    this.centerColumn.stopMove();
    this.offenceColumn.stopMove();
  }

  startMotion() {
    this.defenceColumn.startMove(
      2,
      this.defenceColumn.y - this.columnMotionDistance,
      this.defenceColumn.y + this.columnMotionDistance
    );
    this.centerColumn.startMove(
      2,
      this.centerColumn.y - this.columnMotionDistance,
      this.centerColumn.y + this.columnMotionDistance
    );
    this.offenceColumn.startMove(
      2,
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
        this.teamData.flag,
        "defender"
      );
      this.centerColumn = new FootbollersColumn(
        this.scene,
        this.teamData.formation[1],
        60,
        this.teamData.flag,
        "center"
      );
      this.offenceColumn = new FootbollersColumn(
        this.scene,
        this.teamData.formation[2],
        25,
        this.teamData.flag,
        "forward"
      );
    } else {
      this.defenceColumn = new FootbollersColumn(
        this.scene,
        this.teamData.formation[0],
        15,
        this.teamData.flag,
        "defender"
      );
      this.centerColumn = new FootbollersColumn(
        this.scene,
        this.teamData.formation[1],
        40,
        this.teamData.flag,
        "center"
      );
      this.offenceColumn = new FootbollersColumn(
        this.scene,
        this.teamData.formation[2],
        75,
        this.teamData.flag,
        "forward"
      );
    }

    this.defenceColumn.footballers.forEach((footbaler) => {
      this.allFootbalers.push(footbaler);
    });
    this.centerColumn.footballers.forEach((footbaler) => {
      this.allFootbalers.push(footbaler);
    });
    this.offenceColumn.footballers.forEach((footbaler) => {
      this.allFootbalers.push(footbaler);
    });
  }
}
