var s_sky = 'sky.png';
var s_mario = 'mario.png';
var s_goods = 'goods.png';
var s_white = 'white.png';

var g_resources = [
    s_sky,
    s_mario,
    s_goods,
    s_white
];

cc.game.onStart = function(){
    var designSize = cc.size(960, 540);
    var screenSize = cc.view.getFrameSize();

    if(!cc.sys.isNative && screenSize.height < 800){
        cc.loader.resPath = "res";
    }else{
        cc.loader.resPath = "res";
    }
    cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.FIXED_HEIGHT);
    cc.view.resizeWithBrowserSize(true);

    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new scene());
    }, this);
};
cc.game.run();
