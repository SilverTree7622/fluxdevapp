//import * as test from './js/SquareText.js'
const Random = Phaser.Math.Between

import { GAMEOPTIONS } from '../scene/GameOption.js'
import BlockNumber from '../scene/prefabs/blocknumber.js'
import Block from '../scene/prefabs/block.js'
import CustomText from '../scene/prefabs/customtext.js'
import Tween from './prefabs/tween.js'


let txtHightScore,txtDiamond
let txtScore
let score = 0
let number_diamond=0
let hightScore = 0
let tw,popup

let check_sound=true
let value_select=0
let time_delay
let only_block_select



// Get10
let lstNumber=[1,2,3]
let lstTitle=[]
let lstObject=[]
let lstBlockSelect=[]
let touch=0
let tutorial

export default class GamePlay extends Phaser.Scene {
    constructor() {
        super({ key: 'game_play' })
    }

    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0)
        tw = new Tween()
        CreateGrid(this)
        UIScore(this)
        UISound(this)
        UIInfo(this)
        TopUI(this)

        let show_tutorial = localStorage.getItem('tutorial')
        if(show_tutorial==null){
            ShowTutorial(this)
        }
    }
   
}

function CreateGrid(scene) {
    let START_X= 357
    let START_Y =78
    let bg = scene.add.rectangle(360,640,2000,2000,'0x2f0045')
    let grid = scene.add.image(360, 640, "grid").setScale(0.9)
    let block
    let offset =2.5
    lstObject=[]
    lstNumber=[1,2,3]
    score=0

    for (var i = 0; i < GAMEOPTIONS.ROW; i++) {
        lstObject[i]=[]
        lstTitle[i]=[]
        for (var j = 0; j < GAMEOPTIONS.COLUM; j++) {
            block = scene.add.image(START_Y,START_X, "block").setScale(GAMEOPTIONS.BLOCK_SCALE_DEFAULT)
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
    let block_number = scene.add.image(x,y,'nb'+random).setScale(GAMEOPTIONS.BLOCK_SCALE_DEFAULT)
    block_number.setDataEnabled();
    block_number.data.set('i', i)
    block_number.data.set('j', j)
    block_number.data.set('value',random)
    block_number.data.set('check',false)
    lstObject[i][j]=block_number
    block_number.setInteractive().on('pointerdown', function () {
            BlockClick(scene,this)
        });
    return block_number
}


function BlockClick(scene,block){
    only_block_select=true
    let tw
    touch++

    if (touch==1)
    {
        BlockSelect(scene,block)
        time_delay=0
        if (only_block_select)
            {
                scene.tweens.add({
                    targets:block,
                    props: {
                        scale:  { value: block.scale-0.1, duration: 500, ease: 'Bounce' },
                    },
                    yoyo:true

                })
                touch=0
            }
    }
    else{
        if (checkObjectInLstChoose(block))
        {
            let value = block.data.get('value')
            let i = block.data.get('i')
            let j = block.data.get('j')
            for (let i = 0; i < GAMEOPTIONS.COLUM; i++) {
                for (let j = 0; j < GAMEOPTIONS.ROW; j++) {
                    const element = lstObject[i][j]
                    if(element!=undefined && element.data.get("check") == undefined)
                    {
                            if(element!=block){
                                time_delay++
                                if (time_delay>5) time_delay=5

                                 tw = scene.tweens.chain({
                                    targets: element,
                                    tweens: [
                                        {
                                            y: element.y-30,
                                            ease: 'Linear',
                                            duration: 300
                                        },
                                        {
                                            x: block.x,
                                            y: block.y,
                                            ease: 'Linear',
                                            duration: 100*time_delay
                                        },
                                    ],
                                    onComplete:function(){
                                        let boder = scene.add.image(block.x,block.y,'boder').setScale(0.3)
                                            scene.tweens.add({
                                                targets:boder,
                                                props: {
                                                    scale:  { value: boder.scale+0.15, duration: 500, ease: 'Bounce' },
                                                    alpha:  { value:0,duration: 500, ease: 'Bounce'}
                                                },
                                                onComplete:function(){
                                                    boder.destroy()
                                                }

                                            })
                                        
                                        let score = element.data.get('value')
                                        let txt = new CustomText(scene,block.x, block.y, 'popin', "+"+score, 30)
                                            scene.tweens.add({
                                                targets:txt,
                                                props: {
                                                    y       :  { value: txt.y-60, duration: 500, ease: 'Bounce' },
                                                    alpha   :  { value:0,duration: 500, ease: 'Bounce'}
                                                },
                                                onComplete:function(){
                                                    txt.destroy()
                                                }

                                            })

                                         
                                        SaveHSCore(value)
                                        lstObject[i][j]=undefined
                                        element.destroy()
                                    }
                                });
                                                            
                            }
                            
                        }
                }
            }
            if (tw!=undefined){
                tw.on('complete', function(){
                    let e = lstObject[i][j]
                    SoundPlay(scene,'merge')
                    e.scale=GAMEOPTIONS.BLOCK_SCALE_DEFAULT
                    e.data.set('check',false) 
                    e.data.set('value',value+1)
                    e.setTexture('nb'+(value+1))
                    if (value+1>lstNumber[lstNumber.length-1] && lstNumber.length<9)
                    {
                        lstNumber.push(value+1)
                    }       
                    setTimeout(function(){UpdatePosition(scene)},100) 
                    });
            }
            
        }
        else{

            for(let i =0 ; i <GAMEOPTIONS.ROW; i++)
            {   
                for (let j=0 ; j < GAMEOPTIONS.COLUM; j++)
                {
                    if(lstObject[i][j]!=undefined)
                        {
                            scene.tweens.add({
                                targets:lstObject[i][j],
                                props: {
                                    scale:  { value: GAMEOPTIONS.BLOCK_SCALE_DEFAULT, duration: 500, ease: 'Bounce' },
                                },
                            })
                            lstObject[i][j].alpha=1
                            lstObject[i][j].data.set('check',false)
                        }
                } 
            }
        }

        touch=0
        time_delay=0
    }
    
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
    setTimeout(function(){
        if (CheckGameOver(scene))
            {
                scene.scene.start('game_over')
                console.log('Game Over')
            }
    },100)
    

    
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
                        lstObject[i+1][j].data.set('i',i+1)
                        lstObject[i+1][j].data.set('j',j)
                        lstObject[i][j].alpha=1
                        lstObject[i][j]=undefined
                    }
                }
            } 
        }  
}

function checkObjectInLstChoose(block)
{
    if (block.data.get('value')==value_select)
        {
            return true
        }

    else{
        return false
    }
}

function BlockSelect(scene, block)
{   
        lstBlockSelect=[]
        let value = block.data.get('value')
        let i = block.data.get('i')
        let j = block.data.get('j')

        if(value!=10)
            {
                value_select=value
                //check top
                if (i > 0) {
                
                    let top = topObj(i,j)
                    if (top!=undefined && top.data.get('value')==value && top.data.get('check')==false)
                    {
                        scene.tweens.add({
                            targets:top,
                            props: {
                                scale:  { value: top.scale-0.1, duration: 500, ease: 'Bounce' },
                            },
                        })
                        top.data.set('check')==true
                        only_block_select=false           
                        lstBlockSelect.push(top)
                    }
                }

                //check bottom
                if (i < GAMEOPTIONS.ROW-1) {
                    let bottom = bottomObj(i,j)
                    if (bottom!=undefined && bottom.data.get('value')==value && bottom.data.get('check')==false)
                    {
                        scene.tweens.add({
                            targets:bottom,
                            props: {
                                scale:  { value: bottom.scale-0.1, duration: 500, ease: 'Bounce' },
                            },
                        })
                        bottom.data.set('check')==true
                        only_block_select=false                      
                        lstBlockSelect.push(bottom)
                    }
                }

                // check left
                if (j > 0) {

                    let left = leftObj(i,j)
                    if (left != null) {
                        if (left.data.get('value')==value && left.data.get('check')==false) {
                            scene.tweens.add({
                                targets:left,
                                props: {
                                    scale:  { value: left.scale-0.1, duration: 500, ease: 'Bounce' },
                                },
                            })
                            left.data.set('check')==true 
                            only_block_select=false                     
                            lstBlockSelect.push(left)
                        }
                    }
                }

                //check right
                if (j < GAMEOPTIONS.COLUM - 1) {
                    let right = rightObj(i,j)
                    if (right != null) {
                        if (right.data.get('value')==value && right.data.get('check')==false) {
                            scene.tweens.add({
                                targets:right,
                                props: {
                                    scale:  { value: right.scale-0.1, duration: 500, ease: 'Bounce' },
                                },
                            })
                            right.data.set('check')==true   
                            only_block_select=false                   
                            lstBlockSelect.push(right)
                        }
                    }
                }

                lstBlockSelect.forEach(element => {
                    BlockSelect(scene,element)
                });
                // console.log(lstBlockSelect)
            }
        else{
            Block10Click(scene,block)
        }
    }
    
function CheckGameOver(scene)
{
    for (let x = 0; x < GAMEOPTIONS.COLUM; x ++)
    {
        for (let y =0 ; y <GAMEOPTIONS.ROW; y++)
        {
            let block = lstObject[x][y]
            let value = block.data.get('value')
            let i = block.data.get('i')
            let j = block.data.get('j')

            //check top
            if (i > 0) {
            
                let top = topObj(i,j)
                if (top!=undefined && top.data.get('value')==value && top.data.get('check')==false)
                {
                    return false
                }
            }

            //check bottom
            if (i < GAMEOPTIONS.ROW-1) {
                let bottom = bottomObj(i,j)
                if (bottom!=undefined && bottom.data.get('value')==value && bottom.data.get('check')==false)
                {
                    return false
                }
            }

            // check left
            if (j > 0) {

                let left = leftObj(i,j)
                if (left != null) {
                    if (left.data.get('value')==value && left.data.get('check')==false) {
                        return false
                    }
                }
            }

            //check right
            if (j < GAMEOPTIONS.COLUM - 1) {
                let right = rightObj(i,j)
                if (right != null) {
                    if (right.data.get('value')==value && right.data.get('check')==false) {
                        return false
                    }
                }
            }
        }
    }
    return true
}


function Block10Click(scene,block)
{
        let i = block.data.get('i')
        let j = block.data.get('j')

        let top = topObj(i,j)
        if (top!=undefined )
        {
            let value = top.data.get('value')
            SaveHSCore(value)
            lstObject[top.data.get('i')][top.data.get('j')]=undefined
            top.destroy()
            createParticel(scene,top)
        }

        let bottom = bottomObj(i,j)
        if(bottom!=undefined)
            {
                let value = bottom.data.get('value')
                SaveHSCore(value)
                lstObject[bottom.data.get('i')][bottom.data.get('j')]=undefined
                bottom.destroy()
                createParticel(scene,bottom)
            }
        
        let left = leftObj(i,j)
        if(left!=undefined)
            {
                let value = left.data.get('value')
                SaveHSCore(value)
                lstObject[left.data.get('i')][left.data.get('j')]=undefined
                left.destroy()
                createParticel(scene,left)
            }

        let right = rightObj(i,j)
        if(right!=undefined)
            {
                let value = right.data.get('value')
                SaveHSCore(value)
                lstObject[right.data.get('i')][right.data.get('j')]=undefined
                right.destroy()
                createParticel(scene,right)
            }
        
        let left_top = left_top_Obj(i,j)
        if(left_top!=undefined)
            {
                let value = left_top.data.get('value')
                SaveHSCore(value)
                lstObject[left_top.data.get('i')][left_top.data.get('j')]=undefined
                left_top.destroy()
                createParticel(scene,left_top)
               
            }

        let right_top = right_top_Obj(i,j)
        if(right_top!=undefined)
            {
                let value = right_top.data.get('value')
                SaveHSCore(value)
                lstObject[right_top.data.get('i')][right_top.data.get('j')]=undefined
                right_top.destroy()
                createParticel(scene,right_top)
            }

        let left_bottom = left_bottom_Obj(i,j)
        if(left_bottom!=undefined)
            {
                let value = left_bottom.data.get('value')
                SaveHSCore(value)
                lstObject[left_bottom.data.get('i')][left_bottom.data.get('j')]=undefined
                left_bottom.destroy()
                createParticel(scene,left_bottom)
                
            }   
        let right_bottom = right_bottom_Obj(i,j)
        if(right_bottom!=undefined)
            {
                let value = right_bottom.data.get('value')
                SaveHSCore(value)
                lstObject[right_bottom.data.get('i')][right_bottom.data.get('j')]=undefined
                right_bottom.destroy()
                createParticel(scene,right_bottom)
                
            }
        block.destroy()
        lstObject[i][j]=undefined
        createParticel(scene,block)
        setTimeout(function(){ UpdatePosition(scene) },100)
        SoundPlay(scene,'breaking')
        touch=0
        time_delay=0
        // console.log(lstObject)
}


function SaveHSCore(v)
{
    score+=v
    if(score>hightScore)
    {
        hightScore = score
        localStorage.setItem('hscore',hightScore)
    } 
    txtScore.text=score
    // for (let index = 1; index < score; index+=5) {
    //     setTimeout(function(){
    //         txtScore.text=score+index
    //     },index*0.1)
    // }
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
            console.log("nnnn")
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
    txtScore = new CustomText(scene, 360, 160, 'popin', "0", 102)
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
                    if (check_sound){
                        scene.sound.stopAll();
                        check_sound=false
                        btnSound.setTexture('btnSoundOff')
                    }
                    else{
                        check_sound=true
                        SoundPlay(scene,'bg_music')
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

function SoundPlay(scene,music_name)
{
    if (!check_sound) return
    if (music_name =='bg_music')
    {
        let music_bg= scene.sound.add(music_name)
        music_bg.play()
        music_bg.setLoop(true)
    }
    else{
        scene.sound.play(music_name);
    }

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

function createParticel(scene,e) {
    scene.add.particles(0,0,'block',{
        x: e.x,
        y: e.y,
        speed: { min: -600, max: 600 },
        alpha: { min: 0, max: 0.5 },
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








