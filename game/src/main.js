/*
 * 游戏总控模块
 */
define(function(require, exports){

    //选择游戏场景
    const initial = require("./scene/initial");
    //游戏内场景
    const game = require("./scene/game");

    h.adaptive(1);

    //更改场景
    var changeScene = function(name){
        if(name === "initial")
            initial.into(changeScene);
        if(name === "game")
            game.into(changeScene);
    };

    changeScene("initial");

});