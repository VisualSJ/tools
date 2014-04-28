
var spritesScene = cc.Scene.extend({


    ctor: function(){
        this._super();

        var _t =  cc.SpriteBatchNode.create("../../../resources/anim1.png");

        this.addChild(_t);

        console.time("add 5000 sprites");
        for(var i=0;i<5000;i++){
            this.addFish(_t,  (i*50)%800,(((i/16) | 0) * 26) % 494 );

        }
        console.timeEnd("add 5000 sprites");

    },
    addFish: function(batchNode, x, y){

        var _fish = cc.Sprite.create("../../../resources/anim1.png");
        _fish.setPosition(cc.p(x+25, y+13));

        batchNode.addChild(_fish);
    }
});
