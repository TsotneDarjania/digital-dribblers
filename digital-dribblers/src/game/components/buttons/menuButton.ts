import { screenSize } from "../../config/layoutConfig";

export class MenuButton extends Phaser.GameObjects.Container {
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
      .image(0, 0, "button")
      .setDisplaySize(
        screenSize().menu.menuButton.width,
        screenSize().menu.menuButton.height
      )
      .setTint(0x170933);

    this.add(this.backgroundImage);
  }

  addText() {
    const text = this.scene.add
      .text(0, 0, this.innerText, {
        align: "center",
        fontSize: screenSize().menu.menuButton.fontSize,
        color: "#65D7FF",
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
      this.backgroundImage.setTint(0x682ae8);
    });
    this.on(Phaser.Input.Events.POINTER_OUT, () => {
      this.backgroundImage.setTint(0x170933);
    });
    this.input!.cursor = "pointer";
  }
}
