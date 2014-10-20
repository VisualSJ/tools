
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,

    __addImg: function(imgView, iconUrl, isImgAdded) {


//            if(cc.loader.cache[iconUrl]) {
//                imgView.loadTexture(iconUrl);
//            } else {
                cc.textureCache.addImage(iconUrl, function(target){
                    if(!cc.loader.cache[iconUrl]) {
                        cc.log("FIXME:图片不存在----> " + iconUrl );
                       // iconUrl = pngRes.image_not_found;
                    }
                    imgView.loadTexture(iconUrl);
                }, this);

//                imgView.loadTexture(iconUrl);
//            }

    },

    addImg: function(imgView, iconUrl) {
        this.__addImg(imgView, iconUrl, true);
    },

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var iv = null;
        var layout = ccui.Layout.create();
        layout.layoutType = ccui.Layout.LINEAR_VERTICAL;
        layout.setSize(cc.size(768, 1024));
//        layout.x = 100;
//        layout.y = 200;
        this.addChild(layout);


        window.test = [];


        for(var idx = 0,len=3; idx < len; idx ++) {
            var items_store_item = ccs.uiReader.widgetFromJsonFile(res.items_store_item);
            var img = ccui.helper.seekWidgetByName(items_store_item, "img");
            img.loadTexture("res/401015d.jpg");
//            this.addImg(img, "res/401015d.jpg");
            layout.addChild(items_store_item);
            test.push(items_store_item);
        }
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

