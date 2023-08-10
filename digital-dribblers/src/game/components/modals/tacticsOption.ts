import { calculatePercentage } from "../../../helper/tatukaMath";
import { Menu } from "../../scenes/menu";
import { FormationButton } from "../buttons/formationButton";
import { MenuButton } from "../buttons/menuButton";
import { OptionsBar } from "../optionsBat";

export class TacticsOption extends Phaser.GameObjects.Container {
  title!: Phaser.GameObjects.Text;

  options: Array<OptionsBar> = [];
  formationButtons: Array<FormationButton> = [];

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
    } else {
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
          this.clickFormation([4, 4, 2], false);
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
          this.clickFormation([4, 4, 2], false);
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
          this.clickFormation([4, 4, 2], false);
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
          this.clickFormation([4, 4, 2], false);
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
          this.clickFormation([4, 4, 2], false);
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
          this.clickFormation([4, 4, 2], false);
        }
      });
    this.formationButtons.push(formation_7_button);
    this.add(formation_7_button);
  }

  addselectFormationButton() {
    const formationSelectButton = new MenuButton(
      this.scene,
      0,
      calculatePercentage(40, this.getBounds().height),
      "Formation"
    ).on(Phaser.Input.Events.POINTER_DOWN, () => {
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
    const passSpeedBar = new OptionsBar(
      this.scene,
      -calculatePercentage(40, this.getBounds().width),
      -calculatePercentage(35, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "pass speed"
    );
    this.options.push(passSpeedBar);
    this.add(passSpeedBar);

    const motionDurationBar = new OptionsBar(
      this.scene,
      -calculatePercentage(40, this.getBounds().width),
      -calculatePercentage(23, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "footballers speed"
    );
    this.options.push(motionDurationBar);
    this.add(motionDurationBar);

    const passDelay = new OptionsBar(
      this.scene,
      -calculatePercentage(40, this.getBounds().width),
      -calculatePercentage(11, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "high temp"
    );
    this.options.push(passDelay);
    this.add(passDelay);

    const longPassChance = new OptionsBar(
      this.scene,
      -calculatePercentage(40, this.getBounds().width),
      -calculatePercentage(-1, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "long passes"
    );
    this.options.push(longPassChance);
    this.add(longPassChance);

    const passAccuracy = new OptionsBar(
      this.scene,
      -calculatePercentage(40, this.getBounds().width),
      -calculatePercentage(-13, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "pass accuracy"
    );
    this.options.push(passAccuracy);
    this.add(passAccuracy);

    const goalKeeperSpeed = new OptionsBar(
      this.scene,
      -calculatePercentage(40, this.getBounds().width),
      -calculatePercentage(-26, this.getBounds().height),
      calculatePercentage(80, this.getBounds().width),
      "goalkeeper speed"
    );
    this.options.push(goalKeeperSpeed);
    this.add(goalKeeperSpeed);
  }

  addBackground() {
    const background = this.scene.add
      .image(0, 0, "default")
      .setDisplaySize(
        calculatePercentage(40, this.scene.game.canvas.width),
        calculatePercentage(80, this.scene.game.canvas.height)
      );

    this.add(background);
  }
}
