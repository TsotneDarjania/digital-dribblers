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

    //logos
    this.load.image("arsenal", "images/logos/arsenal.png");
    this.load.image("aston villa", "images/logos/aston-villa.png");
    this.load.image("bournemouth", "images/logos/bournemouth.png");
    this.load.image("brentford", "images/logos/brentford.png");
    this.load.image("brighton", "images/logos/brighton.png");
    this.load.image("burnley", "images/logos/burnley.png");
    this.load.image("chelsea", "images/logos/chelsea.png");
    this.load.image("crystal palace", "images/logos/crystal-palace.png");
    this.load.image("everton", "images/logos/everton.png");
    this.load.image("fulham", "images/logos/fulham.png");
    this.load.image("liverpool", "images/logos/liverpool.png");
    this.load.image("luton", "images/logos/luton.png");
    this.load.image("manchester city", "images/logos/manchester-city.png");
    this.load.image("manchester united", "images/logos/manchester-united.png");
    this.load.image("new castle", "images/logos/new-castle.png");
    this.load.image("nottingham", "images/logos/nottingham.png");
    this.load.image("sheffield", "images/logos/sheffield.png");
    this.load.image("tottenham", "images/logos/tottenham.png");
    this.load.image("west ham", "images/logos/west-ham.png");
    this.load.image("wolves", "images/logos/wolves.png");

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
