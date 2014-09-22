/*
 顶部得分模块
 */
define(function(require, exports){

    var figure = h("@block").set({
        width: 30,
        height: 45,
        x: 215,
        y: 500
    });

    //人物动作状态
    //1. 普通模式
   //2. 右转动画
    //3. 左转动画
    var status = 1;

    var normalFrame = [
        "0 0",
        "32 0",
        "64 0",
        "96 0",
        "128 0",
        "160 0",
        "192 0",
        "224 0"
    ];

    var node = h("@node").set({
        width: 30,
        height: 45,
        backgroundImage: "./res/other/pl10.png"
    });

    var num = 1;
    var animation = function(){
        node.set("backgroundPosition", normalFrame[num++]);
        if(num >= normalFrame.length)
            num = 0;
        if(node.active)
            h.delay(animation, 200);
    };

    figure.append(node);


    var point = {
        x: 0,
        y: 0,
        sx: 0,
        sy: 0
    };
    var move = function(e){
        var x = point.sx + (e.x - point.x);
        var y = point.sy + (e.y - point.y);
        if(x < 0) x = 0;
        if(x > 470) x = 470;
        if(y <150) y =150;
        if(y > 550) y = 550;
        figure.set({
            x: x,
            y: y
        });
    };

    var down = function(e){
        point.x = e.x;
        point.sx = figure.get("x");
        point.y = e.y;
        point.sy = figure.get("y");

        h("#canvas").off("touchMove", move);
        h("#canvas").on("touchMove", move);
    };

    var up = function(){
        h("#canvas").off("touchMove", move);
    };

    var bullet = [];
    for(var i=0; i<20; i++){
        bullet.push(h("@node").set({
            width: 14,
            height: 14,
            backgroundImage: "./res/other/etama.png",
            backgroundPosition: "0 20"
        }))
    }

    exports.bullet = bullet;
    exports.getX = function(){
        return figure.get("x");
    };
    exports.getY = function(){
        return figure.get("y");
    };
    exports.getW = function(){
        return figure.get("width");
    };
    exports.getH = function(){
        return figure.get("height");
    };

    var bs = null;
    var bNum = 0;
    var fire = function(){
        var x = figure.get("x") + 9;
        var y = figure.get("y") - 14;
        var tmpNum = bNum++;
        if(bNum >= 20){
            bNum = 0;
        }
        bullet[tmpNum].set({
            x: x,
            y: y
        });
        bullet[tmpNum].to({y: 0}, y * 3, function(){
            bs.remove(bullet[tmpNum]);
        });
        bs.append(bullet[tmpNum]);

        if(node.active)
            h.delay(fire, 100);
    };

    exports.into = function(s){
        bs = s;

        h.delay(animation, 400);
        h.delay(fire, 100);
        s.append(figure);

        h("#canvas").on("touchDown", down);
        h("#canvas").on("touchUp",up);
    };
    exports.out = function(s){
        bs = s;

        s.remove(figure);
        bullet.forEach(function(item){
            item.parent && item.parent.remove(item);
        });

        h("#canvas").off("touchDown", down);
        h("#canvas").off("touchUp",up);
    };

});