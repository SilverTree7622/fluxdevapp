function CCreditsPanel(){
    
    var _oFade;
    var _oPanelContainer;
    var _oButExit;
    var _oLogo;
    var _oPanel;
    var _oListener;
    
    var _pStartPanelPos;
    
    this._init = function(){

        _oPanelContainer = new createjs.Container();        
        s_oStage.addChild(_oPanelContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        _oPanel = createBitmap(oSprite);        
        _oPanel.regX = oSprite.width/2;
        _oPanel.regY = oSprite.height/2;
        _oListener = _oPanel.on("click",this._onLogoButRelease);
        _oPanelContainer.addChild(_oPanel);
        
        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = CANVAS_HEIGHT/2;  
        _pStartPanelPos = {x: _oPanelContainer.x, y: _oPanelContainer.y};

        var oTitle = new CTLText(_oPanelContainer, 
                    -250, -100, 500, 40, 
                    40, "center", "#fff", PRIMARY_FONT, 1,
                    2, 2,
                    TEXT_DEVELOPED,
                    true, true, false,
                    false );

        var oLink = new CTLText(_oPanelContainer, 
                    -250, 170, 500, 34, 
                    34, "center", "#fff", PRIMARY_FONT, 1,
                    2, 2,
                    "www.codethislab.com",
                    true, true, false,
                    false );

        var oSprite = s_oSpriteLibrary.getSprite('ctl_logo');
        _oLogo = createBitmap(oSprite);
        _oLogo.regX = oSprite.width/2;
        _oLogo.regY = oSprite.height/2;
        _oPanelContainer.addChild(_oLogo);
      
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _oButExit = new CGfxButton(276, -210, oSprite, _oPanelContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);
        
    };
    
    this.unload = function(){

        s_oStage.removeChild(_oFade);
        s_oStage.removeChild(_oPanelContainer);

        _oButExit.unload();

        _oPanel.off("mousedown",_oListener);
    };
    
    this._onLogoButRelease = function(){
        window.open("https://www.codethislab.com/","_blank");
    };

    
    this._init();
    
    
};


