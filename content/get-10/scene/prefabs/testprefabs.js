import CustomText from './customtext.js'

export default class Prefabs {
    constructor(scene,x,y,key,tint,origin,callback,string)
    {
        this.scene      = scene
        this.x          = x
        this.y          = y
        this.key        = key
        this.tint       = tint
        this.callback   = callback
        this.text       = string

        this.width
        this.height
        this.origin     = this.initOrigin(origin)
        this.obj        = this.initObjects()
       
    }

    initOrigin(origin)
    {   
        if(typeof origin === 'number')
        {
            return {
                x : origin,
                y : origin
            }
        }
        else if (typeof origin === 'object') {
            return origin
        }
        else
        {
            return {
                x : 0.5,
                y : 0.5
            }
        }

    }

    initObjects()
    {
        let btn     = this.createSprite()
        
        this.width  = btn.displayWidth
        this.height = btn.displayHeight  

        let lbt  = false

        if(typeof this.text === 'string')
        {
            lbt = new CustomText(this.scene, btn.getCenter().x, btn.getCenter().y-10, this.text)
        }
        return {
            btn : btn,
            lbt : lbt
        }
    }

    createSprite()
    {
        let spr = this.scene.add.image(this.x,this.y,this.key)
            spr.tint = this.tint 
            spr.setOrigin(this.origin.x,this.origin.y)
            spr.setScale(0.5)
            spr.setInteractive()
            spr.on('pointerdown', this.handleDown,this)

            return spr
    }

    handleDown()
    {
        this.callback.call(this.scene)
    }

}