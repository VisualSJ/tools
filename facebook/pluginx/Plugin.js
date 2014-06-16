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

    var pluginList = {};

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
        pluginList[name] = method;
    };

    w['Plugin'] = Plugin;

    plugin.PluginParam = function(type, value){
        var paramType = plugin.PluginParam.ParamType,tmpValue;
        switch(type){
            case paramType.TypeInt:
                tmpValue = parseInt(value);
                break;
            case paramType.TypeFloat:
                tmpValue = parseFloat(value);
                break;
            case paramType.TypeBool:
                tmpValue = Boolean(value);
                break;
            case paramType.TypeString:
                tmpValue = String(value);
                break;
            case paramType.TypeStringMap:
                tmpValue = JSON.stringify(value);
                break;
            default:
                tmpValue = value;
        }
        return tmpValue
    };

    plugin.PluginParam.ParamType = {
        TypeInt:1,
        TypeFloat:2,
        TypeBool:3,
        TypeString:4,
        TypeStringMap:5
    };

    plugin.PluginParam.AdsResultCode = {
        AdsReceived:0,
        FullScreenViewShown:1,
        FullScreenViewDismissed:2,
        PointsSpendSucceed:3,
        PointsSpendFailed:4,
        NetworkError:5,
        UnknownError:6
    };

    plugin.PluginParam.PayResultCode = {
        PaySuccess:0,
        PayFail:1,
        PayCancel:2,
        PayTimeOut:3
    };

    plugin.PluginParam.ShareResultCode = {
        ShareSuccess:0,
        ShareFail:1,
        ShareCancel:2,
        ShareTimeOut:3
    };

    var pluginManager = {
        loadPlugin: function(pluginName){
            if(!pluginName){
                cc.log("PliginManager - PluginName error");
                return null;
            }
            var info = pluginName.match(/[A-Z][a-z]+/g);

            if(info.length !== 2){
                cc.log("PliginManager - PluginName error");
                return null;
            }

            var moduleN = info[0].toLowerCase();
            var pluginN = info[1].toLowerCase();
            if(!pluginList[pluginN]){
                cc.log("Plugin does not exist");
                return null;
            }
            pluginList[pluginN].init();
            var pluginObj = {
                setDebugMode: function(){},
                startSession: function(){},
                setCaptureUncaughtException: function(){},
                callFuncWithParam: function(funName){
                    var _fun = pluginList[pluginN]['common'][funName];
                    if(_fun){
                        var _arg = Array.prototype.slice.call(arguments, 1);
                        _fun.apply(_fun, _arg);
                    }
                }
            };
            for(var p in pluginList[pluginN][moduleN]){
                pluginObj[p] = pluginList[pluginN][moduleN][p];
            }
            return pluginObj;

        }
    };

    w['plugin'] = {
        PluginManager: {
            getInstance: function(){
                return pluginManager;
            }
        }
    };

})(window);