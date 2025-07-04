export default class BlockNumber extends Phaser.GameObjects.Container {
    constructor(scene, x, y,children) {
        super(scene, x, y,children);
        // let block = scene.add.image(0,0,'block').setScale(0.5)
        //     block.tint='0xff6680'
        // // ...
        //  let text= scene.add.text(block.x,block.y,'2', {
        //     font: 'bold 65px Arial',
        //     fill: 'white',
        // },).setOrigin(0.5)
        // this.setSize(block.width,block.height)
        //children[0].tint='0xff6680'
        // this.x=x,
        // this.y=y
        scene.add.existing(this);
    }
}