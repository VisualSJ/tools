/*
 游戏初始化场景，选择开始或者配置的界面
 */
define(function(require, exports){

    var changeScene;

    //场景对象
    var scene = h("@block").set({
        width: 800,
        height: 600
    });

    //场景背景
    var background = h("@node").set({
        backgroundImage: "./res/other/title00a.png",
        backgroundSize: "800 700"
    });

    //阴影1
    var shape1 = h("@node").set({
        x: -300,
        backgroundImage: "./res/other/title00line.png",
        backgroundSize: "800 700"
    });
    shape1.animation = function(){
        shape1.to({x: 0}, 1300, function(){
            shape1.to({x: -300}, 900, function(){
                shape1.animation();
            });
        });
    };

    //阴影2
    var shape2 = h("@node").set({
        x: 300,
        backgroundImage: "./res/other/title00line.png",
        backgroundSize: "800 700"
    });
    shape2.animation = function(){
        shape2.to({x: 0}, 900, function(){
            shape2.to({x: 300}, 1300, function(){
                shape2.animation();
            });
        });
    };

    //开始游戏的按钮
    var GameStart = h("@node").set({
        x: 200,
        y: 200,
        backgroundImage: "./res/other/title01.png",
        width: 150,
        height: 30
    });
    GameStart.on("touchUp", function(){
        out();
        changeScene("game");
    });

    scene.append(background);
    scene.append(shape1);
    scene.append(shape2);
    scene.append(GameStart);

    //适配测试
    var a1 = h("@node").set({
        color: "#FFF",
        align: "center",
        x: 260,
        y: 250
    }).text("缩放填充全屏").on("touchDown", function(){
        h.adaptive(1);
    });
    var a2 = h("@node").set({
        color: "#FFF",
        align: "center",
        x: 260,
        y: 300
    }).text("按宽度比例缩放").on("touchDown", function(){
        h.adaptive(2);
    });
    var a3 = h("@node").set({
        color: "#FFF",
        align: "center",
        x: 260,
        y: 350
    }).text("按高度比例缩放").on("touchDown", function(){
        h.adaptive(3);
    });
    var a4 = h("@node").set({
        color: "#FFF",
        align: "center",
        x: 260,
        y: 400
    }).text("标准缩放 - 空白区域留白").on("touchDown", function(){
        h.adaptive(4);
    });
    var a5 = h("@node").set({
        color: "#FFF",
        align: "center",
        x: 260,
        y: 450
    }).text("标准缩放 - 超出区域隐藏").on("touchDown", function(){
        h.adaptive(5);
    });
    scene.append(a1);
    scene.append(a2);
    scene.append(a3);
    scene.append(a4);
    scene.append(a5);

    exports.into = function(c){
        changeScene = c;
        shape1.animation();
        shape2.animation();
        h("#canvas").append(scene);
    };

    var out = function(){
        h("#canvas").remove(scene);
    };

});