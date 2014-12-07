//游戏初始场景（进入游戏的画面）

var InitialLayer = cc.LayerColor.extend({
    ctor: function(a){
        cc.LayerColor.prototype.ctor.call(this, a);
        this._cascadeOpacityEnabled = false;
        this.createAnimation();
        gameController.initialLayer = this;

        this.runed = false;

        var clickImg = new cc.Sprite("jt1.png");
        this.addChild(clickImg);
        this._clickImg = clickImg;
        this._clickImg.setVisible(false);
        var clickTTF = new cc.LabelTTF("Click here to change our buddy.");
        this.addChild(clickTTF);
        this._clickTTF = clickTTF;
        this._clickTTF.setVisible(false);

        var failure = new cc.Sprite("lose.png");
        failure.setPosition(400, 350);
        failure.setVisible(false);
        this.addChild(failure);
        this._clickFailure = failure;

        var success = new cc.Sprite("win.png");
        success.setPosition(400, 350);
        success.setVisible(false);
        this.addChild(success);
        this._clickSuccess = success;

        this._infoLayer = new InfoLayer();
        this._infoLayer.setVisible(false);
    },

    onEnter: function(){
        cc.LayerColor.prototype.onEnter.call(this);
        this._parent.addChild(this._infoLayer, 100);

        var start = new cc.Sprite("ready.png");
        start.setVisible(false);
        start.setScale(0.4);
        start.setPosition(300, 200);
        this.addChild(start);
        start.runAction(
            cc.sequence(
                cc.scaleTo(0.3, 0.45),
                cc.scaleTo(0.3, 0.4)
            ).repeatForever()
        );
        this._start = start;

    },

    createAnimation: function(){
        var self = this;
        var text = [
            "Friends, let's grab santa claus' gifts! ",
            "Our buddies can kill one enemy, but one enemy also can kill one of our buddy.",
            "Select the right buddy to grab santa claus' gifts.",
            "Let him go gambled pants!"
        ];

        var index = -1;
        var TTF = new cc.LabelTTF();
        this.addChild(TTF);

        var showTTF = function(){
            index++;
            if(!text[index]){
                self.info();
                return;
            }
            TTF.setString(text[index]);
            TTF.setPosition(400, 225);
            TTF.setOpacity(0);
            TTF.runAction(
                cc.sequence(
                    cc.fadeIn(1),
                    cc.delayTime(2),
                    cc.callFunc(function(){
                        this.runAction(
                            cc.sequence(
                                cc.spawn(
                                    cc.fadeOut(1),
                                    cc.moveBy(1, cc.p(0, 30))
                                ),
                                cc.callFunc(showTTF, TTF)
                            )
                        );
                    }, TTF)
                )
            );
        };

        if(!this.runed)
            showTTF();
        else
            this.info();

    },

    info: function(){
        if(!this.runed){
            this._clickImg.setPosition(200, 330);
            this._clickImg.setVisible(true);
            this._clickTTF.setAnchorPoint(0, 0);
            this._clickTTF.setPosition(230, 340);
            this._clickTTF.setFontSize(30);
            this._clickTTF.setVisible(true);
        }

        this.runed = true;
        this._infoLayer.setVisible(true);
        this._start.setVisible(true);
        cc.eventManager.addListener(Ready_Event, this._start);
    },

    show: function(bol){
        this._clickSuccess.setVisible(bol);
        this._clickFailure.setVisible(!bol);
        this._clickImg.setVisible(false);
        this._clickTTF.setVisible(false);
        this._start.setPosition(300, 150);

        this.runAction(
            cc.fadeTo(1, 170)
        );
    }
});


var Ready_Event = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();

        var p = target.convertToNodeSpace(touch._point);

        if(p.x > 0 && p.y > 0 && p.x < target._contentSize.width && p.y < target._contentSize.height){
            console.log("start");
            target._parent._cascadeOpacityEnabled = true;
            target._parent.runAction(
                cc.sequence(
                    cc.fadeOut(1),
                    cc.callFunc(function(){
                        gameController.gameLayer._start = true;
                    }, target)
                )
            );
            target._parent._infoLayer.setLineColor(cc.color.BLACK);
            target._parent._infoLayer.runAction(
                cc.spawn(
                    cc.scaleTo(1, 0.5),
                    cc.moveTo(1, cc.p(100, -100))
                )
            );
            gameController.scoreLayer.clear();
            cc.eventManager.removeListener(Ready_Event, target._parent._start);
            cocos.runAction(
                cc.tintTo(1, 0, 0, 0)
            );
            return;
        }
        return false;
    }
});