//己方的房子（选择出的人物的那个渣渣）

var House = cc.Sprite.extend({

    _choiceSprite: null,
    _choiceCheck: false,

    _b1: null,
    _b2: null,
    _b3: null,

    _HouseNum: 0,

    ctor: function(){
        cc.Sprite.prototype.ctor.call(this);

        this.setContentSize(cc.size(50, 50));

        this._b1 = new cc.Sprite("tx.png", cc.rect(0, 0, 147, 203));
        this._b1.setAnchorPoint(0, 0);
        this._b1.setScale(0.5);
        this.addChild(this._b1);

        this._b2 = new cc.Sprite("tx.png", cc.rect(148, 0, 147, 203));
        this._b2.setAnchorPoint(0, 0);
        this._b2.setScale(0.5);
        this.addChild(this._b2);
        this._b2.setVisible(false);

        this._b3 = new cc.Sprite("tx.png", cc.rect(295, 0, 147, 203));
        this._b3.setAnchorPoint(0, 0);
        this._b3.setScale(0.5);
        this.addChild(this._b3);
        this._b3.setVisible(false);

        this._choiceSprite = new House_Choice();
        this.addChild(this._choiceSprite);
    },

    choice: function(){
        if(this._choiceCheck === true)
            return;
        this._choiceCheck = true;
        this._choiceSprite.stopAllActions();
        this._choiceSprite.runAction(
            cc.scaleTo(0.2, 1, 1)
        );
        cc.eventManager.addListener(House_Event, this._choiceSprite);
    },

    reChoice: function(){
        if(this._choiceCheck === false)
            return;
        this._choiceCheck = false;
        this._choiceSprite.stopAllActions();
        this._choiceSprite.runAction(
            cc.scaleTo(0.2, 0, 1)
        );
        cc.eventManager.removeListener(House_Event, this._choiceSprite);
    }

});

var House_Choice = cc.Sprite.extend({

    _item: null,

    ctor: function(){
        cc.Sprite.prototype.ctor.call(this);
        this._item = [];
        this.setPosition(45, 55);
        this.setScaleX(0);
        this.setContentSize(cc.size(225, 75));

        this.createItem();
    },

    createItem: function(){
        var item1 = new cc.Sprite("tx.png", cc.rect(0, 0, 147, 203));
        item1.setContentSize(cc.size(75, 75));
        item1.setScale(0.5);
        item1.setPosition(35, 35);
        this.addChild(item1);

        var item2 = new cc.Sprite("tx.png", cc.rect(148, 0, 147, 203));
        item2.setContentSize(cc.size(75, 75));
        item2.setScale(0.5);
        item2.setPosition(105, 35);
        this.addChild(item2);

        var item3 = new cc.Sprite("tx.png", cc.rect(295, 0, 147, 203));
        item3.setContentSize(cc.size(75, 75));
        item3.setScale(0.5);
        item3.setPosition(175, 35);
        this.addChild(item3);

        this._item.push(item1);
        this._item.push(item2);
        this._item.push(item3);

    }
});

var House_Event = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();

        var item1 = target._item[0],
            item2 = target._item[1],
            item3 = target._item[2];

        var house = target._parent;

        var T1 = item1.convertToNodeSpace(touch._point),
            T2 = item2.convertToNodeSpace(touch._point),
            T3 = item3.convertToNodeSpace(touch._point);

        if(T1.x > 0 && T1.y > 0 && T1.x < item1._contentSize.width && T1.y < item1._contentSize.height){
            console.log("item1");
            gameData.currentHouse.figure = 1;
            house._b1.setVisible(true);
            house._b2.setVisible(false);
            house._b3.setVisible(false);
            return;
        }
        if(T2.x > 0 && T2.y > 0 && T2.x < item2._contentSize.width && T2.y < item2._contentSize.height){
            console.log("item2");
            gameData.currentHouse.figure = 2;
            house._b1.setVisible(false);
            house._b2.setVisible(true);
            house._b3.setVisible(false);
            return;
        }
        if(T3.x > 0 && T3.y > 0 && T3.x < item3._contentSize.width && T3.y < item3._contentSize.height){
            console.log("item3");
            gameData.currentHouse.figure = 3;
            house._b1.setVisible(false);
            house._b2.setVisible(false);
            house._b3.setVisible(true);
            return;
        }

    }
});