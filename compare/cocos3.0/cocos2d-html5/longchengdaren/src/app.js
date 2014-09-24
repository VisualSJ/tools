/**
 * Created by Bingo on 2014/7/24.
 */
var Global=[];

var MainScene=cc.Scene.extend({
    ctor:function()
    {
        this._super();
        var layer=cc.Layer.create();
        this.addChild(layer);
        function GetQueryString(name)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return unescape(r[2]); return null;
        }
        var id=GetQueryString("id");
        if(id==null)id=6;



        if(id!=null)
        {
//            var xhp=cc.loader.getXMLHttpRequest();
//            xhp.open("GET","http://192.168.1.116:8081/share/webfight/"+id);
//            xhp.onreadystatechange=function()
//            {
//                if (xhp.readyState == 4 && xhp.status == 200 )
//                {
//                    var responseText = xhp.responseText;
//                    Global.data=eval('('+xhp.responseText+')');
                    Global.data=eval('('+'{"fromUserIconId":5,"fromUserId":39,"fromUserName":"bingo","shareDtos":[{"fromUserAnswer":1,"fromUserAnswerTime":1,"id":1,"imagepath":"0","name":"chinese","option":"生意兴隆#玉局风流#宁静致远#舣舟亭是个好亭子","rightAnswer":2,"title":"乾隆皇帝下江南时，曾为东坡公园的舣舟亭题匾，所题字为：","type":"choose","xuexiao":"#1"},{"fromUserAnswer":1,"fromUserAnswerTime":3,"id":2,"imagepath":"0","name":"chinese","option":"台湾岛#崇明岛#钓鱼岛#海南岛","rightAnswer":3,"title":"1893年，慈禧太后下诏将_赏给盛宣怀（常州人，时任邮传部尚书）作采药用地。","type":"choose","xuexiao":"#1"},{"fromUserAnswer":1,"fromUserAnswerTime":3,"id":3,"imagepath":"0","name":"chinese","option":"知道#佛知道#不知道#佛不知道","rightAnswer":3,"title":"常州话中“佛晓则”是指：","type":"choose","xuexiao":"#1"},{"fromUserAnswer":1,"fromUserAnswerTime":3,"id":4,"imagepath":"0","name":"chinese","option":"瘦子#胖子#同时到达#围观群众","rightAnswer":4,"title":"世界杯赌球输了，一个胖子和一个瘦子同时从现代传媒中心楼顶往下跳，谁先到达地面？","type":"choose","xuexiao":"#1"}]}'+')');
                    var widget=ccs.uiReader.widgetFromJsonFile("res/kaishi_1/kaishi_1.ExportJson");
                    layer.addChild(widget);

                    var labelname=widget.getChildByName("kaishi_ui_wenzi_2_0");
                    labelname.setText(Global.data["fromUserName"]);
                    Global.NameB=Global.data["fromUserName"];
                    var editboximage=widget.getChildByName("kaishi_ui_shurukuang");
                    var size=editboximage.getSize();
                    var editbox=cc.EditBox.create(size,cc.Scale9Sprite.create(res.editbox_png),cc.Scale9Sprite.create(res.editbox_png));
                    editbox.setPosition(editboximage.getPosition());
                    editbox.setFontSize(28);
                    editbox.setFontColor(cc.color(0, 0, 0));
                    editbox.setPlaceholderFontColor(cc.color(150, 150, 150));
                    editbox.setPlaceholderFontSize(28);
                    editbox.setPlaceHolder("请输入你的大名");
                    editbox.setMaxLength(7);
                    editboximage.removeFromParent();

                    layer.addChild(editbox);

                    var buttonstart=widget.getChildByName("kaishi_ui_button");
                    buttonstart.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:

                                Global.myName=editbox.getString();
                                //alert(Global.myName);
                                cc.director.runScene(new DaTi());
                                break;

                            case ccui.Widget.TOUCH_CANCELED:
                                //alert("Touch Cancelled");
                                break;

                            default:
                                break;
                        }
                    },this);
                    widget.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_BEGAN:
                                editbox.setFocused(false);
                                break;
                        }
                    },this);
                }
//            }
//            xhp.send();
//
//        }

        var menu = new cc.Menu();
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu, 1);

        var label = new cc.LabelTTF("test scene", "Arial", 24);
        var item = new cc.MenuItemLabel(label, function(){
//            cc.director.runScene(new testScene());
            cc.director.pushScene(new cc.TransitionSlideInT(1, new testScene()));
        }, this);
        item.setPosition(200, 50);
        menu.addChild(item);

    }
});

var testScene = cc.Scene.extend({
    ctor: function(){
        this._super();

        var menu = new cc.Menu();
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu, 1);

        var label = new cc.LabelTTF("test scene", "Arial", 24);
        var item = new cc.MenuItemLabel(label, function(){
//            cc.director.runScene(new MainScene());
            cc.director.popScene();
        }, this);
        item.setPosition(200, 50);
        menu.addChild(item);

    }
});