//游戏开始后的地图（主体）

var BackgroundLayer = cc.Scene.extend({
    ctor: function(){
        cc.Layer.prototype.ctor.call(this);
    },

    init: function(){
        cc.Layer.prototype.init.call(this);

        var sprite = new cc.Sprite();
        sprite.initWithFile("background.png");
        sprite.setAnchorPoint(0, 0);

        this.addChild(sprite);
    }
});