///游戏调度场景，主要负责创建各种层等
var gameController = {
    scoreLayer:null,
    gameLayer: null,
    initialLayer: null
};

var cocos;

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        //游戏按钮（开始前的一个start等的层）
        var initial = new InitialLayer(cc.color(0, 0, 0, 170));
        initial.ignoreAnchor = false;
        initial.anchorX = 0;
        initial.anchorY = 0;
        initial.setContentSize(800, 450);
        this.addChild(initial, 2);

        //游戏主体层
        var game = new GameLayer();
        this.addChild(game, 1);
        game.init();
        gameController.gameLayer = game;

        //游戏背景层
        var background = new BackgroundLayer();
        this.addChild(background, -1);
        background.init();

        cocos = new cc.LabelTTF("Power by Cocos2d-JS");
        cocos.setPosition(120, 30);
        this.addChild(cocos, 999);

        cc.audioEngine.playMusic("res/sounds/ss.mp3", true);
    }
});
