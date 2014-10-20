var MyLayer = cc.Layer.extend({
    helloLabel:null,
    sprite:null,

    init:function () {
        this._super();

        var fish = [];

        var action = new cc.RotateTo(5, 180);

        var a = 40;
        var b = 80;
        for(var  i=0; i<a*b; i++){
            var tmp = new cc.Sprite("res/fish.png", cc.rect(0, 0, 50, 25));
            tmp.setRotation(1);
            this.addChild(tmp);
            tmp.x = 2000 - (i % a) * 50 -25;
            tmp.y = 2000 - (i / a | 0) * 25 - 12.5;
            tmp.runAction(action.clone());
            fish.push(tmp);
        }

        console.log(a)
    }
});

var MyScene = cc.Scene.extend({

    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});
