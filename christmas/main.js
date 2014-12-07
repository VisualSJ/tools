

var designSize;

cc.game.onStart = function(){
    designSize = cc.size(800, 450);

    cc.loader.resPath = "res";
    cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);

    //load resources
    cc.LoaderScene.preload(dispatch_resources, function () {
        cc.director.runScene(new MainScene());
    }, this);
};
cc.game.run();