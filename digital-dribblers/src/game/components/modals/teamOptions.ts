import { calculatePercentage } from "../../../helper/tatukaMath";
import { TeamsData } from "../../data/teamsData";
import { Menu } from "../../scenes/menu";

export class TeamOptionsModal extends Phaser.GameObjects.DOMElement {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public isYourTeam: boolean
  ) {
    super(
      scene,
      x,
      y,
      "div",
      "width : 20vw; height : 80vh;  overflow-y: scroll;border: 9px solid #565759"
    );
    // background-color : #7EAADE; border: 5px solid #445C78;
    scene.add.existing(this);
    this.setVisible(false);

    this.init();
  }

  init() {
    this.setOrigin(0, 0.5);
    this.setInteractive();
    this.addItems();
  }

  addItems() {
    TeamsData.forEach((teamData) => {
      const teamName = teamData.name.replace("-", " ");
      this.addNewItem(teamData.name, teamName);
    });
  }

  addNewItem(logoImageSource: string, nameText: string) {
    const item = this.scene.add
      .dom(
        0,
        0,
        "div",
        "width : 100%; height : 80px; background-color: #0C2042; cursor : pointer;"
      )
      .setInteractive()
      .addListener("click");
    item
      .on("click", () => {
        const menuScene = this.scene as Menu;
        this.setVisible(false);
        this.isYourTeam
          ? menuScene.yourTeamText.setText(nameText)
          : menuScene.oponentTeamText.setText(nameText);

        if (
          menuScene.yourTeamText.node.innerHTML.length > 3 &&
          menuScene.oponentTeamText.node.innerHTML.length > 3
        ) {
          menuScene.tacticsButton.setVisible(true);
        }
      })
      .setOrigin(0);

    item.node.setAttribute(
      "onMouseOver",
      " this.style.backgroundColor = '#6E7073'"
    );
    item.node.setAttribute(
      "onMouseOut",
      " this.style.backgroundColor = '#565759'"
    );
    item.node.setAttribute(
      "style",
      " width : 100%; height : 80px; background-color: #565759; cursor : pointer;  "
    );

    const logo = this.scene.add.dom(
      calculatePercentage(9, this.displayWidth),
      calculatePercentage(50, item.displayHeight),
      "img",
      "width:45px; height:45px"
    );
    const logoElement = logo.node as HTMLImageElement;
    logoElement.src = `assets/game/images/logos/${logoImageSource}.png`;
    item.node.appendChild(logo.node);

    const name = this.scene.add
      .dom(
        calculatePercentage(16, this.displayWidth),
        calculatePercentage(50, item.displayHeight),
        "p",
        " text-elign: left; color : white; font-family: 'IBM Plex Mono', monospace; font-size : 20px;",
        nameText
      )
      .setOrigin(0, 0.5);
    item.node.appendChild(name.node);

    this.node.appendChild(item.node);
  }
}
