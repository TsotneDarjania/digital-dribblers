import { calculatePercentage } from "../../helper/tatukaMath";
import { MenuButton } from "../components/buttons/menuButton";
import { TacticsOption } from "../components/modals/tacticsOption";
import { TeamOptionsModal } from "../components/modals/teamOptions";

export class Menu extends Phaser.Scene {
  selectYourTeamButton!: Phaser.GameObjects.DOMElement;
  selectOponentTeamButton!: Phaser.GameObjects.DOMElement;

  yourTeamsOptions!: TeamOptionsModal;
  oponentTeamsOptions!: TeamOptionsModal;

  yourTeamText!: Phaser.GameObjects.DOMElement;
  oponentTeamText!: Phaser.GameObjects.DOMElement;

  tacticsButton!: MenuButton;

  TacticsOptionModal!: TacticsOption;

  constructor() {
    super("Menu");
  }

  create() {
    this.tacticsButton = new MenuButton(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height -
        calculatePercentage(10, this.game.canvas.height),
      "Tactics"
    ).setVisible(false);

    this.TacticsOptionModal = new TacticsOption(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2
    );

    // new MenuButton(
    //   this,
    //   this.game.canvas.width / 2,
    //   calculatePercentage(70, this.game.canvas.height),
    //   "Start Match"
    // )
    //   .on(Phaser.Input.Events.POINTER_DOWN, () => {
    //     this.scene.start("GamePlay");
    //   })
    //   .backgroundImage.setScale(2);
    // this.selectTeamsButton = new MenuButton(
    //   this,
    //   this.game.canvas.width / 2,
    //   this.game.canvas.height / 2,
    //   "Select Teams"
    // ).on(Phaser.Input.Events.POINTER_DOWN, () => {
    //   this.scene.start("GamePlay");
    // });

    //Your Team Text
    this.yourTeamText = this.add
      .dom(
        0,
        0,
        "p",
        "font-family: 'IBM Plex Mono', monospace; font-size : 40px; color : #EBCD73; text-align: left; width : 1000px;",
        ""
      )
      .setOrigin(0);

    //Oponent Team Text
    this.oponentTeamText = this.add
      .dom(
        this.game.canvas.width,
        0,
        "p",
        "font-family: 'IBM Plex Mono', monospace; font-size : 40px; color : #EBCD73; text-align: right;",
        ""
      )
      .setOrigin(1, 0);

    //VS text
    this.add
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
        " cursor : pointer; width : 270px; height : 90px; background-color: #E7FFE3; font-family: 'IBM Plex Mono', monospace;" +
          "font-size: 26px; border: 6px solid #A6B8A3; color: #2E332D",
        "Select Your Team"
      )
      .setOrigin(0)
      .setInteractive()
      .addListener("click")
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.yourTeamsOptions.visible
          ? this.yourTeamsOptions.setVisible(false)
          : this.yourTeamsOptions.setVisible(true);
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
        " cursor : pointer; width : 270px; height : 90px; background-color: #E7FFE3; font-family: 'IBM Plex Mono', monospace;" +
          "font-size: 26px; border: 6px solid #A6B8A3; color: #2E332D",
        "Select Oponent"
      )
      .setOrigin(0)
      .setInteractive()
      .addListener("click")
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.oponentTeamsOptions.visible
          ? this.oponentTeamsOptions.setVisible(false)
          : this.oponentTeamsOptions.setVisible(true);
      });

    this.selectOponentTeamButton.setPosition(
      this.game.canvas.width -
        this.selectOponentTeamButton.displayWidth -
        calculatePercentage(2, this.game.canvas.width),
      this.game.canvas.height / 2 - this.selectOponentTeamButton.height / 2
    );

    this.yourTeamsOptions = new TeamOptionsModal(this, 0, 0, true);
    this.yourTeamsOptions.setPosition(
      this.game.canvas.width / 2 - this.yourTeamsOptions.displayWidth,
      this.game.canvas.height / 2
    );

    this.oponentTeamsOptions = new TeamOptionsModal(this, 0, 0, false);
    this.oponentTeamsOptions.setPosition(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2
    );
  }
}
