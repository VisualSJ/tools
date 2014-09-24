cc.game.onStart = function(){
    var designSize = cc.size(2000, 2000);

    cc.loader.resPath = "res/";

    //load resources
    cc.LoaderScene.preload([res.fish], function () {
        cc.director.runScene(new TestScene());
    }, this);
};
cc.game.run();