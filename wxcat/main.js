cc.game.onStart = function () {
    var mode = cc.sys.isMobile && window.navigator.userAgent.indexOf("MicroMessenger") != -1 ? cc.ResolutionPolicy.FIXED_WIDTH : cc.ResolutionPolicy.SHOW_ALL;
    cc.view.setDesignResolutionSize(321, 480, mode);
    cc.view.resizeWithBrowserSize(true);
    if (!cc.sys.isNative) {
        cc._renderContext.webkitImageSmoothingEnabled = false;
        cc._renderContext.mozImageSmoothingEnabled = false;
        cc._renderContext.imageSmoothingEnabled = false; //future
        cc._renderContext.fillStyle = "#afdc4b";
    }
    cc.view.enableAutoFullScreen(false);
    //load resources
    cc.loader.loadJson("template.json", function (err, jsonObj) {
        var res = ["res/pg.png", "res/arrow.png", "res/end.png"];
        if (!err) {
            TemplateUtils.init(jsonObj);
            res = res.concat(TemplateUtils.getResourcesList());
            if (!cc.sys.isNative) {
                var shareInfo = TemplateUtils.getShare();
                if (shareInfo && shareInfo["wechat"] && shareInfo["wechat"]["imgUrl"]) {
                    var href = window.location.href, base = href,
                        lastpt = href.lastIndexOf("."),
                        last = href.lastIndexOf("/");
                    if (last != -1 && lastpt > last)
                        base = base.substr(0, last);
                    var path = shareInfo["wechat"]["imgUrl"];
                    if (path[0] != "/")
                        path = "/" + path;
                    window["wxData"]["imgUrl"] = base + path;
                }
            }
        }
        else {
            cc.error("Template parse failed");
        }
        cc.LoaderScene.preload(res, function () {
            cc.director.runScene(new MyScene());
        }, this);
    });
};
cc.game.run();