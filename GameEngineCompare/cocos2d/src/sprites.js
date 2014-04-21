
var spritesScene = cc.Scene.extend({


    onEnter: function(){

        console.time("add 5000 sprites");
        for(var i=0;i<5000;i++){
//            this.addFish(fish[(imgIndex++)%fish.length]);
            this.addFish( (i*50)%800,(((i/16) | 0) * 26) % 494 );

        }
        console.timeEnd("add 5000 sprites");

    },
    addFish: function(x, y){

        var _fish = cc.Sprite.create("../../resources/anim1.png", cc.size(50, 26));
        _fish.setPosition(cc.p(x+25, y+13));

        this.addChild(_fish);
    }
});
