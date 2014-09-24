var MyLayer = cc.Layer.extend({
    helloLabel:null,
    sprite:null,

    init:function () {
        this._super();

//        var editbox = cc.EditBox.create(
//            size,cc.Scale9Sprite.create("editbox.png"),
//            cc.Scale9Sprite.create("editbox.png"));
//        editbox.setPosition(400, 400);
//        editbox.setFontSize(28);
//        editbox.setFontColor(cc.color(0, 0, 0));
//        editbox.setPlaceholderFontColor(cc.color(150, 150, 150));
//        editbox.setPlaceholderFontSize(28);
//        editbox.setPlaceHolder("请输入你的大名");
//        editbox.setMaxLength(7);

//        cc.director.setContentScaleFactor(2);
//        var armatureDataManager = ccs.armatureDataManager;
//        armatureDataManager.addArmatureFileInfo(
//            "skill_400021.png",
//            "skill_400021.plist",
//            "skill_400021.xml");
//        var armature = ccs.Armature.create("skill_400021");
//        armature.getAnimation().setSpeedScale(0.1);
//        armature.getAnimation().playWithIndex(0, -1, 1);
//        armature.x = 140;
//        armature.y = 200;
//        this.addChild(armature);

//        var root = ccs.uiReader.widgetFromJsonFile("NewUi_1/NewUi_1.ExportJson");
//        var root = ccs.uiReader.widgetFromJsonFile("NewUi/Export/NewUi_1/NewUi_1.json");
//        var root = ccs.uiReader.widgetFromJsonFile("start_game.json");
//        var root = ccs.uiReader.widgetFromJsonFile("test.json");
//        var root = ccs.uiReader.widgetFromJsonFile("test2.json");
//        var root = ccs.uiReader.widgetFromJsonFile("UILogin/UILogin.json");
//        var root = ccs.uiReader.widgetFromJsonFile("123123/Village.json");
//        var root = ccs.uiReader.widgetFromJsonFile("publish/Backpack.json");
//        var root = ccs.uiReader.widgetFromJsonFile("UIMagicBasic/UIMagicBasic.json");
//        var root = ccs.uiReader.widgetFromJsonFile("ui/menzheng.json");
//        ccs.actionManager.playActionByName("menzheng.json", "a2");

//        var root = ccs.uiReader.widgetFromJsonFile("Game_UI_Room_Area/Game_UI_Room_Area.ExportJson");
//        var cl1 = root._children[0]._items[0].clone();
//        root._children[0].pushBackCustomItem(cl1);
//
//        this.addChild(root);
//        window.root = root;


//        var layer = ccs.uiReader.widgetFromJsonFile("publish/Backpack.json");
//        this.layer = layer;
//        this.addChild(layer);
//        this.scrollView = ccui.helper.seekWidgetByName(layer,"ScrollView");
//        var item = ccui.helper.seekWidgetByName(this.scrollView,"item0");
//        window.item = item;
//        var tag = item.getTag();
//        var size = this.scrollView.getInnerContainerSize();
//
//        var tmp = item.clone();
//        tmp.setTag(tag+1);
//        tmp.setName("item1");
//        tmp.test = true;
//        this.scrollView.addChild(tmp);
//        tmp.getLayoutParameter().setMargin(124, 16);
//        window.tmp = tmp;


        var normalText = [

//            "\nThis is a sentence",
//            "\n\nThis is a sentence",
//            "Hello \nMy Friend",
//            "Hello \n\nMy Friend"

//            "バグ等に思われる物を発見したり、何らかの機能が足りない、",
//            "バグ等に思われる物を発見したり、何らかの機能が足りない、aaaaaaaaaaaaaaaaaa",
//            "このサンプルはLight.vnで使用可能な命令語、及びエディターの使い方を紹介し、ノベル製作時に",
//            "このサンプルはLight.vnで使用可能な命令語、及びエディターの使い方を紹介し、ノベル製作時に考参出",

//            "Light.vnのgithub page「https://github.com/hsdk123/Light.vn」、\n又製作者のツイッター「@daegon137」に是非ご連絡ください。",
//            "このサンプルはLight.vnで使用可能な命令語、及びエディターの使い方を紹介し、ノベル製作時に",
//            "このサンプルはLight.vnで使用可能な命令語、及びエディターの使い方を紹介し、ノベル製作時に考参出",
//            "このサンプルはLight.vnで使用可能な命令語、及びエディターの使い方を 紹介し、ノベル製作時に考参出来るスクリプトを",
//            "ちなみにエディターの下にＦＰＳ（ノベルアップデート速度）\n情報もありますので急に下がったり、特に５０以下に落ちた場合は\n是非ともフィ",
//            "ちなみにエディターの下にＦＰＳ（ノベルアップデート速度）\n情報もありますので急に下がったり、特に５０以下に落ちた場合は\n是非ともフィードバックを"

        ];
//        cc.LabelTTF.wrapInspection = true;
//        var self = this;
//        normalText.forEach(function(text, i){
//            var LabelTTF = new cc.LabelTTF();
//            LabelTTF.setString(text);
//            LabelTTF.setPosition(30 + 550 * (i/6|0), 500 - (i%6) * 60);
//            LabelTTF.setAnchorPoint(0,1);
//            LabelTTF.boundingWidth = 580;
//            LabelTTF.boundingHeight = 0;
//            LabelTTF.enableStroke("rgba(0, 0, 0, 1)", 3.0);
//            self.addChild(LabelTTF);
//        });
//
//        cc.SPRITE_DEBUG_DRAW = 1;


//        var node = ccs.sceneReader.createNodeWithSceneFile('MainScene.json');
//        var node = ccs.sceneReader.createNodeWithSceneFile("Resources/FightScene.json");
//        this.addChild(node);

//        var sprite = new cc.Sprite("NewUi_1/GUI/button.png");
//
//        sprite.setPosition(200,200);
//
//        this.addChild(sprite);
//        this.scoreLabel = new cc.LabelBMFont("分数:0", "BMFont.fnt");
//        this.addChild(this.scoreLabel, 10);
//        this.scoreLabel.attr({
//            x: 37,
//            y: 400 * 0.95,
//            scale: 0.6,
//            anchorX: 0,
//            anchorY: 0.5,
//            color: cc.color.RED//cc.color(147, 164, 145)
//        });

        var winSize = cc.director.getWinSize();

        var bg = new cc.DrawNode();
        bg.drawRect(cc.p(0, 0), cc.p(winSize.width, winSize.height), cc.color(255, 255, 255, 255), 1, cc.color(255, 255, 255, 255));
        this.addChild(bg);

        var shape = new cc.DrawNode();
        shape.drawCircle(cc.p(0,0), 50, cc.degreesToRadians(0), 200, false, 10, cc.color(255, 255, 255, 255));

        var stencil = shape;
        stencil.x = 50;
        stencil.y = 50;

        var clipper = new cc.ClippingNode();
        clipper.anchorX = 0.5;
        clipper.anchorY = 0.5;
        clipper.x = winSize.width / 2 - 50;
        clipper.y = winSize.height / 2 - 50;
        clipper.stencil = stencil;
        this.addChild(clipper);

        var grossini = new cc.Sprite("grossini.png");
        grossini.scale = 3;

        var content = grossini;
        content.x = 50;
        content.y = 50;
        clipper.addChild(content);

    }
});

var MyScene = cc.Scene.extend({

    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});
