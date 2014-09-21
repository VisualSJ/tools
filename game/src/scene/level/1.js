/*
第一关关卡
 */
define(function(require, exports){

    const self = require("../module/self");
    const score = require("../module/score");

    //游戏层
    var layer = h("@block").set({
        x: 150,
        height: 700,
        width: 500
    });

    //boss对象
    var boss = h("@block").set({
        width: 54,
        height: 60,
        x: 40,
        y: 90
    });
    var node = h("@node").set({
        width: 54,
        height: 60,
        backgroundImage: "./res/enm/boss0.png"
    });
    boss.append(node);
    layer.append(boss);
    var normalFrame = [
        "0 0",
        "64 0",
        "128 0",
        "192 0"
    ];
    var num = 1;
    var animation = function(){
        node.set("backgroundPosition", normalFrame[num++]);
        if(num >= normalFrame.length)
            num = 0;
        if(node.active)
            h.delay(animation, 200);
    };

    //碰撞检测
    var collisionBoss = function(){
        for(var i=0; i<self.bullet.length; i++){

            if(!self.bullet[i].active){
                continue;
            }
            //y轴过线
            if(self.bullet[i].get("y") < 150){
                //x轴判断
                var x = self.bullet[i].get("x");
                if(x > boss.get("x") && x < boss.get("x")+54){
                    score.addA();
                    self.bullet[i].parent.remove(self.bullet[i]);
                }
            }
        }
        boss.active && h.delay(collisionBoss, 50);
    };

    //boss甩翔
    var fireNum = 0;
    var fire = function(){
        var x = boss.get("x");
        var y = boss.get("y");
        for(var i=0; i< 18; i++){
            var n = h("@node").set({
                x: x+25,
                y: y+30,
                width: 15,
                height:15,
                backgroundImage: "./res/other/etama.png",
                backgroundPosition: "0 50"
            });
            n.fire = true;

            layer.append(n);

            (function(n){
                var r;
                if(fireNum++%2)
                    r = i+8.5;
                else
                    r = i+9;

                n.to({
                    x: x+25 - Math.sin((r)*Math.PI/18) * 500,
                    y: y+30 - Math.cos((r)*Math.PI/18) * 500
                }, 4000, function(){
                    layer.remove(n);
                });
            })(n);
        }
    };

    //碰撞检测
    var collisionSelf = function(){
        var sx = self.getX();
        var sy = self.getY();
        var sw = self.getW();
        var sh = self.getH();
        var items = layer.children;
        for(var i=0; i<items.length; i++){
            var item = items[i];
            if(!item.fire)
                continue;
            var ix = item.get("x");
            var iy = item.get("y");
            //位於右下
            if(ix>sx && iy>sy){
                if(ix < sx + sw && iy < sy + sh){
                    score.addB();
                    layer.remove(item);
                }
            }
        }
        if(layer.active)
            h.delay(collisionSelf, 50);
    };

    //boss随机移动
    var randomMove = function(){
        var l = (Math.random() * 440 | 0) + 40;
        boss.to({
            x:l
        }, l * 5, function(){
            fireNum = 0;
            fire();
            h.delay(fire, 480);
            h.delay(fire, 960);
            h.delay(fire, 1440);
            h.delay(fire, 1920);
            layer.active && h.delay(randomMove, 1800);
        });
    };

    exports.into = function(s){
        h.delay(animation, 200);
        h.delay(collisionBoss, 50);
        h.delay(collisionSelf, 50);
        randomMove();
        s.append(layer);

        self.into(layer);
        score.into(layer);
    };

    exports.out = function(s){
        var children = layer.children;
        for(var i=0; i<children.length; i++){
            if(children[i].fire){
                children.splice(i--, 1);
            }
        }
        s.remove(layer);
        self.out(layer);
        score.out(layer);
    };

});