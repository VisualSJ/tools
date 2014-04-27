var s_sky = 'sky.png';
var s_ground = 'ground.png';
var s_box = [
    'box1.png',
    'box2.png',
    'box3.png'
];
var s_mario = [
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png',
    '7.png'
];
var s_coco = [
    'coco1.png',
    'coco2.png'
];
var goods = [
    'goods1.png',
    'goods2.png',
    'goods3.png',
    'goods4.png',
    'goods5.png',
    'goods6.png',
    'goods7.png',
    'goods8.png'
];

var g_resources = [
    s_sky,
    s_ground
];
g_resources = g_resources.concat(s_box);
g_resources = g_resources.concat(s_mario);
g_resources = g_resources.concat(s_coco);
g_resources = g_resources.concat(goods);

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
