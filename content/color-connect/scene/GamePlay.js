//import * as test from './js/SquareText.js'
const Random = Phaser.Math.Between

import { GAMEOPTIONS } from '../scene/GameOption.js'
import Block from '../scene/prefabs/block.js'
import Tween from './prefabs/tween.js'
import SoundController from './prefabs/SoundController.js'


let txtHightScore,txtDiamond
let txtScore
let score = 0
let hightScore = 0

// let GAMEOPTIONS.CHECK_SOUND=true
let value_select=0
let touching = false



// Get10
let lstNumber=[1,2,3]
let lstColor=['0xFF3131','0xCB6CE6','0x00BF63','0x5E17EB','0x0097B2','0x7ED957','0xFF914D','0x5CE1E6']
let lstTitle=[]
let lstObject=[]
let lstBlockSelect=[]
let lstLine=[]
let tutorial
let tw
let soundController

export default class GamePlay extends Phaser.Scene {
    constructor() {
        super({ key: 'game_play' })
    }

    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0)
        tw = new Tween()
        soundController = new SoundController()
        
        CreateGrid(this)
        UIScore(this)
        UISound(this)
        UIInfo(this)
        TopUI(this)

        let show_tutorial = localStorage.getItem('tutorial')
        if(show_tutorial==null){
            ShowTutorial(this)
        }

        // const config = {
        //     key: 'explodeAnimation',
        //     frames: this.anims.generateFrameNumbers('water', { frames: [ 0, 1, 2, 3 ,4,5] }),
        //     frameRate: 30,
        //     // repeat:-1
        // };

        // this.anims.create(config);

    }
   
}

function CreateGrid(scene) {
    let START_X= 357
    let START_Y =78
    let bg = scene.add.rectangle(360,640,2000,2000,GAMEOPTIONS.BG_COLOR)
    // let grid = scene.add.image(360, 640, "grid").setScale(0.9)
    let block
    let offset =2.5
    lstObject=[]
    // lstNumber=[1,2,3]
    score=0

    for (var i = 0; i < GAMEOPTIONS.ROW; i++) {
        lstObject[i]=[]
        lstTitle[i]=[]
        for (var j = 0; j < GAMEOPTIONS.COLUM; j++) {
            block = scene.add.image(START_Y,START_X, "block").setScale(GAMEOPTIONS.TITLE_SCALE_DEFAULT)
            block.alpha = 0.8;
            block.tint = '0x6e85d8'
            block.visible = 1;
            block.depth=-1
            lstTitle[i][j]=block
            CreateBlock(scene,block.x,block.y,lstObject,i,j)  
            START_Y+=block.width*block.scale+offset
        }
        START_X+=block.width*block.scale+offset
        START_Y=78
    }
}

function CreateBlock(scene,x,y,lstObject,i,j){
    let random = Random(1,lstNumber.length)
    let circle_boder = scene.add.image(0,0,'circle_boder').setScale(GAMEOPTIONS.CIRCLE_BODER_SCALE_DEFAULT)
        circle_boder.tint='0x004AAD'
        circle_boder.visible=false
    let block_number1 = scene.add.image(0,0,'circle').setScale(GAMEOPTIONS.BLOCK_SCALE_DEFAULT)
        block_number1.tint=lstColor[random-1]
    let block_number = scene.add.container(x,y,[block_number1,circle_boder])
    block_number.setSize(block_number1.width*GAMEOPTIONS.BLOCK_SCALE_DEFAULT,block_number1.height*GAMEOPTIONS.BLOCK_SCALE_DEFAULT)
    block_number.i=i
    block_number.j=j
    block_number.check=false
    block_number.value=random
    block_number.can_merge=false
    block_number.selected=false
    lstObject[i][j]=block_number
    block_number.setInteractive()
    block_number.on('pointerdown', function () {
            touching=true
            lstLine=[]
            lstBlockSelect=[]
            value_select=block_number.value
            block_number.selected=true
            let circle_boder= block_number.list[1]
            AnimBlockSelect(scene,circle_boder,this)
            lstBlockSelect.push(this)
            ShowBlockCanMerge(scene,this)
        });
    block_number.on('pointerover', function () {
        TouchingBlock(scene,this)
    });
    scene.input.on('pointerup', function () {
        BlockTouchUp(scene,this)
    });

    scene.tweens.add({
        targets:block_number,
        props: {
            alpha:  { value:1,duration: 1000, ease: 'linear'}
        },
    })

    return block_number
}


function TouchingBlock(scene,block){

    if (block.value==value_select && block.can_merge==true)
        {
            if(lstBlockSelect.indexOf(block)==-1)
                {
                    let first_block= lstBlockSelect[lstBlockSelect.length-1]
                    block.scale=1
                    block.selected=true
                    let circle_boder= block.list[1]
                    AnimBlockSelect(scene,circle_boder,block)
                    AddLine(scene,first_block,block,block.list[0].tint)
                    lstBlockSelect.push(block)
                    ShowBlockCanMerge(scene,block)
                }
                else{
                    lstLine[lstLine.length-1].destroy()
                    lstLine.splice(lstLine.length-1,1)
                    lstBlockSelect[lstBlockSelect.length-1].list[1].visible=false
                    lstBlockSelect.splice(lstBlockSelect.length-1,1)
                    ShowBlockCanMerge(scene,block)
                }
        }
        
}

function AnimBlockSelect(scene,circle_boder,block)
{
    circle_boder.visible=true
    circle_boder.tint=block.list[0].tint
    circle_boder.scale=0.3

    scene.tweens.add({
        targets:circle_boder,
        props: {
            scale:  { value: circle_boder.scale+0.1, duration: 500, ease: 'Bounce' },
            alpha:  { value:0.2,duration: 500, ease: 'Bounce'}
        },
        repeat:-1
    })

}

function BlockTouchUp(scene,block)
{
    if (touching==true) {
        ClearBlockSelected(scene)
        ResetLstBlock(scene)
        touching=false
    }
   
    // setTimeout(function(){UpdatePosition(scene)},100)
}

function ShowBlockCanMerge(scene,block){
        for (let i = 0; i < GAMEOPTIONS.ROW; i++) {
            for (let j = 0; j < GAMEOPTIONS.ROW; j++) {

                let e = lstObject[i][j]
                if (e!=undefined){
                    e.can_merge=false
                }
            }
        }

        let i = block.i
        let j = block.j
        let value = block.value

        let top = topObj(i,j)
        if (top!=undefined && top.value==value && top.can_merge==false )
        {
            AnimationBlockCanMerge(top)
        }

        let bottom = bottomObj(i,j)
        if(bottom!=undefined && bottom.value==value && bottom.can_merge==false)
            {
                AnimationBlockCanMerge(bottom)
            }
        
        let left = leftObj(i,j)
        if(left!=undefined && left.value==value && left.can_merge==false)
            {
                AnimationBlockCanMerge(left)
            }

        let right = rightObj(i,j)
        if(right!=undefined && right.value==value && right.can_merge==false)
            {
                
                AnimationBlockCanMerge(right)
            }
        
        let left_top = left_top_Obj(i,j)
        if(left_top!=undefined && left_top.value==value && left_top.can_merge==false)
            {

                AnimationBlockCanMerge(left_top)
            }

        let right_top = right_top_Obj(i,j)
        if(right_top!=undefined && right_top.value==value && right_top.can_merge==false)
            {
                AnimationBlockCanMerge(right_top)
            }

        let left_bottom = left_bottom_Obj(i,j)
        if(left_bottom!=undefined && left_bottom.value==value && left_bottom.can_merge==false)
            {
                AnimationBlockCanMerge(left_bottom)
            }   
        let right_bottom = right_bottom_Obj(i,j)
        if(right_bottom!=undefined && right_bottom.value==value && right_bottom.can_merge==false)
            {
                AnimationBlockCanMerge(right_bottom)
            }
}

function AnimationBlockCanMerge(block)
{
    let scale= 1
    block.setScale(scale)
    block.can_merge=true
}
const timer = ms => new Promise(res => setTimeout(res, ms))

async function ClearBlockSelected(scene){
    if(lstBlockSelect.length>1)
        {
            SaveHSCore(scene,lstBlockSelect.length*5)
            for (let index = 0; index < lstBlockSelect.length; index++) {
                const e = lstBlockSelect[index];
                let tint = e.list[0].tint
                createParticel(scene,e,tint)
                AddTextAnim(scene,e,5,tint)
                e.destroy()
                lstObject[e.i][e.j]=undefined
                // SoundPlay(scene,'merge')
                soundController.SoundPlay(scene,'merge')

                await timer(100);                
            }
            UpdatePosition(scene)
        }
    else{
        ResetLstBlock(screen)
    }
    lstBlockSelect=[]
}
function ResetLstBlock(scene){
    // if (scene.tweens!=undefined) scene.tweens.killAll()
    for (let i = 0; i < GAMEOPTIONS.ROW; i++) {
        for (let j = 0; j < GAMEOPTIONS.ROW; j++) {

            let e = lstObject[i][j]
            if (e!=undefined){
                e.scale=1
                e.can_merge=false
                e.selected=false
                e.list[1].visible=false
                e.list[1].scale=0.3
            }
        }
    }

    lstLine.forEach(element => {
        element.destroy()
    });
}

function AddLine(scene,firts_block,secone_block,tint)
{
    // let line = scene.add.rectangle(x,y,10,100,'0x00000')
    const graphics = scene.add.graphics();

    graphics.lineStyle(10, tint, 1);

    graphics.beginPath();

    graphics.moveTo(firts_block.x, firts_block.y);
    graphics.lineTo(secone_block.x, secone_block.y);
    graphics.closePath();
    graphics.strokePath();
    lstLine.push(graphics)
}



function AddNewBlock(scene)
{
    for(let i =0 ; i <GAMEOPTIONS.ROW; i++)
        {   
            for (let j=0 ; j < GAMEOPTIONS.COLUM; j++)
            {
                if (i<GAMEOPTIONS.ROW-1){
                    if (lstObject[i][j]== undefined)
                    {
                       let block = CreateBlock(scene,lstTitle[i][j].x,100,lstObject,i,j)
                        scene.tweens.add({
                        targets: block,
                        props: {
                                x: { value: lstTitle[i][j].x, duration: 50, ease: 'Linear' },
                                y: { value: lstTitle[i][j].y, duration: 50, ease: 'Linear' }
                            },
                        })
                    }
                }
            } 
        }
}

function UpdatePosition(scene)
{
    for (let index = 0; index < GAMEOPTIONS.ROW; index++) {
        MoveBlock(scene)        
    }


    //Update New Block
    setTimeout(function(){
        for (let index = 0; index < GAMEOPTIONS.ROW; index++) {
                AddNewBlock(scene)
            }
    },100)

    //Check Game Over
    // setTimeout(function(){
    //     if (CheckGameOver(scene))
    //         {
    //             scene.scene.start('game_over')
    //             console.log('Game Over')
    //         }
    // },100)
    

    
}

function MoveBlock(scene)
{
        for(let i =0 ; i <GAMEOPTIONS.ROW; i++)
        {   
            for (let j=0 ; j < GAMEOPTIONS.COLUM; j++)
            {
                if (i<GAMEOPTIONS.ROW-1){
                    if (lstObject[i+1][j]==undefined && lstObject[i][j]!= undefined)
                    {
                        lstObject[i][j].setPosition(lstTitle[i+1][j].x,lstTitle[i+1][j].y)
                        lstObject[i+1][j]=lstObject[i][j]
                        lstObject[i+1][j].i=i+1
                        lstObject[i+1][j].j=j
                        lstObject[i][j].alpha=1
                        lstObject[i][j]=undefined
                    }
                }
            } 
        }  
}

function AddTextAnim(scene,block,value,tint){

    let text = scene.add.text(block.x, block.y, '+'+value, { font: "25px Arial Black", fill: '#fff' });
        text.setStroke('#00f', 10);
        scene.tweens.add({
            targets:text,
            props: {
                y:  { value: text.y-50, duration: 500, ease: 'Bounce' },
            },
            onComplete:function(){
                text.destroy()
            }
        
        })

}

function AddExplodeAnim(scene,block,tint)
{
    let water = scene.add.sprite(block.x, block.y, 'water');
        water.scale=0.8
        water.tint=tint
        water.play('explodeAnimation')
        scene.tweens.add({
            targets:water,
            props: {
                alpha:  { value:0,duration: 500, ease: 'Bounce'}
            },
            onComplete:function(){water.destroy()}
        })
}

    
function CheckGameOver(scene)
{
    for (let x = 0; x < GAMEOPTIONS.COLUM; x ++)
    {
        for (let y =0 ; y <GAMEOPTIONS.ROW; y++)
        {
            let block = lstObject[x][y]
            let value = block.value
            let i = block.data.get('i')
            let j = block.data.get('j')

            //check top
            if (i > 0) {
            
                let top = topObj(i,j)
                if (top!=undefined && top.value==value && top.data.get('check')==false)
                {
                    return false
                }
            }

            //check bottom
            if (i < GAMEOPTIONS.ROW-1) {
                let bottom = bottomObj(i,j)
                if (bottom!=undefined && bottom.value==value && bottom.data.get('check')==false)
                {
                    return false
                }
            }

            // check left
            if (j > 0) {

                let left = leftObj(i,j)
                if (left != null) {
                    if (left.value==value && left.data.get('check')==false) {
                        return false
                    }
                }
            }

            //check right
            if (j < GAMEOPTIONS.COLUM - 1) {
                let right = rightObj(i,j)
                if (right != null) {
                    if (right.value==value && right.data.get('check')==false) {
                        return false
                    }
                }
            }
        }
    }
    return true
}


function SaveHSCore(scene, v)
{
    let newScore = score+v
    let current_score=score
    let updateTween = scene.tweens.addCounter({
        from: current_score,
        to: newScore,
        duration: 500,
        ease: 'linear',
        onUpdate: tween =>
        {
            const value = Math.round(tween.getValue());
            txtScore.text=value
        },
        onComplete:function(){score=parseInt(txtScore.text)}
    });

    let a = lstNumber.length*500-1500
   
    if (newScore>a+500)
        {
            let b = lstNumber[lstNumber.length-1]+1
            if(b<9){
                lstNumber.push(b)
            } 
        }



}

function topObj(i, j) {
    if (i <= 0) return null
    return lstObject[i - 1][j]
}

function bottomObj(i, j) {
    if (i >= GAMEOPTIONS.ROW-1) return null
    return lstObject[i + 1][j]
}

function leftObj(i, j) {
    if (j <= 0) return null
    return lstObject[i][j - 1]
}

function rightObj(i, j) {
    if (j >= GAMEOPTIONS.COLUM) return null
    return lstObject[i][j + 1]
}

function left_top_Obj(i, j) {
    // console.log(i)
    if (i<=0 || j <= 0) return null
    return lstObject[i-1][j - 1]
}

function left_bottom_Obj(i, j) {
    if (j<=0 || i >= GAMEOPTIONS.ROW-1) return null
    return lstObject[i+1][j - 1]
}

function right_top_Obj(i, j) {
    if (i<=0 || j >= GAMEOPTIONS.COLUM) return null
    return lstObject[i-1][j + 1]
}

function right_bottom_Obj(i, j) {
    if (j >= GAMEOPTIONS.COLUM || i >= GAMEOPTIONS.ROW-1) return null
    return lstObject[i+1][j + 1]
}



//UI

function TopUI(scene){
    
    let btnHomeBoder = new Block(scene,0,0,'boder').setScale(0.3)
    let btnHomeIcon = new Block(scene,0,0,'btnHome')
        btnHomeIcon.setScale(0.3)
    let btnHome = scene.add.container(50,50,[btnHomeBoder,btnHomeIcon])
        btnHome.setSize(100,100)
        btnHome.setInteractive()
        btnHome.on('pointerdown', function (pointer) {
            soundController.SoundPlay(scene,'click')
            scene.tweens.add({
                targets: btnHome,
                scale: { from : btnHome.scale-0.15, to : btnHome.scale},
                ease: 'Bounce',
                duration: 500,
                onComplete: function(){
                scene.cameras.main.fadeOut(500, 0, 0, 0)                    
                },
            })
        })
        scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            scene.scene.start('game_menu')
        })
}

function UIScore(scene) {
    hightScore = localStorage.getItem('hscore')
    // txtScore = new CustomText(scene, 360, 160, 'popin', "0", 102,'0x000000')
    txtScore= scene.add.text(360, 160, 0, { font: "75px Arial Black", fill: '#fff',align:'center' }).setOrigin(0.5, 0.5);
    txtScore.setStroke('#000', 10);
}

function UISound(scene)
{
    let btnSoundBoder = new Block(scene,650,50,'boder').setScale(0.3).setInteractive()
    let btnSound = new Block(scene,btnSoundBoder.x,btnSoundBoder.y,'btnSoundOn')
        btnSound.setScale(0.3)
        btnSoundBoder.on('pointerdown', function (pointer) {

            scene.tweens.add({
                targets: btnSound,
                scale: { from : btnSound.scale-0.15, to : btnSound.scale},
                ease: 'Bounce',
                duration: 500,
                onComplete: function(){
                    if (GAMEOPTIONS.CHECK_SOUND){
                        scene.sound.stopAll();
                        GAMEOPTIONS.CHECK_SOUND=false
                        btnSound.setTexture('btnSoundOff')
                    }
                    else{
                        GAMEOPTIONS.CHECK_SOUND=true
                        // SoundPlay(scene,'bg_music')
                        soundController.SoundPlay(scene,'bg_music')
                        btnSound.setTexture('btnSoundOn')
                    }
                },
            })
        })
}

function UIInfo(scene)
{
    let btnInfoBoder = new Block(scene,580,50,'boder').setScale(0.3).setInteractive()
    let btnInfo = new Block(scene,btnInfoBoder.x,btnInfoBoder.y,'btnInfo')
        btnInfo.setScale(0.3)
        btnInfoBoder.on('pointerdown', function (pointer) {
            soundController.SoundPlay(scene,'click')
            scene.tweens.add({
                targets: btnInfo,
                scale: { from : btnInfo.scale-0.15, to : btnInfo.scale},
                ease: 'Bounce',
                duration: 500,
                onComplete: function(){
                    ShowTutorial(scene)
                    
                },
            })
        })
}

function ShowTutorial(scene)
{   
    if (tutorial==undefined)
        {
            let bg = scene.add.rectangle(360,640,2000,2000,'0x000000')
                bg.alpha=0.9
            let tutorial_bg = scene.add.image(360,640,'tutorial').setInteractive()
            let tutorial = scene.add.container(0,0,[bg,tutorial_bg])
               
            tutorial_bg.on('pointerdown', function (pointer) {
                // bg.setPosition(-1000,-1000)
                tutorial.setPosition(-2000,-2000)

                // scene.scene.remove(tutorial,bg)
                localStorage.setItem('tutorial','show')
            })
        }
        else{
            tutorial.setPosition(0,0)
        }
}

function createParticel(scene,e,tint) {
    scene.add.particles(0,0,'circle',{
        x: e.x,
        y: e.y,
        speed: { min: -600, max: 600 },
        // alpha: { min: 0, max: 0.5 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.1, end: 0 },
        // blendMode: 'SCREEN',
        color:[tint],
        //active: false,
        frequency: 5,
        lifespan: 600,
        gravityY: 800,
        quantity: 3,
        // tint: tint,
        maxParticles : 15
    });
}








