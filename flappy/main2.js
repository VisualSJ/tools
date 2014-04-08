var s_bg = 'bg.png';
var s_ground = 'ground.png';
var s_flappy = "flappy_packer.png";

var g_resources = [
    s_bg,
    s_ground,
    s_flappy
];

cc.game.onStart = function(){
    var designSize = cc.size(720, 1280);
    var screenSize = cc.view.getFrameSize();

    if(!cc.sys.isNative && screenSize.height < 800){
        designSize = cc.size(720, 1280);
        cc.loader.resPath = "src";
    }else{
        cc.loader.resPath = "src";
    }
    cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.SHOW_ALL);

    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new gameScene());
    }, this);
};
cc.game.run();
