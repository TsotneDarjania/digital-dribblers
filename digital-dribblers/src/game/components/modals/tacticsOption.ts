import { calculatePercentage } from "../../../helper/tatukaMath";
import { gamePlayConig } from "../../config/gamePlayConfig";
import { Menu } from "../../scenes/menu";
import { FormationButton } from "../buttons/formationButton";
import { MenuButton } from "../buttons/menuButton";
import { OptionsBar } from "../optionsBat";

export class TacticsOption extends Phaser.GameObjects.Container {
  title!: Phaser.GameObjects.Text;

  options: Array<OptionsBar> = [];
  formationButtons: Array<FormationButton> = [];

  passSpeedBar!: OptionsBar;
  motionDurationBar!: OptionsBar;
  passDelay!: OptionsBar;
  longPassChance!: OptionsBar;
  passAccuracy!: OptionsBar;
  goalKeeperSpeed!: OptionsBar;

  constructor(scene: Phaser.Scene, x: number, y: number, public team: string) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addBackground();
    this.addOptions();
    this.addTitle();
    this.addFormations();

    this.addselectFormationButton();
  }

  clickFormation(formation: Array<number>, yourTeam: boolean) {
    if (yourTeam) {
      const menuScene = this.scene as Menu;
      menuScene.yourTeamTacticsModal.setVisible(false);
      menuScene.oponentTeamTacticsModal.setVisible(true);
      menuScene.oponentTeamTacticsModal.setTitle(
        menuScene.oponentTeamText.node.innerHTML
      );

      //@ts-ignore
      gamePlayConig.hostTeam.formation = formation;
    } else {
      //@ts-ignore
      gamePlayConig.guestTeam.formation = formation;
      this.scene.scene.start("GamePlay");
    }
  }

  addFormations() {
    const formation_1_button = new FormationButton(
      this.scene,
      0,
      -calculatePercentage(35, this.getBounds().height),
      "4-4-2"
    )
      .setVisible(false)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        if (this.team === "yourTeam") {
          this.clickFormation([4, 4, 2], true);
        } else {
          this.clickFormation([4, 4, 2], false);
        }
      });
    this.formationButtons.push(formation_1_button);
    this.add(formation_1_button);

    const formation_2_button = new FormationButton(
      this.scene,
      0,
      -calculatePercentage(25, this.getBounds().height),
      "4-3-3"
    )
      .setVisible(false)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        if (this.team === "yourTeam") {
          this.clickFormation([4, 3, 3], true);
        } else {
          this.clickFormation([4, 3, 3], false);
        }
      });
    this.formationButtons.push(formation_2_button);
    this.add(formation_2_button);

    const formation_3_button = new FormationButton(
      this.scene,
      0,
      -calculatePercentage(15, this.getBounds().height),
      "3-4-3"
    )
      .setVisible(false)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        if (this.team === "yourTeam") {
          this.clickFormation([3, 4, 3], true);
        } else {
          this.clickFormation([3, 4, 3], false);
        }
      });
    this.formationButtons.push(formation_3_button);
    this.add(formation_3_button);

    const formation_4_button = new FormationButton(
      this.scene,
      0,
      -calculatePercentage(5, this.getBounds().height),
      "5-4-1"
    )
      .setVisible(false)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        if (this.team === "yourTeam") {
          this.clickFormation([5, 4, 1], true);
        } else {
          this.clickFormation([5, 4, 1], false);
        }
      });
    this.formationButtons.push(formation_4_button);
    this.add(formation_4_button);

    const formation_5_button = new FormationButton(
      this.scene,
      0,
      +calculatePercentage(5, this.getBounds().height),
      "5-3-2"
    )
      .setVisible(false)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        if (this.team === "yourTeam") {
          this.clickFormation([5, 3, 2], true);
        } else {
          this.clickFormation([5, 3, 2], false);
        }
      });
    this.formationButtons.push(formation_5_button);
    this.add(formation_5_button);

    const formation_6_button = new FormationButton(
      this.scene,
      0,
      +calculatePercentage(15, this.getBounds().height),
      "3-5-2"
    )
      .setVisible(false)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        if (this.team === "yourTeam") {
          this.clickFormation([3, 5, 2], true);
        } else {
          this.clickFormation([3, 5, 2], false);
        }
      });
    this.formationButtons.push(formation_6_button);
    this.add(formation_6_button);

    const formation_7_button = new FormationButton(
      this.scene,
      0,
      +calculatePercentage(25, this.getBounds().height),
      "3-3-4"
    )
      .setVisible(false)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        if (this.team === "yourTeam") {
          this.clickFormation([3, 3, 4], true);
        } else {
          this.clickFormation([3, 3, 4], false);
        }
      });
    this.formationButtons.push(formation_7_button);
    this.add(formation_7_button);
  }

  calculateTeamPharameter(value: number, min: number, max: number) {
    // Make sure x is within the valid range of 0 to 100
    if (value < 0) {
      value = 0;
    } else if (value > 100) {
      value = 100;
    }

    // Interpolate
    const speed = min + (max - min) * (value / 100);
    return speed;
  }

  addselectFormationButton() {
    const formationSelectButton = new MenuButton(
      this.scene,
      0,
      calculatePercentage(40, this.getBounds().height),
      "Formation"
    ).on(Phaser.Input.Events.POINTER_DOWN, () => {
      const menuScene = this.scene as Menu;
      if (this.team === "yourTeam") {
        gamePlayConig.hostTeam.name = menuScene.yourTeamText.node.innerHTML;
        gamePlayConig.hostTeam.key = menuScene.yourTeamText.node.innerHTML;

        gamePlayConig.hostTeam.motionDuration = this.calculateTeamPharameter(
          100 - this.motionDurationBar.indicatorValue,
          280,
          2000
        );

        gamePlayConig.hostTeam.passDelay = this.calculateTeamPharameter(
          100 - this.passDelay.indicatorValue,
          100,
          900
        );

        gamePlayConig.hostTeam.longPassChance = this.calculateTeamPharameter(
          this.longPassChance.indicatorValue,
          0,
          100
        );

        gamePlayConig.hostTeam.passInaccuracy = this.calculateTeamPharameter(
          100 - this.passAccuracy.indicatorValue,
          0,
          100
        );

        gamePlayConig.hostTeam.passSpeed = this.calculateTeamPharameter(
          this.passSpeedBar.indicatorValue,
          150,
          500
        );

        gamePlayConig.hostTeam.goalKeeperSpeed = this.calculateTeamPharameter(
          100 - this.goalKeeperSpeed.indicatorValue,
          300,
          1200
        );
      } else {
        gamePlayConig.guestTeam.name = menuScene.oponentTeamText.node.innerHTML;
        gamePlayConig.guestTeam.key = menuScene.oponentTeamText.node.innerHTML;

        gamePlayConig.guestTeam.motionDuration = this.calculateTeamPharameter(
          100 - this.motionDurationBar.indicatorValue,
          280,
          2000
        );

        gamePlayConig.guestTeam.passDelay = this.calculateTeamPharameter(
          100 - this.passDelay.indicatorValue,
          100,
          900
        );

        gamePlayConig.guestTeam.longPassChance = this.calculateTeamPharameter(
          this.longPassChance.indicatorValue,
          0,
          100
        );

        gamePlayConig.guestTeam.passInaccuracy = this.calculateTeamPharameter(
          100 - this.passAccuracy.indicatorValue,
          0,
          100
        );

        gamePlayConig.guestTeam.passSpeed = this.calculateTeamPharameter(
          this.passSpeedBar.indicatorValue,
          150,
          500
        );

        gamePlayConig.guestTeam.goalKeeperSpeed = this.calculateTeamPharameter(
          100 - this.goalKeeperSpeed.indicatorValue,
          300,
          1200
        );
      }

      this.options.forEach((option) => {
        option.setVisible(false);
        formationSelectButton.setVisible(false);
      });
      this.formationButtons.forEach((button) => {
        button.setVisible(true);
      });
    });

    this.add(formationSelectButton);
  }

  addTitle() {
    this.title = this.scene.add
      .text(0, -calculatePercentage(45, this.getBounds().height), "default", {
        align: "ceter",
        color: "#1D213D",
        fontSize: 20,
        fontFamily: "Rubik Mono One",
      })
      .setOrigin(0.5);

    this.add(this.title);
  }

  setTitle(text: string) {
    this.title.setText(text);
  }

  addOptions() {
    this.passSpeedBar = new OptionsBar(
      this.scene,
      -calculatePercentage(40, this.getBounds().width),
      -calculatePercentage(35, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "pass speed"
    );
    this.options.push(this.passSpeedBar);
    this.add(this.passSpeedBar);

    this.motionDurationBar = new OptionsBar(
      this.scene,
      -calculatePercentage(40, this.getBounds().width),
      -calculatePercentage(23, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "motion speed"
    );
    this.options.push(this.motionDurationBar);
    this.add(this.motionDurationBar);

    this.passDelay = new OptionsBar(
      this.scene,
      -calculatePercentage(40, this.getBounds().width),
      -calculatePercentage(11, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "high temp"
    );
    this.options.push(this.passDelay);
    this.add(this.passDelay);

    this.longPassChance = new OptionsBar(
      this.scene,
      -calculatePercentage(40, this.getBounds().width),
      -calculatePercentage(-1, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "long passes"
    );
    this.options.push(this.longPassChance);
    this.add(this.longPassChance);

    this.passAccuracy = new OptionsBar(
      this.scene,
      -calculatePercentage(40, this.getBounds().width),
      -calculatePercentage(-13, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "pass accuracy"
    );
    this.options.push(this.passAccuracy);
    this.add(this.passAccuracy);

    this.goalKeeperSpeed = new OptionsBar(
      this.scene,
      -calculatePercentage(40, this.getBounds().width),
      -calculatePercentage(-26, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "goalkeeper speed"
    );
    this.options.push(this.goalKeeperSpeed);
    this.add(this.goalKeeperSpeed);
  }

  addBackground() {
    const background = this.scene.add
      .image(0, 0, "default")
      .setDisplaySize(
        calculatePercentage(40, this.scene.game.canvas.width),
        calculatePercentage(80, this.scene.game.canvas.height)
      )
      .setTint(0xf2f2ff);

    this.add(background);
  }
}
