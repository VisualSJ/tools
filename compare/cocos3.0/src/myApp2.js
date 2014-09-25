var TestLayer2 = cc.Layer.extend({

    status: null,
    fishList: null,

    init: function(){

        var TestScene = [
            {a: 10, b: 20}, //200
            {a: 15, b: 30}, //450
            {a: 20, b: 40}, //800
            {a: 25, b: 50}, //1250
            {a: 30, b: 60}, //1800
            {a: 35, b: 70}, //2450
            {a: 40, b: 80}, //3200
        ];

        //fish元素队列
        this.fishList = [];

        var self = this;
        var level = 0;
        var addition = document.getElementById("addition");
        if(addition){
            addition.addEventListener("click", function(){
                self.removeFish();
                level++;
                if(TestScene.length <= level) level = TestScene.length - 1;
                self.createFish(TestScene[level]);
            }, false);
        }
        var subtraction = document.getElementById("subtraction");
        if(subtraction){
            subtraction.addEventListener("click", function(){
                self.removeFish();
                level--;
                if(level <= 0) level = 0;
                self.createFish(TestScene[level]);
            }, false);
        }
        var rotate = document.getElementById("rotate");
        if(rotate){
            rotate.addEventListener("click", function(){
                self.removeFish();
                self.createFish(TestScene[level]);
                self.status = "rotate";
            }, false);
        }
        var move = document.getElementById("move");
        if(move){
            move.addEventListener("click", function(){
                self.removeFish();
                self.createFish(TestScene[level]);
                self.status = "move";
            }, false);
        }
        var scale = document.getElementById("scale");
        if(scale){
            scale.addEventListener("click", function(){
                self.removeFish();
                self.createFish(TestScene[level]);
                self.status = "scale";
            }, false);
        }
        var all = document.getElementById("all");
        if(all){
            all.addEventListener("click", function(){
                self.removeFish();
                self.createFish(TestScene[level]);
                self.status = "all";
            }, false);
        }

        self.createFish(TestScene[level]);

        this.scheduleUpdate();
    },

    createFish: function(obj){
        var arr = this.fishList;
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
            tmp.x = (i % a) * 50 + 25;
            tmp.y = 2000 - (i / a | 0) * 25 + 13;
            arr.push(tmp);
        }
        this.num = 0;
    },

    num:0,
    update: function(dt){

        this.num++;
        if(this.num >= 300){
            this.num = 0;
            this.status = null;
        }
        switch(this.status){
            case "rotate":
                this.rotate(dt);
                break;
            case "move":
                this.move(dt);
                break;
            case "scale":
                this.scale(dt);
                break;
            case "all":
                this.all(dt);
        }

    },

    removeFish: function(){
        this.status = null;
        var arr = this.fishList;
        for(var i=0; i<arr.length; i++){
            this.removeChild(arr[i]);
        }
        arr.length = 0;
    },

    rotate: function(){
        var arr = this.fishList;
        for(var i=0; i<arr.length; i++){
            arr[i].rotation += 1.2;
        }
    },

    move: function(){
        var arr = this.fishList;
        for(var i=0; i<arr.length; i++){
            arr[i].x += 0.16;
        }
    },

    scale: function(){
        var arr = this.fishList;
        for(var i=0; i<arr.length; i++){
            arr[i].scaleX += 0.0034;
        }
    },

    all: function(){
        var arr = this.fishList;
        for(var i=0; i<arr.length; i++){
            arr[i].rotation += 1.2;
            arr[i].x += 0.16;
            arr[i].scaleX += 0.0034;
        }
    }
});


var UpdateTest = cc.Scene.extend({

    onEnter: function(){
        this._super();
        var layer = new TestLayer2();
        this.addChild(layer);
        layer.init();
    }
});