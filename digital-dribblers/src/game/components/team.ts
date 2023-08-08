import { calculatePercentage } from "../../helper/tatukaMath";
import { Footballer } from "../characters/footballer";
import { TeamData } from "../interfaces/teamData";
import { FootballersLine } from "./footballersLine";
import { Stadium } from "../gameObjects/stadium";

export class Team extends Phaser.GameObjects.Container {
  defenders!: FootballersLine;
  midfielders!: FootballersLine;
  attackers!: FootballersLine;

  allFootballers: Array<Footballer> = [];

  goalKeeper!: Footballer;

  tween!: Phaser.Tweens.Tween;

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

    //collect all footballer
    [
      this.defenders.footballers,
      this.midfielders.footballers,
      this.attackers.footballers,
    ].forEach((footballers) => {
      this.allFootballers.push(...footballers);
    });
  }

  addGoalKeeper() {
    const x = this.isHost
      ? this.stadium.x - calculatePercentage(50, this.stadium.width)
      : this.stadium.x + calculatePercentage(50, this.stadium.width);

    this.goalKeeper = new Footballer(
      this.scene,
      x,
      this.stadium.y,
      calculatePercentage(0.09, this.stadium.width),
      { key: this.teamData.key, position: "goalKeeper" }
    );

    this.add(this.goalKeeper);
  }

  addDefenders() {
    const x = this.isHost
      ? this.stadium.x - calculatePercentage(34, this.stadium.width)
      : this.stadium.x + calculatePercentage(34, this.stadium.width);

    this.defenders = new FootballersLine(
      this.scene,
      x,
      this.stadium.y - this.stadium.height / 2,
      this.stadium,
      this.teamData.formation[0],
      { key: this.teamData.key, position: "defender" }
    );
    this.add(this.defenders);
  }

  addMidfielders() {
    const x = this.isHost
      ? this.stadium.x - calculatePercentage(10, this.stadium.width)
      : this.stadium.x + calculatePercentage(10, this.stadium.width);

    this.midfielders = new FootballersLine(
      this.scene,
      x,
      this.stadium.y - this.stadium.height / 2,
      this.stadium,
      this.teamData.formation[1],
      { key: this.teamData.key, position: "midfielder" }
    );
    this.add(this.midfielders);
  }

  addAttachers() {
    const x = this.isHost
      ? this.stadium.x + calculatePercentage(25, this.stadium.width)
      : this.stadium.x - calculatePercentage(25, this.stadium.width);

    this.attackers = new FootballersLine(
      this.scene,
      x,
      this.stadium.y - this.stadium.height / 2,
      this.stadium,
      this.teamData.formation[2],
      { key: this.teamData.key, position: "attacker" }
    );
    this.add(this.attackers);
  }

  startMotion() {
    this.tween = this.scene.tweens.add({
      targets: this,
      y: {
        from: -this.stadium.leftGoalPost.height / 2,
        to: this.stadium.leftGoalPost.height / 2,
      },
      repeat: -1,
      yoyo: true,
      duration: this.teamData.motionDuration,
    });
    this.tween.seek(700);
  }

  stopMotion() {
    if (this.tween === undefined) return;
    this.tween.pause();
  }

  resumeMotion() {
    if (this.tween !== undefined) {
      this.tween.resume();
    } else {
      this.startMotion();
    }
  }
}
