//use for score data, menu, ui etc.

var ScoreLayer = cc.Layer.extend({
    //
    _gotGifts: 0,
    _bloods: 0,
    _round: 1,

    _roundInfo: null,
    _giftsPanel: null,
    _bloodBar: null,

    ctor: function(){
        cc.Layer.prototype.ctor.call(this);
        this._gotGifts = 0;
        this._bloods = 7;
        this._round = 1;

        var top = cc.visibleRect.top;
        this._roundInfo = new cc.LabelTTF("Level 1", "Arial", 20);
        var roundLabel = this._roundInfo;
        //this.addChild(roundLabel);
        roundLabel.setPosition(top.x, top.y - roundLabel.height/2);

        var topLeft = cc.visibleRect.topLeft;
        this._giftsPanel = new GiftsBar();
        this.addChild(this._giftsPanel);
        this._giftsPanel.setPosition(top.x + roundLabel.width / 2 + 10, top.y);

        this._bloodBar = new BloodBar();
        this._bloodBar.setPosition(topLeft.x, topLeft.y);
        this._bloodBar.setBloods(this._bloods);
        this.addChild(this._bloodBar);

        var tree = new cc.Sprite("tree.png");
        this.addChild(tree);
        tree.setPosition(500, 350);
    },

    setBloods: function(bloods){
        this._bloods = bloods;
        this._bloodBar.setPercent(bloods * 10);
    },

    subBlood: function(){
        this._bloods--;
        this._bloodBar.subBlood();
        if(this._bloods <= 0){
             //game over
            console.log("game over");
            gameController.initialLayer.show(false);
            loop.clear();
            gameController.initialLayer._infoLayer.setLineColor(cc.color.WHITE);
            gameController.initialLayer._infoLayer.runAction(
                cc.spawn(
                    cc.scaleTo(1, 1),
                    cc.moveTo(1, cc.p(0, 0))
                )
            );
        }

    },

    setGifts: function(gifts){
        this._gotGifts = gifts;
        this._giftsPanel.setGifts(gifts);
    },

    addGift: function(){
        this._gotGifts++;
        if(this._gotGifts > 9){
            console.log("win the game");
            gameController.initialLayer.show(true);
            loop.clear();
            gameController.initialLayer._infoLayer.setLineColor(cc.color.WHITE);
            gameController.initialLayer._infoLayer.runAction(
                cc.spawn(
                    cc.scaleTo(1, 1),
                    cc.moveTo(1, cc.p(0, 0))
                )
            );
            //next
        }
        this._giftsPanel.setGifts(this._gotGifts);
    },

    clear: function(){
        this._gotGifts = 0;
        this._giftsPanel.removeAllChildren(true);
        this._bloods = 6;
        this._bloodBar.setBloods(this._bloods);
    }
});

var BloodBar = cc.Node.extend({
    _bloods: 0,
    _startPoint: null,
    _giftSize: null,
    ctor: function(){
        //max value is 9
        cc.Node.prototype.ctor.call(this);
        this._bloods = 0;
        this._bloodSize = new cc.Size(46, 40);
        this._startPoint = new cc.Point(this._bloodSize.width / 2, -this._bloodSize.height / 2);

        this.setAnchorPoint(cc.p(0,0));
    },

    setBloods: function(bloods){
        var addBloods = bloods - this._bloods;
        this._bloods = bloods;
        if(addBloods === 0)
            return;

        if(addBloods > 0){
            //add gifts to array
            var len = this.getChildrenCount();
            for(var i = 0 ; i < addBloods; i++){
                this._addBlood(len + i);
            }
        }else {
            //remove some gifts        (needn't)
        }
    },

    _addBlood: function(index){
        //size = 40 x 40
        var sprite = new cc.Sprite("blood.png");
        var locSize = this._bloodSize;
        sprite.setScaleY(0.8);
        sprite.setPosition(this._startPoint.x  + index * locSize.width, -locSize.height / 2);
        this.addChild(sprite);
        //do some animation
    },

    subBlood: function(){
        this._bloods--;
        var children = this.getChildren();
        if(!children || children.length === 0)
            return;

        children[children.length - 1].removeFromParent(true);
    }
});

var GiftsBar = cc.Node.extend({
    _gifts: 0,
    _startPoint: null,
    _giftSize: null,
    ctor: function(){
        //max value is 9
        cc.Node.prototype.ctor.call(this);
        this._gifts = 0;
        this._startPoint = new cc.Point(20,-10);
        this._giftSize = new cc.Size(40, 40);
        this.setAnchorPoint(cc.p(0,0));
    },

    setGifts: function(gifts){
         var addGifts = gifts - this._gifts;
        this._gifts = gifts;
        if(addGifts === 0)
            return;

        if(addGifts > 0){
            //add gifts to array
            var len = this.getChildrenCount();
            for(var i = 0 ; i < addGifts; i++){
                 this._addGift(len + i);
            }
        }else {
            //remove some gifts        (needn't)
        }
    },

    _addGift: function(index){
        //size = 40 x 40
        var sprite = new cc.Sprite("gift.png");
        var locSize = this._giftSize;
        //sprite.setScale(0.5);
        sprite.setPosition(this._startPoint.x  + index * locSize.width, -locSize.height / 2);
        this.addChild(sprite);
        //do some animation
    }
});
