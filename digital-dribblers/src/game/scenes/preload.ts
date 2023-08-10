//@ts-ignore
import WebFontFile from "../helper/webfontloader";

export class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.setPath(`../../assets/game/`);

    this.load.image("default", "white.png");

    //flags
    this.load.image("georgia-flag", "images/flags/georgia.png");
    this.load.image("france-flag", "images/flags/france.png");
    this.load.image("aston-flag", "images/flags/aston.png");
    this.load.image("arsenal-flag", "images/flags/arsenal.png");

    //gameObjects
    this.load.image("ball", "images/gameObjects/ball.png");

    this.load.image("button", "images/button.png");
    this.load.image("formation-button", "images/formationButton.png");

    this.load.addFile(new WebFontFile(this.load, "Rubik Mono One"));

    //sound Effects
    this.load.audio("referee-effect", ["sounds/effects/referee.mp3"]);
    this.load.audio("pass-effect", ["sounds/effects/pass.mp3"]);
    this.load.audio("setBall-effect", ["sounds/effects/setBall.mp3"]);
    this.load.audio("border-effect", ["sounds/effects/border.mp3"]);
    this.load.audio("shoot-effect", ["sounds/effects/shoot.mp3"]);
  }

  create() {
    this.scene.start("Menu");
  }
}
