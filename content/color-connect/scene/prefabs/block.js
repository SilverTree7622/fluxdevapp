export default class Block extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.x=x,
        this.y=y,
        this.texture=texture,
        this.scale = 0.43,
        this.tint='0xffffff'
        scene.add.existing(this);
    }
}