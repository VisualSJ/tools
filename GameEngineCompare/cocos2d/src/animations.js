var animationsScene = cc.Scene.extend({


    onEnter: function(){
        this._super();

        console.time("add 5000 sprites");
        for(var i=0;i<5000;i++){
            this.addFish( (i*50)%800, (((i/16) | 0) * 26) % 494 )
        }
        console.timeEnd("add 5000 sprites");

    },
    addFish: function(x, y){

        var texture = cc.textureCache.addImage("../../resources/anim1.png");

        var frame0 = cc.SpriteFrame.create(texture, cc.rect(0, 0, 50, 26));
        var frame1 = cc.SpriteFrame.create(texture, cc.rect(50, 0, 50, 26));
        var frame2 = cc.SpriteFrame.create(texture, cc.rect(100, 0, 50, 26));

        var sprite = cc.Sprite.create(frame0);


        sprite.setPosition(cc.p(x+25, y+13));

        this.addChild(sprite);


        var animFrames = [];
        animFrames.push(frame0);
        animFrames.push(frame1);
        animFrames.push(frame2);

        var animation = cc.Animation.create(animFrames, 0.2);
        var animate = cc.Animate.create(animation);
        sprite.runAction(cc.RepeatForever.create(animate));

    }
});
