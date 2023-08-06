export class Footballer extends Phaser.GameObjects.Container {
  footballerBody!: Phaser.Physics.Arcade.Image;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public scale: number,
    public footballerData: FootbalerData
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.footballerBody = this.scene.physics.add
      .image(0, 0, this.footballerData.key)
      .setCircle(20, 4, 4)
      .setScale(this.scale);

    this.add(this.footballerBody);
  }
}
