(function(w){

    //没引入cocos2d
    if(cc === undefined){
        return;
    }

    //获取配置文件
    var config = cc.game.config.plugin;
    var SDK = {
        user: null,
        share: null,
        social: null
    };

    var Plugin = {
        //获取当前使用的模块名字
        getSDK: function(){
            return SDK;
        },
        //判断方法是否被当前初始化后的Plugin所支持
        isSupportFunction: function(name){
            if(typeof this[name] === 'function'){
                return true;
            }else{
                return false;
            }
        }
    };

    Plugin.extend = function(name, method){
        var use = false;
        for(var p in config['common']){
            //把对应类中的方法复制过来
            if(config['common'][p] == name){
                for(var o in method[p]){
                    this[o] = method[p][o];
                }
                use = true;
                SDK[p] = name;
            }
        }
        if(use){
            //如果使用到了，则初始化
            method.init(config[name]);
        }
    };

    w.Plugin = Plugin;

})(window);