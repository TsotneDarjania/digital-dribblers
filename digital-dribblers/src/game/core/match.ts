import { calculatePercentage, getRandomFloat } from "../../helper/tatukaMath";
import { Footballer } from "../characters/footballer";
import { MenuButton } from "../components/buttons/menuButton";
import { Team } from "../components/team";
import { Ball } from "../gameObjects/ball";
import { Stadium } from "../gameObjects/stadium";
import { CollisionDetection } from "./collisionDetection";
import { FootbalerOptions } from "./footballerOptions";
import { MatchIndicators } from "./matchIndicators";

export class Match {
  ball!: Ball;
  footballerWithBall!: Footballer;
  teamWidhBall!: Team;

  stop = false;
  ballIsWithFootballer = false;

  continueButton!: MenuButton;
  tacticsButton!: MenuButton;
  finishButton!: MenuButton;
  startMatchButton!: MenuButton;

  matchIndicators!: MatchIndicators;

  //sounds
  refereeSoundEffect!: Phaser.Sound.BaseSound;
  passSoundEffect!: Phaser.Sound.BaseSound;
  setBallSoundEffect!: Phaser.Sound.BaseSound;
  shootSoundEffect!: Phaser.Sound.BaseSound;

  hostTeamGoalKeeerTween!: Phaser.Tweens.Tween;
  guestTeamGoalKeeerTween!: Phaser.Tweens.Tween;

  constructor(
    public scene: Phaser.Scene,
    public hotsTeam: Team,
    public guestTeam: Team,
    public stadium: Stadium
  ) {
    this.init();
  }

  init() {
    this.addSoundEffects();
    this.createMenuButtons();
    this.addBall();
    this.addCollisionDetections();
    this.addInticators();
    this.addGoalEventListener();
  }

  addSoundEffects() {
    this.refereeSoundEffect = this.scene.sound.add("referee-effect", {
      volume: 1,
      loop: false,
    });
    this.passSoundEffect = this.scene.sound.add("pass-effect", {
      volume: 0.2,
      loop: false,
    });
    this.setBallSoundEffect = this.scene.sound.add("setBall-effect", {
      volume: 0.1,
      loop: false,
    });
    this.shootSoundEffect = this.scene.sound.add("shoot-effect", {
      volume: 1,
      loop: false,
    });
  }

  createMenuButtons() {
    this.continueButton = new MenuButton(this.scene, 0, 0, "Continue");

    this.continueButton
      .setPosition(
        this.scene.game.canvas.width / 2 -
          this.continueButton.getBounds().width / 2,
        this.scene.game.canvas.height - this.continueButton.getBounds().height
      )
      .setVisible(false)
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.stop = false;
        this.teamWidhBall = this.guestTeam;
        this.setBall(this.guestTeam.goalKeeper);
        this.hotsTeam.resumeMotion();
        this.matchIndicators.resumeTimer();
        this.ball.setAlpha(1);

        this.refereeSoundEffect.play();

        this.tacticsButton.setVisible(false);
        this.continueButton.setVisible(false);
      });

    this.tacticsButton = new MenuButton(this.scene, 0, 0, "Tactics");

    this.tacticsButton
      .setPosition(
        this.scene.game.canvas.width / 2 +
          this.tacticsButton.getBounds().width / 2,
        this.scene.game.canvas.height - this.tacticsButton.getBounds().height
      )
      .setVisible(false);

    this.finishButton = new MenuButton(this.scene, 0, 0, "Finish").on(
      Phaser.Input.Events.POINTER_DOWN,
      () => {
        this.matchIndicators.stopTimer();
        //most funny place in my code
        this.scene.scene.scene.events.removeListener("update");
        this.scene.scene.start("Menu");
      }
    );

    this.finishButton
      .setPosition(
        this.scene.game.canvas.width / 2,
        this.scene.game.canvas.height - this.finishButton.getBounds().height
      )
      .setVisible(false);

    this.startMatchButton = new MenuButton(this.scene, 0, 0, "Start");

    this.startMatchButton
      .setPosition(
        this.scene.game.canvas.width / 2,
        this.scene.game.canvas.height - this.startMatchButton.getBounds().height
      )
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.startMatchButton.setVisible(false);
        this.start();
      });
  }

  addCollisionDetections() {
    new CollisionDetection(this.scene, this);
  }

  addBall() {
    this.ball = new Ball(this.scene, this.stadium.x, this.stadium.y).setScale(
      calculatePercentage(0.06, this.stadium.width)
    );
  }

  addInticators() {
    this.matchIndicators = new MatchIndicators(
      this.scene,
      this,
      this.hotsTeam.teamData.name,
      this.guestTeam.teamData.name
    );
  }

  start() {
    this.guestTeamGoalKeeerTween = this.scene.tweens.add({
      targets: this.guestTeam.goalKeeper,
      duration: 1000,
      repeat: -1,
      yoyo: true,
      y: {
        from:
          this.stadium.y - this.stadium.leftGoalPost.goalLine.displayHeight / 2,
        to:
          this.stadium.y + this.stadium.leftGoalPost.goalLine.displayHeight / 2,
      },
    });

    this.hostTeamGoalKeeerTween = this.scene.tweens.add({
      targets: this.hotsTeam.goalKeeper,
      duration: 1000,
      repeat: -1,
      yoyo: true,
      y: {
        from:
          this.stadium.y - this.stadium.leftGoalPost.goalLine.displayHeight / 2,
        to:
          this.stadium.y + this.stadium.leftGoalPost.goalLine.displayHeight / 2,
      },
    });
    this.hostTeamGoalKeeerTween.pause();

    this.guestTeam.startMotion();
    this.teamWidhBall = this.hotsTeam;
    this.setBall(this.hotsTeam.goalKeeper);
    this.matchIndicators.startTimer();

    this.refereeSoundEffect.play();
  }

  setBall(footballer: Footballer) {
    if (this.ballIsWithFootballer) return;
    this.setBallSoundEffect.play();

    this.ballIsWithFootballer = true;
    this.teamWidhBall === this.hotsTeam
      ? footballer.setBall(this.ball, "fromRight")
      : footballer.setBall(this.ball, "fromLeft");

    if (footballer.footballerData.position === "goalKeeper") {
      this.teamWidhBall === this.hotsTeam
        ? this.hostTeamGoalKeeerTween.pause()
        : this.guestTeamGoalKeeerTween.pause();
    }

    this.footballerWithBall = footballer;
    this.makeDesition();
  }

  makeDesition() {
    if (this.stop) return;
    const footbalerOption = new FootbalerOptions(
      this.footballerWithBall,
      this.teamWidhBall
    );

    if (footbalerOption.desition === "pass") {
      setTimeout(() => {
        this.hostTeamGoalKeeerTween.resume();
        this.guestTeamGoalKeeerTween.resume();

        this.passSoundEffect.play();
        this.ballIsWithFootballer = false;
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
        this.shootSoundEffect.play();
        this.ballIsWithFootballer = false;
        this.teamWidhBall === this.hotsTeam
          ? this.rightShoot()
          : this.leftShoot();
      }, this.teamWidhBall.teamData.passDelay);
    }
  }

  ballTouchFootballer(footballer: Footballer) {
    if (this.stop) return;
    this.teamWidhBall.allFootballers.includes(footballer)
      ? this.passRecieveSucces(footballer)
      : this.passIsIntercepted(footballer);
  }

  passRecieveSucces(footballer: Footballer) {
    if (this.stop) return;
    this.setBall(footballer);
  }

  passIsIntercepted(footballer: Footballer) {
    if (this.stop) return;
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
    if (this.stop) return;
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
    if (this.stop) return;
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
      if (this.stop) this.ball.setVelocity(0, 0);
      if (this.stop) return;

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

    this.hostTeamGoalKeeerTween.pause();
    this.guestTeamGoalKeeerTween.pause();
    this.stop = true;
    this.refereeSoundEffect.play();

    this.ball.startGoalAnimation();
    this.hotsTeam.stopMotion();
    this.guestTeam.stopMotion();

    setTimeout(() => {
      this.reset(team);
    }, 2000);
  }

  reset(team: string) {
    if (team === "host") {
      this.hotsTeam.startMotion();
      this.teamWidhBall = this.guestTeam;
      this.setBall(this.guestTeam.goalKeeper);

      this.matchIndicators.hostTeamScore += 1;
      this.matchIndicators.updateScores();
    } else {
      this.guestTeam.startMotion();
      this.teamWidhBall = this.hotsTeam;
      this.setBall(this.hotsTeam.goalKeeper);

      this.matchIndicators.guestTeamScore += 1;
      this.matchIndicators.updateScores();
    }
    this.ball.stopGoalAnimation();
    this.ball.setAlpha(1);

    setTimeout(() => {
      this.stop = false;
      this.makeDesition();
    }, 1000);
  }

  halfTimeisOver() {
    this.refereeSoundEffect.play();
    this.stop = true;
    this.ball.setVelocity(0, 0);
    this.ball.setAlpha(0);

    this.tacticsButton.setVisible(true);
    this.continueButton.setVisible(true);

    this.hotsTeam.tween.pause();
    this.guestTeam.tween.pause();

    this.hotsTeam.tween.seek(710);
    this.guestTeam.tween.seek(350);

    this.hostTeamGoalKeeerTween.pause();
    this.guestTeamGoalKeeerTween.pause();
  }

  finishMatch() {
    this.refereeSoundEffect.play();
    this.stop = true;
    this.ball.setVelocity(0, 0);
    this.ball.setAlpha(0);

    this.finishButton.setVisible(true);

    this.hotsTeam.tween.pause();
    this.guestTeam.tween.pause();

    this.hotsTeam.tween.seek(710);
    this.guestTeam.tween.seek(350);

    this.hostTeamGoalKeeerTween.pause();
    this.guestTeamGoalKeeerTween.pause();
  }
}
