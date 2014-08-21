cc.game.onStart = function(){

    var facebook = plugin.FacebookAgent;

    var statusLabel = null;

    var buttonList = [
        {
            title: "login",
            callback: function(){
                statusLabel.setString("... login ...");
                facebook.login(function(errCode, result){
                    console.log(result);
                    if(errCode === 0){
                        statusLabel.setString("login success, errCode: " + errCode);
                    }else{
                        statusLabel.setString("login failure, errCode: " + errCode);
                    }
                });
            }
        },{
            title: "logout",
            callback: function(){
                statusLabel.setString("... logout ...");
                facebook.logout(function(errCode, result){
                    console.log(result);
                    if(errCode === 0){
                        statusLabel.setString("logout success, errCode: " + errCode);
                    }else{
                        statusLabel.setString("logout failure, errCode: " + errCode);
                    }
                });
            }
        },{
            title: "getUserId",
            callback: function(){
                statusLabel.setString("... getUserId ...");
                facebook.request("/me", plugin.FacebookAgent.HttpMethod.Get, {}, function(errCode, result){
                    console.log(result);
                    if(errCode === 0){
                        statusLabel.setString("User id: " + result['id']);
                    }else{
                        statusLabel.setString("get user id failure");
                    }
                });
            }
        },{
            title: "getToken",
            callback: function(){
                statusLabel.setString("... getToken ...");
                facebook.requestAccessToken(function(errCode, result){
                    console.log(result);
                    if(errCode === 0){
                        statusLabel.setString("token: " + result['accessToken'].substr(0, 15) + '...');
                    }else{
                        statusLabel.setString("get token failure");
                    }
                });
            }
        },{
            title: "new permissions",
            callback: function(){
                statusLabel.setString("... new permissions ...");
                var permissions = ["create_event", "create_note", "manage_pages", "publish_actions"];
                facebook.requestPermissions(permissions, function(errCode, result){
                    if(errCode === 0){
                        statusLabel.setString("permissions: " + JSON.stringify(result['permissions']));
                    }else{
                        statusLabel.setString("requestPermissions failure");
                    }
                });
            }
        },{
            title: "request api",
            callback: function(){
                statusLabel.setString("... request api ...");
                facebook.request("/me/photos", plugin.FacebookAgent.HttpMethod.Post, {"url":"http://files.cocos2d-x.org/images/orgsite/logo.png"}, function(errCode, result){
                    if(errCode === 0){
                        statusLabel.setString("post_id: " + result["post_id"]);
                    }else{
                        statusLabel.setString("request failure");
                    }
                });
            }
        },
        //share
        {
            title: "Share link",
            callback: function(){
                statusLabel.setString("... Share link ...");
                var map = {
                    "dialog": "share_link",
                    "description": "Cocos2d-x is a great game engine",
                    "title": "Cocos2d-x",
                    "link": "http://www.cocos2d-x.org",
                    "imageUrl": "http://files.cocos2d-x.org/images/orgsite/logo.png"
                };
                facebook.share(map, function (errCode, result) {
                    if(errCode === 0){
                        statusLabel.setString("result: " + JSON.stringify(result));
                    }else{
                        statusLabel.setString("share failure");
                    }
                });
            }
        },{
            title: "Share open graph",
            callback: function(){
                statusLabel.setString("... Share open graph ...");
                var map = {
                    "dialog": "share_open_graph",
                    "action_type": "cocostestmyfc:share",
                    "preview_property": "cocos_document",
                    "title": "Cocos2d-JS Game Engine",
                    "image": "http://files.cocos2d-x.org/images/orgsite/logo.png",
                    "url": "http://cocos2d-x.org/docs/manual/framework/html5/en",
                    "description": "cocos document"
                };
                facebook.dialog(map, function (errCode, result) {
                    if(errCode === 0){
                        statusLabel.setString("result: " + JSON.stringify(result));
                    }else{
                        statusLabel.setString("dialog failure");
                    }
                });
            }
        },{
            title: "App request",
            callback: function(){
                statusLabel.setString("... App request ...");
                var map = {
                    "dialog": "apprequests",
                    "message": "Cocos2d-x is a great game engine",
                    "link": "http://www.cocos2d-x.org"
                };
                facebook.dialog(map, function (errCode, result) {
                    if(errCode === 0){
                        if(result['request']){
                            statusLabel.setString("request: " + result['request'] + '\n' + 'Number of people: ' + result['to'].length);
                        }
                    }else{
                        statusLabel.setString("dialog failure");
                    }
                });
            }
        },{
            title: "getPermissionList",
            callback: function(){
                statusLabel.setString("... getPermissionList ...");
                facebook.getPermissionList(function (errCode, result) {
                    if(errCode === 0){
                        var perStr = JSON.stringify(result['permissions']);
                        if(perStr.length > 60){
                            perStr = perStr.substr(0, 60) + '...';
                        }
                        statusLabel.setString("request: " + perStr);
                    }else{
                        statusLabel.setString("getPermissionList failure + \n" + result['error_message']);
                    }
                });
            }
        },
        //pay
        {
            title: "Payments",
            callback: function(){
                statusLabel.setString("... Payments ...");
                facebook.pay({
                    product: 'http://tools.itharbors.com/facebook/pay/item1.html'
                }, function(id, response){
                    statusLabel.setString(JSON.parse(response));
                });
            }
        }
    ];

    var MyScene = cc.Scene.extend({
        onEnter:function () {
            this._super();
            var size = cc.director.getWinSize();
            var sprite = cc.Sprite.create("images/HelloWorld.png");
            sprite.setPosition(size.width / 2, size.height / 2);
            this.addChild(sprite, 0);

            statusLabel = new cc.LabelTTF("Status display area", "Arial", 20);
            statusLabel.x = 400;
            statusLabel.y = 40;
            statusLabel.setColor(cc.color.BLACK);
            this.addChild(statusLabel);

            var menu = cc.Menu.create();

            for(var i = 0, item, len = buttonList.length; i < len;i++){
                (function(i){
                    item = buttonList[i];
                    var label = cc.LabelTTF.create(item['title'], "Arial", 20);
                    var menuItem = cc.MenuItemLabel.create(label, item['callback'], this);
                    menuItem.setColor(cc.color.BLACK);

                    menuItem.x = (i / 6 | 0) ? 250 : -250;
                    menuItem.y = ((i % 6) - 3) * -50;

                    menu.addChild(menuItem);
                })(i);
            }

            this.addChild(menu);
        }
    });

    //load resources
    cc.LoaderScene.preload(["images/HelloWorld.png"], function () {
        cc.director.runScene(new MyScene());
    }, this);
};
cc.game.run("gameCanvas");