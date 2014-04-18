
var spritesScene = cc.Scene.extend({


    onEnter: function(){
        this._super();

        var fish = [
            "../../resources/anim1.png",
            "../../resources/anim2.png",
            "../../resources/anim3.png",
            "../../resources/anim4.png"
        ];
        var imgIndex = 0;

        console.time("add 5000 sprites");
        for(var i=0;i<5000;i++){
            this.addFish(fish[(imgIndex++)%fish.length]);
        }
        console.timeEnd("add 5000 sprites");

    },
    addFish: function(img){
        var scale= Math.random() + .5;

        var _fish = cc.Sprite.create(img, cc.size(50, 26));
        _fish.setPosition(cc.p(200, 350));
        _fish.setScale(scale);

        this.addChild(_fish);
    }
});
