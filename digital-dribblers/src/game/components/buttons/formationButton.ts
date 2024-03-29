import { screenSize } from "../../config/layoutConfig";

export class FormationButton extends Phaser.GameObjects.Container {
  backgroundImage!: Phaser.GameObjects.Image;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public innerText: string
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addBacgrkoundImage();
    this.addText();

    this.makeInteractive();
  }

  addBacgrkoundImage() {
    this.backgroundImage = this.scene.add
      .image(0, 0, "formation-button")
      .setTint(0x06070d)
      .setDisplaySize(
        screenSize().menu.formationButton.width,
        screenSize().menu.formationButton.height
      );

    this.add(this.backgroundImage);
  }

  addText() {
    const text = this.scene.add
      .text(0, 0, this.innerText, {
        align: "center",
        fontSize: 22,
        color: "#D3D5DB",
        fontFamily: "Rubik Mono One",
      })
      .setOrigin(0.5);

    this.add(text);
  }

  makeInteractive() {
    this.setInteractive(
      new Phaser.Geom.Rectangle(
        -this.getBounds().width / 2,
        -this.getBounds().height / 2,
        this.getBounds().width,
        this.getBounds().height
      ),
      Phaser.Geom.Rectangle.Contains
    );
    this.on(Phaser.Input.Events.POINTER_OVER, () => {
      this.backgroundImage.setTint(0x737478);
    });
    this.on(Phaser.Input.Events.POINTER_OUT, () => {
      this.backgroundImage.setTint(0x06070d);
    });
    this.input!.cursor = "pointer";
  }
}
