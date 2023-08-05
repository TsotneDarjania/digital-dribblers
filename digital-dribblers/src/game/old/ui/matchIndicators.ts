import { Match } from "../core/match";
import { GamePlay } from "../scenes/gamePlay";

export interface MatchData {
  hostTeam: {
    name: string;
  };
  guestTeam: {
    name: string;
  };
}

export class MatchIndicators {
  hostTeamName!: Phaser.GameObjects.Text;
  guestTeamName!: Phaser.GameObjects.Text;

  hostTeamScoreText!: Phaser.GameObjects.Text;
  guestTeamScoreText!: Phaser.GameObjects.Text;

  constructor(
    public scene: GamePlay,
    public match: Match,
    public matchData: MatchData
  ) {
    this.init();
  }

  init() {
    this.addHostTeamName();
    this.addHostTeamScore();
    this.addGuestTeamName();
    this.addGuestTeamScore();
  }

  updateScores() {
    this.hostTeamScoreText.setText(this.match.hostTeamScore.toString());
    this.guestTeamScoreText.setText(this.match.guestTeamScore.toString());
  }

  addHostTeamName() {
    this.hostTeamName = this.scene.add.text(
      300,
      100,
      this.matchData.hostTeam.name,
      {
        align: "center",
        fontSize: "30px",
      }
    );
  }

  addHostTeamScore() {
    this.hostTeamScoreText = this.scene.add.text(
      500,
      100,
      this.match.hostTeamScore.toString(),
      {
        align: "center",
        fontSize: "30px",
      }
    );
  }

  addGuestTeamName() {
    this.guestTeamName = this.scene.add.text(
      800,
      100,
      this.matchData.guestTeam.name,
      {
        align: "center",
        fontSize: "30px",
      }
    );
  }

  addGuestTeamScore() {
    this.guestTeamScoreText = this.scene.add.text(
      700,
      100,
      this.match.guestTeamScore.toString(),
      {
        align: "center",
        fontSize: "30px",
      }
    );
  }
}
