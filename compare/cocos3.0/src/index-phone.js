var TestLayer3 = cc.Layer.extend({

    init: function(){

        var TestScene = [
            {a: 2, b: 25},
            {a: 4, b: 25}, //100
            {a: 6, b: 25}, //150
            {a: 8, b: 25}, //200
            {a: 10, b: 25}, //250
            {a: 10, b: 30}, //300
            {a: 10, b: 35}, //350
            {a: 10, b: 40} //400
        ];

        //fish元素队列
        var fishList = [];

        var self = this;
        var level = 0;
        var addition = document.getElementById("addition");
        if(addition){
            addition.addEventListener("click", function(){
                self.removeFish(fishList);
                level++;
                if(TestScene.length <= level) level = TestScene.length - 1;
                self.createFish(TestScene[level], fishList);
            }, false);
        }
        var subtraction = document.getElementById("subtraction");
        if(subtraction){
            subtraction.addEventListener("click", function(){
                self.removeFish(fishList);
                level--;
                if(level <= 0) level = 0;
                self.createFish(TestScene[level], fishList);
            }, false);
        }
        var rotate = document.getElementById("rotate");
        if(rotate){
            rotate.addEventListener("click", function(){
                self.removeFish(fishList);
                self.createFish(TestScene[level], fishList);
                self.rotate(fishList);
            }, false);
        }
        var move = document.getElementById("move");
        if(move){
            move.addEventListener("click", function(){
                self.removeFish(fishList);
                self.createFish(TestScene[level], fishList);
                self.move(fishList);
            }, false);
        }
        var scale = document.getElementById("scale");
        if(scale){
            scale.addEventListener("click", function(){
                self.removeFish(fishList);
                self.createFish(TestScene[level], fishList);
                self.scale(fishList);
            }, false);
        }
        var all = document.getElementById("all");
        if(all){
            all.addEventListener("click", function(){
                self.removeFish(fishList);
                self.createFish(TestScene[level], fishList);
                self.all(fishList);
            }, false);
        }

        self.createFish(TestScene[level], fishList);
    },

    createFish: function(obj, arr){
        var a = obj.a;
        var b = obj.b;

        var totalNum = a*b;
        var info = document.getElementById("info");
        if(info){
            info.innerHTML = totalNum.toString();
        }

        for(var  i=0; i<totalNum; i++){
            var tmp = cc.Sprite.create(res.fish, cc.rect(0, 0, 50, 26));
            this.addChild(tmp);
            tmp.x = (i % a) * 30 + 25;
            tmp.y = 720 - (i / a | 0) * 13 + 13;
            arr.push(tmp);
        }
    },

    removeFish: function(arr){
        for(var i=0; i<arr.length; i++){
            this.removeChild(arr[i]);
        }
        arr.length = 0;
    },

    rotate: function(arr){
        for(var i=0; i<arr.length; i++){
            var tw = cc.rotateBy(5, 360);
            arr[i].runAction(tw);
        }
    },

    move: function(arr){
        for(var i=0; i<arr.length; i++){
            var tw = cc.moveBy(5, cc.p(50, 0));
            arr[i].runAction(tw);
        }
    },

    scale: function(arr){
        for(var i=0; i<arr.length; i++){
            var tw = cc.scaleTo(5, 2, 1);
            arr[i].runAction(tw);
        }
    },

    all: function(arr){
        for(var i=0; i<arr.length; i++){
            var tw = cc.spawn(
                cc.rotateBy(5, 360),
                cc.moveBy(5, cc.p(50, 0)),
                cc.scaleTo(5, 2, 1)
            );
            arr[i].runAction(tw);
        }
    }
});


var PhoneTest = cc.Scene.extend({

    onEnter: function(){
        this._super();
        var layer = new TestLayer3();
        this.addChild(layer);
        layer.init();
    }
});