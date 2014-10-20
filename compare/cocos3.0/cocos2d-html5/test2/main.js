cc.game.onStart = function(){

    if(cc.sys.isMobile)
        cc.view.setDesignResolutionSize(2000,2000,cc.ResolutionPolicy.SHOW_ALL);

    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new MyScene());
    }, this);
};
cc.game.run();