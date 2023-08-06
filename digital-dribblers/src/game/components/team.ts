import { calculatePercentage } from "../../helper/tatukaMath";
import { Footballer } from "../characters/footballer";
import { TeamData } from "../interfaces/teamData";
import { FootballersLine } from "./footballersLine";
import { Stadium } from "./stadium";

export class Team extends Phaser.GameObjects.Container {
  defenders!: FootballersLine;
  midfielders!: FootballersLine;
  attackers!: FootballersLine;

  goalKeeper!: Footballer;

  constructor(
    public scene: Phaser.Scene,
    public stadium: Stadium,
    public isHost: boolean,
    public teamData: TeamData
  ) {
    super(scene);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addGoalKeeper();

    this.addDefenders();
    this.addMidfielders();
    this.addAttachers();

    this.startMotion();
  }

  addGoalKeeper() {
    this.goalKeeper = new Footballer(
      this.scene,
      this.stadium.x - calculatePercentage(50, this.stadium.width),
      this.stadium.y,
      calculatePercentage(0.11, this.stadium.width),
      { key: this.teamData.key }
    );

    this.add(this.goalKeeper);
  }

  addDefenders() {
    this.defenders = new FootballersLine(
      this.scene,
      this.stadium.x - calculatePercentage(30, this.stadium.width),
      this.stadium.y - this.stadium.height / 2,
      this.stadium,
      this.teamData.formation[0],
      { key: this.teamData.key }
    );
    this.add(this.defenders);
  }

  addMidfielders() {
    this.midfielders = new FootballersLine(
      this.scene,
      this.stadium.x - calculatePercentage(5, this.stadium.width),
      this.stadium.y - this.stadium.height / 2,
      this.stadium,
      this.teamData.formation[1],
      { key: this.teamData.key }
    );
    this.add(this.midfielders);
  }

  addAttachers() {
    this.attackers = new FootballersLine(
      this.scene,
      this.stadium.x + calculatePercentage(20, this.stadium.width),
      this.stadium.y - this.stadium.height / 2,
      this.stadium,
      this.teamData.formation[2],
      { key: this.teamData.key }
    );
    this.add(this.attackers);
  }

  startMotion() {
    this.scene.tweens.add({
      targets: this,
      y: {
        from: -this.stadium.leftGoalPost.height / 2,
        to: this.stadium.leftGoalPost.height / 2,
      },
      repeat: -1,
      yoyo: true,
      duration: this.teamData.motionDuration,
    });
  }
}
