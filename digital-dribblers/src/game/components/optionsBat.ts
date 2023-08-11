import { screenSize } from "../config/layoutConfig";

export class OptionsBar extends Phaser.GameObjects.Container {
  indicator!: Phaser.GameObjects.Image;

  indicatorTextObject!: Phaser.GameObjects.Text;
  indicatorValue = 50;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public width: number,
    public opttionName: string
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addBackground();
    this.addIndicator();
    this.addTexts();
  }

  addTexts() {
    this.indicatorTextObject = this.scene.add
      .text(
        this.width / 2 + screenSize().menu.optionsBar.indicatorTextobject.x,
        screenSize().menu.optionsBar.indicatorTextobject.y,
        this.indicatorValue.toString(),
        {
          align: "ceter",
          color: "#A00CF0",
          fontSize: screenSize().menu.optionsBar.indicatorTextobject.fontSize,
          fontFamily: "Rubik Mono One",
        }
      )
      .setOrigin(0.5);

    this.add(this.indicatorTextObject);

    const optionText = this.scene.add
      .text(0, -screenSize().menu.optionsBar.oprionText.y, this.opttionName, {
        align: "left",
        color: "#A00CF0",
        fontSize: screenSize().menu.optionsBar.oprionText.fontSize,
        fontFamily: "Rubik Mono One",
      })
      .setOrigin(0);

    this.add(optionText);
  }

  addBackground() {
    const background = this.scene.add
      .image(0, 0, "default")
      .setDisplaySize(
        this.width,
        screenSize().menu.optionsBar.background.height
      )
      .setOrigin(0, 0.5)
      .setTint(0x292929);
    this.add(background);
  }

  addIndicator() {
    this.indicator = this.scene.add
      .image(0, 0, "default")
      .setDisplaySize(
        screenSize().menu.optionsBar.indicator.width,
        screenSize().menu.optionsBar.indicator.width
      )
      .setTint(0xa00cf0)
      .setOrigin(0.5)
      .setInteractive({ draggable: true });

    this.scene.input.on(
      "drag",
      (pointer: any, gameObject: any, dragX: any, dragY: any) => {
        // Calculate the boundaries for the indicator's motion

        if (gameObject !== this.indicator) return;
        const minX = 0;
        const maxX = this.width;

        // Limit the indicator's position within the calculated boundaries
        const clampedX = Phaser.Math.Clamp(dragX, minX, maxX);

        // Update the indicator's position
        gameObject.setPosition(clampedX, gameObject.y);

        // Update your logic here based on the new position (e.g., indicatorValue)
        this.indicatorValue = Math.floor(
          ((clampedX - minX) / (maxX - minX)) * 100
        );
        this.indicatorTextObject.setText(this.indicatorValue.toString());
      }
    );

    this.indicator.setPosition(this.width / 2, 0);

    this.add(this.indicator);
  }
}
