cc.game.onStart = function(){

    var autoExitFull = false;

    var facebook = plugin.FacebookAgent;

    var statusLabel = null;

    var buttonList = [
        {
            title: "login",
            callback: function(){
                statusLabel.setString("... login ...");


                if (facebook.isLoggedIn()) {
                    statusLabel.setString("logged in");
                }
                else {
                    facebook.login(function (type, msg) {
                        statusLabel.setString("type is " + type + " msg is " + JSON.stringify(msg));
                    });
                }
            }
        },{
            title: "logout",
            callback: function(){
                statusLabel.setString("... logout ...");

                facebook.logout(function (type, msg) {
                    statusLabel.setString(JSON.stringify(msg));
                });
            }
        },{
            title: "getUserId",
            callback: function(){
                statusLabel.setString("... getUserId ...");


                if (facebook.isLoggedIn()) {
                    statusLabel.setString(facebook.getUserID());
                }
                else {
                    statusLabel.setString("User haven't been logged in");
                }
            }
        },{
            title: "getToken",
            callback: function(){
                statusLabel.setString("... getToken ...");

                if (facebook.isLoggedIn()) {
                    statusLabel.setString(facebook.getAccessToken());
                }
                else {
                    statusLabel.setString("User haven't been logged in");
                }
            }
        },{
            title: "loginWithPermissionClick",
            callback: function(){
                statusLabel.setString("... new permissions ...");
                autoExitFull && cc.screen.exitFullScreen();
                var permissions = ["create_event", "create_note", "manage_pages", "publish_actions"];
                facebook.login(permissions, function(errCode, result){
                    if(errCode === window["plugin"].FacebookAgent.CODE_SUCCEED){
                        statusLabel.setString("permissions: " + JSON.stringify(result['permissions']));
                    }else{
                        statusLabel.setString("requestPermissions failure");
                    }
                });
            }
        },{
            title: "getPermissions",
            callback: function(){
                facebook.api("/me/permissions", window["plugin"].FacebookAgent.HttpMethod.GET, {}, function (type, data) {
                    if (type == window["plugin"].FacebookAgent.CODE_SUCCEED) {
                        data = JSON.stringify(data);
                        statusLabel.setString(data);
                    }
                    else {
                        statusLabel.setString(JSON.stringify(data));
                    }
                });
            }
        },{
            title: "request API",
            callback: function(){
                statusLabel.setString("... request api ...");


                facebook.api("/me/photos", window["plugin"].FacebookAgent.HttpMethod.POST, {"url": "http://files.cocos2d-x.org/images/orgsite/logo.png"}, function (type, msg) {
                    if (type == window["plugin"].FacebookAgent.CODE_SUCCEED) {
                        statusLabel.setString("post_id: " + msg["post_id"]);
                    }else{
                        statusLabel.setString("request failure");
                    }
                });
            }
        },
        //share
        {
            title: "share a simple link",
            callback: function(){
                statusLabel.setString("... share a simple link ...");
                var map = {
                    "dialog": "shareLink",
                    "link": "http://www.cocos2d-x.org"
                };
                if(facebook.canPresentDialog(map)){
                    facebook.dialog(map,function(errorCode,msg){
                        if(errorCode === window["plugin"].FacebookAgent.CODE_SUCCEED){
                            statusLabel.setString(JSON.stringify(msg));
                        }else{
                            statusLabel.setString("share failure");
                        }
                    });
                }else{
                    map["dialog"] = "feedDialog";
                    facebook.dialog(map,function(errorCode,msg){
                        if(errorCode === window["plugin"].FacebookAgent.CODE_SUCCEED) {
                            statusLabel.setString(JSON.stringify(msg));
                        }else{
                            statusLabel.setString("share failure");
                        }
                    });
                }
            }
        },{
            title: "Share open graph",
            callback: function(){
                statusLabel.setString("... Share open graph ...");
                autoExitFull && cc.screen.exitFullScreen();
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
                autoExitFull && cc.screen.exitFullScreen();
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
                autoExitFull && cc.screen.exitFullScreen();
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
                autoExitFull && cc.screen.exitFullScreen();
                facebook.pay({
                    product: 'https://www.cocos2d-x.org/demo/facebooktest/pay/item1.html'
                }, function(id, response){
                    if(response['status'] === 'completed'){
                        statusLabel.setString("Success: " + response['amount'] + response['currency']);
                    }else{
                        statusLabel.setString("Abnormal: " + response['status']);
                    }
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

                    menuItem.x = (i / 7 | 0) ? 250 : -250;
                    menuItem.y = ((i % 7) - 3) * -50;

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