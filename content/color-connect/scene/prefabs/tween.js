export default class Tween {
    constructor()
    {


    }

    BtnClickAnim(scene,a,btnType)
        {
            scene.tweens.add({
                targets: a,
                scale: { from : a.scale-0.15, to : a.scale},
                ease: 'Bounce',
                duration: 500,
                onComplete: onComplete.bind(scene,btnType),
            })
        }

    ObjectMove(scene,object,x,y){
        scene.tweens.add({
            targets: object,
            props: {
                x: { value: x, duration: 800, ease: 'Bounce' },
                y: { value: y, duration: 800, ease: 'Bounce' }
            },
            // position: { from : a.scale-0.15, to : a.scale},
            // ease: 'Bounce',
            // duration: 500,
            // onComplete: onComplete.bind(scene,btnType),
        })
    }

}


function onComplete(btnType) {
    switch (btnType) {
        case 'btnSound':

                 break;
        case 'btnHome':
            this.scene.start('game_menu')
            break;

        case 'btnReload':
            this.scene.start('game_play')
            break;

        case 'btnPlay':
                // const fx = this.cameras.main.postFX.addWipe(0.3, 1, 1);
                // this.scene.transition({
                //     target: 'game_play',
                //     duration: 700,
                //     moveBelow: true,
                //     onUpdate: (progress) => {
                //         fx.progress = progress;
                //     }
                //  });
                this.scene.start('game_play')
                break;
        default:
            break;
    }
    
}