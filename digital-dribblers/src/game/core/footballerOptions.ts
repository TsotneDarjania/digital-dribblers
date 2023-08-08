import { getRandomFloat } from "../../helper/tatukaMath";
import { Footballer } from "../characters/footballer";
import { Team } from "../components/team";
import { PassOptions } from "../interfaces/passOptions";

export class FootbalerOptions {
  desition!: string;
  nextFootballer!: Footballer;

  passOptions!: PassOptions;

  constructor(public footballer: Footballer, public team: Team) {
    this.init();
  }

  init() {
    this.passOptions = {
      goalKeeper: {
        footballersForshortPass: this.team.defenders.footballers,
        footballersForLongPass: this.team.midfielders.footballers,
      },
      defender: {
        footballersForshortPass: this.team.midfielders.footballers,
        footballersForLongPass: this.team.attackers.footballers,
      },
      midfielder: {
        footballersForshortPass: this.team.attackers.footballers,
        footballersForLongPass: this.team.attackers.footballers,
      },
    };

    this.chooseDesition();
  }

  chooseDesition() {
    const ballPossesion = getRandomFloat(0, 100);
    if (ballPossesion < this.team.teamData.ballpossession) {
      this.desition = "pass";
      if (this.footballer.footballerData.position === "goalKeeper") {
        this.makeNextPass();
      } else {
        if (this.footballer.footballerData.position === "attacker") {
          this.shoot();
        } else {
          this.makeAlongPass();
        }
      }
    } else {
      if (this.footballer.footballerData.position === "attacker") {
        this.shoot();
      } else {
        this.makeNextPass();
      }
    }
  }

  makeNextPass() {
    const longPassIndex = getRandomFloat(0, 100);
    if (longPassIndex < this.team.teamData.longPassChance) {
      this.chooseNextFootballer("long");
    } else {
      this.chooseNextFootballer("short");
    }
  }

  makeAlongPass() {
    this.makeNextPass();
    this.desition = "pass";
  }

  chooseNextFootballer(pass: string) {
    if (pass === "long") {
      const footballers =
        this.passOptions[
          this.footballer.footballerData.position as keyof PassOptions
        ].footballersForLongPass;

      this.nextFootballer =
        footballers[Math.floor(getRandomFloat(0, footballers.length))];
    }
    if (pass === "short") {
      const footballers =
        this.passOptions[
          this.footballer.footballerData.position as keyof PassOptions
        ].footballersForshortPass;

      this.nextFootballer =
        footballers[Math.floor(getRandomFloat(0, footballers.length))];
    }

    this.desition = "pass";
  }

  shoot() {
    this.desition = "shoot";
  }
}
