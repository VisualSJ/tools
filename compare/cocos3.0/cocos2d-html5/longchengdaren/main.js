cc.game.onStart = function(){
    cc.view.setDesignResolutionSize(640, 830, cc.ResolutionPolicy.SHOW_ALL);
	cc.view.resizeWithBrowserSize(false);
    //load resources
    cc.director.setDisplayStats(false);
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new MainScene());
    }, this);
};
cc.game.run();


