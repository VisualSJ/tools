define(function(require, exports){

    var changeScene;

    //游戏内部场景对象
    var scene = h("@block").set({
        width: 800,
        height: 600
    });

    //背景（两侧图片）
    var background = h("@block").set({
        width: 800,
        height: 600
    });
    background.append(h("@node").set({
        backgroundImage: "./res/other/frontdisp.png",
        backgroundSize: "150 700",
        width: 100
    }));
    background.append(h("@node").set({
        x: 650,
        backgroundImage: "./res/other/frontdisp.png",
        backgroundSize: "150 700",
        backgroundPosition: "100 0",
        width: 100
    }));
    background.append(h("@node").set({
        x: 30,
        y: 450,
        color: "#FFF"
    }).text("返回").on("touchUp", function(){
        out();
        changeScene("initial");
    }));

    scene.append(background);

    var levelNum = 0;
    var changeLevel = function(level){
        list[levelNum].out(scene, changeLevel);
        if(level!=null){
            levelNum = level;
            list[level].into(scene, changeLevel);
        }
    };
    var list = [
        require("./level/1")
    ];

    exports.into = function(c){
        changeScene = c;
        h("#canvas").append(scene);
        changeLevel(0);
    };

    var out = function(){
        changeLevel(null);
        h("#canvas").remove(scene);
    };

});