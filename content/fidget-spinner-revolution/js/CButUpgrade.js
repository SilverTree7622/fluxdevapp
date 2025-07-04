function CButUpgrade(iXPos,iYPos,szTextPrice,iLevel,oSprite,oParentContainer){
    var _bDisable;
    var _iWidth;
    var _iHeight;
    var _aCbCompleted;
    var _aCbOwner;
    var _aListeners;
    
    var _oCoinIcon;
    var _oTextCoin;
    var _oMainContainer;
    var _oButtonContainer;
    var _oText;
    var _oParentContainer;
    
    this._init =function(iXPos,iYPos,szTextPrice,iLevel,oSprite){
        _bDisable = false;

        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oMainContainer = new createjs.Container();
        _oMainContainer.x = iXPos;
        _oMainContainer.y = iYPos;
        _oParentContainer.addChild(_oMainContainer);
        
        _oButtonContainer = new createjs.Container();
        _oButtonContainer.x = 0;
        _oButtonContainer.y = 0;
        _oButtonContainer.regX = oSprite.width/2;
        _oButtonContainer.regY = oSprite.height/2;
        _oMainContainer.addChild(_oButtonContainer);
        
        var oButtonBg = createBitmap( oSprite);
        _oButtonContainer.addChild(oButtonBg);
        
        var iWidth = 50;
        var iHeight = 20;
        var iX = 73;
        var iY = 80;
        _oText = new CTLText(_oButtonContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    15, "center", "#000", PRIMARY_FONT, 1,
                    2, 2,
                    sprintf(TEXT_LV, iLevel),
                    true, true, true,
                    false );
       
       var oSpriteCoin = s_oSpriteLibrary.getSprite("coin");
        _oCoinIcon = createBitmap(oSpriteCoin);
        _oCoinIcon.scaleX = _oCoinIcon.scaleY = 0.6;
        _oCoinIcon.x = -oSprite.width/2 - 3;
        _oCoinIcon.y = -oSprite.height/2 - oSpriteCoin.height*_oCoinIcon.scaleX - 4;
        _oMainContainer.addChild(_oCoinIcon);
            
       if(szTextPrice === -1){
           _oCoinIcon.visible = false;
           szTextPrice = " ";
       }
 
        var iWidth = 60;
        var iHeight = 30;
        var iX = _oCoinIcon.x + oSpriteCoin.width*_oCoinIcon.scaleX + 5;
        var iY = _oCoinIcon.y + oSpriteCoin.height*_oCoinIcon.scaleY/2;
        _oTextCoin = new CTLText(_oMainContainer, 
                    iX, iY-iHeight/2, iWidth, iHeight, 
                    22, "left", "#fff", PRIMARY_FONT, 1,
                    2, 2,
                    szTextPrice,
                    true, true, false,
                    false );


        _iWidth = oSprite.width;
        _iHeight = oSprite.height;
        
        this._initListener();
    };
    
    this.unload = function(){
       
       _oButtonContainer.off("mousedown",_aListeners[0]);
       _oButtonContainer.off("pressup" , _aListeners[1]);     
       
       _oParentContainer.removeChild(_oButtonContainer);
    };
    
    this.setVisible = function(bVisible){
        _oMainContainer.visible = bVisible;
    };
    
    this.setTextLevel = function(szText){
        _oText.refreshText( sprintf(TEXT_LV, szText) );
    };
    
    this.setTextMoney = function(szText){
        _oTextCoin.refreshText( szText );
    };
    
    this.enable = function(){
        if(!_bDisable){
            return;
        }
        _bDisable = false;
        try{
            _oButtonContainer.filters = [];
            _oButtonContainer.cache(0,0,_iWidth,_iHeight);
        }catch(e){
            console.log(e);
        }
        
    };
    
    this.disable = function(){
        _bDisable = true;

        if(_oTextCoin.getText().text === undefined){
            _oCoinIcon.visible = false;
            _oTextCoin.setVisible( false );
        }
        try{
            var matrix = new createjs.ColorMatrix().adjustSaturation(-100);
            _oButtonContainer.filters = [
                     new createjs.ColorMatrixFilter(matrix)
            ];
            _oButtonContainer.cache(0,0,_iWidth,_iHeight);
        }catch(e){
            console.log(e);
        }
        
        
    };
    
    this._initListener = function(){
       _aListeners = new Array();
       _aListeners[0] = _oButtonContainer.on("mousedown",this.buttonDown);
       _aListeners[1] = _oButtonContainer.on("pressup",this.buttonRelease);
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.buttonRelease = function(){
        if(_bDisable){
            return;
        }
        
        _oButtonContainer.scaleX = 1;
        _oButtonContainer.scaleY = 1;
        
        playSound("upgrade",1,false);
        
        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP]);
        }
    };
    
    this.buttonDown = function(){
        if(_bDisable){
            return;
        }
        
        _oButtonContainer.scaleX = 0.9;
        _oButtonContainer.scaleY = 0.9;

        if(_aCbCompleted[ON_MOUSE_DOWN]){
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
        }
    };

    this.setPosition = function(iXPos,iYPos){
         _oMainContainer.x = iXPos;
         _oMainContainer.y = iYPos;
    };

    this.getX = function(){
        return _oMainContainer.x;
    };
    
    this.getY = function(){
        return _oMainContainer.y;
    };
    
    _oParentContainer = oParentContainer;
    this._init(iXPos,iYPos,szTextPrice,iLevel,oSprite);
}