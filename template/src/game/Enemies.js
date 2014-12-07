//Enemy

var Enemy = cc.Sprite.extend({
    _type: 0,
    _state: 0,
    _destX: null,
    _starX: null,
    __duration: null,

    ctor: function(type){
        cc.Sprite.prototype.ctor.call(this);
        this._type = type;
        this._state = Enemy.states.walk;
    },

    walkAnimation: function(){

    },

    deadAnimation: function(){
    },

    attackAnimation: function(){
    },

    walk: function(speed, x, y){
        this._destX = x;
        this._starX = this.x;
        this.__duration = 20 * ( 1 / speed);
        this._state = Enemy.states.walk;
        //walk animation
        this.walkAnimation();
        //move to
        this.runAction(cc.sequence(cc.moveTo(this.__duration, x, y),
            cc.callFunc(function(){
                //sub the blood
                gameController.scoreLayer.subBlood();
                this.removeFromParent(true);
                //delete from array
                this.removeColl();
            }, this)));
    },

    reply: function(){
        //var pre = (this.__x1 - this.x)/ (this.__x2 - this.__x1);
        var pre = -(this._destX - this.x) / (this._starX - this._destX); //250 是移动速度
        if(this._walkAnimation)
            this.runAction(this._walkAnimation);
        this.runAction(
            cc.sequence(
                cc.moveTo(this.__duration * pre, this._destX, this.y),
                cc.callFunc(function () {
                    //sub the blood
                    gameController.scoreLayer.subBlood();
                    this.removeFromParent(true);
                    //delete from array
                    this.removeColl();
                }, this)));
    },

    attack: function(survival){
        this._state = Enemy.states.attack;
        //walk animation
        this.attackAnimation();
        //move to
        var self = this;
        this.runAction(
            cc.sequence(
                cc.fadeOut(0.01),
                cc.delayTime(1),
                cc.callFunc(function () {
                    self.runAction(cc.fadeIn(0.01));
                    if (survival)
                        self.reply();
                    else
                        self.dead();
                }, this))
        );
    },

    dead: function(){
        this._state = Enemy.states.dead;
        this.runAction(
            cc.sequence(cc.scaleTo(0.3, 0.1),
                cc.callFunc(function(){
                    this.removeFromParent(true);
                }, this))
        );
    },

    removeColl: function(){
        var data = gameData.EnemiesCollision;
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

Enemy.types = {
    deer:0,
    dog: 1,
    bear:2
};

Enemy.states = {
    walk:0,
    attack:1,
    dead: 2
};

Enemy.createByRandom = function(){
    var rand = Math.random() * 3;
    if(rand <= 1){
         return new Deer();
    }else if(rand <= 2){
        return new Dog();
    }else{
        return new Bear();
    }
};

var Deer = Enemy.extend({
    ctor: function(){
        Enemy.prototype.ctor.call(this, Enemy.types.deer);
        this._create(this._state);
    },

    _create: function(){
        var texture = cc.textureCache.addImage("Deer.png");
        var frame0 = new cc.SpriteFrame(texture, cc.rect(0, 0, 96, 144));
        var frame1 = new cc.SpriteFrame(texture, cc.rect(96, 0, 96, 144));
        var frame2 = new cc.SpriteFrame(texture, cc.rect(96 * 2, 0, 96, 144));
        var frame3 = new cc.SpriteFrame(texture, cc.rect(96 * 3, 0, 96, 144));
        var frame4 = new cc.SpriteFrame(texture, cc.rect(96 * 4, 0, 96, 144));
        var frame5 = new cc.SpriteFrame(texture, cc.rect(0, 144, 96, 144));
        var frame6 = new cc.SpriteFrame(texture, cc.rect(96, 144, 96, 144));
        var frame7 = new cc.SpriteFrame(texture, cc.rect(96 * 2, 144, 96, 144));
        var frame8 = new cc.SpriteFrame(texture, cc.rect(96 * 3, 144, 96, 144));
        var frame9 = new cc.SpriteFrame(texture, cc.rect(96 * 4, 144, 96, 144));

        this._startAnimation = cc.animate(new cc.Animation([
            frame9, frame8
        ], 0.1));
        this._walkAnimation = cc.animate(new cc.Animation([
            frame8, frame7, frame6, frame5, frame4, frame3, frame2, frame1, frame0
        ], 0.1)).repeatForever();

        this.setScale(0.8);
        this.setSpriteFrame(frame9);
        //this.setColor(cc.color.RED);
    },

    walkAnimation: function(){
        //deer
        if(this._startAnimation)
            this.runAction(
                cc.sequence(
                    this._startAnimation,
                    cc.callFunc(function(){
                        this.runAction(this._walkAnimation);
                    }, this)
                )
            );
    },

    deadAnimation: function(){
    },

    attackAnimation: function(){
    }
});

var Dog = Enemy.extend({
    ctor: function(){
        Enemy.prototype.ctor.call(this, Enemy.types.dog);
        this._create(this._state);
    },

    _create: function(){
        var texture = cc.textureCache.addImage("SantaClaus.png");
        var frame0 = new cc.SpriteFrame(texture, cc.rect(0, 0, 96, 168));
        var frame1 = new cc.SpriteFrame(texture, cc.rect(96, 0, 96, 168));
        var frame2 = new cc.SpriteFrame(texture, cc.rect(96 * 2, 0, 96, 168));
        var frame3 = new cc.SpriteFrame(texture, cc.rect(96 * 3, 0, 96, 168));
        var frame4 = new cc.SpriteFrame(texture, cc.rect(96 * 4, 0, 96, 168));
        var frame5 = new cc.SpriteFrame(texture, cc.rect(0, 168, 96, 168));
        var frame6 = new cc.SpriteFrame(texture, cc.rect(96, 168, 96, 168));
        var frame7 = new cc.SpriteFrame(texture, cc.rect(96 * 2, 168, 96, 168));
        var frame8 = new cc.SpriteFrame(texture, cc.rect(96 * 3, 168, 96, 168));
        var frame9 = new cc.SpriteFrame(texture, cc.rect(96 * 4, 168, 96, 168));

        this._startAnimation = cc.animate(new cc.Animation([
            frame0, frame1
        ], 0.1));
        this._walkAnimation = cc.animate(new cc.Animation([
            frame1, frame2, frame3, frame4, frame5, frame6, frame7, frame8, frame9
        ], 0.1)).repeatForever();
        this.setScale(0.8);
        this.setSpriteFrame(frame0);
    },

    walkAnimation: function(){
        //deer
        if(this._startAnimation)
            this.runAction(
                cc.sequence(
                    this._startAnimation,
                    cc.callFunc(function(){
                        this.runAction(this._walkAnimation);
                    }, this)
                )
            );
    },

    deadAnimation: function(){
    },

    attackAnimation: function(){
    }
});

var Bear = Enemy.extend({
    ctor: function(){
        Enemy.prototype.ctor.call(this, Enemy.types.bear);
        this._create();
    },

    _create: function(){
        var texture = cc.textureCache.addImage("guairen.png");
        var frame0 = new cc.SpriteFrame(texture, cc.rect(0, 0, 96, 136));
        var frame1 = new cc.SpriteFrame(texture, cc.rect(96, 0, 96, 136));
        var frame2 = new cc.SpriteFrame(texture, cc.rect(96 * 2, 0, 96, 136));
        var frame3 = new cc.SpriteFrame(texture, cc.rect(96 * 3, 0, 96, 136));
        var frame4 = new cc.SpriteFrame(texture, cc.rect(96 * 4, 0, 96, 136));
        var frame5 = new cc.SpriteFrame(texture, cc.rect(0, 136, 96, 136));
        var frame6 = new cc.SpriteFrame(texture, cc.rect(96, 136, 96, 136));
        var frame7 = new cc.SpriteFrame(texture, cc.rect(96 * 2, 136, 96, 136));
        var frame8 = new cc.SpriteFrame(texture, cc.rect(96 * 3, 136, 96, 136));
        var frame9 = new cc.SpriteFrame(texture, cc.rect(96 * 4, 136, 96, 136));

        this._startAnimation = cc.animate(new cc.Animation([
            frame0, frame1
        ], 0.1));
        this._walkAnimation = cc.animate(new cc.Animation([
            frame1, frame2, frame3, frame4, frame5, frame6, frame7, frame8, frame9
        ], 0.1)).repeatForever();
        this.setScale(0.8);
        this.setSpriteFrame(frame0);
    },

    walkAnimation: function(){
        //deer
        if(this._startAnimation)
            this.runAction(
                cc.sequence(
                    this._startAnimation,
                    cc.callFunc(function(){
                        this.runAction(this._walkAnimation);
                    }, this)
                )
            );
    },

    deadAnimation: function(){
    },

    attackAnimation: function(){
    }
});

