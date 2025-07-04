import { GAMEOPTIONS } from './GameOption.js'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


let level
let groupHolder
let groupBallAll
let holderSelect
let camera
let btnSound
let checkSound =true

export default class GamePlay extends Phaser.Scene {
    constructor() {
        super({ key: 'game_play' })
    }

    create() {
        camera = this.cameras.main;
        UI(this)
        loadLv(this)
    }
}

let tapcount =0
// noLevel = 1

function loadLv(scene) {
    
    let width = 720 + camera.scaleManager.canvasBounds.x
    level = scene.cache.json.get('lv3')
    groupHolder = []
    groupBallAll = []
    let holder_x 
    let holder_y
    let holder_w = 115
    let y
    let ball
    let ball1   
    let row
    let scale
    let new_row = true
    let numberHolder = level.levels[GAMEOPTIONS.level].map.length

    row =Math.ceil(numberHolder/2)
    // console.log(row)
    if(row<4) row = 4 
    numberHolder < 5 ? holder_y = 700 : holder_y = 400
    // scale = width/(row+1)/holder_w
    scale=1.2
    if(row==6) 
    {
        scale = 1
    }
    if(row==7) 
    {
        scale = 0.9
    }
    // console.log(scale)
    // console.log(holder_w*row*scale)
    
    holder_x = (width-(holder_w*row*scale))/2 + ((holder_w*scale)/2) - camera.scaleManager.canvasBounds.x/2
    // console.log(numberHolder)

    for (let i = 0; i < numberHolder; i++) {
        let holder
            if(i<row)
            {
                 holder= scene.add.image(holder_x,holder_y,'tube').setInteractive();
            }
            else 
            {
                if(new_row)
                {
                
                    holder_x = (width-(holder_w*(numberHolder-row)*scale))/2 + ((holder_w*scale)/2) - camera.scaleManager.canvasBounds.x/2
                    new_row=false
                }
                 holder= scene.add.image(holder_x,950,'tube').setInteractive();
                //  console.log(holder.displayWidth)
                 holder_y = groupHolder[i-row].y + groupHolder[i-row].displayHeight + (groupHolder[i-row].displayHeight/2)
                 holder.y=holder_y
                 
            }
        
            holder.setScale(scale)    
            // holder.tint= '0xD9D9D9'
            holder.name=i 
            groupHolder.push(holder)
            holder_x += holder.displayWidth + holder.displayWidth/2
            holder.on('pointerdown', function (pointer) {
                // if(groupBallAll.length>0)
                // {
                    tapcount ++
                    // console.log(tapcount)
                    if(tapcount==1)
                    {
                        if (checkSound)
                        {
                            scene.sound.play('put')
                        }
                        // console.log(tapcount)
                        holderSelect=holder
                        if(ball1==null)
                        {
                            ball1 = groupBallAll[holder.name].pop()
                            y = ball1.y
                        }
                                            
                        // ball1.y= holder.y -(holder.displayHeight/2) - ball1.displayHeight
                        moveBall(scene,ball1,ball1.x,holder.y -(holder.displayHeight/2) - ball1.displayHeight/2-15,1)
                    }
                    if(tapcount==2)
                    {   
                        if(holderSelect!=holder)
                        {
                            // console.log(groupBallAll[holder.name].length)
                            if(groupBallAll[holder.name].length>3) {
                                console.log('a')
                                tapcount=1
                                return
                            }
                            let ball2 = groupBallAll[holder.name].pop()
                            if(ball2!=null)
                            {
                                if(ball1.name!=ball2.name)
                                {
                                    groupBallAll[holderSelect.name].push(ball1)
                                    ball1.y=y
                                    holderSelect=holder
                                    y = ball2.y
                                    ball1 = ball2                           
                                    moveBall(scene,ball1,ball1.x,holder.y -(holder.displayHeight/2) - ball1.displayHeight,1)
                                    tapcount=1
                                }
                                else{
        
                                    //  console.log('b')
                                    
                                    moveBall(scene,ball1,ball2.x,holder.y-(holder.displayHeight/2)- ball1.displayHeight,2,ball2.y - ball2.displayHeight - 3)
                                    groupBallAll[holder.name].push(ball2)
                                    groupBallAll[holder.name].push(ball1)
                                    checkFullholder(scene,holder)
                                    ball1=null
                                    tapcount = 0 
                                    holderSelect=null
                                }
                            }
                            else{
                                
                                let b_y = holder.y + holder.displayHeight/2 - ball1.displayWidth/2 - (15*holder.scale)
                                moveBall(scene,ball1,holder.x,holder.y -(holder.displayHeight/2) - ball1.displayHeight,2,b_y)
                                groupBallAll[holder.name].push(ball1)
                                ball1=null
                                tapcount = 0 
                                holderSelect=null
                                
                            }
                            
                            
                        }
                        else{
                            groupBallAll[holder.name].push(ball1)
                            ball1.y=y
                            ball1=null
                            tapcount = 0 
                            holderSelect=null
                        }
                    }
            })     
    }
    
    for (let index = 0; index < groupHolder.length; index++) {

        let y = 580
        let ball_w = groupHolder[index].displayWidth - (40*groupHolder[index].scale)
        y = groupHolder[index].y + groupHolder[index].displayHeight/2 - ball_w/2 - (15*groupHolder[index].scale)
        let groupBall = []
       
        for (let i = 0; i < level.levels[GAMEOPTIONS.level].map[index].values.length; i++) {
            const element = level.levels[GAMEOPTIONS.level].map[index].values[i];
            let ball_y = groupHolder[index].y - (55*groupHolder[index].scale)
            switch (element) {
                case 0:
                    ball = scene.add.image(groupHolder[index].x,y,'ball'+element)
                    ball.displayWidth = ball_w
                    ball.displayHeight = ball.displayWidth

                    ball.name='ball0'
                    groupBall.push(ball)
                    break;
                case 1:
                    ball = scene.add.image(groupHolder[index].x,y,'ball'+element)
                    ball.displayWidth = ball_w
                    ball.displayHeight = ball.displayWidth
                    ball.name='ball1'
                    groupBall.push(ball)
                    break;
                case 2:
                    ball = scene.add.image(groupHolder[index].x,y,'ball'+element)
                    ball.displayWidth = ball_w
                    ball.displayHeight = ball.displayWidth
                    ball.name='ball2'
                    groupBall.push(ball)
                    break;
                case 3:
                    ball = scene.add.image(groupHolder[index].x,y,'ball'+element)
                    ball.displayWidth = ball_w
                    ball.displayHeight = ball.displayWidth
                    ball.name='ball3'
                    groupBall.push(ball)
                    break;  
                case 4:
                    ball = scene.add.image(groupHolder[index].x,y,'ball'+element)
                    ball.displayWidth = ball_w
                    ball.displayHeight = ball.displayWidth
                    ball.name='ball4'
                    groupBall.push(ball)
                    break;
                case 5:
                    ball = scene.add.image(groupHolder[index].x,y,'ball'+element)
                    ball.displayWidth = ball_w
                    ball.displayHeight = ball.displayWidth
                    ball.name='ball5'
                    groupBall.push(ball)
                    break;
                case 6:
                    ball = scene.add.image(groupHolder[index].x,y,'ball'+element)
                    ball.displayWidth = ball_w
                    ball.displayHeight = ball.displayWidth
                    ball.name='ball6'
                    groupBall.push(ball)
                    break;
                case 7:
                    ball = scene.add.image(groupHolder[index].x,y,'ball'+element)
                    ball.displayWidth = ball_w
                    ball.displayHeight = ball.displayWidth
                    ball.name='ball7'
                    groupBall.push(ball)
                    break;
                 case 8:
                    ball = scene.add.image(groupHolder[index].x,y,'ball'+element)
                    ball.displayWidth = ball_w
                    ball.displayHeight = ball.displayWidth
                    ball.name='ball8'
                    groupBall.push(ball)
                    break;
                case 9:
                    ball = scene.add.image(groupHolder[index].x,y,'ball'+element)
                    ball.displayWidth = ball_w
                    ball.displayHeight = ball.displayWidth
                    ball.name='ball9'
                    groupBall.push(ball)
                    break;
                case 10:
                    ball = scene.add.image(groupHolder[index].x,y,'ball'+element)
                    ball.displayWidth = ball_w
                    ball.displayHeight = ball.displayWidth
                    ball.name='ball10'
                    groupBall.push(ball)
                    break;       
                default:
                    break;
            }
            y-=ball.displayWidth+3
            // console.log(element)
        }  
        groupBallAll.push(groupBall)
        
    }
}

async function checkFullholder(scene,holder) {
    if(groupBallAll[holder.name].length<4) return false
    for (let i = 0; i < groupBallAll[holder.name].length; i++) {
        const e = groupBallAll[holder.name][i];
        if(groupBallAll[holder.name][i].name!=groupBallAll[holder.name][0].name) return false
    }
    holder.removeInteractive()
    if (checkSound)
    {
        scene.sound.play('correct')
    }
    await delay(200)
    for (let i = 0; i < groupBallAll[holder.name].length; i++) {
        const e = groupBallAll[holder.name][i];
        createParticel(scene,e)
    }
    checkComplete(scene)
    return true
}

async function checkComplete(scene) { 
    for (let i = 0; i < groupHolder.length; i++) {
        const h = groupHolder[i];
        for (let j = 0; j < groupBallAll[h.name].length; j++) {
            const element = groupBallAll[h.name][j];
            if(element.name!=groupBallAll[h.name][0].name) return false
            if(groupBallAll[h.name].length>0)
            {
                if(groupBallAll[h.name].length!=4) return false
            } 
        }
    }
    await delay(600)
    GAMEOPTIONS.level++
    let data_game = JSON.parse(localStorage.getItem('data_game'))
    if(GAMEOPTIONS.level>data_game.level) 
    {
        data_game.level = GAMEOPTIONS.level
        localStorage.setItem('data_game',JSON.stringify(data_game))
    }
  
    scene.scene.launch('game_next_lv')
    return true
}

function moveBall(scene,obj,x,y,step,y2) {
    if (checkSound)
    {
        scene.sound.play('drop')
    }
    let py = y
    // console.log(py)
    let t = scene.tweens
    switch (step) {
        case 1:
            t.add({
                targets: obj,
                x: { from: obj.x, to: x },
                y: { from: obj.y, to: py },
                ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 5,
                repeat: 0,            // -1: infinity
            })
            break;
        case 2 :
            // console.log(py)
            py = y2
            t.add({
                targets: obj,
                x: { from: obj.x, to: x },
                y: { from: obj.y, to: py },
                ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 70,

                // onComplete: function () {
                //     py = y2
                //     t.add({
                //         targets: obj,
                //         x: { from: obj.x, to: x },
                //         y: { from: obj.y, to: py },
                //         ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                //         duration: 100,
                //     })
                // },
            })
            // t.updateTo(y,py)
           
            break
        default:
            break;
    }
    
}


function UI(scene) {


    TopUI(scene)
    let txtLevel = scene.add.bitmapText(360, 65, 'rafale', 'LEVEL '+GAMEOPTIONS.level).setOrigin(0.5);
        txtLevel.tint = '0xffffff'
        txtLevel.fontSize = 35
}

function TopUI(scene) {
   
    console.log(camera.scaleManager.canvasBounds.x);
    let bg = scene.add.image(360,640,'bg1').setScale(0.4,0.6)
    let btnCenter = scene.add.image(360,65,'btnCenter').setScale(0.5)
    // let top = scene.add.rectangle(360,40,720,80,'0x152D35',0.9)
    let btnMenu = scene.add.image(70,65,'btnMenu').setScale(0.4).setInteractive()
    btnMenu.on('pointerdown', function (pointer) {
            window['UtilPlatform'].sendMsg2Parent('ShowNavFooterPlay');
            tweenAdd(scene,btnMenu,'btnMenu')
        })
    let btnReload = scene.add.image(btnMenu.x + 80,btnMenu.y,'btnReload').setScale(0.4).setInteractive()
        btnReload.on('pointerdown', function (pointer) {
            tweenAdd(scene,btnReload,'btnReload')
        })

    btnSound = scene.add.image(670,btnReload.y,'btnSoundOn').setScale(0.4).setInteractive()
    btnSound.on('pointerdown', function (pointer) {
            tweenAdd(scene,btnSound,'btnSoundOn')
        })

}

function createParticel(scene,e) {
    // console.log(e.name)
    scene.add.particles(0,0,e.name,{
        x: e.x,
        y: e.y,
        speed: { min: -600, max: 600 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.1, end: 0 },
        blendMode: 'SCREEN',
        //active: false,
        frequency: 5,
        lifespan: 600,
        gravityY: 800,
        quantity: 3,
        // tint: e.tint,
        maxParticles : 15
    });
}

function onComplete(btnType) {
    switch (btnType) {
        case 'btnReload':
            if(GAMEOPTIONS.ads)
            {
                // console.log('show ads')
            }
            this.scene.restart('game_play')
            break
            
        case 'btnVideo':
            break;

        case 'btnMenu':
            this.scene.launch('game_menu')
            break;

        case 'btnSoundOn':
            if (checkSound)
            {
                btnSound.setTexture('btnSoundOff')
                checkSound=false
            }
            else {
                btnSound.setTexture('btnSoundOn')
                checkSound =true
            }
            break; 
        default:
            break;
    }
    
}

function tweenAdd(scene,a,btnType)
{
    scene.tweens.add({
        targets: a,
        scale: { from : a.scale-0.15, to : a.scale},
        ease: 'Bounce',
        duration: 500,
        onComplete: onComplete.bind(scene,btnType),
    })
}







