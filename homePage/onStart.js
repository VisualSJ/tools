var s_sky = 'sky.png';
var s_ground = 'ground.png';
var s_box1 = 'box1.png';
var s_box2 = 'box2.png';
var s_box3 = 'box3.png';
var s_1 = '1.png';
var s_2 = '2.png';
var s_3 = '3.png';
var s_4 = '4.png';
var s_5 = '5.png';
var s_6 = '6.png';
var s_7 = '7.png';
var coco_1 = 'coco1.png';
var coco_2 = 'coco2.png';
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
    s_ground,
    s_box1,
    s_box2,
    s_box3,
    s_1,
    s_2,
    s_3,
    s_4,
    s_5,
    s_6,
    s_7,
    coco_1,
    coco_2
];

cc.game.onStart = function(){
    var designSize = cc.size(960, 540);
    var screenSize = cc.view.getFrameSize();

    if(!cc.sys.isNative && screenSize.height < 800){
        cc.loader.resPath = "public/img";
    }else{
        cc.loader.resPath = "public/img";
    }
    cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.FIXED_HEIGHT);
    cc.view.resizeWithBrowserSize(true);

    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new gameScene());
    }, this);
};
cc.game.run();
