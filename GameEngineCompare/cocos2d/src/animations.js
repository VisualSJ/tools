
var fish1 = cc.Sprite.extend({

    onEnter: function(){
        var texture = cc.TextureCache.getInstance().addImage("../../resources/anim1.png");
        var frame0 = cc.SpriteFrame.createWithTexture(texture, cc.rect(  0, 0, 50, 26));
        var frame1 = cc.SpriteFrame.createWithTexture(texture, cc.rect( 50, 0, 50, 26));
        var frame2 = cc.SpriteFrame.createWithTexture(texture, cc.rect(100, 0, 50, 26));
    }
});


var animationsScene = cc.Scene.extend({


    onEnter: function(){
        this._super();

        var fish = [
            "../../resources/anim1.png",
            "../../resources/anim2.png",
            "../../resources/anim3.png",
            "../../resources/anim4.png"
        ];
        var imgIndex = 0;

        var texture = cc.textureCache.addImage("../../resources/anim1.png");
        var frame0 = cc.SpriteFrame.create(texture, cc.rect(  0, 0, 50, 26));
        var frame1 = cc.SpriteFrame.create(texture, cc.rect( 50, 0, 50, 26));
        var frame2 = cc.SpriteFrame.create(texture, cc.rect(100, 0, 50, 26));

        var coinAnima = cc.Animation.create();
        console.time("add 5000 sprites");
        for(var i=0;i<4;i++){
//            this.addFish(fish[(imgIndex)%fish.length], imgIndex++);
            var sprite = cc.Sprite.create(frame0);
            sprite.setPosition(cc.p(200, 350));
            this.addChild(sprite);
        }
        console.timeEnd("add 5000 sprites");

    },
    addFish: function(img, i){
        var scale= Math.random() + .5;

        var _fish = cc.Sprite.create(img, cc.size(50, 26));
        _fish.setPosition(cc.p(200, 350 - i * 50));
        _fish.setScale(scale);

        this.addChild(_fish);
    }
});
