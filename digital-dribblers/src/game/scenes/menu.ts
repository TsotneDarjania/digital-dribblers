import { calculatePercentage } from "../../helper/tatukaMath";
import { MenuButton } from "../components/buttons/menuButton";
import { TacticsOption } from "../components/modals/tacticsOption";
import { TeamOptionsModal } from "../components/modals/teamOptions";
import { screenSize } from "../config/layoutConfig";

export class Menu extends Phaser.Scene {
  selectYourTeamButton!: Phaser.GameObjects.DOMElement;
  selectOponentTeamButton!: Phaser.GameObjects.DOMElement;

  yourTeamsOptions!: TeamOptionsModal;
  oponentTeamsOptions!: TeamOptionsModal;

  yourTeamText!: Phaser.GameObjects.DOMElement;
  oponentTeamText!: Phaser.GameObjects.DOMElement;

  tacticsButton!: MenuButton;

  yourTeamTacticsModal!: TacticsOption;
  oponentTeamTacticsModal!: TacticsOption;

  constructor() {
    super("Menu");
  }

  create() {
    //background color
    this.add
      .image(0, 0, "default")
      .setDisplaySize(this.game.canvas.width, this.game.canvas.height)
      .setOrigin(0)
      .setTint(0x222324)
      .setDepth(-10);

    this.tacticsButton = new MenuButton(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height -
        calculatePercentage(
          screenSize().menu.tacticsButton.y,
          this.game.canvas.height
        ),
      "Tactics"
    )
      .setVisible(false)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.yourTeamTacticsModal.setTitle(this.yourTeamText.node.innerHTML);
        this.tacticsButton.setVisible(false);
        this.yourTeamTacticsModal.setVisible(true);

        this.selectYourTeamButton.setVisible(false);
        this.selectOponentTeamButton.setVisible(false);

        this.yourTeamText.setVisible(false);
        this.oponentTeamText.setVisible(false);
        vsText.setVisible(false);

        if (this.scale.isFullscreen === false) {
          if (window.innerWidth < 900) {
            this.scale.startFullscreen();
          }
        }
      });

    this.yourTeamTacticsModal = new TacticsOption(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "yourTeam"
    ).setVisible(false);

    this.oponentTeamTacticsModal = new TacticsOption(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "oponentTeam"
    ).setVisible(false);

    //Your Team Text
    this.yourTeamText = this.add
      .dom(
        0,
        0,
        "p",
        "font-family: 'IBM Plex Mono', monospace; font-size : 40px; color : white; text-align: left; width : 1000px;",
        ""
      )
      .setOrigin(0);

    //Oponent Team Text
    this.oponentTeamText = this.add
      .dom(
        this.game.canvas.width,
        0,
        "p",
        "font-family: 'IBM Plex Mono', monospace; font-size : 40px; color : white; text-align: right;",
        ""
      )
      .setOrigin(1, 0);

    //VS text
    const vsText = this.add
      .dom(
        this.game.canvas.width / 2,
        0,
        "p",
        "font-family: 'IBM Plex Mono', monospace; font-size : 50px; color : white",
        "VS"
      )
      .setOrigin(0.5, 0);

    //your
    this.selectYourTeamButton = this.add
      .dom(
        0,
        0,
        "button",
        `cursor : pointer; width : ${
          screenSize().menu.selectOponentTeamButton.width
        }px; height : ${
          screenSize().menu.selectOponentTeamButton.height
        }px; background-color: #5F6163; font-family: IBM Plex Mono, monospace; 
          font-size: ${
            screenSize().menu.selectOponentTeamButton.fontSize
          }px; border:6px solid #313233; color: #B8BABF;`,
        "Select Your Team"
      )
      .setOrigin(0)
      .setInteractive()
      .addListener("click")
      .on("click", () => {
        this.yourTeamsOptions.visible
          ? this.yourTeamsOptions.setVisible(false)
          : this.yourTeamsOptions.setVisible(true);

        if (this.scale.isFullscreen === false) {
          if (window.innerWidth < 900) {
            this.scale.startFullscreen();
          }
        }
      });

    this.selectYourTeamButton.setPosition(
      calculatePercentage(2, this.game.canvas.width),
      this.game.canvas.height / 2 - this.selectYourTeamButton.height / 2
    );

    //oponent
    this.selectOponentTeamButton = this.add
      .dom(
        0,
        0,
        "button",
        `cursor : pointer; width : ${
          screenSize().menu.selectOponentTeamButton.width
        }px; height : ${
          screenSize().menu.selectOponentTeamButton.height
        }px; background-color: #5F6163; font-family: IBM Plex Mono, monospace; 
          font-size: ${
            screenSize().menu.selectOponentTeamButton.fontSize
          }px; border:6px solid #313233; color: #B8BABF;`,
        "Select Oponen"
      )
      .setOrigin(0)
      .setInteractive()
      .addListener("click")
      .on("click", () => {
        this.oponentTeamsOptions.visible
          ? this.oponentTeamsOptions.setVisible(false)
          : this.oponentTeamsOptions.setVisible(true);

        if (this.scale.isFullscreen === false) {
          this.scale.startFullscreen();
        }
      });

    this.selectOponentTeamButton.setPosition(
      this.game.canvas.width -
        this.selectOponentTeamButton.displayWidth -
        calculatePercentage(2, this.game.canvas.width),
      this.game.canvas.height / 2 - this.selectOponentTeamButton.height / 2
    );

    this.yourTeamsOptions = new TeamOptionsModal(this, 0, 0, true);
    this.yourTeamsOptions.setPosition(0, this.game.canvas.height / 2);

    this.oponentTeamsOptions = new TeamOptionsModal(
      this,
      0,
      0,
      false
    ).setOrigin(1.02, 0.5);
    this.oponentTeamsOptions.setPosition(
      this.game.canvas.width,
      this.game.canvas.height / 2
    );

    window.onresize = () => {
      setTimeout(() => {
        if (this.scale.isFullscreen === false) {
          this.scene.restart();
        }
      }, 2000);
    };
  }
}
