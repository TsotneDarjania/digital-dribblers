import { calculatePercentage } from "../../helper/tatukaMath";
import { Match } from "./match";

export class MatchIndicators {
  hostTeamScore = 0;
  guestTeamScore = 0;

  hostTeamText!: Phaser.GameObjects.Text;
  guestTeamText!: Phaser.GameObjects.Text;

  scoreTexts!: Phaser.GameObjects.Text;

  matchTime = 0;
  matchTimeText!: Phaser.GameObjects.Text;
  interval!: NodeJS.Timeout;

  constructor(
    public scene: Phaser.Scene,
    public match: Match,
    public hostTeamName: string,
    public guestTeamName: string
  ) {
    this.init();
  }

  updateScores() {
    this.scoreTexts.setText(`${this.hostTeamScore} - ${this.guestTeamScore}`);
  }

  init() {
    this.hostTeamText = this.scene.add
      .text(0, 0, `${this.hostTeamName}`, {
        align: "rigth",
        fontFamily: "Rubik Mono One",
        fontSize: 30,
      })
      .setOrigin(1, 0.5);

    this.hostTeamText.setPosition(
      this.scene.game.canvas.width / 2 -
        calculatePercentage(10, this.scene.game.canvas.width),
      calculatePercentage(5, this.scene.game.canvas.height)
    );

    this.guestTeamText = this.scene.add
      .text(0, 0, `${this.guestTeamName}   `, {
        align: "left",
        fontFamily: "Rubik Mono One",
        fontSize: 30,
      })
      .setOrigin(0, 0.5);

    this.guestTeamText.setPosition(
      this.scene.game.canvas.width / 2 +
        calculatePercentage(10, this.scene.game.canvas.width),
      calculatePercentage(5, this.scene.game.canvas.height)
    );

    this.scoreTexts = this.scene.add
      .text(
        this.scene.game.canvas.width / 2,
        calculatePercentage(5, this.scene.game.canvas.height),
        `${this.hostTeamScore} - ${this.guestTeamScore}`,
        {
          align: "center",
          fontFamily: "Rubik Mono One",
          fontSize: 30,
        }
      )
      .setOrigin(0.5);
  }

  startTimer() {
    this.matchTimeText = this.scene.add
      .text(
        this.scene.game.canvas.width / 2,
        calculatePercentage(10, this.scene.game.canvas.height),
        `${this.matchTime}`,
        {
          align: "center",
          fontFamily: "Rubik Mono One",
          fontSize: 20,
        }
      )
      .setOrigin(0.5);

    this.interval = setInterval(() => {
      this.matchTime += 1;
      this.matchTimeText.setText(`${this.matchTime}`);

      if (this.matchTime === 45) {
        this.match.halfTimeisOver();
        this.stopTimer();
      }
    }, 1500);
  }

  resumeTimer() {
    this.interval = setInterval(() => {
      this.matchTime += 1;
      this.matchTimeText.setText(`${this.matchTime}`);

      if (this.matchTime === 90) {
        this.match.finishMatch();
        this.stopTimer();
      }
    }, 1500);
  }

  stopTimer() {
    clearInterval(this.interval);
  }
}
