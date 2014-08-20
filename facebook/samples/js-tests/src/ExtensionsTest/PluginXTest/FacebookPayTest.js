var FacebookPayTest = PluginXTest.extend({
    _title: "Plugin-x Test",
    _subtitle: "Facebook SDK",
    _agentManager: null,
    _showTips: false,

    ctor: function (title) {
        this._super(title);

        window.facebook = window.facebook || (window.plugin ? plugin.FacebookAgent.getInstance() : null);

        var menu = new cc.Menu();
        menu.setPosition(cc.p(0, 0));
        menu.width = winSize.width;
        menu.height = winSize.height;
        this.addChild(menu, 1);

        var buttons = {
            "normal pay": "onPay"
        };

        var top = 50;
        for (var action in buttons) {
            var label = new cc.LabelTTF(action, "Arial", 24);
            var item = new cc.MenuItemLabel(label, this[buttons[action]], this);
            item.setPosition(250, 400 - top);
            menu.addChild(item);
            top += 50;
        }

        var logo = new cc.Sprite(s_html5_logo);
        logo.setPosition(winSize.width * 2 / 3, winSize.height / 2);
        this.addChild(logo);

        this._agentManager = plugin.agentManager;

        this.tipsLabel = new cc.LabelTTF("This share function is not available on web version of Facebook plugin", "Arial", 20);
        this.tipsLabel.setDimensions(cc.size(350, 120));
        this.addChild(this.tipsLabel, 100);
        this.tipsLabel.setPosition(cc.pAdd(cc.visibleRect.topRight, cc.p(-this.tipsLabel.width / 2 - 20, -100)));
        this.tipsLabel.visible = false;
    },

    onPay: function(){
        facebook.pay({
            product: 'http://tools.itharbors.com/facebook/pay/item1.html'
        }, function(id, response){
            console.log(JSON.parse(response));
        });
    }

});