function CMultiplierBar(iX,iY){
    var _bActive;
    var _iCurMultiplier;
    var _iHeightBar;
    var _iWidthBar;
    var _pStartPos;
    
    var _oTextMultiplier;
    var _oMaskBar;
    var _oContainerMultiplier;
    var _oContainer;
    
    this._init = function(iX,iY){
        _bActive = true;
        _iCurMultiplier = s_iMultiplier;
        _pStartPos = {x:iX,y:iY};
        
        _oContainer = new createjs.Container();
        _oContainer.x = _pStartPos.x;
        _oContainer.y = _pStartPos.y;
        s_oStage.addChild(_oContainer);
        
        //ATTACH BAR
        var oSpriteBar = s_oSpriteLibrary.getSprite('bar_bg');
        _iWidthBar = oSpriteBar.width;
        _iHeightBar = oSpriteBar.height;
        var oBarBg = createBitmap(oSpriteBar);
        _oContainer.addChild(oBarBg);
       
        var oSprite = s_oSpriteLibrary.getSprite('bar_fill');
        var oBarFill = createBitmap(oSprite);
        oBarFill.x = 9;
        oBarFill.y = 3;
        _oContainer.addChild(oBarFill);   
        
        _oMaskBar= new createjs.Shape();
        _oMaskBar.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0, 0, oSprite.width,oSprite.height);
        _oMaskBar.regY= oSprite.height;
                
        _oMaskBar.x =9;
        _oMaskBar.y =  oSprite.height + oBarFill.y;
        _oMaskBar.scaleY = 0.001;
        _oContainer.addChild(_oMaskBar);
        oBarFill.mask = _oMaskBar;

        //ATTACH MULTIPLIER
        var oSpriteMultiplierBg = s_oSpriteLibrary.getSprite("multiplier_bg");
        _oContainerMultiplier = new createjs.Container();
        _oContainerMultiplier.x =  oSpriteBar.width/2;
        _oContainerMultiplier.y =  5;
        _oContainerMultiplier.regX = oSpriteMultiplierBg.width/2;
        _oContainerMultiplier.regY = oSpriteMultiplierBg.height/2;
        _oContainer.addChild(_oContainerMultiplier);
        
        var oMultiplierBg = createBitmap(oSpriteMultiplierBg);
        _oContainerMultiplier.addChild(oMultiplierBg);
        
        var iWidth = oSpriteMultiplierBg.width-10;
        var iHeight = 40;
        var iX = oSpriteMultiplierBg.width/2+1;
        var iY = oSpriteMultiplierBg.height/2-5;
        _oTextMultiplier = new CTLText(_oContainerMultiplier, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    35, "center", "#000", PRIMARY_FONT, 1,
                    2, 2,
                    "x"+s_iMultiplier,
                    true, true, false,
                    false );

    };
    
    this.refreshButtonPos = function(){
        _oContainer.x = _pStartPos.x + s_iOffsetX;
    };
    
    this.reset = function(){
        _bActive = true;
        _oMaskBar.scaleY = 0.001;
    };
    
    this.refreshBar = function(iScaleFactor){

        var iValue = _oMaskBar.scaleY+iScaleFactor;
        if(iValue >= 1 && _bActive){
            _bActive = false;
            
            if(_iCurMultiplier+1 <= MAX_MULTIPLIER){
                this.changeMultiplier();
                //APPLY MULTIPLIER
                s_oGame.applyNextMultiplier();
            }
            
        }
        
        createjs.Tween.get(_oMaskBar).to({scaleY: iValue}, TIME_BAR_MONEY_TWEEN,createjs.Ease.linear);
    };
    
    this.changeMultiplier = function(){
        createjs.Tween.get(_oContainerMultiplier).to({scaleX:1.5,scaleY: 1.5}, 1000,createjs.Ease.backOut).call(function(){
                                                                                _iCurMultiplier++;
                                                                                _oTextMultiplier.refreshText( "x"+_iCurMultiplier );
                                                                                createjs.Tween.get(_oContainerMultiplier).to({scaleX:1,scaleY: 1}, 500,createjs.Ease.backOut);
                                                                                                    });
    };
    
    this.getX = function(){
        return _oContainer.x + _iWidthBar/2;
    };
    
    this.getBottomY = function(){
        return _oContainer.y + _iHeightBar;
    };
    
    this._init(iX,iY);
}