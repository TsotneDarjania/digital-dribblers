import { calculatePercentage, getRandomFloat } from "../../helper/tatukaMath";
import { Footballer } from "../characters/footballer";
import { Team } from "../components/team";
import { Ball } from "../gameObjects/ball";
import { Stadium } from "../gameObjects/stadium";
import { CollisionDetection } from "./collisionDetection";
import { FootbalerOptions } from "./footballerOptions";

export class Match {
  ball!: Ball;
  footballerWithBall!: Footballer;
  teamWidhBall!: Team;

  stop = false;

  constructor(
    public scene: Phaser.Scene,
    public hotsTeam: Team,
    public guestTeam: Team,
    public stadium: Stadium
  ) {
    this.init();
  }

  init() {
    this.addBall();
    this.addCollisionDetections();
    this.addGoalEventListener();
  }

  addCollisionDetections() {
    new CollisionDetection(this.scene, this);
  }

  addBall() {
    this.ball = new Ball(this.scene, this.stadium.x, this.stadium.y).setScale(
      calculatePercentage(0.06, this.stadium.width)
    );
  }

  start() {
    this.guestTeam.startMotion();
    this.teamWidhBall = this.hotsTeam;
    this.setBall(this.hotsTeam.goalKeeper);
  }

  setBall(footballer: Footballer) {
    this.teamWidhBall === this.hotsTeam
      ? footballer.setBall(this.ball, "fromRight")
      : footballer.setBall(this.ball, "fromLeft");

    this.footballerWithBall = footballer;
    this.makeDesition();
  }

  makeDesition() {
    const footbalerOption = new FootbalerOptions(
      this.footballerWithBall,
      this.teamWidhBall
    );

    if (footbalerOption.desition === "pass") {
      setTimeout(() => {
        this.footballerWithBall.makePass(
          this.ball,
          footbalerOption.nextFootballer,
          this.teamWidhBall.teamData.passInaccuracy,
          this.teamWidhBall.teamData.passSpeed
        );
      }, this.teamWidhBall.teamData.passDelay);
    }
    if (footbalerOption.desition === "shoot") {
      setTimeout(() => {
        this.teamWidhBall === this.hotsTeam
          ? this.rightShoot()
          : this.leftShoot();
      }, this.teamWidhBall.teamData.passDelay);
    }
  }

  ballTouchFootballer(footballer: Footballer) {
    this.teamWidhBall.allFootballers.includes(footballer)
      ? this.passRecieveSucces(footballer)
      : this.passIsIntercepted(footballer);
    this.ball.setVelocity(0, 0);
  }

  passRecieveSucces(footballer: Footballer) {
    this.setBall(footballer);
  }

  passIsIntercepted(footballer: Footballer) {
    if (this.teamWidhBall === this.hotsTeam) {
      this.teamWidhBall = this.guestTeam;
      this.guestTeam.stopMotion();
      this.hotsTeam.resumeMotion();
    } else {
      this.teamWidhBall = this.hotsTeam;
      this.hotsTeam.stopMotion();
      this.guestTeam.resumeMotion();
    }

    this.setBall(footballer);
  }

  leftShoot() {
    const randomY = getRandomFloat(
      -this.stadium.leftGoalPost.goalLine.displayHeight,
      this.stadium.leftGoalPost.goalLine.displayHeight
    );

    this.scene.physics.moveTo(
      this.ball,
      this.stadium.x - this.stadium.width / 2,
      this.stadium.y + randomY,
      this.teamWidhBall.teamData.passSpeed
    );
  }

  rightShoot() {
    const randomY = getRandomFloat(
      -this.stadium.leftGoalPost.goalLine.displayHeight,
      this.stadium.leftGoalPost.goalLine.displayHeight
    );

    this.scene.physics.moveTo(
      this.ball,
      this.stadium.x + this.stadium.width / 2,
      this.stadium.y + randomY,
      this.teamWidhBall.teamData.passSpeed
    );
  }

  addGoalEventListener() {
    this.scene.events.on("update", () => {
      if (
        this.ball.x + this.ball.displayWidth / 2 <
        this.stadium.leftGoalPost.goalLine.x
      ) {
        this.isGoal("guest");
      }

      if (
        this.ball.x - this.ball.displayWidth / 2 >
        this.stadium.rightGoalPost.goalLine.x
      ) {
        this.isGoal("host");
      }
    });
  }

  isGoal(team: string) {
    this.ball.setVelocity(0, 0);

    if (this.stop) return;
    this.stop = true;

    this.ball.startGoalAnimation();
    this.hotsTeam.stopMotion();
    this.guestTeam.stopMotion();

    setTimeout(() => {
      this.reset(team);
    }, 5000);

    console.log("goal! " + team);
  }

  reset(team: string) {
    if (team === "host") {
      this.hotsTeam.startMotion();
      this.teamWidhBall = this.guestTeam;
      this.setBall(this.guestTeam.goalKeeper);
    } else {
      this.guestTeam.startMotion();
      this.teamWidhBall = this.hotsTeam;
      this.setBall(this.hotsTeam.goalKeeper);
    }
    this.ball.stopGoalAnimation();
    this.ball.setAlpha(1);

    this.stop = false;
  }
}
