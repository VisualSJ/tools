//自己的小伙伴，好基友

var Buddy = cc.Sprite.extend({
    _type: 0,
    _state: 0,
    _frontLine: 0,
    _destX: null,
    _starX: null,
    __duration: null,

    ctor: function(type){
        cc.Sprite.prototype.ctor.call(this);
        this._type = type;
        this._state = Buddy.states.walk;

        this._create(this._type, this._state);
    },

    walk: function(speed, x, y){
        //get the speed per second
        this._destX = x;
        this._starX = this.x;
        this.__duration = 20 * ( 1 / speed);
        //walk animation
        if(this._startAnimation)
            this.runAction(
                cc.sequence(
                    this._startAnimation,
                    cc.callFunc(function(){
                        this.runAction(this._walkAnimation);
                    }, this)
                )
            );
        this.runAction(
            cc.sequence(cc.moveTo(this.__duration, x, y), cc.callFunc(function(){
                //get a gift
                gameController.scoreLayer.addGift();
                this.removeFromParent(true);
                //delete from array
                this.removeColl();
            }, this)));
    },

    reply: function(){
        var pre = -(this._destX - this.x) / (this._starX - this._destX);
        if(this._walkAnimation)
            this.runAction(this._walkAnimation);
        this.runAction(
            cc.sequence(
                cc.moveTo(this.__duration * pre, this._destX, this.y),
                cc.callFunc(function(){
                    //get a gift
                    gameController.scoreLayer.addGift();
                    this.removeFromParent(true);
                    //delete from array
                    this.removeColl();
                }, this)));
    },

    attack: function(survival){
        var self = this;
        this.runAction(
            cc.sequence(
                cc.fadeOut(0.01),
                cc.callFunc(function(){
                    new yw(this.x + 40, this.y);
                }, this),
                cc.delayTime(1),
                cc.callFunc(function(){
                    self.runAction(cc.fadeIn(0.01));
                    if(survival)
                        self.reply();
                    else
                        self.dead();
                }, this))
            );
    },

    dead: function(){
        this.runAction(
            cc.callFunc(function(){
                this.removeFromParent(true);
            }, this)
        );
    },

    removeColl: function(){
        var data = gameData.BuddyCollision;
        for(var i=0; i<3; i++){
            var list = data[i];
            for(var j=0; j<list.length; j++){
                if(list[j] == this){
                    list.splice(j, 1);
                    return;
                }
            }
        }
    }
});

Buddy.types = {
    deer:0,
    dog: 1,
    bear:2
};

Buddy.states = {
    walk:0,
    attack:1,
    dead: 2
};

Buddy.create = function(num){
    var rand = num;
    if(rand <= 1){
        return new b1();
    }else if(rand <= 2){
        return new b2();
    }else{
        return new b3();
    }
};


var yw = cc.Sprite.extend({
    ctor: function(x, y){
        var self = this;
        cc.Sprite.prototype.ctor.call(this);
        this.setPosition(x, y);
        this.setScale(0.6);

        var textureYW = cc.textureCache.addImage("yw.png");

        var frameYW0 = new cc.SpriteFrame(textureYW, cc.rect(0, 0, 161, 149));
        var frameYW1 = new cc.SpriteFrame(textureYW, cc.rect(161, 0, 161, 149));

        var animation = cc.repeat(cc.animate(new cc.Animation([
            frameYW0, frameYW1
        ], 0.1)), 5);

        this.runAction(animation);
        setTimeout(function(){
            self.removeFromParent();
        }, 1000);

        gameController.gameLayer.addChild(this);
    }
});

var b1 = Buddy.extend({

    ctor: function(){
        Buddy.prototype.ctor.call(this, Buddy.types.deer);
        this._create(this._state);

        var texture = cc.textureCache.addImage("beerChildren.png");

        var frame0 = new cc.SpriteFrame(texture, cc.rect(92 * 0, 120 * 0, 92, 120));
        var frame1 = new cc.SpriteFrame(texture, cc.rect(92 * 1, 120 * 0, 92, 120));
        var frame2 = new cc.SpriteFrame(texture, cc.rect(92 * 2, 120 * 0, 92, 120));
        var frame3 = new cc.SpriteFrame(texture, cc.rect(92 * 3, 120 * 0, 92, 120));
        var frame4 = new cc.SpriteFrame(texture, cc.rect(92 * 4, 120 * 0, 92, 120));
        var frame5 = new cc.SpriteFrame(texture, cc.rect(92 * 0, 120 * 1, 92, 120));
        var frame6 = new cc.SpriteFrame(texture, cc.rect(92 * 1, 120 * 1, 92, 120));
        var frame7 = new cc.SpriteFrame(texture, cc.rect(92 * 2, 120 * 1, 92, 120));
        var frame8 = new cc.SpriteFrame(texture, cc.rect(92 * 3, 120 * 1, 92, 120));
        var frame9 = new cc.SpriteFrame(texture, cc.rect(92 * 4, 120 * 1, 92, 120));

        this._startAnimation = cc.animate(new cc.Animation([
            frame0, frame1, frame2, frame3, frame4
        ], 0.05));
        this._walkAnimation = cc.animate(new cc.Animation([
            frame5, frame6, frame7, frame8, frame9
        ], 0.15)).repeatForever();
    },

    _create: function(state){
        this.initWithFile("beerChildren.png", cc.rect(0, 0, 92, 120));
        this.setFlippedX(true);
        this.setScale(0.8);
    }
});

var b2 = Buddy.extend({
    ctor: function(){
        Buddy.prototype.ctor.call(this, Buddy.types.dog);
        this._create(this._state);

        var texture = cc.textureCache.addImage("songshu.png");
        this.setAnchorPoint(0.65, 0.5);

        var frame0 = new cc.SpriteFrame(texture, cc.rect(140 * 0, 140 * 0, 140, 140));
        var frame1 = new cc.SpriteFrame(texture, cc.rect(140 * 1, 140 * 0, 140, 140));
        var frame2 = new cc.SpriteFrame(texture, cc.rect(140 * 2, 140 * 0, 140, 140));
        var frame3 = new cc.SpriteFrame(texture, cc.rect(140 * 3, 140 * 0, 140, 140));
        var frame4 = new cc.SpriteFrame(texture, cc.rect(140 * 4, 140 * 0, 140, 140));
        var frame5 = new cc.SpriteFrame(texture, cc.rect(140 * 0, 140 * 1, 140, 140));
        var frame6 = new cc.SpriteFrame(texture, cc.rect(140 * 1, 140 * 1, 140, 140));
        var frame7 = new cc.SpriteFrame(texture, cc.rect(140 * 2, 140 * 1, 140, 140));
        var frame8 = new cc.SpriteFrame(texture, cc.rect(140 * 3, 140 * 1, 140, 140));
        var frame9 = new cc.SpriteFrame(texture, cc.rect(140 * 4, 140 * 1, 140, 140));

        this._startAnimation = cc.animate(new cc.Animation([
            frame0, frame1, frame2, frame3, frame4
        ], 0.05));
        this._walkAnimation = cc.animate(new cc.Animation([
            frame5, frame6, frame7, frame8, frame9
        ], 0.15)).repeatForever();
    },

    _create: function(state){
        this.initWithFile("songshu.png", cc.rect(0, 0, 136, 140));
        this.setFlippedX(true);
        this.setScale(0.8);

    }
});

var b3 = Buddy.extend({
    ctor: function(){
        Buddy.prototype.ctor.call(this, Buddy.types.bear);
        this._create(this._state);
        var texture = cc.textureCache.addImage("lvmaozi.png");
        this.setAnchorPoint(0.65, 0.5);

        var frame0 = new cc.SpriteFrame(texture, cc.rect(92 * 0, 144 * 0, 92, 144));
        var frame1 = new cc.SpriteFrame(texture, cc.rect(92 * 1, 144 * 0, 92, 144));
        var frame2 = new cc.SpriteFrame(texture, cc.rect(92 * 2, 144 * 0, 92, 144));
        var frame3 = new cc.SpriteFrame(texture, cc.rect(92 * 3, 144 * 0, 92, 144));
        var frame4 = new cc.SpriteFrame(texture, cc.rect(92 * 4, 144 * 0, 92, 144));
        var frame5 = new cc.SpriteFrame(texture, cc.rect(92 * 0, 144 * 1, 92, 144));
        var frame6 = new cc.SpriteFrame(texture, cc.rect(92 * 1, 144 * 1, 92, 144));
        var frame7 = new cc.SpriteFrame(texture, cc.rect(92 * 2, 144 * 1, 92, 144));
        var frame8 = new cc.SpriteFrame(texture, cc.rect(92 * 3, 144 * 1, 92, 144));
        var frame9 = new cc.SpriteFrame(texture, cc.rect(92 * 4, 144 * 1, 92, 144));

        this._startAnimation = cc.animate(new cc.Animation([
            frame0, frame1, frame2, frame3, frame4
        ], 0.05));
        this._walkAnimation = cc.animate(new cc.Animation([
            frame5, frame6, frame7, frame8, frame9
        ], 0.15)).repeatForever();
    },

    _create: function(state){
        this.initWithFile("lvmaozi.png", cc.rect(0, 0, 92, 144));
        this.setFlippedX(true);
        this.setScale(0.8);
    }
});

